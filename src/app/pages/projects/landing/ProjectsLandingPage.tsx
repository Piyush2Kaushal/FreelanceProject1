// ─────────────────────────────────────────────────────────────────────────────
// ProjectsLandingPage – Route: /projects
//
// The "Selected Works" landing page (ported from the All Projects file).
// Renders the desktop conveyor (SelectedWorks) or the mobile vertical
// experience (SelectedWorksMobile) based on viewport.
//
// Header: keeps its own built-in "Selected Works" header only (no main Navbar),
// per the integration brief.
//
// Navigation: clicking any of the 4 cards runs the SAME shared-element morph
// used on the Home page and routes to that card's project page
// (/projects/project-1 … /projects/project-4).
// ─────────────────────────────────────────────────────────────────────────────
import { SelectedWorks } from "./SelectedWorks";
import { SelectedWorksMobile } from "./SelectedWorksMobile";
import { useDevice } from "./useDevice";

export default function ProjectsLandingPage() {
  const { device } = useDevice();

  return (
    <div className="size-full">
      {device === "mobile" ? <SelectedWorksMobile /> : <SelectedWorks />}
    </div>
  );
}
