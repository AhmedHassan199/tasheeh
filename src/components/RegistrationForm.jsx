import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ArrowLeft, Check, Loader2, User, Mail,
  Globe, Cake, Sparkles, Mic, Video, Zap, Sprout, AlertTriangle,
  Target, Heart, Award, Hourglass, Rocket, TrendingUp, Pen, Palette,
  ThumbsUp, ThumbsDown, Lightbulb,
} from 'lucide-react';
import { teachers as TEACHERS } from '../data/teachers.js';
import { canAddScript, teachersForScripts, visibleScriptsFor } from '../lib/registrationRules.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { PhoneField } from './PhoneField.jsx';

const ENDPOINT = import.meta.env.VITE_REGISTRATION_ENDPOINT || '';

const TRACK_IDS = ['recorded', 'live', 'intensive', 'foundation'];
const TRACK_ICONS = { recorded: Mic, live: Video, intensive: Zap, foundation: Sprout };

// 6 goals → 3 paths (A long-term, B intensive, C foundation)
const GOALS = [
  { id: 'scratch',      icon: Pen,         path: 'C' },
  { id: 'hobby',        icon: Heart,       path: 'C' },
  { id: 'master',       icon: Target,      path: 'A' },
  { id: 'ijazah',       icon: Award,       path: 'A' },
  { id: 'fast',         icon: Rocket,      path: 'B' },
  { id: 'quickImprove', icon: TrendingUp,  path: 'B' },
];

const PATH_TO_TRACKS = {
  A: ['recorded', 'live'],   // long-term — student picks recorded vs live
  B: ['intensive'],          // intensive — single track
  C: ['foundation'],         // foundation — single track
};

// Step machine — derived from current values rather than hard-coded indexes.
function buildSteps(values) {
  const steps = ['filter'];
  if (values.filter === 'art') steps.push('goal');
  // Path A goes through commitment screen; if they say "no", we redirect to B.
  if (values.path === 'A') steps.push('commitment');
  // Path A still needs to choose recorded vs live; B and C are auto-set.
  if (values.path === 'A') steps.push('track');
  steps.push('scripts');
  if (values.track === 'recorded' || values.track === 'live') steps.push('teacher');
  steps.push('info', 'review');
  return steps;
}

const initialValues = {
  filter: '',           // 'regular' | 'art'
  goal: '',             // GOALS[].id
  path: '',             // 'A' | 'B' | 'C'
  commitment: '',       // 'yes' | 'no'
  track: '',            // TRACK_IDS
  scripts: [],
  teacher: '',
  name: '',
  email: '',
  phoneCode: '+20',
  phoneNumber: '',
  country: '',
  age: '',
};

export const RegistrationForm = forwardRef(function RegistrationForm(_props, ref) {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error

  const steps = useMemo(() => buildSteps(values), [values.filter, values.path, values.track]);
  const currentStep = steps[stepIdx];
  const totalSteps = steps.length;

  useImperativeHandle(ref, () => ({
    presetTeacher(teacherId) {
      const teacher = TEACHERS.find((tt) => tt.id === teacherId);
      const next = {
        ...values,
        filter: 'art',
        path: 'A',
        track: values.track || 'recorded',
        scripts: values.scripts.length ? values.scripts : (teacher?.scripts.slice(0, 1) ?? []),
        teacher: teacherId,
        commitment: 'yes',
      };
      setValues(next);
      const nextSteps = buildSteps(next);
      setStepIdx(nextSteps.indexOf('info'));
    },
    presetService(serviceId) {
      if (!TRACK_IDS.includes(serviceId)) return;
      const path = serviceId === 'foundation' ? 'C' :
                   serviceId === 'intensive'  ? 'B' : 'A';
      const next = { ...values, filter: 'art', path, track: serviceId };
      if (path === 'A') next.commitment = 'yes';
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
    const payload = {
      filter: values.filter,
      goal: values.goal,
      path: values.path,
      commitment: values.commitment,
      track: values.track,
      scripts: values.scripts,
      teacher: values.teacher,
      name: values.name,
      email: values.email,
      phone: `${values.phoneCode} ${values.phoneNumber}`.trim(),
      country: values.country,
      age: values.age,
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
    <section id="register" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
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
            <div className="relative rounded-[32px] border border-ink-900/10 dark:border-ink-100/10 bg-paper/90 dark:bg-[#150B07]/85 p-6 sm:p-9 shadow-soft backdrop-blur-md">
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
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-ink-600 dark:text-ink-300">
                        {t('register.step')} {stepIdx + 1} {t('register.of')} {totalSteps}
                      </span>
                      <span className="text-sm font-bold text-flame-600 dark:text-flame-400">
                        {t(`register.steps.${currentStep}`)}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-ink-100/10">
                      <motion.span
                        className="block h-full bg-flame-500"
                        animate={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    <div className="mt-7 min-h-[280px]">
                      {currentStep === 'filter'     && <StepFilter     values={values} update={update} />}
                      {currentStep === 'goal'       && <StepGoal       values={values} update={update} />}
                      {currentStep === 'commitment' && <StepCommitment values={values} update={update} />}
                      {currentStep === 'track'      && <StepTrack      values={values} update={update} />}
                      {currentStep === 'scripts'    && (
                        <StepScripts values={values} update={update} error={errors.scripts} />
                      )}
                      {currentStep === 'teacher'    && <StepTeacher    values={values} update={update} />}
                      {currentStep === 'info'       && (
                        <StepInfo values={values} update={update} errors={errors} />
                      )}
                      {currentStep === 'review'     && <StepReview values={values} />}
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

// ───── helpers ─────
function canAdvance(step, v) {
  switch (step) {
    case 'filter':     return !!v.filter;
    case 'goal':       return !!v.goal;
    case 'commitment': return !!v.commitment;
    case 'track':      return !!v.track;
    case 'scripts':    return v.scripts.length > 0;
    case 'teacher':    return !!v.teacher;
    case 'info':       return v.name && v.email && v.phoneNumber && v.country && v.age;
    case 'review':     return true;
    default:           return false;
  }
}

function validateStep(step, v, t) {
  const e = {};
  if (step === 'info') {
    if (!v.name || v.name.trim().length < 3) e.name = t('register.errors.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) e.email = t('register.errors.email');
    if (!/^[\d\s-]{6,}$/.test(v.phoneNumber || '')) e.phone = t('register.errors.phone');
    if (!v.country || v.country.trim().length < 2) e.country = t('register.errors.country');
    const age = parseInt(v.age, 10);
    if (Number.isNaN(age) || age < 7 || age > 99) e.age = t('register.errors.age');
  }
  if (step === 'scripts' && v.scripts.length === 0) e.scripts = t('register.errors.scriptsRequired');
  return e;
}

// ───── reusable choice card ─────
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

// ───── steps ─────
function StepFilter({ values, update }) {
  const { t } = useTranslation();
  const pickRegular = () =>
    update({ filter: 'regular', path: 'C', track: 'foundation', goal: 'scratch', scripts: [], teacher: '' });
  const pickArt = () =>
    update({ filter: 'art', path: '', track: '', goal: '', scripts: [], teacher: '' });

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.filter')}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ChoiceCard
          icon={Pen}
          title={t('register.filters.regular.title')}
          desc={t('register.filters.regular.desc')}
          active={values.filter === 'regular'}
          onClick={pickRegular}
        />
        <ChoiceCard
          icon={Palette}
          title={t('register.filters.art.title')}
          desc={t('register.filters.art.desc')}
          active={values.filter === 'art'}
          onClick={pickArt}
        />
      </div>

      {/* Friendly note when "regular handwriting" is picked — we route them to Foundation */}
      {values.filter === 'regular' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5 rounded-2xl border border-flame-500/40 bg-flame-500/10 p-4"
        >
          <p className="text-sm font-extrabold text-flame-700 dark:text-flame-300">
            {t('register.filterRedirect.title')}
          </p>
          <p className="mt-1 text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
            {t('register.filterRedirect.body')}
          </p>
        </motion.div>
      )}
    </>
  );
}

function StepGoal({ values, update }) {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.goal')}
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {GOALS.map((g) => {
          const active = values.goal === g.id;
          return (
            <ChoiceCard
              key={g.id}
              icon={g.icon}
              title={t(`register.goals.${g.id}.title`)}
              desc={t(`register.goals.${g.id}.desc`)}
              active={active}
              onClick={() => {
                const path = g.path;
                const track =
                  path === 'B' ? 'intensive' :
                  path === 'C' ? 'foundation' : '';
                update({
                  goal: g.id,
                  path,
                  track,
                  scripts: [],
                  teacher: '',
                  // Reset commitment unless we're staying on path A
                  commitment: path === 'A' ? values.commitment : '',
                });
              }}
            />
          );
        })}
      </div>
    </>
  );
}

function StepCommitment({ values, update }) {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.commitment')}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.commitment.question')}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ChoiceCard
          icon={ThumbsUp}
          title={t('register.commitment.yes.title')}
          desc={t('register.commitment.yes.desc')}
          active={values.commitment === 'yes'}
          onClick={() => update({ commitment: 'yes', path: 'A', track: '' })}
        />
        <ChoiceCard
          icon={ThumbsDown}
          title={t('register.commitment.no.title')}
          desc={t('register.commitment.no.desc')}
          active={values.commitment === 'no'}
          onClick={() => update({ commitment: 'no', path: 'B', track: 'intensive' })}
        />
      </div>

      {/* Smart suggestion banner when the user can't commit */}
      {values.commitment === 'no' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-flame-500/40 bg-flame-500/10 p-4"
        >
          <Lightbulb className="mt-0.5 shrink-0 text-flame-600 dark:text-flame-400" size={18} />
          <div>
            <p className="text-sm font-extrabold text-flame-700 dark:text-flame-300">
              {t('register.commitment.switchTitle')}
            </p>
            <p className="mt-1 text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
              {t('register.commitment.switchBody')}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}

function StepTrack({ values, update }) {
  const { t } = useTranslation();
  // Path A only — pick Recorded vs Live
  const tracks = PATH_TO_TRACKS[values.path] || [];
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.track')}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {tracks.map((id) => {
          const Icon = TRACK_ICONS[id];
          return (
            <ChoiceCard
              key={id}
              icon={Icon}
              title={t(`register.tracks.${id}.title`)}
              desc={t(`register.tracks.${id}.desc`)}
              active={values.track === id}
              onClick={() => update({ track: id, teacher: '' })}
            />
          );
        })}
      </div>
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
      update({ scripts: values.scripts.filter((s) => s !== id), teacher: '' });
      setHint('');
      return;
    }
    const verdict = canAddScript(values.scripts, id, values.track);
    if (!verdict.ok) {
      setHint(t(`register.ruleErrors.${verdict.reason}`));
      return;
    }
    // Foundation = single pick: replace selection
    const nextScripts = isFoundation ? [id] : [...values.scripts, id];
    update({ scripts: nextScripts, teacher: '' });
    setHint('');
  };

  const lessons = values.scripts.length * 4;

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.scripts')}
      </h3>
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
              <span
                className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${
                  selected ? 'bg-flame-500 text-white' : 'bg-ink-900/5 dark:bg-ink-100/10 text-ink-500'
                }`}
              >
                {selected && <Check size={14} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-flame-500 text-white px-3 py-1.5 text-xs font-extrabold shadow-flame">
          {t('register.lessonsCount', { count: lessons })}
        </span>
        {values.scripts.length > 0 && (
          <span className="text-sm text-ink-700 dark:text-ink-200">
            {t('register.selected')}: {values.scripts.map((s) => t(`scripts.${s}`)).join(' + ')}
          </span>
        )}
      </div>

      {(hint || error) && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-flame-500/40 bg-flame-500/10 px-4 py-2.5 text-sm text-flame-700 dark:text-flame-300">
          <AlertTriangle size={14} />
          {hint || error}
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
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.teacher')}
      </h3>
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
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${
                    selected ? 'bg-flame-500 text-white' : 'bg-ink-900/5 dark:bg-ink-100/10 text-ink-500'
                  }`}
                >
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
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.info')}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field icon={User}  label={t('register.fields.name')}    value={values.name}    onChange={(v) => update({ name: v })}    error={errors.name} />
        <Field icon={Mail}  label={t('register.fields.email')}   type="email" dir="ltr" value={values.email}   onChange={(v) => update({ email: v })}   error={errors.email} />

        <PhoneField
          code={values.phoneCode}
          number={values.phoneNumber}
          onCodeChange={(c) => update({ phoneCode: c })}
          onNumberChange={(n) => update({ phoneNumber: n })}
          error={errors.phone}
        />

        <Field icon={Globe} label={t('register.fields.country')} value={values.country} onChange={(v) => update({ country: v })} error={errors.country} />
        <Field icon={Cake}  label={t('register.fields.age')}     type="number" min={7} max={99} value={values.age} onChange={(v) => update({ age: v })} error={errors.age} />
      </div>
    </>
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
  const { t } = useTranslation();
  const teacherName = values.teacher
    ? t(`teachers.list.${values.teacher}.namePlain`)
    : t('register.fields.teacherAuto');

  const rows = [
    values.filter && { label: t('register.summary.filter'),  value: t(`register.filters.${values.filter}.title`) },
    values.goal   && { label: t('register.summary.goal'),    value: t(`register.goals.${values.goal}.title`) },
    values.track  && { label: t('register.summary.track'),   value: t(`register.tracks.${values.track}.title`) },
    { label: t('register.summary.scripts'), value: values.scripts.map((s) => t(`scripts.${s}`)).join(' + ') || '—' },
    (values.track === 'recorded' || values.track === 'live') && {
      label: t('register.summary.teacher'), value: teacherName,
    },
  ].filter(Boolean);

  return (
    <>
      <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.steps.review')}
      </h3>
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
      <h3 className="mt-6 text-3xl font-extrabold text-ink-900 dark:text-ink-100">
        {t('register.successTitle')}
      </h3>
      <p className="mt-3 mx-auto max-w-md leading-relaxed text-ink-700 dark:text-ink-200">
        {t('register.successBody', { name, email })}
      </p>
      <button type="button" onClick={reset} className="btn-ghost mt-8">
        {t('register.anotherSubmission')}
      </button>
    </motion.div>
  );
}

void Hourglass; // kept for icon search; not used currently
