// ─────────────────────────────────────────────────────────────────────────────
// Project 2 – Pewter  (data-only, no JSX)
// Has 2 extra full-image screens (Experience4 + Experience5).
// To add a new project, copy this file, fill in your values, then register
// the slug in src/router/projectRoutes.tsx.
// ─────────────────────────────────────────────────────────────────────────────
import type { ProjectData } from "./types";

// ── Image imports ─────────────────────────────────────────────────────────────
import imgHeroBgTexture      from "../assets/adbe511abb684cf81f1cb3187f8b71a3a00b3c31.png";
import imgHeroPortrait       from "../assets/d2c1ad13369df475ff40ba177a40c02568e80cea.png";
import imgPattern65          from "../assets/aebe02d3d339cdc59b4730399fc4b35a1fa1b42b.png";
import imgConceptBgTexture   from "../assets/47db141b7dbab58b232f8ff786dd3c5206a565ea.png";
import imgLogo               from "../assets/51f0049bcba326b79ac8dbd04411794e96785978.png";
import imgConceptMain        from "../assets/22b61f246034f4eebf9bedb200c79e7084b2f598.png";
import imgExpImg126          from "../assets/2646bf724c5a5679d64a97faa5e038679005ba85.png";
import imgExpImg130          from "../assets/1290bcbc66d8cb9c6891afc877e01b7557753980.png";
import imgExpImg133          from "../assets/f733ca6430fe28021eb569f5d0d1c4765edeed4d.png";
import imgExpImg132          from "../assets/0b12a8c5a40df7195dc4342989f9b71aaac87595.png";
import imgExpImg134          from "../assets/0b750380316040ad693e71260b5ddf702e2d3a34.png";
import imgExpImg135          from "../assets/16e80817e27524a80029f8df823a7d68b50d75b9.png";
import imgExpImg107          from "../assets/3c69fed734b46e09bcbca5fd64d204e588c1d31e.png";
import imgLogo2              from "../assets/ef5789f32fa9b15364e39033c5d7cb0a9747ec22.png";
import imgGal136             from "../assets/84770e53466dfe366e2f00008755009ec0ce1d94.png";
import imgGal137             from "../assets/95455aa112d5b23c9e940c3bffa75c46da6e5329.png";
import imgGal138             from "../assets/ac0a7c14663405440426cf8d69d59a4380ed03ce.png";
import imgGal139             from "../assets/a46e800d28d29ee8c4e4c5d2a04378cc0a2d1812.png";
import imgGal140             from "../assets/efc71c384a0251d234298e5f2617deb8e244a73b.png";
import imgGal141             from "../assets/e082cba7a817983136cef61741d94694fd8f967b.png";
import imgGal142             from "../assets/22ca74ee27305a8eb6ab0f48dce032bd84b76f60.png";
import imgGal143             from "../assets/8c7f6a8adff8d9b7501886badcc4f50fe9aaf2c2.png";
import imgGal144             from "../assets/00dcb4825989144a087f74ed3d93c167e5dc1f1a.png";
import imgExtra145           from "../assets/39a72d410556ab707c34baf3357dd96c98b90d52.png";
import imgExtra146           from "../assets/2f34cdcf685a216dedefab7556a79fa2ff9e2c41.png";
import imgMonogram           from "../assets/d87dee7cf855200a2e6a5e94ab9c18ba04501572.png";
import imgBanner             from "../assets/95a80092b73db2ef00faba24cace5f66a65bce57.png";

export const project2Data: ProjectData = {
  slug: "project-2",

  intro: {
    projectName:          "Pewter",
    projectNameColor:     "#6b6e39",
    description:          "Designed to reflect the clients' love for a calm, airy, and welcoming home, this full interior and exterior renovation focused on creating spaces that feel effortless, connected, and deeply comfortable. ",
    sideParagraph:        "Warm tones, rich textures, and thoughtful details were layered throughout the home to establish a sense of warmth and quiet sophistication",
    location:             "LOCATION",
    year:                 "YEAR",
    category:             "INTERIORS",
    sqft:                 "1400 SQFT",
    heroPanelBg:          "#6b6e39",
    heroPanelOverlayBg:   "rgba(107,110,57,0.1)",
    decorativeTopRightImg: imgHeroBgTexture,
    heroPortraitImg:      imgHeroPortrait,
    patternImg:           imgPattern65,
    navStrokeColor:       "#6B6E39",
    navLeftCalc:          "calc(91.67% + 34px)",
  },

  concept: {
    bgTextureImg:    imgConceptBgTexture,
    bgPatternImg:    imgPattern65, 
    mainImg:         imgConceptMain,
    logoImg:         imgLogo,
    headingLine1:    "The Art of ",
    headingLine2:    "Restraint",
    headingColor:    "#6b6e39",
    subDescription:  "A carefully edited material palette allows texture, proportion, and light to take center stage.",
    bodyParagraph1:  " Clean lines and subtle patterns bring a sense of understated drama, while carefully curated elements add depth, warmth, and character throughout the home.",
    bodyParagraph2:  "The result is a home that feels refined yet relaxed  balancing openness with intimacy, and simplicity with moments of understated drama.",
    navStrokeColor:  "#8C6C3C",
    navLeftCalc:     "calc(91.67% + 72px)",
  },

  experience: {
    bgColor:            "#6b6e39",
    bgTextureImg:       imgHeroBgTexture,
    logoImg:            imgLogo2,
    experienceSubtitle: "A home that feels effortless to move through, with spaces that naturally bring people together.",
    navStrokeColor:     "#FFE0B2",
    navLeftCalc:        "calc(91.67% + 36px)",
    images: [
      { src: imgExpImg126, className: "absolute h-[344px] left-[calc(33.33%+103px)] top-[-34px] w-[240px]" },
      { src: imgExpImg130, className: "absolute h-[173px] left-[-17px] top-[168px] w-[260px]" },
      { src: imgExpImg133, className: "absolute bottom-[50px] h-[134px] left-[calc(41.67%+73px)] w-[107px]" },
      { src: imgExpImg132, className: "absolute bottom-[-2px] h-[209px] left-[calc(75%+67px)] w-[301px]" },
      { src: imgExpImg134, className: "absolute bottom-0 h-[314px] left-[113px] w-[235px]" },
      { src: imgExpImg135, className: "absolute h-[306px] left-[calc(83.33%-4px)] top-[110px] w-[203px]" },
      { src: imgExpImg107, className: "absolute bottom-[102px] h-[102px] left-[calc(50%+28px)] w-[150px]" },
    ],
  },

  galleryBgColor:      "#6e713e",
  galleryBgTextureImg: imgHeroBgTexture,

  galleryScreens: [
    {
      containerHeightClass: "h-[716.58px]",
      images: [
        { src: imgGal136, heightClass: "h-[499px]", widthClass: "w-[388px]" },
        { src: imgGal137, heightClass: "h-[628px]" },
        { src: imgGal138, heightClass: "h-full",    widthClass: "w-[513px]" },
      ],
    },
    {
      containerHeightClass: "h-[710px]",
      images: [
        { src: imgGal139, heightClass: "h-[568px]", widthClass: "w-[440px]" },
        { src: imgGal140, heightClass: "h-[409px]", widthClass: "w-[327px]" },
        { src: imgGal141, heightClass: "h-full" },
      ],
    },
    {
      images: [
        { src: imgGal142, heightClass: "h-full",    widthClass: "w-[472px]" },
        { src: imgGal143, heightClass: "h-full" },
        { src: imgGal144, heightClass: "h-[721px]" },
      ],
    },
  ],

  // ── 2 extra full-image screens unique to Project 2 ─────────────────────────
  extraFullImageScreens: [
    { src: imgExtra145, widthPx: 1129 },
    { src: imgExtra146, widthPx: 1129 },
  ],

  testimonial: {
    testimonialBgColor: "#dad0ad",
    quote:        "Hiring Haritha at the start of our remodel was the best decision we made. She took the time to understand our vision, patiently refining every detail. The design package she created was a game-changer during execution, and thanks to her dedication, the project was completed ahead of schedule",
    attribution:  "Vivek S",
    quoteAccentColor: "#6b6e39",
    lineColor:        "#6B6E39",
    monogramImg:      imgMonogram,
    rotatedBannerImg: imgBanner,
    credits: [
      { label: "Design + styling", value: "Studio Inside Eye" },
      { label: "Build",            value: "ACH Builders"      },
      { label: "Architect",        value: "Kuop Designs"      },
      { label: "Photography",      value: "Steven Goans"      },
    ],
    enquiryEmail: "hello@studioinsideeye.com",
  },
};
