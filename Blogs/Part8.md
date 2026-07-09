# Part 8 — Project Organization and Scientific Data

*Python Development with WSL, Ubuntu, Miniconda, and VS Code — Part 8 of 12*

---

## Objective

You've been building `project_1` throughout this series. So far, the focus has been on tools — installing, configuring, connecting. But as your projects grow, how you organize them matters as much as the code itself.

A well-organized project is easier to understand, easier to share, and easier to come back to after six months away.

This part covers how to structure Python projects for research, where to keep your data, and how to store it safely.

By the end, you'll have:

- A standard project structure you can reuse across all your work
- A clear strategy for managing datasets
- An understanding of local and cloud storage options for research data

---

## Using This Article

If you get stuck at any step, use a ChatAI (Claude, ChatGPT, Gemini, or Grok) with this prompt:

> I am following this article: [paste this article's link]
> I am on Step [X].
> I did: [describe what you did]
> I got: [paste the exact error or describe what happened]
> Help me troubleshoot.

To go deeper on any step: *"I am following [link]. In Step X it says to run [command] — explain what each part does."*

---

## Prerequisites

- `~/project_1` set up with Git and GitHub ([Parts 3–7](#))

---

## Step 1 — Why Project Organization Matters

Imagine coming back to a project after six months. Files named `script_final_v3_FINAL.py`. Data mixed in with code. No README. No idea which script to run first.

This is more common than it should be — especially in research, where the pressure is to get results, not to organize files.

Good organization costs almost nothing upfront and saves enormous time later — when you're collaborating, when you're writing up results, when someone asks to reproduce your work.

---

## Step 2 — A Standard Project Structure

Here is a structure that works for most research projects:

```
project_1/
├── notebooks/        ← .ipynb files for exploration
├── scripts/          ← .py files for automation and pipelines
├── results/
│   ├── figures/      ← plots and visualizations
│   └── outputs/      ← model outputs, tables, summaries
├── environment.yml   ← Conda environment definition (Part 11)
├── .gitignore        ← files Git should ignore
└── README.md         ← what this project is and how to use it
```

You'll notice there is no `data/` folder here. Data has its own separate location — not inside `project_1`. We'll set that up in Step 4 and explain why.

**The key principle:** separate your inputs (data), your process (notebooks and scripts), and your outputs (results). Never mix them.

Create this structure inside `project_1`:

```bash
cd ~/project_1
```

```bash
mkdir -p notebooks scripts results/figures results/outputs
```

```bash
touch README.md
```

Verify:

```bash
find . -type d
```

---

## Step 3 — The Raw Data Rule

One rule that will save you repeatedly:

**Never modify raw data. Ever.**

Your raw data folder is read-only in practice — you load from it, you never write to it. If you need to clean or transform data, save the result to a separate processed folder. Your original data stays untouched.

Why? Because if something goes wrong in your processing — and it will — you can always go back to the original. If you've overwritten it, it's gone.

---

## Step 4 — Where Data Lives

In Part 3, we established the split:

- **Code → `/home/yourusername/projects/`**
- **Data → `/mnt/d/` (or whichever Windows drive you use)**

Here's why data lives separately from your code:

- Data files are often large — too large for GitHub and too large to keep inside your Linux home directory
- Raw data never changes — it doesn't need version control the way your code does
- Data is often shared across multiple projects — keeping it in one place means two projects can read the same dataset without duplicating it

So your data lives here — completely outside `project_1`:

```
/mnt/d/
└── datasets/
    └── project_1/
        ├── raw/          ← original data files, never modified
        └── processed/    ← cleaned, transformed data
```

Create this on your Windows drive:

```bash
mkdir -p /mnt/d/datasets/project_1/raw
mkdir -p /mnt/d/datasets/project_1/processed
```

Replace `d` with your actual drive letter.

**Native Linux users:** create this on a separate drive or a dedicated folder outside your home directory — for example `/data/datasets/project_1/`.

Your scripts in `~/project_1/scripts/` read from `/mnt/d/datasets/project_1/raw/` and write cleaned data to `/mnt/d/datasets/project_1/processed/`. Results and figures go into `~/project_1/results/`.

---

## Step 5 — Naming Conventions

Good names make projects navigable without opening files.

**Files:**
- Use lowercase and underscores: `process_data.py` not `ProcessData.py`
- Be descriptive: `clean_temperature_data.py` not `script2.py`
- Never use spaces in filenames

**Folders:**
- Short and lowercase: `scripts/`, `notebooks/`, `results/`

**Data files:**
- Include dates where relevant: `temperature_2024_01_raw.csv`
- Include version where relevant: `model_output_v2.csv`

**Notebooks:**
- Number them to show order: `01_explore_data.ipynb`, `02_clean_data.ipynb`
- This makes the workflow clear to anyone reading your project

---

## Step 6 — README.md

A README is the front door of your project. Anyone — including your future self — should be able to open it and understand what the project is and how to use it.

A minimal research README:

```markdown
# Project 1

## What this is
One paragraph describing the project and its goal.

## Data
Where the data comes from and where it is stored.
Example: Raw data is stored at `/mnt/d/datasets/project_1/raw/`

## How to run
Step by step instructions to reproduce the results.

## Environment
How to set up the Conda environment (covered in Part 11).

## Results
Where to find outputs and figures — `results/figures/` and `results/outputs/`.
```

Open your README and fill it in:

```bash
cd ~/project_1
nano README.md
```

---

## Step 7 — What Goes on GitHub and What Doesn't

GitHub is for code — not data. This is a common mistake researchers make early on.

**Push to GitHub:**
- Scripts (`.py`)
- Notebooks (`.ipynb`)
- `README.md`
- `.gitignore`
- `environment.yml` (Part 11)
- `results/figures/` — small plots and visualizations are fine

**Do not push to GitHub:**
- Data files of any kind
- Large output files
- Model weights
- Any file over a few MB

Since your data already lives outside `~/project_1/` on `/mnt/d/datasets/`, it will never accidentally get committed to GitHub. But your `results/outputs/` folder may contain large files — add it to `.gitignore` to be safe:

```bash
nano ~/project_1/.gitignore
```

Add these lines:

```
results/outputs/
*.csv
*.nc
*.h5
*.grib
```

---

## Step 8 — Storage Recommendations

As a researcher, your data lives in multiple places for different reasons.

### Local Storage

Your primary working storage — fast, always available, no internet needed.

- **Code** → `~/project_1/` (Linux home, backed up to GitHub)
- **Data** → `/mnt/d/datasets/` (Windows drive, large files)

Limitation: if your drive fails, data is gone. Always have a backup.

### Cloud Storage

**Google Drive**
Good for: sharing data with collaborators, backing up processed datasets, storing documents alongside data.
Not ideal for: very large datasets (storage limits apply).

**AWS S3**
Good for: large datasets, automated pipelines, storing model outputs at scale.
Used by: research groups and institutions with significant data volumes.
Note: costs money beyond the free tier.

**Zenodo**
Good for: publishing datasets permanently with a citable DOI. When you publish a paper, you can publish the associated dataset on Zenodo so others can cite and reuse it.
Free, open, and specifically designed for research data.

We'll cover Zenodo in more depth in Part 12 when we discuss Open Science.

---

## Step 9 — Domain-Specific File Formats

If your research involves scientific data, you'll likely encounter formats like:

- **netCDF** — widely used in climate, oceanography, and atmospheric science
- **HDF5** — used in physics, engineering, and machine learning for large structured datasets
- **GRIB** — used specifically in meteorology and weather forecasting (ECMWF, ERA5)

These formats require specific Python libraries (`xarray`, `h5py`, `cfgrib`) and have their own conventions. They are beyond the scope of this series — but a dedicated guide covering these formats and their libraries is planned for a future series.

If your research involves atmospheric or climate data specifically, Project Pythia is an excellent free resource covering Python workflows for geoscience:
[Project Pythia](https://projectpythia.org)

---

## What You've Done

- Built a standard project structure for research
- Understood why data lives separately from code
- Applied the raw data rule
- Organized data storage across local and cloud
- Learned naming conventions for files and folders
- Written a README
- Configured `.gitignore` to protect large files from GitHub
- Got a map of domain-specific scientific data formats

**Next:** [Part 9 — Enabling GPU Computing in WSL with CUDA](#)