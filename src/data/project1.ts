// ─────────────────────────────────────────────────────────────────────────────
// Project 1 – Sienna  (data-only, no JSX)
// To add a new project, copy this file, fill in your values, then register
// the slug in src/router/projectRoutes.tsx.
// ─────────────────────────────────────────────────────────────────────────────
import type { ProjectData } from "./types";

// ── Image imports ─────────────────────────────────────────────────────────────
// All images live inside the project's own assets folder.
// Figma-exported asset hashes are preserved exactly as they were in the
// original files so the import paths stay correct.
// imgDecorativeTopRight, imgBanner, and imgExpImg107 all reference the same asset –
// consolidated into a single import to avoid triple-registering the same URL.
import imgDecorativeTopRight from "../assets/95a80092b73db2ef00faba24cace5f66a65bce57.png";
import imgHeroPortrait       from "../assets/d0771eeb465df0dcf09bc934a4e09e95eb4e483d.png";
import imgConceptBgTexture   from "../assets/47db141b7dbab58b232f8ff786dd3c5206a565ea.png";
import imgConceptMain        from "../assets/ee7114e4195238f566da922d2194acfa2a79b57d.png";
import imgExperienceBgTex    from "../assets/adbe511abb684cf81f1cb3187f8b71a3a00b3c31.png";
import imgLogo               from "../assets/ef5789f32fa9b15364e39033c5d7cb0a9747ec22.png";
import imgMonogram           from "../assets/d87dee7cf855200a2e6a5e94ab9c18ba04501572.png";

// Experience overview images
import imgExpImg126 from "../assets/4b14d8e763132bdbcc1386781bb0c6affef53696.png";
import imgExpImg130 from "../assets/c9ad69c57349570f7b9da8bb36ff61afa3aeea08.png";
import imgExpImg133 from "../assets/fab8b7b6d89b4375a5df0de93e1652d836dc995c.png";
import imgExpImg132 from "../assets/ef07b579d62be5ccc9bac7257f7ce244ef6728a2.png";
import imgExpImg134 from "../assets/e57896e27b8538a0e5197a90a270bd1f20117453.png";
import imgExpImg135 from "../assets/69038d7d99a948244f614fccb02260ceff43533f.png";

// Gallery screen images
import imgGal136 from "../assets/c3ac12316f4a41e71804e785df522b2be1fd4047.png";
import imgGal137 from "../assets/7984f0a233c0af9b5a440d251811c6fe86a1ccb7.png";
import imgGal138 from "../assets/7380d687e3f83bb9bc5185799af91f75a6f2a2b0.png";
import imgGal139 from "../assets/13be3e55e5ca682d6e6cb79cdfbe97d83166023d.png";
import imgGal140 from "../assets/7411553532d3062ab1a8164d249618f77b25608b.png";
import imgGal141 from "../assets/64c4611aa0e83841e83cf3af919b8bcae1818dca.png";
import imgGal142 from "../assets/08bf8f0f39e9817439a88db155055229bca460e5.png";
import imgGal143 from "../assets/858bc03d0a78eced2b82c068bc3cc4d6280eba2d.png";

export const project1Data: ProjectData = {
  slug: "project-1",

  intro: {
    projectName:          "Sienna",
    projectNameColor:     "#8c6c3c",
    description:          "A full interior renovation that also included a 1,200 sq. ft. addition, designed for clients who wanted their new home to feel warm, collected, intentional, and deeply rooted in the pieces and memories they've gathered over the years.",
    sideParagraph:        "The design thoughtfully incorporates art, décor, and heirloom objects collected from different parts of India, allowing the home to tell a personal story while remaining cohesive and refined",
    location:             "ALAMEDAN MEADOW",
    year:                 "2024",
    category:             "INTERIORS",
    sqft:                 "1200 SQFT",
    heroPanelBg:          "#8b2c1b",
    heroPanelOverlayBg:   "rgba(137,65,48,0.1)",
    decorativeTopRightImg: imgDecorativeTopRight,
    heroPortraitImg:      imgHeroPortrait,
    patternImg:           undefined,
    logoImg:              imgLogo, 
    navStrokeColor:       "#8C6C3C",
    navLeftCalc:          "calc(91.67% + 34px)",
  },

  concept: {
    bgTextureImg:    imgConceptBgTexture,
    bgPatternImg:  imgDecorativeTopRight, 
    mainImg:         imgConceptMain,
    logoImg:         undefined, // Project 1 has no logo on the concept screen
    headingLine1:    "Rooted in",
    headingLine2:    "Memory",
    headingColor:    "#7f5148",
    subDescription:  "A home shaped by the objects, art, and stories collected over a lifetime, brought together through a warm and intentional material palette.",
    bodyParagraph1:  "Rich oak wood tones, natural stone, and layered textures were used throughout to create depth, warmth, and a sense of permanence. ",
    bodyParagraph2:  "The result is a home that feels elevated yet inviting, timeless yet personal  a space that reflects the people who live in it and the life they've built together.",
    navStrokeColor:  "#8C6C3C",
    navLeftCalc:     "calc(91.67% + 68px)",
  },

  experience: {
    bgColor:            "#8d2d1b",
    bgTextureImg:       imgExperienceBgTex,
    logoImg:            imgLogo,
    experienceSubtitle: "Each space was designed with a distinct purpose, yet connected through a consistent material language that creates a sense of flow throughout the home.",
    navStrokeColor:     "#FFE0B2",
    navLeftCalc:        "calc(91.67% + 36px)",
    images: [
      { src: imgExpImg126, className: "absolute h-[344px] left-[calc(33.33%+103px)] top-[-34px] w-[240px]" },
      { src: imgExpImg130, className: "absolute h-[226px] left-[11px] top-[101px] w-[308px]" },
      { src: imgExpImg133, className: "absolute bottom-[5px] h-[185px] left-[calc(41.67%+74px)] w-[130px]" },
      { src: imgExpImg132, className: "absolute bottom-0 h-[209px] left-[calc(75%+59px)] w-[301px]" },
      { src: imgExpImg134, className: "absolute bottom-0 h-[314px] left-[113px] w-[235px]" },
      { src: imgExpImg135, className: "absolute h-[306px] left-[calc(83.33%+37px)] top-[101px] w-[203px]" },
      { src: imgDecorativeTopRight, className: "absolute bottom-[102px] h-[102px] left-[calc(50%+28px)] w-[150px]" },
    ],
  },

  galleryBgColor:      "#8d2d1b",
  galleryBgTextureImg: imgExperienceBgTex,

  galleryScreens: [
    {
      containerHeightClass: "h-[716.58px]",
      images: [
        { src: imgGal136, heightClass: "h-[499px]", widthClass: "w-[372px]" },
        { src: imgGal137, heightClass: "h-[628px]" },                          // flex-grow
        { src: imgGal138, heightClass: "h-full",    widthClass: "w-[513px]" },
      ],
    },
    {
      containerHeightClass: "h-[710px]",
      images: [
        { src: imgGal139, heightClass: "h-[568px]", widthClass: "w-[440px]" },
        { src: imgGal140, heightClass: "h-[409px]", widthClass: "w-[327px]" },
        { src: imgGal136, heightClass: "h-full" },                             // flex-grow
      ],
    },

    {
      containerHeightClass: "h-[711px]",
      alignClass: "items-center", // ← center aligned, niche nahi chipkegi
      images: [
        { src: imgGal141, heightClass: "h-[567px]", widthClass: "w-[454px]" },
        { src: imgGal142, heightClass: "h-[560px]", widthClass: "w-[348px]" },
        { src: imgGal143, heightClass: "h-[721px]" },
      ],
    },
  ],

  // Project 1 has NO extra full-image screens
  extraFullImageScreens: undefined,

  testimonial: {
    testimonialBgColor: "#dad0ad",
    quote:        "Hiring Haritha at the start of our remodel was the best decision we made. She took the time to understand our vision, patiently refining every detail. The design package she created was a game-changer during execution, and thanks to her dedication, the project was completed ahead of schedule",
    attribution:  "Vivek S",
    quoteAccentColor: "#6b6e39",
    lineColor:        "#6B6E39",
    monogramImg:      imgMonogram,
    rotatedBannerImg: imgDecorativeTopRight,
    credits: [
      { label: "Design + styling", value: "Studio Inside Eye" },
      { label: "Build",            value: "ACH Builders"      },
      { label: "Architect",        value: "Kuop Designs"      },
      { label: "Photography",      value: "Steven Goans"      },
    ],
    enquiryEmail: "hello@studioinsideeye.com",
  },
};