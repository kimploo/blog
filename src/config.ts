import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://cosanam.com/", // replace this with your deployed domain
  author: "코사남 (Cosanam)",
  desc: "Cosanam dev log ",
  title: "Cosanam Dev Log",
  ogImage: "astropaper-og.jpg",
  postPerPage: 3,
  lightAndDarkMode: false,
};

export const LOCALE = {
  lang: "ko", // html lang code. Set this empty and default will be "en"
  langTag: ["ko-KR"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 140,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kimploo",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hong-shik-branden-kim-70922314a",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:kimploo@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  // {
  //   name: "YouTube",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: false,
  // },
];
