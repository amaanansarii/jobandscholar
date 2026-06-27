export interface Notification {
  id: string;
  title: string;
  slug: string;
  category: 'jobs' | 'admit-card' | 'results' | 'syllabus' | 'upcoming-exams';
  department: string;
  publishDate: string;
  lastDate: string;
  overview: string;
  importantDates: string;
  applicationFee: string;
  ageLimit: string;
  eligibility: string;
  vacancyDetails: string;
  selectionProcess: string;
  examPattern: string;
  syllabusContent: string;
  officialNotificationLink: string;
  applyLink: string;
  officialWebsiteLink: string;
  admitCardLink: string;
  resultLink: string;
  status: 'active' | 'expired' | 'upcoming';
  featured: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  mobile: string;
  message: string;
}
