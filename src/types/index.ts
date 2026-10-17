export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  description?: string;
  edition: string;
}

export type WoxsenSchool =
  | 'School of Technology'
  | 'School of Business'
  | 'School of Sciences'
  | 'School of Law'
  | 'School of Art & Design'
  | 'School of Architecture & Planning'
  | 'School of Liberal Arts & Humanities';

export interface RegistrationFormData {
  fullName: string;
  rollNumber: string;
  school: WoxsenSchool | '';
  email: string;
  phone: string;
  specialisation: string;
}

export interface OutcomePillar {
  index: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  certificateType?: string;
  metaBadge?: string;
}

export interface EventPhase {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverable: string;
}
