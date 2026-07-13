# Terminal Basics and File Navigation
### Phase 1: The Local Workbench — Part 2
(Part 2 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

This article sets Ubuntu as your default terminal, teaches the core navigation commands (`pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`), and establishes the code-vs-data convention you'll follow for the rest of the series: code lives in `/home`, data lives on your mounted Windows drives (`/mnt`). By the end, you'll have your first project folder created.

---

## Objective

In Part 1, we installed WSL2, Ubuntu, and Miniconda. We also noted that projects should live in your Linux home directory — but didn't create that structure yet.

In this article, we'll get comfortable using Ubuntu and build that structure properly.

By the end, you'll have:

- Ubuntu set as your default terminal
- Confidence navigating the Linux filesystem
- A clear understanding of where to keep code and where to keep data
- A projects folder ready for use

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Grok, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Click this link: [Part2.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part2.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part2.md` into the chat).

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

  > I have attached the `Part2.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- WSL2, Ubuntu, and Miniconda installed ([Part 1](https://abhigyan-pro.github.io/Blogs/Part1.html))
- Windows Terminal installed

### Step 1 — Set Ubuntu as Default in Windows Terminal

Right now, Windows Terminal opens PowerShell by default. We'll change that to Ubuntu so you don't have to switch manually every time.

1. Open **Windows Terminal**
2. Click the dropdown arrow `∨` next to the `+` tab button
3. Select **Settings**
4. Under **Startup**, find **Default profile**
5. Click the dropdown and select **Ubuntu**
6. Click **Save**

From now on, every new Windows Terminal window opens Ubuntu directly.

### Step 2 — Open a New Tab

Click the `+` button in Windows Terminal.

A new Ubuntu tab opens. You can run multiple tabs at the same time — useful when running a script in one tab while working in another.

### Step 3 — Understanding the Terminal Prompt

When Ubuntu opens, you'll see something like:

```bash
(base) abhigyan@DESKTOP-XXXX:~$
```

| Part | What it means |
|------|---------------|
| `(base)` | The active Conda environment |
| `abhigyan` | Your Ubuntu username |
| `DESKTOP-XXXX` | Your Windows machine name |
| `~` | Your current location (home directory) |
| `$` | You are a regular user (not admin) |


You first saw this prompt at the end of Part 1. Now we'll understand what you can do with it.

Additional side note:
- The program running inside your terminal is called a **shell**. On Ubuntu, the default shell is **bash** (Bourne Again Shell). When you type a command and press Enter, **bash** is what reads and executes it.
- You'll see "**bash**" mentioned often in documentation and tutorials — it simply means the command-line environment you're already using.

### Step 4 — Basic Navigation

#### Where am I?

```bash
pwd
```
`pwd` means present working directory. Shows the path of the folder where you are currectly located

if you are inside your `/home` directory, then if you run `pwd`. It should show something like Output:
```text
/home/abhigyan   
```

This is your Linux home directory. Same as `~`. You saw this briefly in Part 1 — now we'll use it actively.

#### What's here?
- Lists files and folders in your current location.
```bash
ls
```

- Shows hidden files too — files starting with `.` are hidden by default. Your Conda configuration lives in one of these hidden files.
```bash
ls -a
```

#### Create a folder

```bash
mkdir projects
```

#### Move into a folder

```bash
cd projects
```

Move one level up:

```bash
cd ..
```

Go back to your home directory from anywhere:

```bash
cd ~
```

#### Create a file

```bash
touch file.txt
```

#### Copy a file
- Creates a copy named `backup.txt`.
```bash
cp file.txt backup.txt
```

- Copies into a folder. Assuming you created a folder Projects2 seperately.
```bash
cp file.txt ~/Projects2/file.txt
```

#### Move or rename a file
- Moves a file.
```bash
mv file.txt ~/Projects2/file2.txt
```

- Renames a file.
```bash
mv old_name.txt new_name.txt
```



### Step 5 — Where Code Lives and Where Data Lives

In Part 1, we established that `/home/yourusername` is your Linux home and `/mnt/c`, `/mnt/d` etc. are your Windows drives mounted inside Linux.

Now we go one step further — this is the rule you'll follow throughout this series:

**Code and projects → `/home/yourusername/projects/`**

**Data and large files → `/mnt/d/` (or whichever Windows drive you use for storage)**

**Why this split?**

- Your Linux home directory is fast. Git, Conda, and all development tools run significantly slower when your code sits on a Windows drive (`/mnt/c`)
- Data files — datasets, raw files, model outputs — are often large. Keeping them on your Windows drives (`/mnt/d`) means they're accessible from both Windows and Linux, easy to back up, and don't clutter your Linux environment

Think of it this way: **your Linux home is your workbench. Your Windows drives are your storage shelves.**

### Step 6 — Create Your Project Structure

Run these commands one by one:

```bash
cd ~
```

```bash
mkdir project_1
```

```bash
cd project_1
```

```bash
pwd
```

Output:
- This is where all your code will live from now on. When we create Python environments and write scripts in the coming parts, everything starts here.
```text
/home/abhigyan/project_1
```



### Step 7 — Verify Your Data Location

**If you are on WSL2:** Your Windows drives are mounted inside Linux. Access them like this:

```bash
ls /mnt/d/
```

Replace `d` with whichever drive letter you use for storage.

**If you are on native Linux:** Your data lives on a separate drive or folder on your Linux filesystem. Use `ls` to navigate to wherever you store your data.

You don't need to create anything here. Just confirm you can access your storage location from the terminal.

### Step 8 — Where Software Is Installed

When you install software inside Ubuntu — including Miniconda and all Python packages — it lives inside Linux, not on your Windows drive.

Miniconda lives at:

```bash
ls ~/miniconda3/
```

You never need to go there directly. But knowing it's inside Linux explains why software installed in Ubuntu is invisible from Windows Explorer — they are separate filesystems.

---

## What's Next

**What You've Done:**

- Set Ubuntu as the default in Windows Terminal
- Learned to open new tabs
- Understood every part of the terminal prompt
- Used `pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`
- Understood the code/data split: `/home` for code, `/mnt` for data
- Created your `~/project_1` folder

**Want to go deeper on Linux and terminal basics?**
Software Carpentry has a free, beginner-friendly course that complements this part well: [The Unix Shell — Software Carpentry](https://swcarpentry.github.io/shell-novice/)

**Next:** [Part 3 — Managing Projects with Conda Environments](https://abhigyan-pro.github.io/Blogs/Part3.html)
|
**Previous:** [Part 1 — Installing WSL2 with Ubuntu, and Miniconda](https://abhigyan-pro.github.io/Blogs/Part1.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)