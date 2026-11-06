/**
 * portfolioData.js
 * Single source of truth for all personal content shown on the site.
 * Edit the values below to update the content everywhere – no other file
 * needs to change.
 *
 * Image paths are relative to the /public folder (e.g. "images/profile.svg").
 */

export const personalInfo = {
  legalName: 'Charles Shalua',
  initials: 'CS',
  jobTitle: 'AI Engineer',
  profileImage: 'images/profile.png',
  resumeFile: 'resume.pdf',
  welcomeMessage:
    "Hi, I'm Charles, an AI engineer in Toronto. I build AI systems that read real documents, like electrical drawings, and draft the work for a person to check and approve.",
  missionStatement:
    'My mission is to build AI that people can trust: tested against real results, honest about its limits, and always leaving the final decision to a person.',
  // Short paragraphs shown on the About page
  aboutParagraphs: [
    "I'm an AI engineer based in Toronto and the founder of Data-Life Tech, where I build AI systems for electrical contractors. My systems read drawings, count devices and draft estimates and contracts, and the estimator checks and approves everything before it goes out.",
    "In the summer of 2026 I was one of six engineers who built ElectricBid Pro for Alton Electric. I built the part that reads the drawings, and I tested it against a count I did by hand so we knew how accurate it really was. I'm also studying Software Engineering and AI at Centennial College.",
    "Away from the keyboard you'll find me playing or watching football, or deep in a video game. Both keep me competitive, and both have taught me that good teamwork wins more than any single play.",
  ],
}

// Exact, approved wording from Densley Thomas's LinkedIn recommendation
export const testimonial = {
  quote:
    "He didn't pick the fancy-sounding answer; he picked the one that was actually right, and he proved it.",
  author: 'Densley Thomas',
  authorRole: 'President, Alton Electric',
}

export const contactInfo = {
  email: 'charlesshalua01@gmail.com',
  phone: '+1 (613) 363-8543',
  location: 'Toronto, Canada',
  githubUrl: 'https://github.com/charlesAlgo',
  linkedinUrl: 'https://www.linkedin.com/in/charles-shalua/',
  websiteUrl: 'https://data-life.tech',
}

export const projects = [
  {
    id: 'alton-ai-takeoff',
    title: 'Alton Electric – AI Drawing Takeoff',
    image: 'images/project-1.svg',
    role: 'Engineer on a team of six, building ElectricBid Pro',
    description:
      "I built the part of Alton Electric's estimating app that reads electrical drawings. It sorts the pages, reads each sheet one small section at a time, counts each device once and drafts the count for the estimator to approve.",
    outcome:
      'I hand-counted a real sheet (39 devices) to test it. The shipped nine-section setting over-counted by 58%, while four sections came within about 1%, so we changed the default before release. Alton’s estimators report that a takeoff now takes 5–10 minutes instead of 2–3 hours.',
    technologies: ['JavaScript', 'Node.js', 'Electron', 'PDFium (WebAssembly)', 'Vision AI model'],
  },
  {
    id: 'alton-release-quality',
    title: 'Alton Electric – ElectricBid Pro Release & Quality',
    image: 'images/project-2.svg',
    role: 'Engineer – data integrity, CI, testing and release',
    description:
      'Beyond the AI work, I helped make ElectricBid Pro safe to hand to real estimators: keeping data in sync across machines, building the CI pipeline, acceptance testing and preparing the release.',
    outcome:
      '37 pull requests opened and 36 merged (about 16,400 lines) with 29 test suites. Version 1.0.0 shipped on 4 Sep 2026 and is in use on Alton’s live bids.',
    technologies: ['JavaScript', 'Node.js', 'PostgreSQL', 'GitHub Actions', 'Electron Builder'],
  },
  {
    id: 'data-life-website',
    title: 'Data-Life Tech – Agency Website & Booking System',
    image: 'images/project-3.svg',
    role: 'Founder and sole engineer',
    description:
      'The website for my AI engineering agency, data-life.tech. It is built around a simple path for contractors: a free audit form, an emailed report and a booked 30-minute call.',
    outcome:
      'The booking system is live: every booking is verified, saved to the database and announced by Slack and email. The public site is in pre-launch while the audit form is finished.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
  },
]

export const education = [
  {
    id: 'centennial-advanced-diploma',
    qualification: 'Advanced Diploma in Software Engineering and AI',
    institution: 'Centennial College',
    startYear: '2025',
    endYear: '2028 (expected)',
    details:
      "Industry placement (summer 2026): engineer on the six-person team that built ElectricBid Pro for Alton Electric.",
  },
  {
    id: 'claude-code-certificate',
    qualification: 'Claude Code in Action Certificate',
    institution: 'Anthropic',
    startYear: 'Completed',
    endYear: 'Completed',
    details: 'Professional certificate in building software with Claude Code.',
  },
  {
    id: 'google-data-analytics',
    qualification: 'Google Data Analytics Professional Certificate',
    institution: 'Google, via Coursera',
    startYear: 'Completed',
    endYear: 'Completed',
    details: 'Data cleaning, analysis and visualisation with spreadsheets, SQL and dashboards.',
  },
]

// Services offered through Data-Life Tech
export const services = [
  {
    id: 'ai-takeoff',
    title: 'AI Drawing Takeoff',
    image: 'images/service-takeoff.svg',
    description:
      'A system that reads your plan sheets and counts every outlet, light and switch, so your estimator checks a count instead of making one.',
  },
  {
    id: 'estimate-drafting',
    title: 'Estimate Drafting',
    image: 'images/service-estimate.svg',
    description:
      'I connect the counts to your own price list and supplier quotes, and the system drafts the estimate for you to review.',
  },
  {
    id: 'contract-drafting',
    title: 'Contract Drafting',
    image: 'images/service-contract.svg',
    description:
      'From your sample contracts, the system learns your scope wording, exclusions and terms, then drafts each new contract in your words. You approve every word.',
  },
  {
    id: 'accuracy-check',
    title: 'Accuracy Check',
    image: 'images/service-accuracy.svg',
    description:
      'One hand-counted drawing is a small test. I run the same check on your drawings before you rely on a single number.',
  },
]
