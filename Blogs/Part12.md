# Part 12 — Contributing to Open Science

*Python Development with WSL, Ubuntu, Miniconda, and VS Code — Part 12 of 12*

---

## Objective

You've built a working Python development environment, organized your projects, managed dependencies, and learned version control. The final step is sharing that work — responsibly, clearly, and in a way that others can actually use.

This part is about contributing to the broader scientific and open-source community. Not because it's required, but because science moves faster when work is shared, reused, and improved by others.

By the end, you'll understand:

- What Open Science is and why it matters
- How to share code, data, and models responsibly
- How to choose a license
- How to contribute to existing open-source projects
- How to build a public presence as a scientific software developer

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

- Git and GitHub set up ([Part 7](#))
- Project organized and documented ([Parts 8 and 11](#))

---

## Section 1 — What is Open Science?

Open Science is the practice of making scientific research — data, methods, code, and results — publicly available so others can access, reuse, and build on it.

It's not a new idea. Science has always relied on sharing — publishing papers, describing methods, citing sources. Open Science extends this to the digital artifacts that modern research produces: code, datasets, models, and workflows.

**Why it matters:**

- **Reproducibility** — others can verify your results, not just read about them
- **Efficiency** — researchers don't duplicate work that's already been done
- **Impact** — work that can be reused gets cited more and contributes more
- **Trust** — transparent methods build credibility

For researchers who write code, Open Science means: share your code, document it well, and make it possible for others to reproduce your results.

---

## Section 2 — Sharing Code on GitHub

In Part 7, we pushed `project_1` to GitHub. That's the foundation. Here's what makes a shared repository actually useful to others.

### Make Your Repository Public

A private repository is invisible to the world. To share your work:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Danger Zone** → **Change visibility**
4. Select **Public**

### What a Good Public Repository Includes

- `README.md` — explains what the project is, how to set it up, and how to run it
- `environment.yml` — so others can recreate your exact Conda environment
- `requirements.txt` — for non-Conda users
- `LICENSE` — tells others what they're allowed to do with your code
- `.gitignore` — keeps data, credentials, and build artifacts out of the repository
- `.env.example` — a safe template showing what environment variables are needed

We covered all of these in Parts 8 and 11. A public repository is simply a private one with these files in place.

---

## Section 3 — Writing an Effective README

In Part 11, we wrote a project README. For a public repository, it needs to go one step further — it's the first thing anyone sees, and it decides whether they keep reading or move on.

A public README should answer five questions immediately:

**1. What does this do?**
One or two sentences. No jargon. If someone outside your field reads it, they should understand the purpose.

**2. Who is it for?**
Researchers in X field, students learning Y, developers building Z.

**3. How do I set it up?**
Exact commands, in order. Don't assume familiarity with your tools.

**4. How do I run it?**
A minimal working example. Show the output.

**5. How do I cite it?**
If you want credit, make it easy to give. Include a citation block — covered in Section 5.

A README that answers these five questions will serve most users without them needing to contact you.

---

## Section 4 — Choosing an Open-Source License

Without a license, your code is technically copyrighted by default — others cannot legally use, modify, or distribute it, even if it's public on GitHub.

A license tells others what they're allowed to do.

### Common Licenses for Research Software

**MIT License**
- Simple and permissive
- Others can use, modify, and distribute your code — including in commercial products
- Only requirement: keep your name in the license
- **Good default for most research code**

**Apache 2.0**
- Similar to MIT but includes explicit patent protection
- Good for larger projects or projects with institutional backing

**GPL (GNU General Public License)**
- Anyone who uses your code in their project must also open-source their project under GPL
- Good if you want to ensure your work stays open

**Creative Commons (for data and writing — not code)**
- CC BY — others can use with attribution
- CC BY-SA — others must share derivatives under the same license
- CC BY-NC — non-commercial use only

### How to Choose

Go to [https://choosealicense.com](https://choosealicense.com) — answer a few questions and it recommends the right license for your situation.

For most researchers sharing code: **MIT** is the simplest and most widely understood choice.

### Adding a License to Your Repository

1. Go to your repository on GitHub
2. Click **Add file → Create new file**
3. Name it `LICENSE`
4. Click **Choose a license template**
5. Select your license, fill in your name and year
6. Commit the file

---

## Section 5 — Citing Software and Datasets

Research software and datasets should be citable — just like papers. This gives credit to the people who built the tools you used, and makes your own work citable by others.

### Citing Software You Use

When you use a Python package in your research, cite it. Most major packages have a preferred citation — check their documentation or GitHub repository.

For example, numpy asks to be cited as:

> Harris, C.R., et al. (2020). Array programming with NumPy. *Nature*, 585, 357–362.

If a package doesn't have a formal citation, cite its GitHub repository with the version number you used.

### Making Your Own Code Citable

The standard way to make research code citable is through **Zenodo** — a free, open repository run by CERN specifically for research outputs.

1. Go to [https://zenodo.org](https://zenodo.org) and log in with your GitHub account
2. Go to **GitHub** under your Zenodo settings
3. Enable the toggle next to your repository
4. Create a release on GitHub — Zenodo automatically archives it and issues a **DOI** (Digital Object Identifier)

A DOI is a permanent link — it never changes, even if your GitHub URL does. Others cite your DOI, not your GitHub URL.

Add a citation block to your README:

```
## Citation

If you use this code in your research, please cite:

Your Name. (2024). Project Title (v1.0). Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX
```

### Publishing Datasets

For datasets, Zenodo works the same way — upload directly and receive a DOI.

For domain-specific data, check if your field has a dedicated repository:
- **Figshare** — general research data
- **Dryad** — ecology and evolutionary biology
- **Pangaea** — earth and environmental science
- **Harvard Dataverse** — multidisciplinary

Publishing data separately from code means others can cite and reuse the dataset independently.

---

## Section 6 — Contributing to Existing Open-Source Projects

Using open-source software and contributing back to it are two sides of the same coin. If a tool you use has a bug, a missing feature, or unclear documentation — you can fix it.

### How Open-Source Contributions Work

In Part 7, we briefly mentioned forking and pull requests. Here's the full picture:

**Fork** — create your own copy of someone else's repository on GitHub. You can modify it freely without affecting the original.

**Clone** — download your fork locally:

```bash
git clone git@github.com:yourusername/their-project.git
cd their-project
```

**Create a branch** — never work directly on `main`:

```bash
git checkout -b fix-typo-in-readme
```

**Make your change** — edit the file, then commit:

```bash
git add README.md
git commit -m "Fix typo in installation instructions"
```

**Push your branch:**

```bash
git push origin fix-typo-in-readme
```

**Open a Pull Request** — go to the original repository on GitHub. You'll see a prompt to open a pull request from your branch. Fill in what you changed and why, then submit.

The project maintainers will review your change, suggest edits if needed, and merge it if it looks good.

### Where to Start

- Fix a typo in documentation — low stakes, always welcome
- Improve an unclear error message
- Add a missing example to documentation
- Report a bug with a clear reproduction case

For a full walkthrough of the open-source contribution workflow:

[First Contributions — a beginner's guide to contributing to open source](https://github.com/firstcontributions/first-contributions)

### Reporting Issues

If you find a bug but aren't ready to fix it yourself, open an **Issue** on GitHub:

1. Go to the repository → **Issues** → **New Issue**
2. Describe what you did, what you expected, and what happened instead
3. Include your environment details — OS, Python version, package version
4. Include the exact error message

A clear issue report is itself a contribution — it helps maintainers reproduce and fix the problem.

---

## Section 7 — Building a Public Portfolio

Your public GitHub profile is already a portfolio. Every repository you push, every contribution you make, and every issue you report is visible.

To make it an effective portfolio:

### Pin Your Best Repositories

GitHub lets you pin up to six repositories on your profile. Pin the ones that best represent your work — not the oldest or most committed-to, but the most complete and documented.

### Write a Profile README

GitHub supports a special repository — named exactly the same as your username — whose README appears on your profile page.

Create a repository named `yourusername/yourusername` and add a `README.md`. This is your public introduction:

```markdown
# Hi, I'm [Your Name]

Researcher at [Institution] working on [field].

**Tools:** Python, NumPy, PyTorch, Linux, HPC

**Current projects:**
- [Project 1](link) — one line description
- [Project 2](link) — one line description

**Contact:** [email] · [LinkedIn]
```

Keep it short. Link to your best work.

### Beyond GitHub

A broader public presence helps your work reach people who aren't on GitHub:

- **Personal website** — a simple static site (Jekyll, Hugo, or similar) with your projects, publications, and contact. GitHub Pages hosts these for free.
- **Technical blog** — writing about what you've built or learned reaches a wide audience and demonstrates depth
- **LinkedIn** — keep it updated with your projects and skills
- **Google Scholar** — if you publish papers, claim your profile so citations are tracked

You don't need all of these. Pick one or two and maintain them well rather than spreading thin across everything.

---

## What You've Done

- Understood what Open Science is and why it matters
- Made your repository public and complete
- Wrote a README that answers the five key questions
- Chose and added an open-source license
- Made your code citable with Zenodo
- Understood how to cite software and publish datasets
- Contributed to an open-source project via fork, branch, and pull request
- Built a public portfolio presence on GitHub and beyond

---

## End of Series

You started this series with a blank Windows machine and no development environment.

You now have:

- A Linux-based Python environment running on Windows via WSL2
- Isolated project environments using Miniconda
- A fully configured VS Code setup
- Practical Linux skills including SSH and HPC basics
- Version control with Git and GitHub
- A reproducible, documented project workflow
- GPU support for deep learning (if applicable)
- The knowledge to share your work with the broader research community

The environment is built. The tools are in place. What you build with them is up to you.