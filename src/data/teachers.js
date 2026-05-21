// All localised text (names, info-box bullets, awards, notes) lives in
// src/i18n/locales/{ar,en}.json under matching ID keys, e.g.
//   teachers.list[id].namePlain | nationality | dob | qualification | studentOf | awards
//   beforeAfter.list[id].name | duration | note | country
//   reviews.list[id].name | country | duration
// This file holds only non-localised fields: scripts, image URLs, ages.

// Image assets are served locally from public/teachers/{id}/
//   portrait.jpg            — instructor portrait (resized to 1200px)
//   works/NN.jpg            — high-resolution artwork (4500px max — for Lightbox deep zoom)
//   works/NN-thumb.jpg      — 800px thumbnail (for the gallery grid)

export const teachers = [
  {
    id: 'ahmed-hendawy',
    scripts: ['thuluth', 'naskh'],
    image: '/teachers/ahmed-hendawy/portrait.jpg',
    gallery: [
      { src: '/teachers/ahmed-hendawy/works/01.jpg', thumb: '/teachers/ahmed-hendawy/works/01-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/02.jpg', thumb: '/teachers/ahmed-hendawy/works/02-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/03.jpg', thumb: '/teachers/ahmed-hendawy/works/03-thumb.jpg' },
      { src: '/teachers/ahmed-hendawy/works/04.jpg', thumb: '/teachers/ahmed-hendawy/works/04-thumb.jpg' },
    ],
  },
  {
    id: 'abdulrahman-razq',
    scripts: ['thuluth', 'naskh'],
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
    id: 'omar-noor',
    scripts: ['jali'],
    image: '/teachers/omar-noor/portrait.jpg',
    gallery: [
      { src: '/teachers/omar-noor/works/01.jpg', thumb: '/teachers/omar-noor/works/01-thumb.jpg' },
      { src: '/teachers/omar-noor/works/02.jpg', thumb: '/teachers/omar-noor/works/02-thumb.jpg' },
      { src: '/teachers/omar-noor/works/03.jpg', thumb: '/teachers/omar-noor/works/03-thumb.jpg' },
    ],
  },
  {
    id: 'mahmoud-abdullah',
    scripts: ['diwani'],
    image: '/teachers/mahmoud-abdullah/portrait.jpg',
    gallery: [
      { src: '/teachers/mahmoud-abdullah/works/01.jpg', thumb: '/teachers/mahmoud-abdullah/works/01-thumb.jpg' },
    ],
  },
];

export const studentProgress = [
  {
    id: 'eman',
    age: 26,
    script: 'naskh',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'student-2',
    age: 31,
    script: 'thuluth',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'student-3',
    age: 28,
    script: 'diwani',
    before:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    after:
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
  },
];

export const studentReviews = [
  { id: 'r1', age: 26, src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=900&q=80' },
  { id: 'r2', age: 31, src: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80' },
  { id: 'r3', age: 28, src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
  { id: 'r4', age: 34, src: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80' },
  { id: 'r5', age: 22, src: 'https://images.unsplash.com/photo-1543269664-647b9bda4d3a?auto=format&fit=crop&w=900&q=80' },
  { id: 'r6', age: 40, src: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=900&q=80' },
];

// Per-feature image used in the "What sets us apart" preview area.
// Keys must match feature ids in i18n -> features.items.*
export const featurePreviews = {
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
  tips:      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
  feeding:   'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1400&q=80',
  qa:        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1400&q=80',
  feedback:  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80',
};

// Public Drive link to the Student Guide PDF — wired into the Mechanism CTA.
export const STUDENT_GUIDE_URL =
  'https://drive.google.com/file/d/1GCMMj0lN-LBke933SaoAit8N7ehKUQvm/view?usp=drive_link';
