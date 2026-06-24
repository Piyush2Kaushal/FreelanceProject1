// app/router/projectRoutes.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Project Routes – Central registry for every project DETAIL route.
//
// The Projects LANDING page (/projects) is registered separately in App.tsx.
// These routes are the individual project pages reached by clicking a card on
// the landing page (via the shared-element transition).
//
// Project 1 & 2 are the real, finished pages.
// Project 3 & 4 are placeholders that currently REUSE Project 1 & 2 data so the
// landing page's 4 cards all navigate to working pages. When the real Project 3
// & 4 are ready:
//   1. Create data/project3.ts and data/project4.ts
//   2. Create Project3Page.tsx / Project4Page.tsx (2-line files, like below)
//   3. Swap the lazy imports for project-3 / project-4 here
// ─────────────────────────────────────────────────────────────────────────────
import React, { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

// Code-split each project page so only the active project's images are bundled
const Project1Page = lazy(() => import("../pages/projects/Project1Page"));
const Project2Page = lazy(() => import("../pages/projects/Project2Page"));
// ── Project 3 & 4 placeholders (reuse Project 1 & 2 for now) ──────────────────
// When real pages exist, point these at Project3Page / Project4Page instead.
const Project3Page = lazy(() => import("../pages/projects/Project1Page"));
const Project4Page = lazy(() => import("../pages/projects/Project2Page"));

// Minimal fallback – keeps layout stable while the chunk loads
const PageFallback = () => (
  <div style={{ width: "100vw", height: "100vh", background: "#dad0ad" }} />
);

export const projectRoutes: RouteObject[] = [
  {
    path: "/projects/project-1",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Project1Page />
      </Suspense>
    ),
  },
  {
    path: "/projects/project-2",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Project2Page />
      </Suspense>
    ),
  },
  {
    path: "/projects/project-3",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Project3Page />
      </Suspense>
    ),
  },
  {
    path: "/projects/project-4",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Project4Page />
      </Suspense>
    ),
  },
];
