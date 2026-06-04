// ─────────────────────────────────────────────────────────────────────────────
// Project Page – Shared Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  /** Tailwind-style height class for this image slot, e.g. "h-[499px]" */
  heightClass: string;
  /** Tailwind-style width class if fixed, e.g. "w-[388px]". Omit for flex-grow slots */
  widthClass?: string;
  objectFit?: "cover" | "contain";
}

/** A horizontal scroll screen showing 2-3 images in a gallery layout */
export interface GalleryScreen {
  images: GalleryImage[];
  /** Total container height, default "h-[716.58px]" */
  containerHeightClass?: string;
}

/** A full-width single-image screen (the 2 extra screens in Project 2) */
export interface FullImageScreen {
  src: string;
  /** Width of the screen – default 1129px */
  widthPx?: number;
}

export interface ExperienceOverviewImage {
  src: string;
  className: string;
}

export interface ProjectData {
  // ── Routing ──────────────────────────────────────────────────────────────
  slug: string; // e.g. "project-1"

  // ── Intro screen ─────────────────────────────────────────────────────────
  intro: {
    /** Large display name, e.g. "Sienna" */
    projectName: string;
    /** Accent color for the project name text, e.g. "#8c6c3c" */
    projectNameColor: string;
    /** Short description paragraph */
    description: string;
    /** Right-side decorative paragraph */
    sideParagraph: string;
    /** Location label, e.g. "ALAMEDAN MEADOW" */
    location: string;
    year: string;
    category: string; // e.g. "INTERIORS"
    sqft: string;     // e.g. "1200 SQFT"
    /** Hero panel background color */
    heroPanelBg: string;
    /** Overlay tint color on hero panel, e.g. "rgba(137,65,48,0.1)" */
    heroPanelOverlayBg: string;
    /** Small decorative image top-right of Intro */
    decorativeTopRightImg: string;
    /** Portrait image shown inside the framed box */
    heroPortraitImg: string;
    /** Optional extra decorative pattern image (Project 2 only) */
    patternImg?: string;
    /** Hamburger / nav stroke color, e.g. "#8C6C3C" */
    navStrokeColor: string;
    /** Nav left position calc string, e.g. "calc(91.67%+34px)" */
    navLeftCalc: string;
  };

  // ── Concept screen ───────────────────────────────────────────────────────
  concept: {
    /** Background texture image for the noise overlay */
    bgTextureImg: string;
    /** Full bleed image on the right side */
    mainImg: string;
    /** Logo image shown top-left */
    logoImg?: string;
    /** Concept heading line 1 */
    headingLine1: string;
    /** Concept heading line 2 (italic) */
    headingLine2: string;
    /** Small subheading color, e.g. "#7f5148" */
    headingColor: string;
    /** Short sub-description */
    subDescription: string;
    /** Longer body paragraphs (two paras separated by line break) */
    bodyParagraph1: string;
    bodyParagraph2: string;
    /** Nav stroke color for this screen */
    navStrokeColor: string;
    navLeftCalc: string;
  };

  // ── Experience overview screen ───────────────────────────────────────────
  experience: {
    /** Dark background color */
    bgColor: string;
    /** Noise/texture overlay image */
    bgTextureImg: string;
    /** Floating scattered images */
    images: ExperienceOverviewImage[];
    /** Logo image */
    logoImg: string;
    /** "The Experience" sub-description */
    experienceSubtitle: string;
    navStrokeColor: string;
    navLeftCalc: string;
  };

  // ── Gallery screens (always 3 in both projects) ──────────────────────────
  galleryScreens: GalleryScreen[];

  /** Background color shared by all gallery screens */
  galleryBgColor: string;
  /** Texture overlay image for gallery screens */
  galleryBgTextureImg: string;

  // ── Extra full-image screens (Project 2 has 2; Project 1 has none) ───────
  extraFullImageScreens?: FullImageScreen[];

  // ── Testimonial screen ───────────────────────────────────────────────────
  testimonial: {
    testimonialBgColor: string;
    /** Quote text */
    quote: string;
    /** Attribution name */
    attribution: string;
    quoteAccentColor: string;
    lineColor: string;
    monogramImg: string;
    rotatedBannerImg: string;
    credits: Array<{ label: string; value: string }>;
    enquiryEmail: string;
  };
}
