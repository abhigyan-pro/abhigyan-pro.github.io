# Building Reproducible Research Workflows
### Phase 4: Open Science — Part 1
(Part 10 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

Writing code that works on your machine is only half the job. Reproducible research means someone else — or your future self six months from now — can take your project, set it up, and get the same results. This article adds the tools and practices that make your work shareable, maintainable, and reproducible, building on the project structure from Part 8.

---

## Objective

This part builds on the project structure established previously and adds the specific tools and practices required to make research workflows reproducible.

By the end, you'll have:
- A complete, reproducible project structure
- Dependencies captured in `environment.yml` and `requirements.txt`
- Configuration files separating settings from code
- A documented project others can understand and run
- A basic understanding of Docker for full environment reproducibility

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Grok, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Open this link in a new tab: [Part10.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part10.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part10.md` into the chat).

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

  > I have attached the `Part10.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- `~/project_1` set up with Git and GitHub ([Part 5](https://abhigyan-pro.github.io/Blogs/Part5.html) and [Part 6](https://abhigyan-pro.github.io/Blogs/Part6.html))
- Project structure created ([Part 7](https://abhigyan-pro.github.io/Blogs/Part8.html))
- `env_project1` Conda environment ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html))

### Step 1 — Revisiting Project Structure

We expand the standard project structure to include three files that facilitate reproducibility:

```text
project_1/
├── notebooks/
├── scripts/
├── results/
│   ├── figures/
│   └── outputs/
├── environment.yml       ← Conda environment definition
├── requirements.txt      ← pip dependency list
├── config.yaml           ← project configuration
├── .gitignore
└── README.md
```

### Step 2 — Managing Dependencies

#### `environment.yml`
This Conda-specific file captures your entire environment (Python version, channels, packages).
Generate it: `conda env export > environment.yml`.
Recreate it: `conda env create -f environment.yml`.

#### `requirements.txt`
This pip-specific file lists packages and versions, providing a universal format for non-Conda users.
Generate it: `pip freeze > requirements.txt`.
Install it: `pip install -r requirements.txt`.

*Note:* Include both. Use Conda for your primary workflow and `requirements.txt` for broader compatibility.

### Step 3 — Configuration Files

Separating settings from code is critical for reproducibility and security.

- **`.env`**: Used for sensitive data (API keys, credentials). Read in Python using `python-dotenv`. **Always add `.env` to `.gitignore`.**
- **`config.yaml`**: Used for non-sensitive settings (model parameters, paths). Read in Python using `PyYAML`.
- **`argparse`**: Use this for scripts that require different runtime settings.

### Step 4 — Documenting Your Project

Your `README.md` is the front door of your project. A complete research README should include:
- Project description and goals
- Requirements (Python/Conda version)
- Setup instructions (cloning, env creation)
- Data acquisition and placement instructions
- Running instructions
- Citation information

Provide a `.env.example` file (a template without real credentials) to allow others to configure their local setup easily.

### Step 5 — Docker: Full Environment Reproducibility

Docker packages your OS, system dependencies, Python, and packages into a single portable container.
- **Minimal Dockerfile**: Defines your environment configuration.
- **Build**: `docker build -t project_1 .`
- **Run**: `docker run project_1`

Docker is recommended when sharing with different operating systems, deploying to the cloud, or requiring exact system-level reproducibility.

### Step 6 — Best Practices for Long-Term Projects

- **Version data**: Track changes to raw data alongside code.
- **Tag releases**: Use `git tag` for milestones (e.g., paper submission).
- **Changelog**: Maintain `CHANGELOG.md` to track project evolution.
- **Clean paths**: Never hardcode paths; use configurations instead.

---

## What's Next

**What You've Done:**
- Built a reproducible structure with `environment.yml` and `requirements.txt`
- Decoupled settings from code using configuration files
- Created complete documentation and Docker templates
- Established long-term maintenance habits

**Next:** [Part 11 — Contributing to Open Science](https://abhigyan-pro.github.io/Blogs/Part11.html)
|
**Previous:** [Part 9 — Installing PyTorch and TensorFlow](https://abhigyan-pro.github.io/Blogs/Part9.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)