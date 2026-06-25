// ─────────────────────────────────────────────────────────────────────────────
// Project Registry
// Add new projects here by importing their data file and adding to the array.
// ─────────────────────────────────────────────────────────────────────────────
export type { ProjectData } from "./types";
export { project1Data } from "./project1";
export { project2Data } from "./project2";
export { project3Data } from "./project3";
export { project4Data } from "./project4";

import type { ProjectData } from "./types";
import { project1Data } from "./project1";
import { project2Data } from "./project2";
import { project3Data } from "./project3";
import { project4Data } from "./project4";

/**
 * All registered projects. Add new project data objects here.
 * Routes are auto-generated from each project's `slug` field.
 */
export const ALL_PROJECTS: ProjectData[] = [
  project1Data,
  project2Data,
  project3Data,
  project4Data,
];

/** Look up a project by its URL slug */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}
