// app/router/projectRoutes.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Project Routes – Central registry for every project route.
// To add Project 3:
//   1. Create data/project3.ts  (copy data/project1.ts, fill in values)
//   2. Create app/pages/projects/Project3Page.tsx  (2-line file)
//   3. Add the route object below
// ─────────────────────────────────────────────────────────────────────────────
import React, { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

// Code-split each project page so only the active project's images are bundled
const Project1Page = lazy(() => import("../pages/projects/Project1Page"));
const Project2Page = lazy(() => import("../pages/projects/Project2Page"));
// const Project3Page = lazy(() => import("../pages/projects/Project3Page")); ← add here

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
  // {
  //   path: "/projects/project-3",
  //   element: (
  //     <Suspense fallback={<PageFallback />}>
  //       <Project3Page />
  //     </Suspense>
  //   ),
  // },
];
