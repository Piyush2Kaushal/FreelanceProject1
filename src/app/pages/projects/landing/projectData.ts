/* ───────────────────────────────────────────────────────────────────
   Projects Landing — project data + assets.

   ✅ SINGLE SOURCE OF TRUTH:
   The landing cards no longer hardcode their own content. Instead each
   card's NAME, SUBHEADING, COLOUR, LOGO and TEXTURE are pulled directly
   from the real project data files in /data (project1..project4).

   • SelectedWorks (desktop) and SelectedWorksMobile both read SLOTS,
     so content still lives in ONE place — but that place is now the
     canonical /data registry, not a duplicate list here.

   • Each card carries a `route` (e.g. "/projects/project-1"). Clicking a
     card runs the shared-element morph and navigates to that route.

   • Project 3 & 4 are now REAL pages (data/project3.ts, data/project4.ts)
     with their own colour + text. Images are intentionally reused from
     Projects 1 & 2 for now.

   To change a card's colour / name / logo → edit the matching data file
   in /data. This landing page updates automatically.
─────────────────────────────────────────────────────────────────── */
import { ALL_PROJECTS, type ProjectData } from "../../../../data";

// Shared fallback logo (used only if a project somehow has no logo)
import projectLogo from "../../../../assets/logo.png";

// Decorative overlay patterns used by the conveyor (mask + faint texture).
// These are landing-only decoration, kept exactly as before.
import imgPattern73 from "../../../../assets/3335fa7ea6db7d3ea9a39208da45b87c05f865b5.png";
import { imgPattern72 } from "../../../../assets/svg-c46fh";

// ── Hover-banner texture ──────────────────────────────────────────────
// Same fixed texture used by the mobile project-page side drawer
// (ProjectPage.tsx → imgDrawerTexture). One shared image for ALL cards,
// applied in TWO multiply layers on the hover banner to match the drawer.
import bannerTexture from "../../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

export { bannerTexture, projectLogo, imgPattern73, imgPattern72 };

export type Project = {
  name: string;        // bold title (use \n for a line break)
  subheading: string;  // small line under the title
  color: string;       // banner background colour for this project
  logo?: string;       // per-project logo shown on the banner
  category?: string;   // ← extra field: project category, sourced from data
  /** Destination route for the shared-element transition (preferred) */
  route?: string;
  /** Legacy external link fallback (unused once `route` is set) */
  href?: string;
};

export type Slot = {
  big: boolean;
  src: string;
  border: string;       // exact border width from Figma
  /** Frame border colour — also used as the morph's start border colour */
  borderColor?: string;
  overflow?: boolean;   // image wrapped in overflow-hidden (matches original)
  label?: { name: string; year: string };
  project: Project;
};

/** Border colour drawn around every card frame (kept identical to original). */
export const CARD_BORDER_COLOR = "#3e2113";

// ── Per-card LAYOUT (big/small, border, overflow) ─────────────────────
// Only visual layout lives here now. All CONTENT (name, colour, logo,
// subheading, image) is derived from the matching /data project below.
const LAYOUT = [
  { big: true,  border: "4px",   overflow: false, route: "/projects/project-1" },
  { big: false, border: "2.8px", overflow: true,  route: "/projects/project-2" },
  { big: true,  border: "4px",   overflow: true,  route: "/projects/project-3" },
  { big: false, border: "2.8px", overflow: false, route: "/projects/project-4" },
];

// Map a /data project → a landing card project block.
function toCardProject(p: ProjectData, route: string): Project {
  return {
    name:       p.intro.projectName,
    subheading: titleCase(p.intro.category), // e.g. "INTERIORS" → "Interiors"
    color:      p.intro.heroPanelBg,
    logo:       p.intro.logoImg ?? projectLogo,
    category:   p.intro.category,            // ← extra field carried through
    route,
  };
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Card thumbnail image — use each project's concept main photo.
function cardImage(p: ProjectData): string {
  return p.concept.mainImg ?? p.intro.heroPortraitImg;
}

// per-card content (image + border + project), built from /data.
// Card N → /projects/project-N
export const SLOTS: Slot[] = LAYOUT.map((l, i) => {
  const data = ALL_PROJECTS[i];
  return {
    big: l.big,
    src: cardImage(data),
    border: l.border,
    borderColor: CARD_BORDER_COLOR,
    overflow: l.overflow,
    label: { name: data.intro.projectName.toUpperCase(), year: data.intro.year },
    project: toCardProject(data, l.route),
  };
});

export const STUDIO_TAGLINE =
  "A curated collection of homes designed by Studio Inside Eye.";