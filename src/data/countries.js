// قائمة دول إقامة الطلاب — العرب أولًا مرتّبين أبجديًا، ثم بقية دول العالم.
// كل عنصر: { code: ISO2, ar, en }
// نستعمل ISO2 كقيمة محفوظة (مستقرّة)، والنص بالعربية للعرض.

const ARAB = [
  { code: 'JO', ar: 'الأردن',                en: 'Jordan' },
  { code: 'AE', ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates' },
  { code: 'BH', ar: 'البحرين',               en: 'Bahrain' },
  { code: 'TN', ar: 'تونس',                  en: 'Tunisia' },
  { code: 'DZ', ar: 'الجزائر',               en: 'Algeria' },
  { code: 'KM', ar: 'جزر القمر',              en: 'Comoros' },
  { code: 'DJ', ar: 'جيبوتى',                en: 'Djibouti' },
  { code: 'SA', ar: 'السعودية',              en: 'Saudi Arabia' },
  { code: 'SD', ar: 'السودان',               en: 'Sudan' },
  { code: 'SY', ar: 'سوريا',                  en: 'Syria' },
  { code: 'SO', ar: 'الصومال',               en: 'Somalia' },
  { code: 'IQ', ar: 'العراق',                en: 'Iraq' },
  { code: 'OM', ar: 'عُمان',                  en: 'Oman' },
  { code: 'PS', ar: 'فلسطين',                en: 'Palestine' },
  { code: 'QA', ar: 'قطر',                   en: 'Qatar' },
  { code: 'KW', ar: 'الكويت',                en: 'Kuwait' },
  { code: 'LB', ar: 'لبنان',                  en: 'Lebanon' },
  { code: 'LY', ar: 'ليبيا',                  en: 'Libya' },
  { code: 'EG', ar: 'مصر',                   en: 'Egypt' },
  { code: 'MA', ar: 'المغرب',                en: 'Morocco' },
  { code: 'MR', ar: 'موريتانيا',              en: 'Mauritania' },
  { code: 'YE', ar: 'اليمن',                  en: 'Yemen' },
];

const REST = [
  { code: 'AF', ar: 'أفغانستان',            en: 'Afghanistan' },
  { code: 'AR', ar: 'الأرجنتين',             en: 'Argentina' },
  { code: 'AM', ar: 'أرمينيا',               en: 'Armenia' },
  { code: 'AU', ar: 'أستراليا',              en: 'Australia' },
  { code: 'AT', ar: 'النمسا',                en: 'Austria' },
  { code: 'AZ', ar: 'أذربيجان',             en: 'Azerbaijan' },
  { code: 'BD', ar: 'بنغلاديش',             en: 'Bangladesh' },
  { code: 'BE', ar: 'بلجيكا',                 en: 'Belgium' },
  { code: 'BR', ar: 'البرازيل',              en: 'Brazil' },
  { code: 'BG', ar: 'بلغاريا',                en: 'Bulgaria' },
  { code: 'CA', ar: 'كندا',                  en: 'Canada' },
  { code: 'TD', ar: 'تشاد',                  en: 'Chad' },
  { code: 'CL', ar: 'تشيلى',                 en: 'Chile' },
  { code: 'CN', ar: 'الصين',                 en: 'China' },
  { code: 'CO', ar: 'كولومبيا',              en: 'Colombia' },
  { code: 'CZ', ar: 'التشيك',                en: 'Czech Republic' },
  { code: 'DK', ar: 'الدنمارك',              en: 'Denmark' },
  { code: 'FI', ar: 'فنلندا',                 en: 'Finland' },
  { code: 'FR', ar: 'فرنسا',                  en: 'France' },
  { code: 'DE', ar: 'ألمانيا',                en: 'Germany' },
  { code: 'GH', ar: 'غانا',                   en: 'Ghana' },
  { code: 'GR', ar: 'اليونان',               en: 'Greece' },
  { code: 'HU', ar: 'المجر',                 en: 'Hungary' },
  { code: 'IN', ar: 'الهند',                  en: 'India' },
  { code: 'ID', ar: 'إندونيسيا',            en: 'Indonesia' },
  { code: 'IR', ar: 'إيران',                 en: 'Iran' },
  { code: 'IE', ar: 'أيرلندا',                en: 'Ireland' },
  { code: 'IT', ar: 'إيطاليا',               en: 'Italy' },
  { code: 'JP', ar: 'اليابان',                en: 'Japan' },
  { code: 'KZ', ar: 'كازاخستان',            en: 'Kazakhstan' },
  { code: 'KE', ar: 'كينيا',                 en: 'Kenya' },
  { code: 'KG', ar: 'قيرغيزستان',          en: 'Kyrgyzstan' },
  { code: 'MY', ar: 'ماليزيا',              en: 'Malaysia' },
  { code: 'MV', ar: 'جزر المالديف',         en: 'Maldives' },
  { code: 'ML', ar: 'مالى',                  en: 'Mali' },
  { code: 'MX', ar: 'المكسيك',               en: 'Mexico' },
  { code: 'NL', ar: 'هولندا',                 en: 'Netherlands' },
  { code: 'NZ', ar: 'نيوزيلندا',            en: 'New Zealand' },
  { code: 'NG', ar: 'نيجيريا',              en: 'Nigeria' },
  { code: 'NO', ar: 'النرويج',               en: 'Norway' },
  { code: 'PK', ar: 'باكستان',              en: 'Pakistan' },
  { code: 'PH', ar: 'الفلبين',              en: 'Philippines' },
  { code: 'PL', ar: 'بولندا',                en: 'Poland' },
  { code: 'PT', ar: 'البرتغال',              en: 'Portugal' },
  { code: 'RO', ar: 'رومانيا',              en: 'Romania' },
  { code: 'RU', ar: 'روسيا',                 en: 'Russia' },
  { code: 'SN', ar: 'السنغال',               en: 'Senegal' },
  { code: 'RS', ar: 'صربيا',                en: 'Serbia' },
  { code: 'SG', ar: 'سنغافورة',             en: 'Singapore' },
  { code: 'ZA', ar: 'جنوب أفريقيا',         en: 'South Africa' },
  { code: 'KR', ar: 'كوريا الجنوبية',       en: 'South Korea' },
  { code: 'ES', ar: 'إسبانيا',              en: 'Spain' },
  { code: 'LK', ar: 'سريلانكا',              en: 'Sri Lanka' },
  { code: 'SE', ar: 'السويد',                en: 'Sweden' },
  { code: 'CH', ar: 'سويسرا',                 en: 'Switzerland' },
  { code: 'TJ', ar: 'طاجيكستان',           en: 'Tajikistan' },
  { code: 'TZ', ar: 'تنزانيا',              en: 'Tanzania' },
  { code: 'TH', ar: 'تايلاند',              en: 'Thailand' },
  { code: 'TR', ar: 'تركيا',                en: 'Turkey' },
  { code: 'TM', ar: 'تركمانستان',          en: 'Turkmenistan' },
  { code: 'UG', ar: 'أوغندا',                en: 'Uganda' },
  { code: 'UA', ar: 'أوكرانيا',             en: 'Ukraine' },
  { code: 'GB', ar: 'المملكة المتحدة',       en: 'United Kingdom' },
  { code: 'US', ar: 'الولايات المتحدة',      en: 'United States' },
  { code: 'UZ', ar: 'أوزبكستان',           en: 'Uzbekistan' },
  { code: 'VN', ar: 'فيتنام',               en: 'Vietnam' },
];

// رتّب أبجديًا حسب الاسم العربى
const arCompare = (a, b) => a.ar.localeCompare(b.ar, 'ar');

export const ARAB_COUNTRIES = [...ARAB].sort(arCompare);
export const REST_COUNTRIES = [...REST].sort(arCompare);
export const ALL_COUNTRIES  = [...ARAB_COUNTRIES, ...REST_COUNTRIES];

/** ابحث عن دولة بالكود. */
export function findCountry(code) {
  return ALL_COUNTRIES.find((c) => c.code === code);
}
