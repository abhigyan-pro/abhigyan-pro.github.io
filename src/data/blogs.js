// Blog registry.
//
// `posts` is the flat list of every article (used for routing + lookup).
// `seriesList` groups posts into featured series for the /blogs index; a series
// either has `phases` (grouped) or a plain `postSlugs` list. Prev/Next
// navigation walks within a post's own series.
//
// To add a post: add it to `posts` (+ its Markdown in content/blogs/), then
// reference its slug from the right series below.

export const posts = [
  // ---- Series: Building a Research Computing Environment ----
  {
    slug: 'preface',
    file: 'Preface.md',
    label: 'Preface',
    badge: '✦',
    title: 'Series Preface & Blueprint',
    description:
      'An introductory blueprint outlining what you will learn throughout this 11-part guide to building a modern computational research environment.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part1', file: 'Part1.md', label: 'Part 1', badge: '01',
    title: 'Installing WSL2, Ubuntu & Miniconda',
    description:
      'Step-by-step installation of WSL2/Ubuntu on Windows 11, followed by unified Miniconda setup for both WSL2 and native Linux users.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part2', file: 'Part2.md', label: 'Part 2', badge: '02',
    title: 'Terminal Basics & Navigation',
    description:
      'Command-line essentials for navigating the Linux filesystem, managing directories, and mastering absolute versus relative file paths.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part3', file: 'Part3.md', label: 'Part 3', badge: '03',
    title: 'Managing Projects with Conda',
    description:
      'Isolating Python project dependencies using Miniconda to safely create, activate, and manage dedicated research environments.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part4', file: 'Part4.md', label: 'Part 4', badge: '04',
    title: 'Setting Up VS Code',
    description:
      'Configuring Visual Studio Code as your primary editor and seamlessly connecting it to your WSL and Conda environments.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part5', file: 'Part5.md', label: 'Part 5', badge: '05',
    title: 'Linux Essentials for HPC & Servers',
    description:
      'A foundational map for remote servers covering directory permissions, system software management via apt, SSH, and SLURM scheduling.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part6', file: 'Part6.md', label: 'Part 6', badge: '06',
    title: 'Git & GitHub for Researchers',
    description:
      'Configuring Git, setting up secure SSH authentication for GitHub, and mastering the daily four-command version control workflow.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part7', file: 'Part7.md', label: 'Part 7', badge: '07',
    title: 'Organizing Scientific Data',
    description:
      'Implementing reusable directory templates, keeping raw data read-only, and explicitly separating codebases from large scientific datasets.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part8', file: 'Part8.md', label: 'Part 8', badge: '08',
    title: 'Enabling GPU Computing with CUDA',
    description:
      'NVIDIA driver configuration for Windows/WSL and native Linux environments, explicitly designed to avoid system-level CUDA Toolkit conflicts.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part9', file: 'Part9.md', label: 'Part 9', badge: '09',
    title: 'PyTorch & TensorFlow Setup',
    description:
      'Building isolated Conda environments with pip-bundled CUDA packages for deep learning frameworks, complete with GPU benchmarks.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part10', file: 'Part10.md', label: 'Part 10', badge: '10',
    title: 'Reproducible Research Workflows',
    description:
      'Exporting environment dependencies, decoupling configurations via YAML/dotenv files, and packaging computational workflows with Docker.',
    image: '/img/blog1.png',
  },
  {
    slug: 'part11', file: 'Part11.md', label: 'Part 11', badge: '11',
    title: 'Contributing to Open Science',
    description:
      'Applying open-source licenses, minting citable Zenodo DOIs, executing pull requests, and building a public developer portfolio.',
    image: '/img/blog1.png',
  },

  // ---- Series: Downloading & Using Data ----
  {
    slug: 'gpm-dpr', file: 'GPM-DPR.md', label: 'Part 1', badge: '01',
    title: 'Downloading GPM DPR Data',
    description:
      'Download a spatially and temporally subset GPM DPR Level-2 dataset with Harmony and earthaccess, then validate the NetCDF files for download completeness and read integrity.',
    image: '/img/Download_Validate.png',
  },
]

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))

// Featured series shown on the /blogs index, in display order.
export const seriesList = [
  {
    id: 'research-computing',
    title: 'Building a Research Computing Environment',
    kicker: '11-Part Tutorial Series',
    description:
      'A complete practical guide taking researchers from a blank machine to a fully configured, reproducible, and GPU-enabled open-science workstation.',
    cover: '/img/blog1.png',
    prefaceSlug: 'preface',
    phases: [
      { title: 'The Local Workbench', range: 'Parts 1 – 4', slugs: ['part1', 'part2', 'part3', 'part4'] },
      { title: 'The Research Infrastructure', range: 'Parts 5 – 7', slugs: ['part5', 'part6', 'part7'] },
      { title: 'High-Performance Computing', range: 'Parts 8 – 9', slugs: ['part8', 'part9'] },
      { title: 'Open Science', range: 'Parts 10 – 11', slugs: ['part10', 'part11'] },
    ],
  },
  {
    id: 'downloading-data',
    title: 'Downloading & Using Data',
    kicker: 'New Series',
    description:
      'Practical guides for finding, downloading, and validating scientific datasets — starting with NASA GPM DPR precipitation radar.',
    cover: '/img/Download_Validate.png',
    postSlugs: ['gpm-dpr'],
  },
]

// Ordered slug list for a series (preface first, then phases, or the flat list).
function seriesOrder(series) {
  if (series.phases) {
    return [
      ...(series.prefaceSlug ? [series.prefaceSlug] : []),
      ...series.phases.flatMap((p) => p.slugs),
    ]
  }
  return series.postSlugs || []
}

// Prev/Next within the post's own series.
export function getAdjacentPosts(slug) {
  for (const series of seriesList) {
    const order = seriesOrder(series)
    const idx = order.indexOf(slug)
    if (idx !== -1) {
      return {
        prev: idx > 0 ? postBySlug[order[idx - 1]] : null,
        next: idx < order.length - 1 ? postBySlug[order[idx + 1]] : null,
      }
    }
  }
  return { prev: null, next: null }
}
