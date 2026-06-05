// =============================================================================
//  homeProjects.ts  —  Studio Inside Eye · Home Page Hero Cycle Data
// =============================================================================
//
//  YEH FILE SIRF HOME PAGE KE LIYE HAI.
//  Project detail pages ke liye alag data/project1.ts, data/project2.ts hain.
//
//  Har project mein sirf woh cheezein hain jo hero section mein cycle hoti hain:
//    • bgColor          — poore hero panel ka background color
//    • patternImg       — top texture / geometric pattern image (optional)
//    • textureImg       — faint noise/grain overlay image
//    • heroImg          — framed portrait + bada landscape photo dono ke liye
//    • projectName      — bada heading text (e.g. "Pewter")
//    • description      — bottom-right paragraph
//    • slug             — project detail page ka URL (navigation ke liye)
//
//  NAYA PROJECT ADD KARNA:
//    1. Neeche ek nayi entry copy-paste karo
//    2. Apni images import karo
//    3. Fields fill karo
//    4. HOME_PROJECTS array mein push karo
//    Bas — Home page automatically cycle mein le lega.
//
//  CYCLE SPEED CHANGE KARNI HO:
//    CYCLE_MS aur FADE_MS yahan se change karo,
//    Home1.tsx mein alag se kuch nahi badlna padega.
// =============================================================================

// ── Pewter assets ─────────────────────────────────────────────────────────────
import imgPewterTexture from "../assets/adbe511abb684cf81f1cb3187f8b71a3a00b3c31.png";
import imgPewterPattern from "../assets/aebe02d3d339cdc59b4730399fc4b35a1fa1b42b.png";
import imgPewterHero    from "../assets/d0789128c56050759d379207723c165109533bf7.jpg";
import imgPewterLandscape from "../assets/27a5004a3a9d6a0677c5c4cca11af5e3be0fe6bc.png";

// ── Sienna assets ─────────────────────────────────────────────────────────────
import imgSiennaTexture from "../assets/adbe511abb684cf81f1cb3187f8b71a3a00b3c31.png";
import imgSiennaHero    from "../assets/d0771eeb465df0dcf09bc934a4e09e95eb4e483d.png";
import imgSiennaPattern from "../assets/95a80092b73db2ef00faba24cace5f66a65bce57.jpg";
import imgSiennaLandscape from "../assets/11a9a70751f13d5683033d69d45f65878b03f1dc.jpg";
// Sienna ka koi pattern nahi tha original mein, isliye undefined hai

// ── Naye project ke liye yahan assets import karo ─────────────────────────────
// import imgProject3Texture from "../assets/XXXX.png";
// import imgProject3Pattern from "../assets/XXXX.png";
// import imgProject3Hero    from "../assets/XXXX.png";

// =============================================================================
//  Type
// =============================================================================

export interface HomeProject {
  /** Unique key, used as React key and for routing */
  id: string;

  /** Hero panel solid background color, e.g. "#6b6e39" */
  bgColor: string;

  /** Faint noise/grain overlay on the bg — almost every project shares the same one */
  textureImg: string;

  /**
   * Geometric / repeat pattern shown at top of hero (optional).
   * Pewter has one; Sienna does not.
   */
  patternImg?: string;

  /**
   * Main project image.
   * Used in TWO places:
   *   1. Framed portrait (small, center of hero panel)
   *   2. Big landscape photo in the light beige section below services
   * Add heroImgLandscape below if you want a separate image for the landscape slot.
   */
  heroImg: string;

  /**
   * Optional separate image for the big landscape slot (Component3 / ServicesSection1).
   * If not provided, heroImg is reused there.
   */
  heroImgLandscape?: string;

  /** Large display heading, e.g. "Pewter" */
  projectName: string;

  /** Short description shown bottom-right of hero panel */
  description: string;

  /** URL slug for the detail page, e.g. "/projects/project-2" */
  slug: string;
}

// =============================================================================
//  Project Entries
// =============================================================================

const pewter: HomeProject = {
  id:          "pewter",
  bgColor:     "#6b6e39",
  textureImg:  imgPewterTexture,
  patternImg:  imgPewterPattern,
  heroImg:     imgPewterHero,
  heroImgLandscape:  imgPewterLandscape,  
  projectName: "Pewter",
  description:
    "Designed to reflect the clients' love for a calm and airy home, this full interior and exterior renovation layered warm tones, rich textures, and thoughtful details to create a space that feels both inviting and intentional.",
  slug: "/projects/project-2",
};

const sienna: HomeProject = {
  id:          "sienna",
  bgColor:     "#8b2c1b",
  textureImg:  imgSiennaTexture,
  patternImg:  imgSiennaPattern,           // Sienna mein koi repeat pattern nahi
  heroImg:     imgSiennaHero,
  heroImgLandscape:  imgSiennaLandscape, 
  projectName: "Sienna",
  description:
    "A full interior renovation that also included a 1,200 sq. ft. addition for clients who wanted their new home to feel warm, collected, intentional, and deeply rooted in the pieces and memories they’ve gathered over the years, including art and décor collected from different parts of India.",
  slug: "/projects/project-1",
};

// ── Naya project yahan add karo ───────────────────────────────────────────────
// const slate: HomeProject = {
//   id:          "slate",
//   bgColor:     "#4a5568",
//   textureImg:  imgProject3Texture,
//   patternImg:  imgProject3Pattern,   // ya undefined agar nahi hai
//   heroImg:     imgProject3Hero,
//   projectName: "Slate",
//   description: "Apni description yahan.",
//   slug:        "/projects/project-3",
// };

// =============================================================================
//  Registry  —  SIRF YAHAN ORDER CHANGE KARO cycle ka order badalne ke liye
// =============================================================================

export const HOME_PROJECTS: HomeProject[] = [
  pewter,
  sienna,
  // slate,   // ← naya project yahan push karo
];

// =============================================================================
//  Timing constants  —  Home1.tsx inhe import karega
// =============================================================================

/** Total time each project stays visible (milliseconds) */
export const CYCLE_MS = 5000;

/** Crossfade duration (milliseconds) — rakhna CYCLE_MS se kam */
export const FADE_MS = 900;