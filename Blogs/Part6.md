# Git and GitHub for Reproducible Research
### Phase 2: The Research Infrastructure — Part 2
(Part 6 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

This article installs and configures Git, connects your machine to GitHub over SSH, and pushes `project_1` as your first repository. It closes with the everyday four-command Git workflow you'll use from here on, plus a map of what else Git and GitHub offer — branching, pull requests, forking, Issues, and Actions.

---

## Objective

You've been writing code. It works. You change something — now it doesn't. You don't remember what you changed. Sound familiar? Now imagine two people editing the same script. Who has the latest version? What did the other person change? How do you combine your work without overwriting each other?

These are not hypothetical problems. Every researcher who writes code eventually faces them. **Git** is the solution, tracking every change you make to your code. **GitHub** is where you store that history online — making your code accessible from anywhere, shareable with collaborators, and safe from your hard drive failing.

By the end of this part, you'll have:
- Git installed and configured
- A GitHub account connected via SSH
- `project_1` pushed to GitHub as your first repository
- A working understanding of what else Git and GitHub can do

---

## Content

<details>
  <summary><strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong></summary>
  
  If you get stuck at any step, use a ChatAI (Claude, ChatGPT, Gemini, or Grok) with this prompt:

  > I am following this article: [paste this article's link]
  >
  > I am on Step [X].
  >
  > I did: [describe what you did]
  >
  > I got: [paste the exact error or describe what happened]
  >
  > Help me troubleshoot.

  To go deeper on any step:

  > "I am following [link]. In Step X it says to run [command] — explain what each part does."

  Think of this series as the roadmap and your AI assistant as your learning companion.
</details>

### Prerequisites

- WSL2 or native Linux with Miniconda installed ([Part 1](https://abhigyan-pro.github.io/Blogs/Part1.html))
- `~/project_1` folder with files created ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html) and [Part 4](https://abhigyan-pro.github.io/Blogs/Part4.html))
- A GitHub account — we'll create one in Step 1

### Step 1 — Create a GitHub Account

Go to [https://github.com](https://github.com) and sign up for a free account. Choose your username carefully — it will be visible on every repository you create.

### Step 2 — Install Git

Open your terminal and type:

```bash
sudo apt update
sudo apt install git
```

Verify:
```bash
git --version
```

### Step 3 — Configure Git

Tell Git who you are:

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

Set VS Code as your default Git editor:

```bash
git config --global core.editor "code --wait"
```

### Step 4 — Generate an SSH Key for GitHub

Generate a key specifically for GitHub:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When asked where to save it, type `~/.ssh/id_ed25519_github` to avoid overwriting existing keys. Set correct permissions:

```bash
chmod 600 ~/.ssh/id_ed25519_github
```

### Step 5 — Add the SSH Key to GitHub

Copy your public key:

```bash
cat ~/.ssh/id_ed25519_github.pub
```

Add it to GitHub:
1. Go to [https://github.com/settings/keys](https://github.com/settings/keys)
2. Click **New SSH key**
3. Paste the key and save

### Step 6 — Configure SSH to Use Your GitHub Key

Tell SSH which key to use:

```bash
nano ~/.ssh/config
```

Add these lines:
```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
```

Test the connection:

```bash
ssh -T git@github.com
```

### Step 7 — Create a Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Name it `project_1`
3. Click **Create repository**

### Step 8 — Push `project_1` to GitHub

Navigate to your project folder:

```bash
cd ~/project_1
git init
```

Create a `.gitignore` file to exclude temporary files:

```bash
nano .gitignore
```

Add these lines:
```text
__pycache__/
*.pyc
.ipynb_checkpoints/
```

Stage and commit:

```bash
git add .
git commit -m "Initial commit: project_1 setup"
```

Connect to GitHub and push:

```bash
git remote add origin git@github.com:yourusername/project_1.git
git branch -M main
git push -u origin main
```

### Step 9 — The Everyday Git Workflow

Every time you make changes, follow this workflow:

1. **Check status**: `git status`
2. **Stage**: `git add .`
3. **Commit**: `git commit -m "Describe what you changed"`
4. **Push**: `git push`

### Step 10 — Cloning a Repository

To download an existing project:

```bash
git clone git@github.com:yourusername/project_1.git
```

### Step 11 — What Else Exists in Git and GitHub

Beyond basic pushes, explore these features:
- **Branching**: Experiment without touching the main code.
- **Pull Requests**: Review and merge code changes in teams.
- **Forking**: Copy repositories to experiment freely.
- **GitHub Issues**: Track bugs and feature requests.
- **GitHub Actions**: Automate tasks like running tests.

---

## What's Next

**What You've Done:**
- Installed and configured Git and GitHub
- Pushed `project_1` to GitHub
- Learned the daily workflow and advanced Git concepts

**Next:** [Part 7 — Project Organization and Managing Scientific Data](https://abhigyan-pro.github.io/Blogs/Part7.html)
|
**Previous:** [Part 5 — Linux Essentials](https://abhigyan-pro.github.io/Blogs/Part5.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)