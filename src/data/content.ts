import { WoxsenSchool } from '../types';

export const WOXSEN_SCHOOLS: WoxsenSchool[] = [
  'School of Technology',
  'School of Business',
  'School of Sciences',
  'School of Law',
  'School of Art & Design',
  'School of Architecture & Planning',
  'School of Liberal Arts & Humanities',
];

export const EVENT_DETAILS = {
  edition: 'Edition 3.0',
  year: '2026',
  date: 'Tuesday, 6 Oct 2026',
  time: '3:00 PM IST (reporting 2:30 PM)',
  venue: 'Lecture Theater 1 (LT1), Woxsen University, Hyderabad',
  organizer: 'Center of Talent Development (COTD)',
  admission: 'Free · Open to all enrolled Woxsen students',
  metaLine: 'Tue, 6 Oct 2026 · 3:00 PM IST · LT1, Woxsen University, Hyderabad',
};

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Meet your team',
    description: 'Get placed with students from other schools: coders, designers, strategists, architects, and legal minds.',
  },
  {
    number: '02',
    title: 'Build with AI',
    description: "Use Gemini and Google's AI tools to shape your idea fast.",
  },
  {
    number: '03',
    title: 'Make it real',
    description: 'Turn your idea into a working demo and test whether it actually solves the problem.',
  },
  {
    number: '04',
    title: 'Pitch it live',
    description: "Present to a jury of Woxsen deans and industry innovators. Top teams are felicitated.",
  },
];

export const OUTCOME_CARDS = [
  {
    index: '01',
    title: 'Certificate of Merit',
    description: 'Official recognition from the Center of Talent Development, Woxsen University.',
  },
  {
    index: '02',
    title: 'Google Developer Certificate',
    description: "Issued by Google Developer Community for hands-on work with Google's AI tools.",
  },
  {
    index: '03',
    title: 'Friends across seven schools',
    description: 'Work alongside students from Technology, Business, Design, Architecture, Sciences, Law, and Liberal Arts.',
  },
  {
    index: '04',
    title: 'A working prototype',
    description: "Build it with your team and pitch it live to Woxsen's deans and industry innovators.",
  },
];

export const PARTNERS_LIST = [
  {
    role: 'Main Organiser',
    name: 'Center of Talent Development (COTD)',
    description: "Woxsen's Center of Talent Development, organiser of Skill Café.",
    logo: '/assets/logos/cotd-logo.png',
  },
  {
    role: 'Technology Partner',
    name: 'Google',
    description: "Teams build with Gemini and Google's AI and cloud tools.",
    logo: '/assets/logos/google-logo.svg',
  },
  {
    role: 'Student Innovation Partner',
    name: 'Ideate Club',
    description: "Woxsen's student innovation club, supporting design sprints and prototype pitches.",
    logo: '/assets/logos/ideate-logo.png',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Who can join?',
    answer: 'Any enrolled student from all 7 Woxsen schools.',
  },
  {
    question: 'Does it cost anything?',
    answer: "No, it's free.",
  },
  {
    question: 'Do I need a team?',
    answer: "No. Register on your own and you'll be placed in a team with students from other schools.",
  },
  {
    question: 'When should I arrive?',
    answer: 'Reporting is at 2:30 PM. The event starts at 3:00 PM in LT1.',
  },
  {
    question: 'What happens after I register?',
    answer: "You'll get an invite to the participants' WhatsApp group right away.",
  },
];
