import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SelectionProvider } from "./context/SelectionContext";
import { TransitionProvider } from "./context/TransitionContext";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import SharedElementLayer from "./components/SharedElementLayer";
import { projectRoutes } from "./router/projectRoutes";

// ─── Route-level code splitting ──────────────────────────────────────────────
// Each lazy() creates a separate JS chunk → only the current page's JS +
// images are fetched, dramatically reducing initial bundle size.
const FinalMoodboard  = lazy(() => import("../imports/FinalMoodboard/FinalMoodboard"));
const MoodboardDetailPage = lazy(() => import("../imports/FinalMoodboard/MoodboardDetailPage"));
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
      <TransitionProvider>
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

            {/* One persistent route for all 6 combinations — keeps Navbar,
                FooterNav, MobileBottomBar and the Logo mounted across every
                "Generate" click. Only the moodboard image crossfades. */}
            <Route path="/detail/:color/:style"            element={<MoodboardDetailPage />} />

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
          <SharedElementLayer />
        </div>
      </TransitionProvider>
    </SelectionProvider>
  );
}