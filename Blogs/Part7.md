# Project Organization and Managing Scientific Data
### Phase 2: The Research Infrastructure — Part 3
(Part 7 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

Follow me :
<p align="left">
  <a href="https://www.linkedin.com/in/abhigyan-chakraborty/"
     target="_blank"
     rel="noopener noreferrer"
     title="LinkedIn">
    <img src="../img/linkedin.svg" alt="LinkedIn" width="24" height="24">
  </a>
  &nbsp;&nbsp;
  <a href="https://abhigyan-pro.github.io/"
     target="_blank"
     rel="noopener noreferrer"
     title="Website">
    <img src="../img/website.svg" alt="Website" width="24" height="24">
  </a>
  &nbsp;&nbsp;
  <a href="https://abhigyan-pro.github.io/#blogs"
     target="_blank"
     rel="noopener noreferrer"
     title="Blogs">
    <img src="../img/Blog.svg" alt="Website" width="24" height="24">
  </a>
</p>

---

## Quick Summary

This article establishes a reusable project structure for research code, sets the rule that raw data is never modified, and separates data storage from code storage entirely. It also covers naming conventions, writing a README, what belongs on GitHub versus what doesn't, and where research data can live — locally, in the cloud, or published with a citable DOI.

---

## Objective

You've been building `project_1` throughout this series. So far, the focus has been on tools — installing, configuring, connecting. But as your projects grow, how you organize them matters as much as the code itself.

A well-organized project is easier to understand, easier to share, and easier to come back to after six months away.

By the end, you'll have:
- A standard project structure you can reuse across all your work
- A clear strategy for managing datasets
- An understanding of local and cloud storage options for research data

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Grok, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Open this link in a new tab: [Part7.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part7.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part7.md` into the chat).

  **3. Ask for Help**
  Copy and paste this exact prompt into the chat along with your file:

  > I have attached the markdown file for the tutorial I am following. Please read it so you understand the specific environment I am trying to build.
  >
  > I need help with the following:
  >
  > **Step [X]:** [paste exact step text from the blog]
  >
  > **Command I ran:** [paste exact command]
  >
  > **What happened:** [paste full output/error — if the terminal was truly blank, say so explicitly]
  >
  > Please help me troubleshoot and fix this error. You can use your general knowledge to solve the problem, but your solution MUST align with the architecture and tools taught in the attached file. Do not suggest alternative setups that contradict the tutorial. Once fixed, tell me what to do next in the article.

  **To go deeper on a step before you run a command:**

  > I have attached the `Part7.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- `~/project_1` set up with Git and GitHub ([Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html), [Part 5](https://abhigyan-pro.github.io/Blogs/Part5.html), and [Part 6](https://abhigyan-pro.github.io/Blogs/Part6.html))

### Step 1 — Why Project Organization Matters

Imagine coming back to a project after six months. Files named `script_final_v3_FINAL.py`. Data mixed in with code. No README. No idea which script to run first.

This is more common than it should be — especially in research, where the pressure is to get results, not to organize files. Good organization costs almost nothing upfront and saves enormous time later.

### Step 2 — A Standard Project Structure

Here is a structure that works for most research projects:

```text
project_1/
├── notebooks/        ← .ipynb files for exploration
├── scripts/          ← .py files for automation and pipelines
├── results/
│   ├── figures/      ← plots and visualizations
│   └── outputs/      ← model outputs, tables, summaries
├── environment.yml   ← Conda environment definition
├── .gitignore        ← files Git should ignore
└── README.md         ← what this project is and how to use it
```

**The key principle:** separate your inputs (data), your process (notebooks and scripts), and your outputs (results).

Create this structure:
```bash
cd ~/project_1
mkdir -p notebooks scripts results/figures results/outputs
touch README.md
```

### Step 3 — The Raw Data Rule

**Never modify raw data. Ever.**

Your raw data folder is read-only in practice — you load from it, you never write to it. If you need to clean or transform data, save the result to a separate processed folder.

### Step 4 — Where Data Lives

We follow this split:
- **Code → `/home/yourusername/projects/`**
- **Data → `/mnt/d/` (or whichever Windows drive you use)**

Keep data outside `project_1` because it is often large, doesn't need version control, and is shared across projects.

Create this on your Windows drive (or Linux equivalent):
```bash
mkdir -p /mnt/d/datasets/project_1/raw
mkdir -p /mnt/d/datasets/project_1/processed
```

### Step 5 — Naming Conventions

- **Files**: Use lowercase, underscores, and be descriptive (e.g., `clean_temperature_data.py`).
- **Folders**: Short and lowercase (e.g., `scripts/`).
- **Data files**: Include dates (`temperature_2024_01_raw.csv`) and versions (`v2.csv`).
- **Notebooks**: Number them to show order (`01_explore.ipynb`).

### Step 6 — README.md

A README is the front door of your project. Open and fill it in:
```bash
cd ~/project_1
nano README.md
```

Include sections for: What this is, Data location, How to run, Environment setup, and Results.

### Step 7 — What Goes on GitHub and What Doesn't

GitHub is for code — not data.

- **Push**: Scripts, notebooks, README, `.gitignore`, environment files, small plots.
- **Do not push**: Data files, large output files, model weights, or any file over a few MB.

Add large items to `.gitignore`:
```bash
nano ~/project_1/.gitignore
```

### Step 8 — Storage Recommendations

- **Local Storage**: Your primary working storage (`~/project_1/` for code, `/mnt/d/datasets/` for data).
- **Cloud Storage**: Google Drive for sharing/backups; AWS S3 for large datasets; **Zenodo** for publishing datasets permanently with a citable DOI.

### Step 9 — Domain-Specific File Formats

If your research involves scientific data, you'll likely encounter formats like **netCDF**, **HDF5**, and **GRIB**. These require specific libraries like `xarray` or `h5py`. For geoscientific workflows, explore [Project Pythia](https://projectpythia.org).

---

## What's Next

**What You've Done:**
- Built a standard research project structure
- Applied the raw data rule and data-code separation
- Configured `.gitignore` and README best practices
- Learned about storage tiers and scientific data formats

**Next:** [Part 8 — Enabling GPU Computing in WSL2 and Linux with CUDA](https://abhigyan-pro.github.io/Blogs/Part8.html)
|
**Previous:** [Part 6 — Git and GitHub for Reproducible Research](https://abhigyan-pro.github.io/Blogs/Part6.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)