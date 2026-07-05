// Types for the data-driven portfolio
// All data is GET-only, fetched from JSON files (swappable to real API later)

export interface Profile {
  name: string;
  designation: string;
  tagline: string;
  heroStatement: string;
  phone: string;
  email: string;
  github: string;
  linkedIn: string;
  location: string;
  photoUrl: string;
  resumeUrl: string;
  status: string;
  about: {
    intro: string;
    journey: string;
    currentFocus: string;
    workStyle: string;
    hobbies: string;
  };
}

export interface Skill {
  name: string;
  icon: string; // Icon identifier for react-icons
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
  softSkills: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  coverImage: string;
  timeline: string;
  category: string;
  featured: boolean;
  description: string;
  techStack: string[];
  highlightFeatures: string[]; // Exactly 3 distinctive features
  challenges: string[];
  improvements: string[];
  metrics: ProjectMetric[];
  liveUrl: string;
  githubUrl: string;
}

export interface ProjectsData {
  projects: Project[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  affiliation?: string;
  location: string;
  period: string;
  status: 'completed' | 'appeared' | 'ongoing';
  statusNote?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  description?: string;
  validationLink?: string;
}

export interface EducationData {
  education: Education[];
  certifications: Certification[];
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  type: 'current' | 'project' | 'education' | 'start';
  description: string;
  tags: string[];
}

export interface JourneyData {
  milestones: JourneyMilestone[];
}

export interface ContactData {
  email: string;
  phone: string;
  whatsapp: string;
  github: {
    username: string;
    url: string;
  };
  linkedin: {
    url: string;
  };
  formEndpoint?: string; // Formspree/Web3Forms endpoint
}
