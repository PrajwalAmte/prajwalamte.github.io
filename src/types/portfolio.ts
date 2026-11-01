export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  groups: SkillGroup[];
}

export interface ExperienceRole {
  role: string;
  duration: string;
  points: string[];
}

export interface ExperienceEntry {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  featured: boolean;
  website?: string;
  github?: string;
}

export interface VolunteerRole {
  role: string;
  duration: string;
  description: string;
}

export interface VolunteerEntry {
  organization: string;
  location: string;
  roles: VolunteerRole[];
}
