import { Notification } from '@/types';

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
// Replace SHEET_ID with your published Google Sheet ID
// The sheet must be published to web: File → Share → Publish to web → CSV
// Column order must match: ID, Title, Slug, Category, Department, Publish Date,
// Last Date, Overview, Important Dates, Application Fee, Age Limit, Eligibility,
// Vacancy Details, Selection Process, Exam Pattern, Syllabus, Official Notification Link,
// Apply Link, Official Website Link, Admit Card Link, Result Link, Status, Featured

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '';

// Supports both published CSV URLs (2PACX-...) and regular Sheet IDs
const SHEET_URL = SHEET_ID.startsWith('2PACX')
  ? `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=0&single=true&output=csv`
  : SHEET_ID
    ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`
    : '';

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim()); current = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(current.trim()); rows.push(row); row = []; current = '';
    } else {
      current += char;
    }
  }
  if (current || row.length) { row.push(current.trim()); rows.push(row); }
  return rows;
}

function rowToNotification(row: string[]): Notification {
  return {
    id: row[0] || '',
    title: row[1] || '',
    slug: row[2] || '',
    category: (row[3] as Notification['category']) || 'jobs',
    department: row[4] || '',
    publishDate: row[5] || '',
    lastDate: row[6] || '',
    overview: row[7] || '',
    importantDates: row[8] || '',
    applicationFee: row[9] || '',
    ageLimit: row[10] || '',
    eligibility: row[11] || '',
    vacancyDetails: row[12] || '',
    selectionProcess: row[13] || '',
    examPattern: row[14] || '',
    syllabusContent: row[15] || '',
    officialNotificationLink: row[16] || '',
    applyLink: row[17] || '',
    officialWebsiteLink: row[18] || '',
    admitCardLink: row[19] || '',
    resultLink: row[20] || '',
    status: (row[21] as Notification['status']) || 'active',
    featured: row[22]?.toLowerCase() === 'true' || row[22] === '1',
  };
}

export async function fetchAllNotifications(): Promise<Notification[]> {
  if (!SHEET_URL) return getDemoData();
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const text = await res.text();
    const rows = parseCSV(text);
    const data = rows.slice(1).filter(r => r[0]).map(rowToNotification);
    return data.length > 0 ? data : getDemoData();
  } catch (e) {
    console.error('[sheets] fetch error:', e);
    return getDemoData();
  }
}

export async function fetchByCategory(category: Notification['category']): Promise<Notification[]> {
  const all = await fetchAllNotifications();
  return all.filter(n => n.category === category && n.status !== 'expired');
}

export async function fetchBySlug(slug: string): Promise<Notification | null> {
  const all = await fetchAllNotifications();
  return all.find(n => n.slug === slug) || null;
}

export async function fetchFeatured(): Promise<Notification[]> {
  const all = await fetchAllNotifications();
  return all.filter(n => n.featured && n.status !== 'expired');
}

// ─── DEMO DATA (used when Google Sheet is not configured) ─────────────────────
function getDemoData(): Notification[] {
  return [
    {
      id: '1', title: 'SSC CGL 2026 Recruitment', slug: 'ssc-cgl-2026',
      category: 'jobs', department: 'Staff Selection Commission (SSC)',
      publishDate: '2026-06-01', lastDate: '2026-07-15',
      overview: 'Staff Selection Commission has released SSC CGL 2026 notification for recruitment to various Group B and Group C posts in various Ministries/ Departments/ Organizations of Government of India.',
      importantDates: 'Notification Date: 01 June 2026\nOnline Application Start: 05 June 2026\nLast Date to Apply: 15 July 2026\nFee Payment Last Date: 15 July 2026\nExam Date (Tier-I): August 2026',
      applicationFee: 'General/OBC: ₹100\nSC/ST/PWD/Female: Nil\nPayment Mode: Online (Net Banking/Credit Card/Debit Card/UPI)',
      ageLimit: 'Minimum Age: 18 Years\nMaximum Age: 32 Years (varies by post)\nAge Relaxation: As per government rules for SC/ST/OBC/PWD',
      eligibility: "Bachelor's Degree from any recognized University or equivalent",
      vacancyDetails: 'Total Vacancies: 17,727\nGroup B Gazetted: 1,654\nGroup B Non-Gazetted: 7,584\nGroup C: 8,489',
      selectionProcess: 'Tier-I: Computer Based Examination\nTier-II: Computer Based Examination\nDocument Verification\nMedical Examination (for certain posts)',
      examPattern: 'Tier-I: 100 Questions, 200 Marks, 60 Minutes\nGeneral Intelligence & Reasoning: 25Q\nGeneral Awareness: 25Q\nQuantitative Aptitude: 25Q\nEnglish Comprehension: 25Q',
      syllabusContent: 'General Intelligence: Analogies, Similarities, Differences\nGeneral Awareness: Current Events, History, Geography\nQuantitative Aptitude: Number Systems, Ratio, Percentage\nEnglish: Error Detection, Fill in the Blanks',
      officialNotificationLink: 'https://ssc.gov.in', applyLink: 'https://ssc.gov.in',
      officialWebsiteLink: 'https://ssc.gov.in', admitCardLink: '', resultLink: '',
      status: 'active', featured: true,
    },
    {
      id: '2', title: 'UPSC Civil Services 2026', slug: 'upsc-civil-services-2026',
      category: 'jobs', department: 'Union Public Service Commission (UPSC)',
      publishDate: '2026-02-14', lastDate: '2026-03-14',
      overview: 'UPSC has released Civil Services Examination 2026 notification for IAS, IPS, IFS and other allied services recruitment.',
      importantDates: 'Notification: 14 February 2026\nLast Date: 14 March 2026\nPrelims: 24 May 2026\nMains: September 2026',
      applicationFee: 'General/OBC/EWS: ₹100\nSC/ST/PWD/Female: Nil',
      ageLimit: 'Minimum: 21 Years\nMaximum: 32 Years\nRelaxation: SC/ST 5 years, OBC 3 years',
      eligibility: "Graduate from any recognized University",
      vacancyDetails: 'Total: 1,056 Posts\nIAS: 180\nIPS: 200\nIFS: 150\nOther Services: 526',
      selectionProcess: 'Preliminary Examination\nMains Examination\nPersonality Test (Interview)',
      examPattern: 'Prelims: 2 Papers (GS + CSAT)\nMains: 9 Papers\nInterview: 275 Marks',
      syllabusContent: 'History, Geography, Polity, Economy, Science, Environment, Current Affairs',
      officialNotificationLink: 'https://upsc.gov.in', applyLink: 'https://upsc.gov.in',
      officialWebsiteLink: 'https://upsc.gov.in', admitCardLink: '', resultLink: '',
      status: 'active', featured: true,
    },
    {
      id: '3', title: 'Indian Railway RRB NTPC 2026', slug: 'rrb-ntpc-2026',
      category: 'jobs', department: 'Railway Recruitment Board (RRB)',
      publishDate: '2026-05-10', lastDate: '2026-06-30',
      overview: 'Railway Recruitment Boards have released RRB NTPC 2026 notification for various Non-Technical Popular Category Posts.',
      importantDates: 'Notification: 10 May 2026\nApplication Start: 15 May 2026\nLast Date: 30 June 2026\nExam Date: October 2026',
      applicationFee: 'General/OBC/EWS: ₹500\nSC/ST/PWD/Female/Minority/EBC: ₹250',
      ageLimit: '18-36 Years (varies by post)', eligibility: '12th Pass / Graduate as applicable',
      vacancyDetails: 'Total: 11,558 Posts\nGraduate Level: 8,113\n12th Level: 3,445',
      selectionProcess: 'CBT-1 → CBT-2 → Typing Skill Test/CBAT → Document Verification',
      examPattern: 'CBT-1: 100 Questions, 90 Minutes\nMath: 30Q, Reasoning: 30Q, General Awareness: 40Q',
      syllabusContent: 'Mathematics, General Intelligence, General Awareness, Current Affairs',
      officialNotificationLink: 'https://indianrailways.gov.in', applyLink: 'https://rrbapply.gov.in',
      officialWebsiteLink: 'https://indianrailways.gov.in', admitCardLink: '', resultLink: '',
      status: 'active', featured: false,
    },
    {
      id: '4', title: 'IBPS PO 2026 Recruitment', slug: 'ibps-po-2026',
      category: 'jobs', department: 'Institute of Banking Personnel Selection (IBPS)',
      publishDate: '2026-06-05', lastDate: '2026-06-25',
      overview: 'IBPS has released Probationary Officer/Management Trainee 2026 notification for various Public Sector Banks.',
      importantDates: 'Notification: 05 June 2026\nLast Date: 25 June 2026\nPrelims Exam: October 2026\nMains Exam: November 2026',
      applicationFee: 'General/OBC/EWS: ₹850\nSC/ST/PWD: ₹175',
      ageLimit: '20-30 Years', eligibility: "Graduate in any discipline",
      vacancyDetails: 'Total: 4,455 Posts across various PSU Banks',
      selectionProcess: 'Preliminary Exam → Mains Exam → Interview → Document Verification',
      examPattern: 'Prelims: 100Q, 60 Min\nMains: 155Q + Descriptive, 3.5 Hours',
      syllabusContent: 'Quantitative Aptitude, Reasoning, English Language, General Awareness, Computer',
      officialNotificationLink: 'https://ibps.in', applyLink: 'https://ibps.in',
      officialWebsiteLink: 'https://ibps.in', admitCardLink: '', resultLink: '',
      status: 'active', featured: true,
    },
    {
      id: '5', title: 'SSC CGL 2025 Admit Card', slug: 'ssc-cgl-2025-admit-card',
      category: 'admit-card', department: 'Staff Selection Commission (SSC)',
      publishDate: '2026-06-10', lastDate: '2026-07-01',
      overview: 'SSC CGL 2025 Tier-I Admit Card has been released. Candidates can download their Hall Ticket from the official website.',
      importantDates: 'Admit Card Release: 10 June 2026\nExam Date: 24 June - 5 July 2026',
      applicationFee: '', ageLimit: '', eligibility: '',
      vacancyDetails: '', selectionProcess: '', examPattern: '', syllabusContent: '',
      officialNotificationLink: 'https://ssc.gov.in', applyLink: '',
      officialWebsiteLink: 'https://ssc.gov.in', admitCardLink: 'https://ssc.gov.in',
      resultLink: '', status: 'active', featured: true,
    },
    {
      id: '6', title: 'UPSC Prelims 2025 Result', slug: 'upsc-prelims-2025-result',
      category: 'results', department: 'Union Public Service Commission (UPSC)',
      publishDate: '2026-06-15', lastDate: '',
      overview: 'UPSC Civil Services Preliminary Examination 2025 Result has been declared. Candidates can check their result on the official website.',
      importantDates: 'Result Declared: 15 June 2026\nMains Application Start: 20 June 2026',
      applicationFee: '', ageLimit: '', eligibility: '',
      vacancyDetails: '', selectionProcess: '', examPattern: '', syllabusContent: '',
      officialNotificationLink: 'https://upsc.gov.in', applyLink: '',
      officialWebsiteLink: 'https://upsc.gov.in', admitCardLink: '',
      resultLink: 'https://upsc.gov.in', status: 'active', featured: true,
    },
    {
      id: '7', title: 'SSC CGL Complete Syllabus 2026', slug: 'ssc-cgl-syllabus-2026',
      category: 'syllabus', department: 'Staff Selection Commission (SSC)',
      publishDate: '2026-06-01', lastDate: '',
      overview: 'Complete and detailed syllabus for SSC CGL 2026 Tier-I and Tier-II Examination.',
      importantDates: '', applicationFee: '', ageLimit: '', eligibility: '',
      vacancyDetails: '', selectionProcess: '',
      examPattern: 'Tier-I: 100Q, 200 Marks, 60 Min\nTier-II: 390Q, 780 Marks, 2 Days',
      syllabusContent: 'Quantitative Aptitude: Arithmetic, Algebra, Geometry, Trigonometry, Statistics\nEnglish: Grammar, Vocabulary, Comprehension\nGeneral Intelligence: Verbal & Non-Verbal Reasoning\nGeneral Awareness: History, Geography, Polity, Science, Current Affairs',
      officialNotificationLink: 'https://ssc.gov.in', applyLink: '',
      officialWebsiteLink: 'https://ssc.gov.in', admitCardLink: '', resultLink: '',
      status: 'active', featured: false,
    },
    {
      id: '8', title: 'NDA 2 Exam 2026', slug: 'nda-2-2026-upcoming',
      category: 'upcoming-exams', department: 'Union Public Service Commission (UPSC)',
      publishDate: '2026-05-01', lastDate: '2026-05-30',
      overview: 'UPSC NDA & NA Examination (II) 2026 for admission to Army, Navy and Air Force wings of NDA.',
      importantDates: 'Notification: 01 May 2026\nLast Date: 30 May 2026\nExam Date: 14 September 2026',
      applicationFee: 'General/OBC/EWS: ₹100\nSC/ST/PWD: Nil',
      ageLimit: '16.5 to 19.5 Years', eligibility: '12th Pass (PCM for Navy/Air Force)',
      vacancyDetails: 'Total: 404\nArmy: 208\nNavy: 42\nAir Force: 120\nNaval Academy: 34',
      selectionProcess: 'Written Exam → SSB Interview → Medical Exam',
      examPattern: 'Math: 300 Marks, 2.5 Hours\nGAT: 600 Marks, 2.5 Hours',
      syllabusContent: 'Mathematics: Algebra, Matrices, Calculus, Probability\nGAT: English, GK, Physics, Chemistry, History, Geography',
      officialNotificationLink: 'https://upsc.gov.in', applyLink: 'https://upsconline.gov.in',
      officialWebsiteLink: 'https://upsc.gov.in', admitCardLink: '', resultLink: '',
      status: 'upcoming', featured: true,
    },
  ];
}