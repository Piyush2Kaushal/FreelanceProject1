import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SelectionProvider } from "./context/SelectionContext";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import { projectRoutes } from "./router/projectRoutes";

// ─── Route-level code splitting ──────────────────────────────────────────────
// Each lazy() creates a separate JS chunk → only the current page's JS +
// images are fetched, dramatically reducing initial bundle size.
const FinalMoodboard  = lazy(() => import("../imports/FinalMoodboard/FinalMoodboard"));
const MoodboardPage2  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage2"));
const MoodboardPage3  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage3"));
const MoodboardPage4  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage4"));
const MoodboardPage5  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage5"));
const MoodboardPage6  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage6"));
const MoodboardPage7  = lazy(() => import("../imports/FinalMoodboard/MoodboardPage7"));
const ContactPage     = lazy(() => import("../imports/Frame2106258854/Frame2106258854"));
const JournalPage     = lazy(() => import("../imports/Journal/JournalPage"));
const AboutPage       = lazy(() => import("./pages/About/AboutPage"));
const ArticlePage     = lazy(() => import("../imports/ArticlePage/ArticlePage"));
const HomePage        = lazy(() => import("../imports/Home1/Home1"));

// ─── Suspense fallback — matches the PageTransitionOverlay background so
//     there's no colour flash while a route chunk loads.
const PageFallback = () => (
  <div style={{ width: "100vw", height: "100vh", background: "#f5f0eb" }} />
);

export default function App() {
  return (
    <SelectionProvider>
      <div className="size-full">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"                                element={<FinalMoodboard />} />
            <Route path="/home"                            element={<HomePage />} />
            <Route path="/about"                           element={<AboutPage />} />
            <Route path="/contact"                         element={<ContactPage />} />
            <Route path="/journal"                         element={<JournalPage />} />

            {/* Legacy route — renders article01 by default (no slug) */}
            <Route path="/journal/article"                 element={<ArticlePage />} />

            {/* Dynamic slug-based article route — each slug maps to its ArticleData */}
            <Route path="/journal/article/:slug"           element={<ArticlePage />} />

            <Route path="/detail/red/scandinavian"         element={<MoodboardPage2 />} />
            <Route path="/detail/red/transitional"         element={<MoodboardPage3 />} />
            <Route path="/detail/red/midcentury"           element={<MoodboardPage4 />} />
            <Route path="/detail/beige/scandinavian"       element={<MoodboardPage5 />} />
            <Route path="/detail/beige/transitional"       element={<MoodboardPage6 />} />
            <Route path="/detail/beige/midcentury"         element={<MoodboardPage7 />} />

            {/* ── Project Pages ───────────────────────────────────────────── */}
            {projectRoutes.map((route) => (
              <Route
                key={route.path as string}
                path={route.path as string}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
        <PageTransitionOverlay />
      </div>
    </SelectionProvider>
  );
}
