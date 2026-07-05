/**
 * Data Access Layer for Portfolio
 * 
 * All content is fetched through this abstraction layer.
 * Currently reads from local JSON files, but designed to be
 * swappable to real API endpoints with minimal changes.
 * 
 * To swap to a real backend later:
 * 1. Set VITE_API_URL environment variable
 * 2. Replace the JSON imports with fetch() calls in each function
 */

import type {
  Profile,
  SkillsData,
  ProjectsData,
  Project,
  EducationData,
  JourneyData,
  ContactData,
} from './types';

// Import JSON data (will be replaced with fetch calls when backend is ready)
import profileData from '@/data/profile.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import educationData from '@/data/education.json';
import journeyData from '@/data/journey.json';
import contactData from '@/data/contact.json';

// TODO: Uncomment when backend is ready
// const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetches profile/personal information
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/profile`).then(r => r.json());
 */
export async function getProfile(): Promise<Profile> {
  return profileData as unknown as Profile;
}

/**
 * Fetches all skills data with categories
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/skills`).then(r => r.json());
 */
export async function getSkills(): Promise<SkillsData> {
  return skillsData as unknown as SkillsData;
}

/**
 * Fetches all projects
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/projects`).then(r => r.json());
 */
export async function getProjects(): Promise<ProjectsData> {
  return projectsData as unknown as ProjectsData;
}

/**
 * Fetches a single project by slug
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/projects/${slug}`).then(r => r.json());
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = projectsData as unknown as ProjectsData;
  const project = data.projects.find((p) => p.slug === slug);
  return project || null;
}

/**
 * Fetches education and certifications
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/education`).then(r => r.json());
 */
export async function getEducation(): Promise<EducationData> {
  return educationData as unknown as EducationData;
}

/**
 * Fetches journey/timeline milestones
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/journey`).then(r => r.json());
 */
export async function getJourney(): Promise<JourneyData> {
  return journeyData as unknown as JourneyData;
}

/**
 * Fetches contact information
 * TODO: swap to real GET endpoint when backend is ready
 * return fetch(`${API_URL}/api/contact`).then(r => r.json());
 */
export async function getContact(): Promise<ContactData> {
  return contactData as unknown as ContactData;
}

// Re-export types for convenience
export * from './types';
