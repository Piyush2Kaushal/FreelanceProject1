// ─────────────────────────────────────────────────────────────────────────────
// Article Data — Add new articles here.
// Each object maps 1-to-1 with the existing ArticlePage layout sections.
// The BlogArticle component reads from this file via slug.
// ─────────────────────────────────────────────────────────────────────────────

// ── Asset imports (same images already used in the original BlogArticle) ─────
import imgFrame2106258761 from "../assets/c3f115f4d118ac4fcbf1d74ef8815d734c335bdf.png";
import imgFrame2106258762 from "../assets/ac6073d80e685fa7af1967de631c324197e86adf.png";
import imgFrame2106258778 from "../assets/e64d564294abdd4a684dd40d8a036f83e3763166.png";
import imgFrame2106258777 from "../assets/4d2a01b2e517b7fee0f5f5b5f044518b28f7b7aa.png";
import imgFrame2106258779 from "../assets/1a634773f3f63ad2485cb6c8342972dda6c1c84b.png";
import imgFrame2106258780 from "../assets/d6a2ec2ae594fcd9566c40dbfd2f2939a0ece108.png";
import imgFrame2106258781 from "../assets/212bee59b64bea89100d5d03e37b74df2cf0d4e4.png";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** A bullet-point list item used in Section2 text */
export interface BulletItem {
  text: string;
}

/** A simple paragraph (string) or a list of bullets */
export type ContentBlock =
  | { type: "paragraphs"; texts: string[] }
  | { type: "bullets"; items: BulletItem[] };

/**
 * Section1 — "Image LEFT, divider, Text RIGHT"
 * Matches: Frame13 (top: 509px) — image(699px wide) | dotLine-top | text(565px)
 */
export interface ArticleSection1 {
  /** Single large image on the left */
  image: string;
  /** Article body content shown on the right */
  content: ContentBlock;
}

/**
 * Section2 — "Text LEFT (with title), divider, Dual-Image RIGHT"
 * Matches: Frame29 (top: 1104px) — textBlock(602px) | dotLine-top | dualImage(668px)
 */
export interface ArticleSection2 {
  /** Heading shown in Instrument Serif 64px */
  heading: string;
  /** Body content block below the heading */
  content: ContentBlock;
  /** First image in the dual-image pair */
  imageLeft: string;
  /** Second image in the dual-image pair */
  imageRight: string;
}

/**
 * Section3 — "Text LEFT (with title), divider, Dual-Image RIGHT"
 * Matches: Frame30 (top: 2765px) — textBlock(602px) | dotLine-bottom | dualImage(flex)
 */
export interface ArticleSection3 {
  /** Heading shown in Instrument Serif 64px */
  heading: string;
  /** Body paragraph text */
  content: ContentBlock;
  /** First image in the dual-image pair */
  imageLeft: string;
  /** Second image in the dual-image pair */
  imageRight: string;
}

/**
 * Section4 — "Image LEFT, Text RIGHT"
 * Matches: Frame34 (top: 3562px) — image(754px) | text(flex)
 */
export interface ArticleSection4 {
  /** Large image on the left */
  image: string;
  /** Heading for the final section */
  heading: string;
  /** Body paragraph text */
  bodyText: string;
}

/**
 * Section "What Affects Cost" — "Image LEFT, divider, Text-with-bullets RIGHT"
 * Matches: Frame14 (top: 2000px) — image(662px) | dotLine-bottom | textWithBullets(565px)
 */
export interface ArticleSectionCostFactors {
  /** Single image on the left */
  image: string;
  /** Heading above the bullet list */
  heading: string;
  /** Bullet items shown as a list */
  bullets: BulletItem[];
}

/** Full article data shape — mirrors the exact layout of BlogArticle.tsx */
export interface ArticleData {
  // ── Routing ───────────────────────────────────────────────────────────────
  /** URL slug, e.g. "bay-area-home-owners-guide" → /journal/article/bay-area-home-owners-guide */
  slug: string;

  // ── JournalArticles card strip (used in journal-articles.tsx) ─────────────
  /** Strip card id displayed on the journal page, e.g. "01" */
  id: string;
  /** Title shown on the journal strip card */
  title: string;
  /** Short description shown in the expanded panel */
  description: string;
  /** Background color of this article's strip card */
  bg: string;
  /** Left offset of the strip card text */
  leftOffset: number;
  /** Gap between id and title in the strip */
  gap: number;
  /** Optional letter-spacing for the strip title */
  tracking?: string;

  // ── Article page hero ─────────────────────────────────────────────────────
  /** Main headline shown large at the top of the article page */
  pageHeading: string;
  /** Sub-heading / description shown below the headline */
  pageSubHeading: string;
  /** Date label shown top-right, e.g. "2/2026" */
  pageDate: string;

  // ── Article content sections ──────────────────────────────────────────────
  /** Section 1 — Image left, text right (top: 509px) */
  section1: ArticleSection1;
  /** Section 2 — Text+heading left, dual-image right (top: 1104px) */
  section2: ArticleSection2;
  /** "What affects cost" section — Image left, bullets right (top: 2000px) */
  sectionCostFactors: ArticleSectionCostFactors;
  /** Section 3 — Text+heading left, dual-image right (top: 2765px) */
  section3: ArticleSection3;
  /** Section 4 — Image left, heading+text right (top: 3562px) */
  section4: ArticleSection4;
}

// ─────────────────────────────────────────────────────────────────────────────
// Article 01 — Bay Area Home Owners Guide
// ─────────────────────────────────────────────────────────────────────────────
export const article01: ArticleData = {
  slug: "bay-area-home-owners-guide",
  id: "01",
  title: "Bay Area Home Owners Guide",
  description:
    "Learn how much interior design costs in San Jose, including hourly rates, flat fees, remodel design costs, and what affects your final budget.",
  bg: "#5f3223",
  gap: 24,
  leftOffset: 39,

  pageHeading: "Bay Area home owners guide",
  pageSubHeading:
    "Learn how much interior design costs in San Jose, including hourly rates, flat fees, remodel design costs, and what affects your final budget.",
  pageDate: "2/2026",

  section1: {
    image: imgFrame2106258761,
    content: {
      type: "paragraphs",
      texts: [
        "Hiring an interior designer in San Jose can feel confusing at first because every home, scope, and designer works differently. A single-room refresh, a furnishing project, and a full-home renovation are very different investments. For Bay Area homeowners, the cost is also influenced by local labor rates, permit needs, material choices, project complexity, and the level of customization.",
        "In general, interior designers may charge hourly, flat-fee, percentage of project cost, square-foot pricing, or a hybrid model. Industry pricing references commonly place traditional interior designer fees around $2,000 to $15,000+ excluding furniture, depending on project size and complexity. Hourly rates can often range from $75 to $250+ per hour depending on experience and location.",
      ],
    },
  },

  section2: {
    heading: "Common Interior Design Cost Ranges",
    content: {
      type: "paragraphs",
      texts: [
        "A design consultation may be a few hundred dollars to over $1,000 depending on the designer and session length. A singleroom design may range from a few thousand dollars upward, especially if it includes furniture selection, layout, custom finishes, procurement, and installation.",
        "A full-service interior design project for a living room, kitchen, primary suite, or multiple rooms can move into a higher investment range because the designer is not just choosing furniture. They may handle space planning, finish selection, lighting, custom cabinetry direction, vendor coordination, construction documentation, and styling.",
        "For major remodels, the design fee is only one part of the overall budget. Bay Area kitchen remodels are often cited in the $50,000 to $150,000 range depending on scope and finish level, while bathroom remodels can move from basic to luxury ranges depending on plumbing, tile, fixtures, lighting, and layout changes.",
      ],
    },
    imageLeft: imgFrame2106258778,
    imageRight: imgFrame2106258777,
  },

  sectionCostFactors: {
    image: imgFrame2106258762,
    heading: "What Affects Interior Design Cost?",
    bullets: [
      { text: "Scope of work: Furnishing one room costs less than redesigning an entire home." },
      { text: "Level of service: Full-service design costs more than consultation-only support." },
      { text: "Custom work: Built-ins, custom furniture, and specialty finishes increase investment." },
      {
        text: "Remodel complexity: Moving walls, plumbing, electrical, or structural elements requires more coordination.",
      },
      {
        text: "Material quality: Natural stone, custom cabinetry, designer lighting, and premium textiles increase the budget.",
      },
      {
        text: "Procurement and installation: Ordering, tracking, receiving, inspecting, and installing items takes time and expertise.",
      },
    ],
  },

  section3: {
    heading: "Why a Boutique Studio Can Be Worth the Investment",
    content: {
      type: "paragraphs",
      texts: [
        "A boutique residential interior design studio like Studio Inside Eye gives homeowners a more personal, highly involved process. Instead of receiving a generic design package, clients get a home shaped around their personality, routines, architecture, and long-term lifestyle. \n\nFor San Jose homeowners, the real value of hiring an interior designer is not only making a home look beautiful. It is avoiding costly mistakes, choosing the right materials the first time, planning spaces properly, and creating a home that feels cohesive from room to room.",
      ],
    },
    imageLeft: imgFrame2106258779,
    imageRight: imgFrame2106258780,
  },

  section4: {
    image: imgFrame2106258781,
    heading: "Final Takeaway",
    bodyText: `Interior design in San Jose can range widely, but the right way to think about cost is not "What is the cheapest option?" It is "What level of design support does my home actually need?" If you are planning a remodel, furnishing a new home, or upgrading a long-term residence, working with a boutique designer can help you make smarter decisions from the beginning`,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Article 02 — Best Interior Design Ideas for Remodels and Renovations
// ─────────────────────────────────────────────────────────────────────────────
export const article02: ArticleData = {
  slug: "best-interior-design-ideas-for-remodels",
  id: "02",
  title: "Best Interior Design Ideas for Remodels and Renovations",
  description:
    "Explore the most impactful design ideas for residential remodels — from open-plan living to material upgrades that transform every room.",
  bg: "#8f781e",
  gap: 24,
  leftOffset: 41,
  tracking: "0.22px",

  pageHeading: "Best Interior Design Ideas for Remodels and Renovations",
  pageSubHeading:
    "Explore the most impactful design ideas for residential remodels — from open-plan living to material upgrades that transform every room.",
  pageDate: "3/2026",

  section1: {
    image: imgFrame2106258762,
    content: {
      type: "paragraphs",
      texts: [
        "A residential remodel is one of the most significant investments a homeowner can make. Whether you are updating a kitchen, refreshing a primary suite, or rethinking an entire floor plan, the design decisions you make early on will shape how the home feels for years to come.",
        "The most successful remodels start with a clear vision — not just of what looks good, but of how the space will be lived in. Thoughtful interior design bridges that gap, turning structural changes into cohesive, livable environments.",
      ],
    },
  },

  section2: {
    heading: "Open-Plan Living and Spatial Flow",
    content: {
      type: "paragraphs",
      texts: [
        "Opening up walls between a kitchen, dining room, and living area remains one of the most requested remodel changes. When done well, it creates a sense of spaciousness, improves natural light flow, and makes daily living feel more connected.",
        "The key is managing the transition between zones without losing definition. Designers use ceiling height changes, flooring material shifts, lighting placement, and furniture arrangement to create distinct areas within an open plan.",
        "For Bay Area homes — many of which were built with compartmentalized floor plans — removing a non-structural wall can dramatically change how a space feels, often without requiring a full gut renovation.",
      ],
    },
    imageLeft: imgFrame2106258778,
    imageRight: imgFrame2106258777,
  },

  sectionCostFactors: {
    image: imgFrame2106258761,
    heading: "High-Impact Material Upgrades",
    bullets: [
      { text: "Countertops: Switching to natural stone like quartzite or marble adds warmth and longevity." },
      { text: "Flooring: Wide-plank hardwood or large-format tile transforms the perceived scale of a room." },
      { text: "Hardware and fixtures: Replacing cabinet pulls, faucets, and lighting dramatically refreshes a space at modest cost." },
      { text: "Millwork: Custom built-ins, cabinetry, and trim add architectural character that outlasts trends." },
      { text: "Tile work: Statement backsplashes, shower surrounds, or floor patterns can anchor a room's design." },
      { text: "Wall treatments: Limewash paint, plaster finishes, or paneling add texture and depth." },
    ],
  },

  section3: {
    heading: "Lighting as Architecture",
    content: {
      type: "paragraphs",
      texts: [
        "One of the most underestimated elements of a remodel is lighting design. Good lighting is not just about brightness — it shapes how a space feels at different times of day and defines how materials and colors read in a room. \n\nA well-designed lighting plan layers ambient, task, and accent sources. Recessed ceiling lights handle general illumination, while pendants, sconces, and under-cabinet strips add depth, warmth, and functionality. Dimmer controls allow the same room to shift from energetic to restful without any furniture changes.",
      ],
    },
    imageLeft: imgFrame2106258779,
    imageRight: imgFrame2106258780,
  },

  section4: {
    image: imgFrame2106258781,
    heading: "Where to Start",
    bodyText:
      "The best remodels begin with defining how you want to live in the space — not just how you want it to look. Identifying your priorities, setting a realistic budget, and working with a designer who understands both aesthetics and construction will ensure the investment translates into a home that genuinely works for you.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Article 03 — A Complete Guide to Full-Service Interior Design
// ─────────────────────────────────────────────────────────────────────────────
export const article03: ArticleData = {
  slug: "complete-guide-to-full-service-interior-design",
  id: "03",
  title: "A complete Guide to Full-Service Interior Design",
  description:
    "Understand what full-service interior design includes, how to find the right studio for your home, and what to expect from the process.",
  bg: "#a23e2c",
  gap: 24,
  leftOffset: 41,
  tracking: "0.22px",

  pageHeading: "A Complete Guide to Full-Service Interior Design",
  pageSubHeading:
    "Understand what full-service interior design includes, how to find the right studio for your home, and what to expect from the process.",
  pageDate: "4/2026",

  section1: {
    image: imgFrame2106258761,
    content: {
      type: "paragraphs",
      texts: [
        "Full-service interior design means a designer or studio manages every aspect of a project — from initial concept through final installation. Rather than advising on a few purchases or creating a mood board, a full-service designer handles the entire process as a professional partner.",
        "For homeowners planning a significant renovation or furnishing a new home from scratch, full-service design removes the burden of research, vendor coordination, and decision fatigue. The designer becomes the single point of contact for the project.",
      ],
    },
  },

  section2: {
    heading: "What Full-Service Design Includes",
    content: {
      type: "paragraphs",
      texts: [
        "A full-service engagement typically begins with a discovery phase — understanding how you live, what you value, and what the space needs to accomplish. From there, the designer develops a concept that ties together architecture, materials, color, and furnishings.",
        "Deliverables usually include space planning layouts, finish and material selections, custom furniture specifications, lighting plans, and sourcing of all furnishings and accessories. The designer also manages procurement, delivery tracking, and final installation.",
        "For remodel projects, full-service designers work alongside contractors, review drawings, and ensure design intent is maintained through construction. This coordination often prevents costly errors that arise when design and construction are managed separately.",
      ],
    },
    imageLeft: imgFrame2106258777,
    imageRight: imgFrame2106258778,
  },

  sectionCostFactors: {
    image: imgFrame2106258762,
    heading: "How to Choose the Right Studio",
    bullets: [
      { text: "Portfolio alignment: Look for work that reflects the aesthetic direction you are drawn to." },
      { text: "Process clarity: A good studio explains their process upfront — no surprises mid-project." },
      { text: "Communication style: Design projects require regular dialogue; choose someone you communicate well with." },
      { text: "Fee structure: Understand whether the studio charges flat fees, hourly, or a percentage model before signing." },
      { text: "Trade relationships: Experienced studios have access to trade-only vendors and resources unavailable to the public." },
      { text: "References: Speak with past clients to understand how the studio performs under pressure and near deadlines." },
    ],
  },

  section3: {
    heading: "The Process from Start to Finish",
    content: {
      type: "paragraphs",
      texts: [
        "A typical full-service project moves through discovery, concept development, design development, procurement, and installation. Each phase builds on the last, and client input is structured into reviews rather than open-ended ongoing changes. \n\nFor homeowners, this means less day-to-day decision making and more confidence that the project is progressing with intention. The designer holds the vision and manages the details, freeing you to focus on your life rather than vendor timelines.",
      ],
    },
    imageLeft: imgFrame2106258780,
    imageRight: imgFrame2106258779,
  },

  section4: {
    image: imgFrame2106258781,
    heading: "Is Full-Service Right for You?",
    bodyText:
      "Full-service interior design is best suited for homeowners who want a cohesive, professionally managed result and are ready to invest in a process as well as a product. If your project involves construction, significant furnishing, or a home you plan to live in for years, the investment in full-service design typically pays for itself in the quality of decisions made along the way.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Article 04 — Modern Interior Design Ideas for Calm Living Spaces
// ─────────────────────────────────────────────────────────────────────────────
export const article04: ArticleData = {
  slug: "modern-interior-design-ideas-calm-living-spaces",
  id: "04",
  title: "Modern Interior Design Ideas for Calm Living Spaces",
  description:
    "Discover how thoughtful layouts, curated materials, and restrained color palettes create interiors that feel serene and intentional.",
  bg: "#559baa",
  gap: 30,
  leftOffset: 41,
  tracking: "0.22px",

  pageHeading: "Modern Interior Design Ideas for Calm Living Spaces",
  pageSubHeading:
    "Discover how thoughtful layouts, curated materials, and restrained color palettes create interiors that feel serene and intentional.",
  pageDate: "5/2026",

  section1: {
    image: imgFrame2106258778,
    content: {
      type: "paragraphs",
      texts: [
        "Modern design is often misunderstood as cold or minimal. In residential interiors, however, a modern approach is not about emptiness — it is about intention. Every object, material, and spatial decision is considered, and the result is a home that feels edited rather than bare.",
        "The most livable modern interiors balance structure with warmth. Clean geometry is softened by natural materials. Neutral color palettes are grounded by texture. Furniture is chosen for both form and how it functions in daily life.",
      ],
    },
  },

  section2: {
    heading: "Calm Through Color and Light",
    content: {
      type: "paragraphs",
      texts: [
        "Color has a direct impact on how a room feels. Calm interiors typically rely on low-saturation palettes — warm whites, soft greiges, earthy terracottas, and deep muted tones. These colors shift subtly with changing natural light rather than competing with it.",
        "Layering natural light with carefully positioned artificial sources extends that calm through the evening. Warm-toned bulbs, concealed fixtures, and dimmable controls allow a modern home to transition from bright and functional to soft and restful without any physical change to the space.",
        "In California homes, the relationship between indoor and outdoor spaces is also part of this equation. Large windows, sliding doors, and interior finishes that echo exterior materials blur the boundary and make rooms feel larger and more connected to the landscape.",
      ],
    },
    imageLeft: imgFrame2106258779,
    imageRight: imgFrame2106258780,
  },

  sectionCostFactors: {
    image: imgFrame2106258761,
    heading: "Material Choices That Create Serenity",
    bullets: [
      { text: "Natural stone: Travertine, limestone, and honed marble add organic texture without visual noise." },
      { text: "Linen and wool: Soft furnishing textiles that absorb sound and add warmth to a room." },
      { text: "Matte finishes: Avoiding high-gloss surfaces reduces visual busyness and keeps a space feeling grounded." },
      { text: "Aged wood: Reclaimed or wire-brushed oak flooring adds character while maintaining a neutral palette." },
      { text: "Plaster walls: Limewash or troweled plaster creates depth and movement without pattern." },
      { text: "Blackened steel: Used sparingly in window frames, shelving, or hardware, it anchors a palette without overpowering it." },
    ],
  },

  section3: {
    heading: "Furniture Layout and Spatial Breathing Room",
    content: {
      type: "paragraphs",
      texts: [
        "A calm space is rarely overfurnished. Modern residential design favors fewer, better pieces with deliberate spacing between them. A sofa with open floor visible beneath it feels lighter than one that sits on the ground. A dining table with enough circulation around it feels relaxed rather than crowded. \n\nThe goal is not minimalism for its own sake — it is removing friction from daily life. When a room is arranged so movement through it feels natural, and objects are positioned where they are actually used, the space settles into a kind of quiet that is hard to define but immediately felt.",
      ],
    },
    imageLeft: imgFrame2106258777,
    imageRight: imgFrame2106258778,
  },

  section4: {
    image: imgFrame2106258781,
    heading: "Designing for How You Live",
    bodyText:
      "Calm interiors are not designed for photographs — they are designed for the people who live in them. A well-designed modern home considers morning routines, how children move through spaces, where natural light falls at different times of day, and what materials will age gracefully over years of actual use. That attention to lived experience is what separates a truly serene home from one that only looks calm in images.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry — Add new articles here. Order controls journal strip display.
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_ARTICLES: ArticleData[] = [article01, article02, article03, article04];

/** Look up an article by its URL slug */
export function getArticleBySlug(slug: string): ArticleData | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

/** Look up an article by its numeric id string, e.g. "01" */
export function getArticleById(id: string): ArticleData | undefined {
  return ALL_ARTICLES.find((a) => a.id === id);
}
