// Central profile content. Shared across Home, About, and Contact pages.
import { publishedCount } from './publications.js'

export const profile = {
  name: 'Abhigyan Chakraborty',
  firstName: 'Abhigyan',
  role: 'PhD Researcher · Atmospheric Science & Explainable AI',
  // Short affiliation chip shown above the hero name.
  affiliation: 'PhD Candidate · IIT Hyderabad · MEGHA Lab',
  // The hero headline is split so the accent phrase can be styled.
  headline: {
    name: 'Abhigyan Chakraborty',
    lead: 'I study how',
    accent: 'aerosols, clouds & weather',
    trail: 'shape precipitation — with machine learning and Explainable AI.',
  },
  tagline:
    'Understanding comes before prediction, and curiosity comes before understanding.',
  bio: 'I explore the why and how of aerosol–cloud–meteorology–precipitation interactions using machine learning and Explainable AI to support better weather and climate policy.',
  heroImage: '/img/hero.jpeg',
  cvUrl:
    'https://drive.google.com/file/d/1OXEkQg863aqgytOe9cFcdec1Ro8dLIK3/view?usp=drive_link',
  location: 'IIT Hyderabad, Sangareddy, Telangana-502284',
  email: 'ce23resch12001@iith.ac.in',
}

// Quick credibility signals for the hero highlights strip.
// The Publications count is derived from the publications list, so adding a
// paper in publications.js updates this automatically. The other counts are
// manual — edit the numbers below when you have new ones.
export const highlights = [
  { value: String(publishedCount), label: 'Publications' },
  { value: '3', label: 'Conferences' },
  { value: '2', label: 'Summer Schools' },
  { value: '3', label: 'Travel Grants' },
]

// Floating glass "spotlight" card over the hero portrait (links to Contact).
export const spotlight = {
  label: 'Open to',
  title: 'Research collaborations & talks',
  sub: 'Atmospheric science · ML · XAI',
  to: '/contact',
  cta: 'Get in touch',
}

// Social / professional links. `icon` maps to the inline SVG set in SocialLinks.
export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/abhigyan-pro',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhigyan-chakraborty/',
    icon: 'linkedin',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=quEr4wYAAAAJ&hl=en&authuser=1',
    icon: 'scholar',
  },
  {
    label: 'MEGHA Research Group',
    href: 'https://meghalab.in/',
    icon: 'megha',
    image: '/img/megha-logo.jpg',
  },
]
