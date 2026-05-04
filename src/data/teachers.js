// Dummy data — replace photos & gallery with real assets when available.
// Note: only Abdulrahman Razq is referenced by name in the provided guide; the
// rest are placeholder personas designed to showcase the UI.

export const teachers = [
  {
    id: 'abdulrahman-razq',
    name: 'الأستاذ عبد الرحمن رزق',
    latinName: 'Abdulrahman Razq',
    styles: ['النسخ', 'الثلث'],
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ بلال البري', 'الأستاذ وسام شوكت'],
    awards: [
      'الجائزة الذهبية — مسابقة إسطنبول الدولية للخط، ٢٠٢٢',
      'إجازة في خط الثلث من مجمع الخطاطين الأتراك',
      'المركز الأول — مهرجان الشارقة للخط العربي ٢٠٢٠',
    ],
    bio:
      'يُركّز في تدريسه على بناء الذاكرة البصرية، وضبط النسب، وإتقان مسكة القلم.',
    gallery: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'yusuf-al-husni',
    name: 'الأستاذ يوسف الحسني',
    latinName: 'Yusuf Al-Husni',
    styles: ['الديواني', 'الديواني الجلي'],
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ داود بكتاش', 'الأستاذ حسن جلبي'],
    awards: [
      'إجازة في الديواني والديواني الجلي ٢٠١٨',
      'جائزة لجنة التحكيم — بينالي طهران الدولي',
    ],
    bio:
      'يهتم بدراسة الاتصالات وضبط الانحناءات الحرة في الخط الديواني.',
    gallery: [
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1597106776019-b4ecc878c202?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'kamal-al-shami',
    name: 'الأستاذ كمال الشامي',
    latinName: 'Kamal Al-Shami',
    styles: ['الفارسي', 'النستعليق'],
    image:
      'https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ غلام حسين أمير خاني'],
    awards: [
      'المركز الثاني — مسابقة الإمام علي للخط الفارسي ٢٠٢١',
      'مدرّس معتمد — جمعية الخط العربي بدمشق',
    ],
    bio:
      'متخصص في الخط الفارسي بأنواعه، يهتم بنقل أسرار القلم المُدوَّر للطالب.',
    gallery: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'mohamed-al-baghdadi',
    name: 'الأستاذ محمد البغدادي',
    latinName: 'Mohamed Al-Baghdadi',
    styles: ['الكوفي', 'الكوفي المربع'],
    image:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ صلاح شيرزاد'],
    awards: [
      'جائزة الخط الكوفي المعاصر — الدوحة ٢٠١٩',
      'مشاركات في معارض دولية بالقاهرة وإسطنبول وباريس',
    ],
    bio:
      'يُدرّس الكوفي بأنواعه التقليدية والمربعة بأسلوبٍ هندسيٍّ منضبط.',
    gallery: [
      'https://images.unsplash.com/photo-1597106776019-b4ecc878c202?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'omar-tahir',
    name: 'الأستاذ عمر طاهر',
    latinName: 'Omar Tahir',
    styles: ['الرقعة', 'النسخ'],
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ بلال البري'],
    awards: [
      'إجازة في الرقعة ٢٠٢٠',
      'مدرّس معتمد لدى أكاديمية تصحيح',
    ],
    bio:
      'يبدأ بالطالب من الصفر، يُعلّمه الجلسة والمسكة قبل أن يخطّ أول حرف.',
    gallery: [
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'sara-al-andalusi',
    name: 'الأستاذة سارة الأندلسي',
    latinName: 'Sara Al-Andalusi',
    styles: ['المغربي', 'الأندلسي'],
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ بلعيد حميدي'],
    awards: [
      'المركز الأول — معرض فاس للخط المغربي ٢٠٢١',
      'مشاركة بمعرض الخط النسوي بالرباط',
    ],
    bio:
      'تتميّز كتاباتها بدقّة الإيقاع وسلاسة الانتقالات في المخطوطات الأندلسية.',
    gallery: [
      'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

// Student "before / after" progress — modeled on the academy's
// social posts (تطور المشتركين). Replace src URLs with the real
// scans of student work when available.
export const studentProgress = [
  {
    id: 'eman',
    name: 'إيمان أبو شوشة',
    country: 'سوريا',
    style: 'النسخ',
    duration: '٥ أشهر دراسة',
    note: 'الفارق بين الكتابتين ثمانية أشهر منها خمسة أشهر فقط من الدراسة.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    after:
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'student-2',
    name: 'الطالب أحمد الحمدي',
    country: 'مصر',
    style: 'الرقعة',
    duration: '٣ أشهر دراسة',
    note: 'تطورٌ ملحوظ في ضبط حجم الحروف والاتصالات بعد الانتظام في التمرين.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    after:
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'student-3',
    name: 'الطالبة مريم القاسمي',
    country: 'الإمارات',
    style: 'الديواني',
    duration: '٧ أشهر دراسة',
    note: 'انتقال طبيعي من المُفردات إلى السطر الكامل بعد إتقان الاتصالات.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    after:
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80',
  },
];

export const academyStats = [
  { value: '٢٠٢٢', label: 'انطلقت الأكاديمية' },
  { value: '+٦', label: 'خطوط متخصصة' },
  { value: '+٢٠', label: 'دولة حول العالم' },
  { value: '٤', label: 'دروس شهريًا' },
];
