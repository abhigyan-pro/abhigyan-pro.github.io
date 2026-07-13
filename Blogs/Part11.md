# Contributing to Open Science
### Phase 4: Open Science — Part 2
(Part 11 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

This final part is about contributing to the broader scientific and open-source community. You've built a working Python development environment, organized your projects, managed dependencies, and learned version control; now, this article guides you through sharing that work responsibly — choosing licenses, making code citable, contributing to existing projects, and building a public professional presence.

---

## Objective

Science moves faster when work is shared, reused, and improved by others. This part explains how to transition your personal research environment into a public contribution.

By the end, you'll understand:
- What Open Science is and why it matters
- How to share code, data, and models responsibly
- How to choose an open-source license
- How to contribute to existing open-source projects
- How to build a public presence as a scientific software developer

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Click this link: [Part11.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part11.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part11.md` into the chat).

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

  > I have attached the `Part11.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- Git and GitHub set up ([Part 6](https://abhigyan-pro.github.io/Blogs/Part6.html))
- Project organized and documented ([Parts 7](https://abhigyan-pro.github.io/Blogs/Part7.html) and [Part 11](https://abhigyan-pro.github.io/Blogs/Part11.html))

### Section 1 — What is Open Science?

Open Science is the practice of making research—data, methods, code, and results—publicly available. It extends the traditional scientific publishing process to the digital artifacts of modern research.

**Why it matters:**
- **Reproducibility**: Others can verify your results.
- **Efficiency**: Researchers avoid duplicating existing work.
- **Impact**: Reusable work gets cited more frequently.
- **Trust**: Transparency builds research credibility.

### Section 2 — Sharing Code on GitHub

To share your work effectively:
1. **Make Repository Public**: In GitHub Settings, navigate to the "Danger Zone" and set visibility to Public.
2. **Repository Hygiene**: Ensure your repo includes `README.md`, `environment.yml`, `requirements.txt`, `LICENSE`, `.gitignore`, and `.env.example`.

### Section 3 — Writing an Effective README

A public README is the first point of contact for your project. It must answer:
1. **What does this do?** (No jargon).
2. **Who is it for?** (Target audience).
3. **How do I set it up?** (Step-by-step commands).
4. **How do I run it?** (Minimal working example).
5. **How do I cite it?** (Citation block).

### Section 4 — Choosing an Open-Source License

Without a license, others cannot legally use or modify your code.
- **MIT License**: Simple and permissive; allows commercial use; the recommended default for most research.
- **Apache 2.0**: Similar to MIT with explicit patent protection.
- **GPL**: Requires derivative works to also be open-source.

Use [choosealicense.com](https://choosealicense.com) to pick the best fit, then create a `LICENSE` file in your repository via GitHub's "Add file" menu.

### Section 5 — Citing Software and Datasets

**Citing Software You Use**: Cite major packages based on their documentation (e.g., NumPy's Nature paper). If no formal citation exists, cite the GitHub repo and version number.

**Making Your Code Citable**:
1. Use **Zenodo**: Log in via GitHub, enable the repo, and create a GitHub release.
2. **DOI**: Zenodo will archive the release and issue a Digital Object Identifier (DOI), which serves as a permanent, citable link.

**Publishing Datasets**: Use Zenodo or domain-specific repositories like Figshare, Dryad, Pangaea, or Harvard Dataverse.

### Section 6 — Contributing to Open Source

Contributing involves a standard workflow:
1. **Fork**: Create a copy of the target repository under your account.
2. **Clone**: Download the fork locally.
3. **Branch**: Create a new branch for your changes: `git checkout -b fix-branch`.
4. **Modify & Commit**: Make your changes and commit.
5. **Push**: Upload your branch: `git push origin fix-branch`.
6. **Pull Request (PR)**: Open a PR on the original repository.

*Good first contributions*: Fix documentation typos, clarify error messages, or report bugs with clear reproduction steps via GitHub Issues.

### Section 7 — Building a Public Portfolio

- **Pin Repositories**: Showcase your best work on your GitHub profile.
- **Profile README**: Create a `yourusername/yourusername` repo to host your public introduction.
- **Web Presence**: Consider a personal website (GitHub Pages), technical blog, or LinkedIn to increase visibility.

---

## What You've Done

**What You've Done:**
- Understood Open Science principles and impacts
- Configured public repositories with licenses and thorough READMEs
- Learned to make code/data citable via DOIs (Zenodo)
- Practiced the fork-branch-PR workflow
- Established your public professional presence

**Previous:** [Part 10 — Building Reproducible Research Workflows](https://abhigyan-pro.github.io/Blogs/Part10.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)