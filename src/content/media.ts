/**
 * Stock photography used as art-direction stand-ins until approved NForce One photography exists (PRD §12).
 * Every image is free to use under the Unsplash License. Stock images render only in review mode and
 * always carry a "Stock" tag. They must never be captioned as NForce One employees, offices or clients.
 */
export type StockImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  source: string;
  license: "Unsplash License";
};

const u = (id: string) => `https://unsplash.com/photos/${id}`;

export const stock = {
  teamMeeting: {
    src: "/stock/team-corporate-office.jpg",
    width: 2000,
    height: 1125,
    alt: "Business team collaborating around a table in a bright corporate office",
    credit: "Vitaly Gariev",
    source: u("_4tpElFQemQ"),
    license: "Unsplash License",
  },
  teamAroundScreen: {
    src: "/stock/team-around-screen.jpg",
    width: 2000,
    height: 1125,
    alt: "Colleagues gathered around a monitor reviewing work together",
    credit: "Vitaly Gariev",
    source: u("UikYLDQj9_I"),
    license: "Unsplash License",
  },
  engineersCoding: {
    src: "/stock/engineers-coding-table.jpg",
    width: 2000,
    height: 1334,
    alt: "Software engineers working on laptops at a shared table",
    credit: "Annie Spratt",
    source: u("QckxruozjRg"),
    license: "Unsplash License",
  },
  whiteboard: {
    src: "/stock/whiteboard-session.jpg",
    width: 2000,
    height: 1125,
    alt: "Team member presenting at a whiteboard to colleagues",
    credit: "Vitaly Gariev",
    source: u("K0aM-ztA76Q"),
    license: "Unsplash License",
  },
  celebration: {
    src: "/stock/team-celebration.jpg",
    width: 2000,
    height: 1125,
    alt: "Team celebrating together in an open-plan office",
    credit: "Vitaly Gariev",
    source: u("Kxo17w7BurY"),
    license: "Unsplash License",
  },
  colleaguesLaptop: {
    src: "/stock/colleagues-laptop.jpg",
    width: 2000,
    height: 1125,
    alt: "Two colleagues reviewing work on a laptop",
    credit: "Vitaly Gariev",
    source: u("YDWdxElP3XI"),
    license: "Unsplash License",
  },
  teamReview: {
    src: "/stock/team-review-laptop.jpg",
    width: 2000,
    height: 1125,
    alt: "Team reviewing a product on a laptop",
    credit: "Vitaly Gariev",
    source: u("yd_RKGH_RH4"),
    license: "Unsplash License",
  },
  workshopBoard: {
    src: "/stock/workshop-board.jpg",
    width: 2000,
    height: 1333,
    alt: "Planning board covered in sticky notes from a workshop",
    credit: "Walls.io",
    source: u("BuD00MfwvFY"),
    license: "Unsplash License",
  },
  fiberSwitch: {
    src: "/stock/fiber-switch.jpg",
    width: 2000,
    height: 1044,
    alt: "Fibre-optic cables connected to network switch ports",
    credit: "Lightsaber Collection",
    source: u("T-IN5o3kxyA"),
    license: "Unsplash License",
  },
  networkCabling: {
    src: "/stock/network-cabling.jpg",
    width: 2000,
    height: 1122,
    alt: "Structured network cabling in a data-center rack",
    credit: "Taylor Vick",
    source: u("M5tzZtFCOfs"),
    license: "Unsplash License",
  },
  cellTower: {
    src: "/stock/cell-tower.jpg",
    width: 2000,
    height: 1125,
    alt: "Telecom cell tower with antennas against a clear sky",
    credit: "Keriliwi",
    source: u("SSXCiGKYQQE"),
    license: "Unsplash License",
  },
  codeScreens: {
    src: "/stock/code-screens.jpg",
    width: 2000,
    height: 1301,
    alt: "Source code on computer screens",
    credit: "Jakub Żerdzicki",
    source: u("v-jFS1AsHXo"),
    license: "Unsplash License",
  },
} satisfies Record<string, StockImage>;
