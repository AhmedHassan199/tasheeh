// 4 teachers covering the 4 active scripts: Naskh, Thuluth, Diwani, Thuluth Jali.
// Script keys MUST match keys in src/lib/registrationRules.js so the form
// can filter teachers by chosen scripts.

export const teachers = [
  {
    id: 'abdulrahman-razq',
    name: 'الأستاذ عبد الرحمن رزق',
    nameEn: 'Abdulrahman Razq',
    scripts: ['naskh', 'thuluth'],
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ بلال البري', 'الأستاذ وسام شوكت'],
    awards: [
      'الجائزة الذهبية — مسابقة إسطنبول الدولية للخط، ٢٠٢٢',
      'إجازة في خط الثلث من مجمع الخطاطين الأتراك',
      'المركز الأول — مهرجان الشارقة للخط العربي ٢٠٢٠',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'yusuf-al-husni',
    name: 'الأستاذ يوسف الحسني',
    nameEn: 'Yusuf Al-Husni',
    scripts: ['diwani'],
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ داود بكتاش', 'الأستاذ حسن جلبي'],
    awards: [
      'إجازة في الديواني ٢٠١٨',
      'جائزة لجنة التحكيم — بينالي طهران الدولي',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1597106776019-b4ecc878c202?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'kamal-al-shami',
    name: 'الأستاذ كمال الشامي',
    nameEn: 'Kamal Al-Shami',
    scripts: ['jali'],
    image:
      'https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ غلام حسين أمير خاني'],
    awards: [
      'المركز الثاني — مسابقة الخط الجلي ٢٠٢١',
      'مدرّس معتمد — جمعية الخط العربي بدمشق',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'mohamed-al-baghdadi',
    name: 'الأستاذ محمد البغدادي',
    nameEn: 'Mohamed Al-Baghdadi',
    scripts: ['naskh', 'thuluth'],
    image:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
    studentOf: ['الأستاذ صلاح شيرزاد'],
    awards: [
      'إجازة في النسخ والثلث ٢٠١٩',
      'مشاركات في معارض دولية بالقاهرة وإسطنبول',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1597106776019-b4ecc878c202?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&q=80',
    ],
  },
];

// Vertical before/after stacks for the progress section.
// Replace src URLs with the real scans of student work when available.
export const studentProgress = [
  {
    id: 'eman',
    name: 'إيمان أبو شوشة',
    country: 'سوريا',
    age: 26,
    duration: '٥ أشهر دراسة',
    script: 'naskh',
    note: 'الفارق بين الكتابتين ثمانية أشهر منها خمسة أشهر فقط من الدراسة.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'student-2',
    name: 'الطالب أحمد الحمدي',
    country: 'مصر',
    age: 31,
    duration: '٣ أشهر دراسة',
    script: 'thuluth',
    note: 'تطورٌ ملحوظ في ضبط حجم الحروف والاتصالات بعد الانتظام في التمرين.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'student-3',
    name: 'الطالبة مريم القاسمي',
    country: 'الإمارات',
    age: 28,
    duration: '٧ أشهر دراسة',
    script: 'diwani',
    note: 'انتقال طبيعي من المُفردات إلى السطر الكامل بعد إتقان الاتصالات.',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
  },
];

// Screenshots of student messages — placeholder images now,
// the academy will replace them with the actual chat captures.
export const studentReviews = [
  {
    id: 'r1',
    name: 'إيمان أبو شوشة',
    country: 'سوريا',
    duration: '٥ أشهر',
    age: 26,
    src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'r2',
    name: 'أحمد الحمدي',
    country: 'مصر',
    duration: '٣ أشهر',
    age: 31,
    src: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'r3',
    name: 'مريم القاسمي',
    country: 'الإمارات',
    duration: '٧ أشهر',
    age: 28,
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'r4',
    name: 'يوسف الحربي',
    country: 'السعودية',
    duration: '٤ أشهر',
    age: 34,
    src: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'r5',
    name: 'فاطمة بن قدور',
    country: 'الجزائر',
    duration: '٦ أشهر',
    age: 22,
    src: 'https://images.unsplash.com/photo-1543269664-647b9bda4d3a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'r6',
    name: 'عبد الله الرشيد',
    country: 'الكويت',
    duration: '٩ أشهر',
    age: 40,
    src: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=900&q=80',
  },
];
