/* ───────────────────────────────────────────────────────────────────
   Projects Landing — shared project data + assets.
   Both the desktop conveyor (SelectedWorks) and the mobile experience
   (SelectedWorksMobile) read from here, so the content lives in ONE place.

   NOTE (integration):
   • Assets are self-contained in ./assets/ so this landing page does not
     depend on the main /assets folder.
   • Each card carries a `route` (e.g. "/projects/project-1"). Clicking a
     card runs the SAME shared-element morph used on the Home page and then
     navigates to that route — see SelectedWorks.tsx / SelectedWorksMobile.tsx.

   FUTURE (Project 3 & 4):
   • Cards 3 & 4 currently reuse Projects 1 & 2 (routes project-3 / project-4
     map to project1Data / project2Data in app/router/projectRoutes.tsx).
     When the real Project 3 & 4 are ready, update those two route entries +
     the card content below — nothing else changes.
─────────────────────────────────────────────────────────────────── */
import imgImage60 from "../../../../assets/d0771eeb465df0dcf09bc934a4e09e95eb4e483d.png";
import imgImage61 from "../../../../assets/2f34cdcf685a216dedefab7556a79fa2ff9e2c41.png";
import imgImage62 from "../../../../assets/84770e53466dfe366e2f00008755009ec0ce1d94.png";
import imgImage63 from "../../../../assets/b4a164386bbaad064f2af7d1706cc6468f27d5f5.png";
import imgPattern73 from "../../../../assets/3335fa7ea6db7d3ea9a39208da45b87c05f865b5.png";
import { imgPattern72 } from "../../../../assets/svg-c46fh";

// Per-project logos — give each card its own file in ./assets/.
// Any that are missing fall back to the shared logo.png so nothing breaks.
import projectLogo from "../../../../assets/logo.png";
import logo1 from "../../../../assets/logo.png";
import logo2 from "../../../../assets/logo.png";
import logo3 from "../../../../assets/logo.png";
import logo4 from "../../../../assets/logo.png";

// Shared banner texture — blended over each project's colour
import bannerTexture from "../../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

export { imgPattern73, imgPattern72, bannerTexture, projectLogo };

export type Project = {
  name: string;        // bold title (use \n for a line break)
  subheading: string;  // small line under the title
  color: string;       // banner background colour for this project
  logo?: string;       // per-project logo shown on the banner
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

// per-card content (image + border + project) in big/small alternating order.
// Card N → /projects/project-N
export const SLOTS: Slot[] = [
  {
    big: true,
    src: imgImage63,
    border: "2.4px",
    borderColor: CARD_BORDER_COLOR,
    label: { name: "SIENNA", year: "2024" },
    project: {
      name: "Sienna",
      subheading: "Interiors",
      color: "#8d2d1b",
      logo: logo1,
      route: "/projects/project-1",
    },
  },
  {
    big: false,
    src: imgImage60,
    border: "2.4px",
    borderColor: CARD_BORDER_COLOR,
    overflow: true,
    project: {
      name: "Pewter",
      subheading: "Interiors",
      color: "#6b6e39",
      logo: logo2,
      route: "/projects/project-2",
    },
  },
  {
    big: true,
    src: imgImage62,
    border: "6px",
    borderColor: CARD_BORDER_COLOR,
    overflow: true,
    project: {
      name: "Segur",
      subheading: "Résidentiel",
      color: "#8a8d7f",
      logo: logo3,
      route: "/projects/project-3",
    },
  },
  {
    big: false,
    src: imgImage61,
    border: "4px",
    borderColor: CARD_BORDER_COLOR,
    project: {
      name: "Atelier\nSaint-Germain",
      subheading: "Résidentiel",
      color: "#9a6a4e",
      logo: logo4,
      route: "/projects/project-4",
    },
  },
];

export const STUDIO_TAGLINE = "A curated collection of homes designed by Studio Inside Eye.";
