// البيانات الافتراضية للمعلمين — تُستخدم عند تعذّر الاتصال بـ admin API.
// الـ shape مطابق لما يُرجعه /api/teachers من Laravel:
//   slug, name_ar, name_en, nationality, dob, qualification, scripts,
//   student_of, awards, bio_ar, lineage, image, gallery: [{src, thumb}]
//
// المسارات تبدأ بـ "/" — تُخدَم من جذر موقع tasheeh-academy نفسه.

export const teachers = [
  {
    slug: 'ahmed-hendawy',
    name_ar: 'أحمد هنداوى',
    name_en: 'Ahmed Hendawy',
    nationality: 'مصرى',
    dob: 'مواليد ١٩٩٨',
    qualification: 'بكالوريوس الهندسة الميكانيكية — جامعة الإسكندرية — ٢٠٢١',
    scripts: ['thuluth', 'naskh'],
    student_of: ['أ. عبد الرحمن رزق'],
    awards: [
      'مكافأة بمسابقة أرسيكا فى خط النسخ عام ٢٠٢٥',
      'مكافأة فى مسابقة الفجيرة الدولية للخط العربى فى خط النسخ عام ٢٠٢٥',
      'شَرُف بكتابة الجزء التاسع عشر من القرآن الكريم للأزهر الشريف بخط النسخ ٢٠٢٢',
      'شارك فى المرحلة النهائية بمسابقة مبادرة مركز الأمير محمد بن سلمان عن خط النسخ ٢٠٢٤',
    ],
    image: '/teachers/ahmed-hendawy/portrait.jpg',
    gallery: [
      { src: '/teachers/ahmed-hendawy/works/01.jpg', thumb: '/teachers/ahmed-hendawy/works/01-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/02.jpg', thumb: '/teachers/ahmed-hendawy/works/02-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/03.jpg', thumb: '/teachers/ahmed-hendawy/works/03-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/04.jpg', thumb: '/teachers/ahmed-hendawy/works/04-thumb.jpg' },
    ],
  },
  {
    slug: 'abdulrahman-razq',
    name_ar: 'عبد الرحمن رزق',
    name_en: 'Abdulrahman Razq',
    nationality: 'مصرى',
    dob: 'مواليد ١٩٩٣',
    qualification: 'ليسانس الآداب والتربية — قسم اللغة العربية — جامعة الأزهر',
    scripts: ['thuluth', 'naskh'],
    student_of: ['أ. محمد جابر'],
    awards: [
      'مكافأة بمسابقة أرسيكا عن خطّى النسخ والثلث ٢٠١٩',
      'المركز الثالث بمسابقة مبادرة مركز الأمير محمد بن سلمان عن خط النسخ عام ٢٠٢٤',
      'مكافأة فى مسابقة الفجيرة الدولية للخط العربى عن خط النسخ ٢٠٢٥',
      'شَرُف بكتابة الجزء الرابع من القرآن الكريم للأزهر الشريف بخط النسخ ٢٠٢٣',
    ],
    image: '/teachers/abdulrahman-razq/portrait.jpg',
    gallery: [
      { src: '/teachers/abdulrahman-razq/works/01.jpg', thumb: '/teachers/abdulrahman-razq/works/01-thumb.jpg' },
      { src: '/teachers/abdulrahman-razq/works/02.jpg', thumb: '/teachers/abdulrahman-razq/works/02-thumb.jpg' },
      { src: '/teachers/abdulrahman-razq/works/03.jpg', thumb: '/teachers/abdulrahman-razq/works/03-thumb.jpg' },
      { src: '/teachers/abdulrahman-razq/works/04.jpg', thumb: '/teachers/abdulrahman-razq/works/04-thumb.jpg' },
      { src: '/teachers/abdulrahman-razq/works/05.jpg', thumb: '/teachers/abdulrahman-razq/works/05-thumb.jpg' },
    ],
  },
  {
    slug: 'omar-noor',
    name_ar: 'عمر نور',
    name_en: 'Omar Noor',
    nationality: 'مصرى',
    dob: 'مواليد ١٩٨٥',
    qualification: 'ليسانس اللغة العربية والعلوم الإسلامية — كلية دار العلوم — جامعة القاهرة',
    scripts: ['jali'],
    student_of: ['أ. أحمد فارس رزق'],
    awards: [
      'المركز الثانى فى مسابقة أساتذة المستقبل، تركيا، فرع الثلث الجلى عام ٢٠١٧',
      'مكافأة فى مسابقة إرسيكا، فرع الثلث الجلى عام ٢٠١٣',
      'مكافأتان فى مسابقة بنك البركة، تركيا عامى ٢٠١٣ و ٢٠١٧',
      'مكافأتان فى مهرجان ترنجانو بماليزيا عامى ٢٠١٥ و ٢٠١٦',
      'مكافأة فى مسابقة باليق أسر، تركيا عام ٢٠١٨',
      'مكافأة فى مسابقة أسكودار، تركيا عام ٢٠١٧',
      'المركز الثانى فى مسابقة مبادرة الأمير محمد بن سلمان للخط العربى، فرع الثلث الجلى عام ٢٠٢٤',
    ],
    image: '/teachers/omar-noor/portrait.jpg',
    gallery: [
      { src: '/teachers/omar-noor/works/01.jpg', thumb: '/teachers/omar-noor/works/01-thumb.jpg' },
      { src: '/teachers/omar-noor/works/02.jpg', thumb: '/teachers/omar-noor/works/02-thumb.jpg' },
      { src: '/teachers/omar-noor/works/03.jpg', thumb: '/teachers/omar-noor/works/03-thumb.jpg' },
    ],
  },
  {
    slug: 'mahmoud-abdullah',
    name_ar: 'محمود عبد الله',
    name_en: 'Mahmoud Abdullah',
    nationality: 'مصرى',
    dob: 'مواليد ١٩٩٦',
    qualification: 'دبلوم الخط العربى، مدرسة خليل آغا، عام ٢٠١٦',
    scripts: ['diwani'],
    student_of: ['أ. جمال محمود — الديوانى', 'أ. عبده الجمّال — النسخ والثلث'],
    awards: [
      'المركز الثانى فى خط الديوانى فى مسابقة وارث الأنبياء بالعراق عام ٢٠٢٥',
      'مكافأة فى خط الديوانى فى مسابقة الفجيرة الدولية عام ٢٠٢٢',
      'مكافأة فى خط النسخ فى مسابقة الفجيرة الدولية عام ٢٠٢٥',
      'مكافأة فى خطّى النسخ والثلث فى مسابقة أساتذة المستقبل فى تركيا عام ٢٠٢١',
      'المركز الثالث فى خط الثلث فى مسابقة جامعة الملك خالد السعودية عام ٢٠٢١',
      'المركز الثالث فى خط المحقق فى مسابقة وارث الأنبياء فى العراق عام ٢٠٢٣',
      'مكافأة فى خط الثلث العادى فى مسابقة وارث الأنبياء فى العراق عام ٢٠٢٣',
      'مكافأة فى خط النسخ فى أساتذة المستقبل عام ٢٠٢٤',
      'المشاركة فى كتابة مصحف الأزهر الشريف عام ٢٠٢٣',
      'المشاركة فى ملتقى الأزهر الشريف الدورة الثانية والثالثة',
      'المشاركة فى ملتقى الشارقة فى دورته التاسعة والعاشرة',
      'المشاركة فى كتاب «جزء عمّ» فى بيت السحيمى التابع لوزارة الثقافة المصرية عام ٢٠١٥',
    ],
    image: '/teachers/mahmoud-abdullah/portrait.jpg',
    gallery: [
      { src: '/teachers/mahmoud-abdullah/works/01.jpg', thumb: '/teachers/mahmoud-abdullah/works/01-thumb.jpg' },
    ],
  },
];

// قصص قبل/بعد — افتراضى يُستبدَل بـ /api/before-after لو متاح
export const studentProgress = [
  {
    name: 'إيمان أبو شوشة',
    country: 'سوريا',
    duration: '٥ أشهر دراسة',
    note: 'الفارق بين الكتابتين ثمانية أشهر منها خمسة أشهر فقط من الدراسة.',
    age: 26,
    script: 'naskh',
    before: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:  'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'أحمد الحمدى',
    country: 'مصر',
    duration: '٣ أشهر دراسة',
    note: 'تطوّرٌ ملحوظ فى ضبط حجم الحروف والاتصالات بعد الانتظام فى التمرين.',
    age: 31,
    script: 'thuluth',
    before: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:  'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'مريم القاسمى',
    country: 'الإمارات',
    duration: '٧ أشهر دراسة',
    note: 'انتقال طبيعى من المُفردات إلى السطر الكامل بعد إتقان الاتصالات.',
    age: 28,
    script: 'diwani',
    before: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:  'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
  },
];

// شهادات الطلاب — افتراضى يُستبدَل بـ /api/reviews لو متاح
export const studentReviews = [
  { name: 'إيمان أبو شوشة',  country: 'سوريا',    duration: '٥ أشهر', image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=900&q=80' },
  { name: 'أحمد الحمدى',     country: 'مصر',       duration: '٣ أشهر', image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80' },
  { name: 'مريم القاسمى',    country: 'الإمارات', duration: '٧ أشهر', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
  { name: 'يوسف الحربى',    country: 'السعودية', duration: '٤ أشهر', image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80' },
  { name: 'فاطمة بن قدور',  country: 'الجزائر',  duration: '٦ أشهر', image: 'https://images.unsplash.com/photo-1543269664-647b9bda4d3a?auto=format&fit=crop&w=900&q=80' },
  { name: 'عبد الله الرشيد', country: 'الكويت',   duration: '٩ أشهر', image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=900&q=80' },
];

// Per-feature image (يبقى ثابت — لا يدار من الأدمن حاليًا)
export const featurePreviews = {
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
  tips:      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
  feeding:   'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1400&q=80',
  qa:        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1400&q=80',
  feedback:  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80',
};

export const STUDENT_GUIDE_URL =
  'https://drive.google.com/file/d/1GCMMj0lN-LBke933SaoAit8N7ehKUQvm/view?usp=drive_link';
