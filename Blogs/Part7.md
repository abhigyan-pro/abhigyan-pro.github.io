# Git and GitHub
### Building a Research Computing Environment — Part 7 of 12

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

You've been writing code. It works. You change something — now it doesn't. You don't remember what you changed.

Sound familiar?

Now imagine two people editing the same script. Who has the latest version? What did the other person change? How do you combine your work without overwriting each other?

These are not hypothetical problems. Every researcher who writes code eventually faces them.

**Git** is the solution. It tracks every change you make to your code — who changed what, when, and why. You can go back to any previous version at any point.

**GitHub** is where you store that history online — making your code accessible from anywhere, shareable with collaborators, and safe from your hard drive failing.

Most researchers learn Python, learn data analysis, learn machine learning — but never learn Git. Then they join a lab, start collaborating, or try to share their work, and suddenly everything feels chaotic.

This part fixes that.

By the end, you'll have:

- Git installed and configured
- A GitHub account connected via SSH
- `project_1` pushed to GitHub as your first repository
- A working understanding of what else Git and GitHub can do

---

## Content

### Getting Unstuck

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

### Prerequisites

- WSL2 or native Linux with Miniconda installed ([Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html))
- `~/project_1` folder with files created ([Parts 3–5](https://abhigyan-pro.github.io/Blogs/Part3.html))
- A GitHub account — we'll create one in Step 1

### Step 1 — Create a GitHub Account

Go to [https://github.com](https://github.com) and sign up for a free account.

Choose your username carefully — it will be visible on every repository you create and every contribution you make. Many researchers use their real name or a close variation.

### Step 2 — Install Git

Open your terminal and type:

```bash
sudo apt update
```

```bash
sudo apt install git
```

Verify:

```bash
git --version
```

You should see a version number printed.

### Step 3 — Configure Git

Tell Git who you are. This information is attached to every commit you make.

```bash
git config --global user.name "Your Name"
```

```bash
git config --global user.email "your_email@example.com"
```

Use the same email address you used for your GitHub account.

Set VS Code as your default Git editor:

```bash
git config --global core.editor "code --wait"
```

Verify your configuration:

```bash
git config --list
```

### Step 4 — Generate an SSH Key for GitHub

In Part 6, we generated an SSH key to connect to remote servers. Here we generate a separate key specifically for GitHub — this is cleaner practice and keeps your keys organized.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When asked where to save it:

```
Enter file in which to save the key (~/.ssh/id_ed25519):
```

Type a new name to avoid overwriting your existing key:

```
~/.ssh/id_ed25519_github
```

Press Enter. When asked for a passphrase, press Enter twice to skip.

Set correct permissions:

```bash
chmod 600 ~/.ssh/id_ed25519_github
```

### Step 5 — Add the SSH Key to GitHub

Copy your public key:

```bash
cat ~/.ssh/id_ed25519_github.pub
```

This prints a long string starting with `ssh-ed25519`. Copy the entire output.

Now add it to GitHub:

1. Go to [https://github.com/settings/keys](https://github.com/settings/keys)
2. Click **New SSH key**
3. Give it a title — something like `WSL Ubuntu` or `My Laptop`
4. Paste your public key into the **Key** field
5. Click **Add SSH key**

### Step 6 — Configure SSH to Use Your GitHub Key

Tell SSH which key to use when connecting to GitHub:

```bash
nano ~/.ssh/config
```

Add these lines:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
```

Save and exit (`Ctrl+X`, `Y`, `Enter`).

Test the connection:

```bash
ssh -T git@github.com
```

You should see:

```
Hi abhigyan! You've successfully authenticated, but GitHub does not provide shell access.
```

### Step 7 — Create a Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Name it `project_1`
3. Leave it **Public** for now
4. Leave all three options unchecked for now:
   - **Add a README** — a file describing your project. We'll add this manually later.
   - **Add .gitignore** — tells Git which files to ignore. We'll create this manually in Step 8.
   - **Add a license** — defines how others can use your code. We'll cover this in Part 12 when we discuss Open Science.
5. Click **Create repository**

GitHub will create a repository with a default branch called `main`. Think of a branch as the main timeline of your code — every commit you make gets added to it. `main` is where your stable, working code lives.

GitHub will show you a page with setup instructions. You don't need to follow those — we'll do it our way below.

### Step 8 — Push `project_1` to GitHub

Navigate to your project folder:

```bash
cd ~/project_1
```

Initialize Git in this folder:

```bash
git init
```

This creates a hidden `.git` folder — Git will now track every change inside `project_1`.

Tell Git which files to track. First, create a `.gitignore` file to exclude files you don't want tracked:
`.gitignore` is a file that tells Git which files to skip — temporary files, compiled code, and notebook checkpoints that don't need to be tracked.

```bash
nano .gitignore
```

Add these lines:

```
__pycache__/
*.pyc
.ipynb_checkpoints/
```

Save and exit (`ctrl+X`, `Y`, `Enter`).

Stage all your files:

```bash
git add .
```

`git add .` tells Git: *"include everything in the current folder in the next snapshot."*

Make your first commit:

```bash
git commit -m "Initial commit: project_1 setup"
```

A commit is a saved snapshot of your code at this moment. The message describes what changed.

Connect your local folder to the GitHub repository you just created:

```bash
git remote add origin git@github.com:yourusername/project_1.git
```

Replace `yourusername` with your actual GitHub username.

`origin` is just a nickname for your GitHub repository's address. Instead of typing the full URL every time, Git uses `origin` as a shorthand. You could name it anything, but `origin` is the universal convention — you'll see it everywhere.

Push your code to GitHub:

```bash
git branch -M main
git push -u origin main
```
This sets your local branch name to `main` — matching what GitHub expects by default.
The `-u` flag sets a permanent link between your local `main` branch and GitHub. You only need this the first time. From now on, `git push` alone is enough — Git already knows where to send your code.

Go to `https://github.com/yourusername/project_1` — you'll see your files there.

**Congratulations, you just made your first commit to GitHub!!**

### Step 9 — The Everyday Git Workflow

From now on, every time you make changes to your project, this is the workflow:

**Check what has changed:**

```bash
git status
```

**Stage the changes:**

```bash
git add .
```

Or stage a specific file:

```bash
git add first_script.py
```

**Commit the changes:**

```bash
git commit -m "Describe what you changed"
```

**Push to GitHub:**

```bash
git push
```

That's it. Four commands you'll use every day.

### Step 10 — Cloning a Repository

If you want to download someone else's project — or your own from a different machine:

```bash
git clone git@github.com:yourusername/project_1.git
```

This creates a local copy of the repository with the full history included.

### Step 11 — What Else Exists in Git and GitHub

You now know enough to use Git for your own projects. But Git and GitHub have much more — here's the map so you know what's out there when you need it.

**Branching** — Instead of editing your main code directly, you create a separate branch to try something new. If it works, you merge it back. If it doesn't, you discard it. Your main code is never touched.

```bash
git branch new-feature
git checkout new-feature
```

**Pull Requests** — On GitHub, when you want to merge a branch into the main code — especially in a team — you open a Pull Request. Others can review your changes, leave comments, and approve before anything is merged.

**Forking** — Copy someone else's public repository to your own GitHub account. You can freely experiment with it without affecting the original. This is how open-source contributions often start.

**GitHub Issues** — A built-in system for tracking bugs, feature requests, and tasks in a repository. Think of it as a to-do list attached to your code.

**GitHub Actions** — Automate tasks whenever you push code — run tests, build documentation, deploy your project. Used extensively in professional workflows.

**git pull** — The opposite of `git push`. Fetches changes from GitHub and applies them to your local copy. Essential when collaborating with others.

```bash
git pull
```

**git log** — See the full history of commits in your repository.

```bash
git log --oneline
```

---

## What's Next

**What You've Done:**

- Installed and configured Git
- Created a GitHub account
- Generated an SSH key for GitHub and connected it
- Created your first GitHub repository
- Pushed `project_1` to GitHub
- Learned the everyday Git workflow
- Got a map of what else Git and GitHub can do

**Additional Resources and Self Study Materials:**

These topics go deep. When you're ready to explore them, the following resources are excellent starting points:

- [Project Pythia](https://foundations.projectpythia.org/foundations/getting-started-github/)
- [Version Control with Git — Software Carpentry](https://swcarpentry.github.io/git-novice/) — a beginner-friendly full course on Git fundamentals
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)

**Next:** [Part 8 — Project Organization and managing Scientific Data](https://abhigyan-pro.github.io/Blogs/Part8.html)
|
**Previous:** [Part 6 — Linux Essentials](https://abhigyan-pro.github.io/Blogs/Part6.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)