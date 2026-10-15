// Gallery of conferences, summer schools, and events (most recent first).
// `description` is a list of { label, text } blocks; `photos` are full paths.

export const events = [
  {
    id: 'arm-2026',
    title: '2026 ARM Big Open Data Science Summer School',
    dates: '18–22 May 2026',
    location: {
      label: 'National Weather Center, Oklahoma, USA',
      href: 'https://www.ou.edu/nwc',
    },
    links: [
      {
        label: 'ARM Summer School 2026 Website',
        href: 'https://arm-development.github.io/arm-summer-school-2026/',
      },
      {
        label: 'Hackathon Project',
        href: 'https://arm-development.github.io/arm-summer-school-2026/final-projects/#:~:text=Chakraborty%20et%20al.%20(2026)',
      },
    ],
    description: [
      {
        label: 'What is the ARM Summer School about?',
        text: "The ARM Summer School is a training program organized by the U.S. Department of Energy's Atmospheric Radiation Measurement (ARM) User Facility that equips students and early-career researchers with modern approaches to atmospheric science using observations, scientific computing, artificial intelligence, and open-science practices. This year's program was hosted at the National Weather Center (NWC), University of Oklahoma, in collaboration with the Cooperative Institute for Severe and High-Impact Weather Research and Operations (CIWRO).",
      },
      {
        label: 'What I learned',
        text: 'The program provided valuable insights into the observational infrastructure, computational workflows, and open-science practices that support atmospheric research. It was also a wonderful opportunity to exchange ideas with researchers from the ARM User Facility, Argonne National Laboratory, CIWRO, and the University of Oklahoma, while building new friendships with fellow participants who share a passion for atmospheric science, AI, and open science.',
      },
    ],
    photos: Array.from({ length: 12 }, (_, i) => `/img/gallery/ARM${i + 1}.jpg`),
  },
  {
    id: 'acm-2026',
    title:
      '2026 ACM Second Asian School on High-Performance Computing and Artificial Intelligence',
    dates: '30 January – 3 February 2026',
    location: {
      label: 'RIKEN Center for Computational Science, Kobe, Japan',
      href: 'https://www.r-ccs.riken.jp/en/',
    },
    links: [
      {
        label: '2026 ACM Asian School on HPC and AI Website',
        href: 'https://europe.acm.org/seasonal-schools/asean/2026/acm-asean-school-2026',
      },
    ],
    description: [
      {
        label: 'What is the ACM Asian School about?',
        text: "The ACM Second Asian School on High-Performance Computing and Artificial Intelligence is a training program organized by the Association for Computing Machinery (ACM) that equips students and early-career researchers with modern approaches to scientific computing, high-performance computing (HPC), artificial intelligence, and large-scale numerical simulations. This year's program was hosted at the RIKEN Center for Computational Science (R-CCS), Kobe, Japan, where participants received hands-on training using the Fugaku supercomputer and the SCALE-RM cloud-resolving model.",
      },
      {
        label: 'What I learned',
        text: 'The program provided valuable insights into high-performance computing workflows, large-scale numerical simulations, and AI-driven scientific computing. It was also a wonderful opportunity to interact with researchers, instructors, and fellow participants from across Asia while exchanging ideas and building new friendships with people who share a passion for computational science, Earth system science, and artificial intelligence.',
      },
    ],
    photos: [1, 13, 2, 9, 10, 5, 6, 17, 4, 11, 16, 3].map(
      (n) => `/img/gallery/ACM/Photo${n}.jpeg`,
    ),
  },
  {
    id: 'iahs-2025',
    title:
      '2025 International Association of Hydrological Sciences | 11th Scientific Assembly',
    dates: '5–10 October 2025',
    location: {
      label: 'IIT Roorkee, India',
      href: 'https://www.iahs2025.com/',
    },
    links: [{ label: 'IAHS Website', href: 'https://iahs.info/' }],
    description: [
      {
        label: 'Conference Highlights',
        text: 'The IAHS 2025 Scientific Assembly, held at IIT Roorkee, brought together researchers and practitioners from across the hydrological and atmospheric science communities to share recent scientific advances and foster collaboration. During the conference, I presented a poster titled "Disentangling the Effects of Aerosols on Precipitation under Varying Meteorological Conditions", where I had the opportunity to discuss my research with prominent scientists, receive valuable feedback, exchange ideas, and learn about the latest developments in hydrology, atmospheric science, and related fields.',
      },
    ],
    photos: Array.from(
      { length: 8 },
      (_, i) => `/img/gallery/IAHS/Photo${i + 1}.jpeg`,
    ),
  },
  {
    id: 'ingarss-2024',
    title: '2024 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
    dates: '2–5 December 2024',
    location: {
      label: 'NIT Goa, Goa, India',
      href: 'https://share.google/t3xhvpp666H7J9Ugv',
    },
    links: [
      {
        label: 'InGARSS Website',
        href: 'https://www.grss-ieee.org/resources/news/ingarss-2024/',
      },
    ],
    description: [
      {
        label: 'Conference Highlights',
        text: 'The 2024 IEEE India Geoscience and Remote Sensing Symposium (InGARSS), conducted by IEEE GRSS and hosted by NIT Goa, brought together researchers and professionals working in geoscience, remote sensing, artificial intelligence, and geospatial technologies. During the conference, I presented my paper, "Predicting and Mapping Flood Susceptibility Leveraging Explainable AI and GIS Techniques", in the session on AI/ML Applications in Natural Disaster Management, where it received the Best Paper Award (1st Prize). The conference also provided an excellent opportunity to attend technical sessions, workshops, and networking events, while interacting with researchers, industry experts, and fellow participants and learning about the latest advances in remote sensing, AI, and geospatial technologies.',
      },
    ],
    photos: [4, 2, 3, 1, 5, 6, 7, 8].map(
      (n) => `/img/gallery/INGARSS/Photo${n}.jpeg`,
    ),
  },
  {
    id: 'ipwg-2024',
    title: '11th International Precipitation Working Group (IPWG) Workshop',
    dates: '15–18 July 2024',
    location: {
      label: 'Tokyo Institute of Technology, Tokyo, Japan',
      href: 'https://www.titech.ac.jp/english',
    },
    links: [
      {
        label: 'IPWG Website',
        href: 'https://www.eorc.jaxa.jp/IPWG/meetings/tokyo-2024/Tokyo2024.html',
      },
    ],
    description: [
      {
        label: 'Conference Highlights',
        text: 'The 11th International Precipitation Working Group (IPWG) Workshop, hosted by the Tokyo Institute of Technology, Japan, brought together researchers from around the world working on precipitation measurement, retrieval algorithms, satellite observations, and hydrometeorological applications. During the workshop, I presented my research through a poster, which provided an excellent opportunity to discuss my work with leading experts, receive valuable feedback, and exchange ideas with researchers from diverse backgrounds. Beyond the scientific sessions, the workshop offered an inspiring environment for learning, collaboration, and networking, further strengthening my interest in precipitation science and satellite remote sensing.',
      },
    ],
    photos: Array.from(
      { length: 8 },
      (_, i) => `/img/gallery/IPWG/Photo${i + 1}.jpeg`,
    ),
  },
]
