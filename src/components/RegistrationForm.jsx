import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ArrowLeft, Check, Loader2, User, Mail,
  Globe, Sparkles, Mic, Video, Zap, Sprout, AlertTriangle,
  Heart, Award, Hourglass, Rocket, Pen, Palette,
  Lightbulb, Upload, X, Calendar, ChevronDown,
} from 'lucide-react';
import { teachers as TEACHERS } from '../data/teachers.js';
import { ARAB_COUNTRIES, REST_COUNTRIES, findCountry } from '../data/countries.js';
import { canAddScript, teachersForScripts, visibleScriptsFor } from '../lib/registrationRules.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { PhoneField } from './PhoneField.jsx';

const ENDPOINT = import.meta.env.VITE_REGISTRATION_ENDPOINT || '';

const TRACK_IDS = ['recorded', 'live', 'intensive', 'foundation'];
const TRACK_ICONS = { recorded: Mic, live: Video, intensive: Zap, foundation: Sprout };

// ٤ أهداف (بدل ٦ سابقًا). كل هدف إما يحدّد المسار مباشرة أو يفتح سؤالًا تابعًا.
//   scratch   → foundation                    (مباشر)
//   intensive → intensive                     (مباشر)
//   hobby     → سؤال «مدة التعلم» (طويلة → اختيار recorded/live ، قصيرة → intensive)
//   master    → اختيار recorded/live + إيضاح فرق السعر
const GOALS = [
  { id: 'scratch',   icon: Pen },
  { id: 'intensive', icon: Rocket },
  { id: 'hobby',     icon: Heart },
  { id: 'master',    icon: Award },
];

// خطوات الاستمارة — تُبنى ديناميكيًا من القيم الحالية.
function buildSteps(v) {
  const s = ['filter'];

  if (v.filter === 'art') {
    s.push('goal');
    if (v.goal === 'hobby')  s.push('hobbyDuration');
    if (v.goal === 'master' || (v.goal === 'hobby' && v.hobbyDuration === 'long')) {
      s.push('trackChoice');
    }
  }
  // filter === 'regular' ⇒ المسار تأسيس (يُضبط فى الـ pick).

  s.push('scripts');
  s.push('lessonsPerMonth');
  if (v.scripts.length >= 2) s.push('lessonsPerScript');
  s.push('priorExperience');
  if (v.priorExperience === 'yes') s.push('uploadSamples');
  if (v.track === 'recorded' || v.track === 'live') s.push('teacher');
  s.push('info', 'review');

  return s;
}

const initialValues = {
  filter: '',           // 'regular' | 'art'
  goal: '',             // GOALS[].id
  hobbyDuration: '',    // 'long' | 'short'
  track: '',            // TRACK_IDS
  scripts: [],
  lessonsPerMonth: '',  // '2' | '4' | '8'
  lessonsPerScript: {}, // { scriptId: '2'|'4'|'8' }
  priorExperience: '',  // 'yes' | 'no'
  priorSamples: [],     // [{ name, size, dataUrl }]
  teacher: '',
  name: '',
  email: '',
  phoneCode: '+20',
  phoneNumber: '',
  country: '',          // ISO2
  birthDay: '',
  birthMonth: '',
  birthYear: '',
};

export const RegistrationForm = forwardRef(function RegistrationForm(_props, ref) {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error

  const steps = useMemo(
    () => buildSteps(values),
    [values.filter, values.goal, values.hobbyDuration, values.track, values.scripts.length, values.priorExperience],
  );
  const currentStep = steps[stepIdx];
  const totalSteps = steps.length;

  useImperativeHandle(ref, () => ({
    presetTeacher(teacherId) {
      const teacher = TEACHERS.find((tt) => tt.id === teacherId);
      const next = {
        ...values,
        filter: 'art',
        goal: 'master',
        track: values.track || 'recorded',
        scripts: values.scripts.length ? values.scripts : (teacher?.scripts.slice(0, 1) ?? []),
        teacher: teacherId,
      };
      setValues(next);
      const nextSteps = buildSteps(next);
      setStepIdx(nextSteps.indexOf('info'));
    },
    presetService(serviceId) {
      if (!TRACK_IDS.includes(serviceId)) return;
      const goal =
        serviceId === 'foundation' ? 'scratch' :
        serviceId === 'intensive'  ? 'intensive' : 'master';
      const next = { ...values, filter: 'art', goal, track: serviceId };
      setValues(next);
      const nextSteps = buildSteps(next);
      setStepIdx(nextSteps.indexOf('scripts'));
    },
  }));

  const update = (patch) => setValues((v) => ({ ...v, ...patch }));

  function next() {
    const errs = validateStep(currentStep, values, t);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStepIdx((i) => Math.min(steps.length - 1, i + 1));
  }
  function back() {
    setErrors({});
    setStepIdx((i) => Math.max(0, i - 1));
  }
  function reset() {
    setValues(initialValues);
    setStepIdx(0);
    setErrors({});
    setStatus('idle');
  }

  async function submit() {
    const errs = validateStep('info', values, t);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');
    const country = findCountry(values.country);
    const payload = {
      filter: values.filter,
      goal: values.goal,
      hobbyDuration: values.hobbyDuration,
      track: values.track,
      scripts: values.scripts,
      lessonsPerMonth: values.lessonsPerMonth,
      lessonsPerScript: values.lessonsPerScript,
      priorExperience: values.priorExperience,
      priorSamples: values.priorSamples.map((s) => ({ name: s.name, size: s.size, dataUrl: s.dataUrl })),
      teacher: values.teacher,
      name: values.name,
      email: values.email,
      phone: `${values.phoneCode} ${values.phoneNumber}`.trim(),
      country: country ? country.ar : values.country,
      countryCode: values.country,
      birth: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
      submittedAt: new Date().toISOString(),
      lang: document.documentElement.lang,
    };

    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus('done');
    } catch (_e) {
      setStatus('error');
    }
  }

  return (
    <section id="register" className="relative overflow-hidden section-y bg-paper-texture">
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial-flame opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">{t('register.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('register.title')} />
            </h2>
            <Ornament className="mt-6 h-3 w-44 text-flame-500/70" />
            <p className="mt-6 text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('register.subtitle')}
            </p>

            <ul className="mt-8 space-y-3">
              {['diverse', 'plans', 'masters', 'community'].map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-3 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 px-4 py-3"
                >
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-flame-500 text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-ink-800 dark:text-ink-100">{t(`register.perks.${k}`)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl sm:rounded-[32px] border border-ink-900/10 dark:border-ink-100/10 bg-paper/90 dark:bg-[#150B07]/85 p-5 sm:p-7 lg:p-9 shadow-soft backdrop-blur-md">
              <AnimatePresence mode="wait">
                {status === 'done' ? (
                  <Success key="success" name={values.name} email={values.email} reset={reset} />
                ) : (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* مؤشّر خطوة محسَّن — badge برتقالى للرقم + اسم الخطوة بحجم بارز */}
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame-500 text-white text-sm font-extrabold shadow-flame">
                        {stepIdx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink-500 dark:text-ink-300">
                          {t('register.step')} {stepIdx + 1} {t('register.of')} {totalSteps}
                        </p>
                        <p className="text-sm sm:text-base font-extrabold text-flame-600 dark:text-flame-400 leading-tight truncate">
                          {t(`register.steps.${currentStep}`)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-ink-100/10">
                      <motion.span
                        className="block h-full bg-flame-500"
                        animate={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    <div className="mt-6 sm:mt-7 min-h-[260px]">
                      {currentStep === 'filter'           && <StepFilter           values={values} update={update} />}
                      {currentStep === 'goal'             && <StepGoal             values={values} update={update} />}
                      {currentStep === 'hobbyDuration'    && <StepHobbyDuration    values={values} update={update} />}
                      {currentStep === 'trackChoice'      && <StepTrackChoice      values={values} update={update} />}
                      {currentStep === 'scripts'          && <StepScripts          values={values} update={update} error={errors.scripts} />}
                      {currentStep === 'lessonsPerMonth'  && <StepLessonsPerMonth  values={values} update={update} />}
                      {currentStep === 'lessonsPerScript' && <StepLessonsPerScript values={values} update={update} />}
                      {currentStep === 'priorExperience'  && <StepPriorExperience  values={values} update={update} />}
                      {currentStep === 'uploadSamples'    && <StepUploadSamples    values={values} update={update} error={errors.priorSamples} />}
                      {currentStep === 'teacher'          && <StepTeacher          values={values} update={update} />}
                      {currentStep === 'info'             && <StepInfo             values={values} update={update} errors={errors} />}
                      {currentStep === 'review'           && <StepReview           values={values} />}
                    </div>

                    {status === 'error' && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-flame-500/40 bg-flame-500/10 px-4 py-3 text-flame-700 dark:text-flame-300">
                        <AlertTriangle size={16} />
                        {t('register.errors.submitFailed')}
                      </div>
                    )}

                    <div className="mt-8 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={back}
                        disabled={stepIdx === 0}
                        className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowRight size={16} className="rtl:hidden rotate-180" />
                        <ArrowLeft size={16} className="hidden rtl:inline" />
                        {t('common.back')}
                      </button>

                      {currentStep === 'review' ? (
                        <button
                          type="button"
                          onClick={submit}
                          disabled={status === 'submitting'}
                          className="btn-flame disabled:opacity-70"
                        >
                          {status === 'submitting' ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              {t('common.submitting')}
                            </>
                          ) : (
                            <>
                              <Sparkles size={16} />
                              {t('common.submit')}
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={next}
                          disabled={!canAdvance(currentStep, values)}
                          className="btn-flame disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('common.next')}
                          <ArrowLeft size={16} className="rtl:hidden" />
                          <ArrowRight size={16} className="hidden rtl:inline rotate-180" />
                        </button>
                      )}
                    </div>

                    <p className="mt-5 text-center text-xs text-ink-600/70 dark:text-ink-300/70">
                      {t('register.agreement')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// ═════════════ helpers ═════════════
function canAdvance(step, v) {
  switch (step) {
    case 'filter':           return !!v.filter;
    case 'goal':             return !!v.goal;
    case 'hobbyDuration':    return !!v.hobbyDuration;
    case 'trackChoice':      return v.track === 'recorded' || v.track === 'live';
    case 'scripts':          return v.scripts.length > 0;
    case 'lessonsPerMonth':  return !!v.lessonsPerMonth;
    case 'lessonsPerScript': return v.scripts.every((s) => !!v.lessonsPerScript[s]);
    case 'priorExperience':  return !!v.priorExperience;
    case 'uploadSamples':    return v.priorSamples.length > 0;
    case 'teacher':          return !!v.teacher;
    case 'info':
      return v.name && v.email && v.phoneNumber && v.country
          && v.birthDay && v.birthMonth && v.birthYear;
    case 'review':           return true;
    default:                 return false;
  }
}

function validateStep(step, v, t) {
  const e = {};
  if (step === 'info') {
    if (!v.name || v.name.trim().length < 3) e.name = t('register.errors.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) e.email = t('register.errors.email');
    if (!/^[\d\s-]{6,}$/.test(v.phoneNumber || '')) e.phone = t('register.errors.phone');
    if (!v.country) e.country = t('register.errors.country');
    if (!v.birthDay || !v.birthMonth || !v.birthYear) e.birth = t('register.errors.birth');
  }
  if (step === 'scripts' && v.scripts.length === 0) e.scripts = t('register.errors.scriptsRequired');
  if (step === 'uploadSamples' && v.priorSamples.length === 0) e.priorSamples = t('register.errors.samplesRequired');
  return e;
}

// ═════════════ reusable choice card ═════════════
function ChoiceCard({ icon: Icon, title, desc, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full h-full rounded-2xl border p-5 text-start transition-all hover:-translate-y-1 ${
        active
          ? 'border-flame-500 bg-flame-500/10 shadow-flame'
          : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] hover:border-flame-500/40'
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${
          active ? 'bg-flame-500 text-white' : 'bg-flame-500/10 text-flame-600 dark:text-flame-400 group-hover:bg-flame-500 group-hover:text-white'
        }`}
      >
        <Icon size={20} />
      </span>
      <p className="mt-4 text-lg font-extrabold text-ink-900 dark:text-ink-100">{title}</p>
      {desc && <p className="mt-1.5 text-sm leading-relaxed text-ink-700/85 dark:text-ink-200/80">{desc}</p>}
    </button>
  );
}

function InfoBanner({ children, icon: Icon = Lightbulb }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-5 flex items-start gap-3 rounded-2xl border border-flame-500/40 bg-flame-500/10 p-4"
    >
      <Icon className="mt-0.5 shrink-0 text-flame-600 dark:text-flame-400" size={18} />
      <div className="text-sm text-ink-700 dark:text-ink-200 leading-relaxed">{children}</div>
    </motion.div>
  );
}

// ═════════════ steps ═════════════
function StepFilter({ values, update }) {
  const { t } = useTranslation();
  const pickRegular = () =>
    update({ filter: 'regular', track: 'foundation', goal: 'scratch', scripts: [], teacher: '', hobbyDuration: '' });
  const pickArt = () =>
    update({ filter: 'art', track: '', goal: '', scripts: [], teacher: '', hobbyDuration: '' });

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.filter')}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ChoiceCard icon={Pen}     title={t('register.filters.regular.title')} desc={t('register.filters.regular.desc')} active={values.filter === 'regular'} onClick={pickRegular} />
        <ChoiceCard icon={Palette} title={t('register.filters.art.title')}     desc={t('register.filters.art.desc')}     active={values.filter === 'art'}     onClick={pickArt} />
      </div>

      {values.filter === 'regular' && (
        <InfoBanner>
          <p className="font-extrabold text-flame-700 dark:text-flame-300 mb-1">
            {t('register.filterRedirect.title')}
          </p>
          <p>{t('register.filterRedirect.body')}</p>
        </InfoBanner>
      )}
    </>
  );
}

function StepGoal({ values, update }) {
  const { t } = useTranslation();
  const pick = (g) => {
    // mapping → track
    if (g.id === 'scratch')   update({ goal: g.id, track: 'foundation', hobbyDuration: '', scripts: [], teacher: '' });
    else if (g.id === 'intensive') update({ goal: g.id, track: 'intensive', hobbyDuration: '', scripts: [], teacher: '' });
    else if (g.id === 'hobby')     update({ goal: g.id, track: '', hobbyDuration: '', scripts: [], teacher: '' });
    else if (g.id === 'master')    update({ goal: g.id, track: '', hobbyDuration: '', scripts: [], teacher: '' });
  };
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.goal')}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {GOALS.map((g) => (
          <ChoiceCard
            key={g.id}
            icon={g.icon}
            title={t(`register.goals.${g.id}.title`)}
            desc={t(`register.goals.${g.id}.desc`)}
            active={values.goal === g.id}
            onClick={() => pick(g)}
          />
        ))}
      </div>
    </>
  );
}

function StepHobbyDuration({ values, update }) {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.hobbyDuration')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">{t('register.hobbyDuration.question')}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ChoiceCard
          icon={Hourglass}
          title={t('register.hobbyDuration.long.title')}
          desc={t('register.hobbyDuration.long.desc')}
          active={values.hobbyDuration === 'long'}
          onClick={() => update({ hobbyDuration: 'long', track: '', teacher: '' })}
        />
        <ChoiceCard
          icon={Rocket}
          title={t('register.hobbyDuration.short.title')}
          desc={t('register.hobbyDuration.short.desc')}
          active={values.hobbyDuration === 'short'}
          onClick={() => update({ hobbyDuration: 'short', track: 'intensive', teacher: '' })}
        />
      </div>
    </>
  );
}

function StepTrackChoice({ values, update }) {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.trackChoice')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.trackChoice.question')}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ChoiceCard
          icon={Video}
          title={t('register.tracks.live.title')}
          desc={t('register.trackChoice.live.desc')}
          active={values.track === 'live'}
          onClick={() => update({ track: 'live', teacher: '' })}
        />
        <ChoiceCard
          icon={Mic}
          title={t('register.tracks.recorded.title')}
          desc={t('register.trackChoice.recorded.desc')}
          active={values.track === 'recorded'}
          onClick={() => update({ track: 'recorded', teacher: '' })}
        />
      </div>
      <InfoBanner>
        <p>{t('register.trackChoice.priceNote')}</p>
      </InfoBanner>
    </>
  );
}

function StepScripts({ values, update, error }) {
  const { t } = useTranslation();
  const [hint, setHint] = useState('');
  const list = visibleScriptsFor(values.track);
  const isFoundation = values.track === 'foundation';

  const toggle = (id) => {
    if (values.scripts.includes(id)) {
      const remaining = values.scripts.filter((s) => s !== id);
      const nextLPS = { ...values.lessonsPerScript };
      delete nextLPS[id];
      update({ scripts: remaining, lessonsPerScript: nextLPS, teacher: '' });
      setHint('');
      return;
    }
    const verdict = canAddScript(values.scripts, id, values.track);
    if (!verdict.ok) {
      setHint(t(`register.ruleErrors.${verdict.reason}`));
      return;
    }
    const nextScripts = isFoundation ? [id] : [...values.scripts, id];
    update({ scripts: nextScripts, teacher: '' });
    setHint('');
  };

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.scripts')}</h3>
      <p className="mt-2 text-sm text-ink-600/85 dark:text-ink-300/80">
        {isFoundation ? t('register.scriptsHintFoundation') : t('register.scriptsHint')}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((s) => {
          const selected = values.scripts.includes(s.id);
          const verdict = canAddScript(values.scripts, s.id, values.track);
          const disabled = !selected && !verdict.ok && s.active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              disabled={!s.active && !selected}
              className={`relative flex items-center justify-between rounded-2xl border px-4 py-4 text-start transition-all ${
                selected
                  ? 'border-flame-500 bg-flame-500/10 shadow-flame'
                  : disabled
                  ? 'border-ink-900/5 dark:border-ink-100/5 bg-paper/40 dark:bg-[#150B07]/40 opacity-60'
                  : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] hover:border-flame-500/40 hover:-translate-y-0.5'
              }`}
              title={!verdict.ok && !selected ? t(`register.ruleErrors.${verdict.reason}`) : undefined}
            >
              <span className="text-lg font-extrabold text-ink-900 dark:text-ink-100">
                {t(`scripts.${s.id}`)}
                {!s.active && (
                  <span className="ms-2 text-xs font-bold text-flame-600 dark:text-flame-400">
                    ({t('register.ruleErrors.ruqaa-soon')})
                  </span>
                )}
              </span>
              <span className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${selected ? 'bg-flame-500 text-white' : 'bg-ink-900/5 dark:bg-ink-100/10 text-ink-500'}`}>
                {selected && <Check size={14} />}
              </span>
            </button>
          );
        })}
      </div>

      {values.scripts.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-flame-500 text-white px-3 py-1.5 text-xs font-extrabold shadow-flame">
            {t('register.selected')}: {values.scripts.map((s) => t(`scripts.${s}`)).join(' + ')}
          </span>
        </div>
      )}

      {(hint || error) && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-flame-500/40 bg-flame-500/10 px-4 py-2.5 text-sm text-flame-700 dark:text-flame-300">
          <AlertTriangle size={14} />
          {hint || error}
        </div>
      )}
    </>
  );
}

function StepLessonsPerMonth({ values, update }) {
  const { t } = useTranslation();
  const options = ['2', '4', '8'];
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.lessonsPerMonth')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.lessonsPerMonth.question')}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const active = values.lessonsPerMonth === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => update({ lessonsPerMonth: opt })}
              className={`rounded-2xl border p-5 text-center transition-all hover:-translate-y-1 ${
                active
                  ? 'border-flame-500 bg-flame-500/10 shadow-flame'
                  : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] hover:border-flame-500/40'
              }`}
            >
              <p className="text-4xl font-black text-flame-600 dark:text-flame-400">{opt}</p>
              <p className="mt-1 text-sm font-bold text-ink-700 dark:text-ink-200">
                {t('register.lessonsPerMonth.unit')}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepLessonsPerScript({ values, update }) {
  const { t } = useTranslation();
  const options = ['2', '4', '8'];
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.lessonsPerScript')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.lessonsPerScript.question')}
      </p>
      <div className="mt-5 space-y-5">
        {values.scripts.map((scriptId) => (
          <div key={scriptId} className="rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] p-5">
            <p className="text-base font-extrabold text-ink-900 dark:text-ink-100 mb-3">
              {t(`scripts.${scriptId}`)}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {options.map((opt) => {
                const active = values.lessonsPerScript[scriptId] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update({
                      lessonsPerScript: { ...values.lessonsPerScript, [scriptId]: opt },
                    })}
                    className={`rounded-xl border px-4 py-3 text-center transition-all ${
                      active
                        ? 'border-flame-500 bg-flame-500 text-white shadow-flame'
                        : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/60 hover:border-flame-500/50'
                    }`}
                  >
                    <span className="text-xl font-extrabold">{opt}</span>
                    <span className="block text-xs font-bold mt-0.5">{t('register.lessonsPerMonth.unit')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StepPriorExperience({ values, update }) {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.priorExperience')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.priorExperience.question')}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ChoiceCard
          icon={Check}
          title={t('register.priorExperience.yes.title')}
          desc={t('register.priorExperience.yes.desc')}
          active={values.priorExperience === 'yes'}
          onClick={() => update({ priorExperience: 'yes' })}
        />
        <ChoiceCard
          icon={X}
          title={t('register.priorExperience.no.title')}
          desc={t('register.priorExperience.no.desc')}
          active={values.priorExperience === 'no'}
          onClick={() => update({ priorExperience: 'no', priorSamples: [] })}
        />
      </div>
    </>
  );
}

function StepUploadSamples({ values, update, error }) {
  const { t } = useTranslation();

  const onFiles = async (fileList) => {
    const arr = Array.from(fileList).slice(0, 6); // حدّ أقصى ٦ صور
    const added = await Promise.all(arr.map((f) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: f.name, size: f.size, dataUrl: reader.result });
        reader.readAsDataURL(f);
      })
    ));
    update({ priorSamples: [...values.priorSamples, ...added].slice(0, 6) });
  };

  const removeAt = (i) => update({
    priorSamples: values.priorSamples.filter((_, k) => k !== i),
  });

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.uploadSamples')}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.uploadSamples.question')}
      </p>

      <label className="mt-5 block">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-flame-500/40 bg-flame-500/5 py-10 px-5 cursor-pointer hover:bg-flame-500/10 transition-colors text-center">
          <Upload className="text-flame-600 dark:text-flame-400" size={22} />
          <span className="font-extrabold text-flame-700 dark:text-flame-300">
            {t('register.uploadSamples.cta')}
          </span>
        </div>
      </label>
      <p className="mt-2 text-xs text-ink-600/80 dark:text-ink-300/70">
        {t('register.uploadSamples.hint')}
      </p>

      {values.priorSamples.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {values.priorSamples.map((s, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border border-ink-900/10 dark:border-ink-100/10">
              <img src={s.dataUrl} alt={s.name} className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={t('common.close')}
                className="absolute top-1.5 end-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-flame-500/40 bg-flame-500/10 px-4 py-2.5 text-sm text-flame-700 dark:text-flame-300">
          <AlertTriangle size={14} />
          {error}
        </div>
      )}
    </>
  );
}

function StepTeacher({ values, update }) {
  const { t } = useTranslation();
  const candidates = teachersForScripts(TEACHERS, values.scripts);
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.teacher')}</h3>
      {candidates.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] p-5 text-ink-700 dark:text-ink-200">
          {t('register.fields.teacherAuto')}
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {candidates.map((tc) => {
            const selected = values.teacher === tc.id;
            const name = t(`teachers.list.${tc.id}.namePlain`);
            return (
              <button
                key={tc.id}
                type="button"
                onClick={() => update({ teacher: tc.id })}
                className={`flex items-center gap-4 rounded-2xl border p-3 text-start transition-all ${
                  selected
                    ? 'border-flame-500 bg-flame-500/10 shadow-flame'
                    : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08] hover:border-flame-500/40 hover:-translate-y-0.5'
                }`}
              >
                <span className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
                  <img src={tc.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </span>
                <span className="flex-1">
                  <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100">{name}</span>
                  <span className="block text-xs text-ink-600 dark:text-ink-300">
                    {tc.scripts.map((s) => t(`scripts.${s}`)).join(' · ')}
                  </span>
                </span>
                <span className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${selected ? 'bg-flame-500 text-white' : 'bg-ink-900/5 dark:bg-ink-100/10 text-ink-500'}`}>
                  {selected && <Check size={14} />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

function StepInfo({ values, update, errors }) {
  const { t, i18n } = useTranslation();
  const isAr = (i18n.language || 'ar').startsWith('ar');

  // سنوات 1960 → 2026 تنازليًا (الأحدث أعلى القائمة)
  const years = useMemo(() => {
    const arr = [];
    for (let y = 2026; y >= 1960; y--) arr.push(y);
    return arr;
  }, []);
  const months = [
    'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
  ];
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.info')}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field icon={User} label={t('register.fields.name')}  value={values.name}  onChange={(v) => update({ name: v })}  error={errors.name} />
        <Field icon={Mail} label={t('register.fields.email')} type="email" dir="ltr" value={values.email} onChange={(v) => update({ email: v })} error={errors.email} />

        <PhoneField
          code={values.phoneCode}
          number={values.phoneNumber}
          onCodeChange={(c) => update({ phoneCode: c })}
          onNumberChange={(n) => update({ phoneNumber: n })}
          error={errors.phone}
        />

        {/* دولة الإقامة — القائمة العربية ثم بقية دول العالم، مرتّبة أبجديًا */}
        <label className="block sm:col-span-2">
          <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
            {t('register.fields.residenceCountry')}
          </span>
          <div
            className={`group flex items-center gap-3 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 px-4 transition-colors ${
              errors.country ? 'border-flame-500/70' : 'border-ink-900/10 dark:border-ink-100/10 focus-within:border-flame-500'
            }`}
          >
            <Globe className="text-ink-500 group-focus-within:text-flame-500 transition-colors" size={18} />
            <select
              value={values.country}
              onChange={(e) => update({ country: e.target.value })}
              className="w-full bg-transparent py-3.5 outline-none text-ink-900 dark:text-ink-100 appearance-none"
            >
              <option value="" disabled>{t('register.fields.countryPlaceholder')}</option>
              <optgroup label={t('register.fields.arabCountries')}>
                {ARAB_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{isAr ? c.ar : c.en}</option>
                ))}
              </optgroup>
              <optgroup label={t('register.fields.restCountries')}>
                {REST_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{isAr ? c.ar : c.en}</option>
                ))}
              </optgroup>
            </select>
            <ChevronDown size={16} className="text-ink-500" />
          </div>
          {errors.country && <span className="mt-1.5 inline-block text-xs text-flame-600">{errors.country}</span>}
        </label>

        {/* تاريخ الميلاد — اليوم / الشهر / السنة (١٩٦٠–٢٠٢٦) */}
        <div className="sm:col-span-2">
          <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
            {t('register.fields.dob')}
          </span>
          <div
            className={`grid grid-cols-3 gap-2 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 px-3 py-1 transition-colors ${
              errors.birth ? 'border-flame-500/70' : 'border-ink-900/10 dark:border-ink-100/10'
            }`}
          >
            <DateSelect icon={Calendar} value={values.birthDay}   onChange={(v) => update({ birthDay: v })}   options={days}   placeholder={t('register.fields.day')} />
            <DateSelect                value={values.birthMonth} onChange={(v) => update({ birthMonth: v })} options={months.map((m, i) => ({ value: i + 1, label: m }))} placeholder={t('register.fields.month')} />
            <DateSelect                value={values.birthYear}  onChange={(v) => update({ birthYear: v })}  options={years} placeholder={t('register.fields.year')} />
          </div>
          {errors.birth && <span className="mt-1.5 inline-block text-xs text-flame-600">{errors.birth}</span>}
        </div>
      </div>
    </>
  );
}

function DateSelect({ icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="flex items-center gap-2 rounded-xl px-2">
      {Icon && <Icon size={16} className="text-ink-500 shrink-0" />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent py-3 outline-none text-ink-900 dark:text-ink-100 appearance-none text-center font-bold"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => {
          const v = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return <option key={v} value={v}>{lbl}</option>;
        })}
      </select>
    </div>
  );
}

function Field({ icon: Icon, label, type = 'text', value, onChange, error, dir, min, max }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">{label}</span>
      <div
        className={`group flex items-center gap-3 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 px-4 transition-colors ${
          error ? 'border-flame-500/70' : 'border-ink-900/10 dark:border-ink-100/10 focus-within:border-flame-500'
        }`}
      >
        <Icon className="text-ink-500 group-focus-within:text-flame-500 transition-colors" size={18} />
        <input
          type={type}
          dir={dir}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-3.5 outline-none text-ink-900 dark:text-ink-100 placeholder:text-ink-500/70"
        />
      </div>
      {error && <span className="mt-1.5 inline-block text-xs text-flame-600">{error}</span>}
    </label>
  );
}

function StepReview({ values }) {
  const { t, i18n } = useTranslation();
  const isAr = (i18n.language || 'ar').startsWith('ar');
  const teacherName = values.teacher
    ? t(`teachers.list.${values.teacher}.namePlain`)
    : t('register.fields.teacherAuto');
  const c = findCountry(values.country);

  const rows = [
    values.filter && { label: t('register.summary.filter'), value: t(`register.filters.${values.filter}.title`) },
    values.goal   && { label: t('register.summary.goal'),   value: t(`register.goals.${values.goal}.title`) },
    values.track  && { label: t('register.summary.track'),  value: t(`register.tracks.${values.track}.title`) },
    { label: t('register.summary.scripts'), value: values.scripts.map((s) => t(`scripts.${s}`)).join(' + ') || '—' },
    values.lessonsPerMonth && {
      label: t('register.summary.lessonsPerMonth'),
      value: `${values.lessonsPerMonth} ${t('register.lessonsPerMonth.unit')}`,
    },
    values.priorExperience && {
      label: t('register.summary.priorExperience'),
      value: t(`register.priorExperience.${values.priorExperience}.title`),
    },
    (values.track === 'recorded' || values.track === 'live') && {
      label: t('register.summary.teacher'), value: teacherName,
    },
    c && { label: t('register.fields.residenceCountry'), value: isAr ? c.ar : c.en },
  ].filter(Boolean);

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.steps.review')}</h3>
      <ul className="mt-6 divide-y divide-ink-900/10 dark:divide-ink-100/10 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08]">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
            <span className="text-sm font-bold text-ink-600 dark:text-ink-300">{r.label}</span>
            <span className="text-sm font-extrabold text-ink-900 dark:text-ink-100 text-end">{r.value}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-3 px-5 py-3.5">
          <span className="text-sm font-bold text-ink-600 dark:text-ink-300">{values.name}</span>
          <span className="text-sm font-bold text-ink-700 dark:text-ink-200" dir="ltr">
            {values.email} · {values.phoneCode} {values.phoneNumber}
          </span>
        </li>
      </ul>
    </>
  );
}

function Success({ name, email, reset }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="text-center py-6"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-flame-500 text-white shadow-flame"
      >
        <Check size={36} />
      </motion.span>
      <h3 className="mt-6 text-3xl font-extrabold text-ink-900 dark:text-ink-100">{t('register.successTitle')}</h3>
      <p className="mt-3 mx-auto max-w-md leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.successBody', { name, email })}
      </p>
      <button type="button" onClick={reset} className="btn-ghost mt-8">
        {t('register.anotherSubmission')}
      </button>
    </motion.div>
  );
}
