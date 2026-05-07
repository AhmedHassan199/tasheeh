# أكاديمية تصحيح · Tasheeh Calligraphy Academy

موقع تفاعلى احترافى لأكاديمية تصحيح للخط العربى. RTL-first، يدعم العربية
والإنجليزية، مع وضع داكن، فورم تسجيل بخريطة تفاعلية، ومعرض Lightbox
بدعم zoom + pinch.

## التشغيل المحلى

```bash
cd tasheeh-academy
npm install
cp .env.example .env   # ضع رابط Apps Script هنا (اختيارى)
npm run dev
```

افتح <http://localhost:5173>.

## ✨ المميزات

- **هوية بصرية** مستخرجة من اللوجو: برتقالى `#F44E1A` + كريمى `#F5EDE0`
- **خط واحد فقط:** Cairo بأوزان 400 / 500 / 700 / 800 / 900
- **فيديو الهوية** الخاص بالأكاديمية مدمج بـ feathered mask (بدون إطار مربّع)
- **i18n عربى/إنجليزى** مع تبديل dir تلقائى ومتابعة اللغة فى localStorage
- **History API** لكل المودالات: زرار الرجوع على الموبايل بيقفل المودال بدل الخروج من الموقع
- **Mobile Nav** بـ pill rail أفقى ظاهر دايمًا (مفيش hamburger يخبّى الكل)
- **Lightbox** بـ pinch-zoom على لوحات الأساتذة والـ before/after والـ reviews
- **فورم خريطة تفاعلية** بستّ خطوات، state machine، وقواعد صارمة على الخطوط
- **Google Apps Script** integration (مجانى، بدون backend) لاستلام التسجيلات على Sheet + إيميل تنبيه

## 🗂️ هيكل المشروع

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── context/ThemeContext.jsx        ← light/dark
├── i18n/
│   ├── index.js                    ← react-i18next config
│   └── locales/{ar,en}.json
├── hooks/
│   ├── useDirection.js             ← html dir/lang sync
│   └── useModalHistory.js          ← back-button closes modal
├── lib/
│   └── registrationRules.js        ← script combos + teacher filter
├── data/
│   └── teachers.js                 ← teachers + studentProgress + studentReviews
└── components/
    ├── Navbar.jsx                  ← sticky + pill rail mobile nav
    ├── HeroSection.jsx             ← title, slogan, video, 3-stat strip
    ├── InstructorsSection.jsx
    ├── TeacherCard.jsx
    ├── TeacherModal.jsx            ← bio + lightbox + register CTA
    ├── AboutSection.jsx            ← pillars + animated repetition highlight
    ├── StudyMechanism.jsx          ← 4 services + modals
    ├── BeforeAfter.jsx             ← vertical stack + lightbox
    ├── StudentReviews.jsx          ← grid + lightbox
    ├── RegistrationForm.jsx        ← multi-step flow
    ├── Footer.jsx                  ← email + social icons only
    ├── Logo.jsx                    ← uses /logo.jpg
    ├── ThemeToggle.jsx
    ├── LanguageToggle.jsx
    ├── RichText.jsx                ← inline <accent>/<br/> renderer
    └── Ornament.jsx                ← brand diamond+line motif
```

## 🧠 قواعد فورم التسجيل

نُدرّس **٤ خطوط** فقط: النسخ، الثلث، الديوانى، الثلث الجلى.

- **حد أقصى ٢ خطوط** (٨ دروس / شهر)
- **الجمع المسموح:** (نسخ + ثلث) أو (ديوانى + رقعة "قريبًا")
- **الثلث الجلى يُدرس منفردًا** — لا يمكن جمع أى خط آخر معه
- **خط الرقعة قريبًا** — مُعطّل برمجيًا حاليًا

كل القواعد فى [src/lib/registrationRules.js](src/lib/registrationRules.js)
كـ pure functions قابلة للاختبار.

## 🔌 الربط بـ Google Sheets (Apps Script)

السكربت جاهز فى [apps-script/Code.gs](apps-script/Code.gs).

### خطوات الـ Deploy

1. **افتح Google Sheet** جديد للأكاديمية
2. من القائمة العلوية: **Extensions → Apps Script**
3. **امسح أى كود موجود** والصق محتوى `apps-script/Code.gs`
4. غيّر `ACADEMY_EMAIL` لو محتاج
5. اضغط 💾 Save
6. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. اضغط Deploy → امنح الصلاحيات → انسخ الـ **Web app URL** اللى ينتهى بـ `/exec`
8. ضع الرابط فى ملف `.env` فى جذر المشروع:
   ```
   VITE_REGISTRATION_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
   ```
9. أعد تشغيل `npm run dev` (Vite بيقرا الـ env vars عند الإقلاع فقط)

عند أى تسجيل جديد:
- الصف يُضاف للـ Sheet اسمها "Registrations"
- إيميل HTML بيوصل لـ `tasheeh.online@gmail.com` فيه كل التفاصيل

> لو ما حطّتش الـ URL، الفورم يشتغل فى **demo mode** ويعرض رسالة النجاح من غير ما يبعت
> فى أى مكان.

## 🌐 i18n

النصوص فى [src/i18n/locales/ar.json](src/i18n/locales/ar.json) و
[en.json](src/i18n/locales/en.json). إضافة لغة جديدة = ملف JSON جديد +
تسجيله فى [src/i18n/index.js](src/i18n/index.js).

العلامات `<accent>...</accent>` و `<br/>` تتحوّل لـ React nodes داخل
نصوص الترجمة عبر [RichText.jsx](src/components/RichText.jsx).

## 🎨 الأصول الحقيقية

استبدل الصور placeholder بالأصول الحقيقية:

- `public/logo.jpg` ← اللوجو (موجود)
- `public/tasheeh.mp4` ← فيديو الهوية (موجود)
- صور الأساتذة → `src/data/teachers.js`
- صور قبل/بعد → نفس الملف، حقل `studentProgress`
- screenshots رسائل الطلاب → نفس الملف، حقل `studentReviews`

## 📦 Tech stack

- React 18 + Vite 5
- Tailwind CSS 3 (custom theme، dark mode بـ class)
- Framer Motion 11
- react-i18next + i18next + i18next-browser-languagedetector
- react-hook-form (form state pieces)
- yet-another-react-lightbox + Zoom plugin
- Lucide React icons
- clsx (conditional classes)
