// ─────────────────────────────────────────────────────────────────────────────
// Project Registry
// Add new projects here by importing their data file and adding to the array.
// ─────────────────────────────────────────────────────────────────────────────
export type { ProjectData } from "./types";
export { project1Data } from "./project1";
export { project2Data } from "./project2";

import type { ProjectData } from "./types";
import { project1Data } from "./project1";
import { project2Data } from "./project2";

/**
 * All registered projects. Add new project data objects here.
 * Routes are auto-generated from each project's `slug` field.
 */
export const ALL_PROJECTS: ProjectData[] = [project1Data, project2Data];

/** Look up a project by its URL slug */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}
