# Part 3 — Terminal Basics and File Navigation

*Building a Research Computing Environment — Part 3 of 12*

---

Socials: [LinkedIN](https://www.linkedin.com/in/abhigyan-chakraborty/) [Website](https://abhigyan-pro.github.io/)

## Objective

In Part 2, we installed WSL2, Ubuntu, and Miniconda. We also noted that projects should live in your Linux home directory — but didn't create that structure yet.

In this article, we'll get comfortable using Ubuntu and build that structure properly.

By the end, you'll have:

- Ubuntu set as your default terminal
- Confidence navigating the Linux filesystem
- A clear understanding of where to keep code and where to keep data
- A projects folder ready for use

---

## Using This Article

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

To go deeper on any step: *"I am following [link]. In Step X it says to run [command] — explain what each part does."*

---

## Prerequisites

- WSL2, Ubuntu, and Miniconda installed ([Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html))
- Windows Terminal installed

---

## Step 1 — Set Ubuntu as Default in Windows Terminal

Right now, Windows Terminal opens PowerShell by default. We'll change that to Ubuntu so you don't have to switch manually every time.

1. Open **Windows Terminal**
2. Click the dropdown arrow `∨` next to the `+` tab button
3. Select **Settings**
4. Under **Startup**, find **Default profile**
5. Click the dropdown and select **Ubuntu**
6. Click **Save**

From now on, every new Windows Terminal window opens Ubuntu directly.

---

## Step 2 — Open a New Tab

Click the `+` button in Windows Terminal.

A new Ubuntu tab opens. You can run multiple tabs at the same time — useful when running a script in one tab while working in another.

---

## Step 3 — Understanding the Terminal Prompt

When Ubuntu opens, you'll see something like:

```
(base) abhigyan@DESKTOP-XXXX:~$
```

| Part | What it means |
|------|---------------|
| `(base)` | The active Conda environment |
| `abhigyan` | Your Ubuntu username |
| `DESKTOP-XXXX` | Your Windows machine name |
| `~` | Your current location (home directory) |
| `$` | You are a regular user (not admin) |

You first saw this prompt at the end of Part 2. Now we'll understand what you can do with it.

Additional side note:
- The program running inside your terminal is called a **shell**. On Ubuntu, the default shell is **bash** (Bourne Again Shell). When you type a command and press Enter, bash is what reads and executes it.
- You'll see "bash" mentioned often in documentation and tutorials — it simply means the command-line environment you're already using.

---

## Step 4 — Basic Navigation

### Where am I?

```bash
pwd
```
`pwd` means present working directory. Shows the path of the folder where you are currectly located

if you are inside your `/home` directory, then if you run `pwd`. It should show something like
Output:

```
/home/abhigyan   
```

This is your Linux home directory. Same as `~`. You saw this briefly in Part 2 — now we'll use it actively.

---

### What's here?

```bash
ls
```

Lists files and folders in your current location.

```bash
ls -a
```

Shows hidden files too — files starting with `.` are hidden by default. Your Conda configuration lives in one of these hidden files.

---

### Create a folder

```bash
mkdir projects
```

---

### Move into a folder

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

---

### Create a file

```bash
touch file.txt
```

---
### Copy a file

```bash
cp file.txt backup.txt
```

Creates a copy named `backup.txt`.

```bash
cp file.txt ~/Projects2/file.txt
```

Copies into a folder. Assuming you created a folder Projects2 seperately.

---

### Move or rename a file

```bash
mv file.txt ~/Projects2/file2.txt
```

Moves a file.

```bash
mv old_name.txt new_name.txt
```

Renames a file.

---

## Step 5 — Where Code Lives and Where Data Lives

In Part 2, we established that `/home/yourusername` is your Linux home and `/mnt/c`, `/mnt/d` etc. are your Windows drives mounted inside Linux.

Now we go one step further — this is the rule you'll follow throughout this series:

**Code and projects → `/home/yourusername/projects/`**

**Data and large files → `/mnt/d/` (or whichever Windows drive you use for storage)**

**Why this split?**

- Your Linux home directory is fast. Git, Conda, and all development tools run significantly slower when your code sits on a Windows drive (`/mnt/c`)
- Data files — datasets, raw files, model outputs — are often large. Keeping them on your Windows drives (`/mnt/d`) means they're accessible from both Windows and Linux, easy to back up, and don't clutter your Linux environment

Think of it this way: **your Linux home is your workbench. Your Windows drives are your storage shelves.**

---

## Step 6 — Create Your Project Structure

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

```
/home/abhigyan/project_1
```

This is where all your code will live from now on. When we create Python environments and write scripts in the coming parts, everything starts here.

---

## Step 7 — Verify Your Data Location

**If you are on WSL2:** Your Windows drives are mounted inside Linux. Access them like this:

```bash
ls /mnt/d/
```

Replace `d` with whichever drive letter you use for storage.

**If you are on native Linux:** Your data lives on a separate drive or folder on your Linux filesystem. Use `ls` to navigate to wherever you store your data.

You don't need to create anything here. Just confirm you can access your storage location from the terminal.

---

## Step 8 — Where Software Is Installed

When you install software inside Ubuntu — including Miniconda and all Python packages — it lives inside Linux, not on your Windows drive.

Miniconda lives at:

```bash
ls ~/miniconda3/
```

You never need to go there directly. But knowing it's inside Linux explains why software installed in Ubuntu is invisible from Windows Explorer — they are separate filesystems.

---

## What You've Done

- Set Ubuntu as the default in Windows Terminal
- Learned to open new tabs
- Understood every part of the terminal prompt
- Used `pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`
- Understood the code/data split: `/home` for code, `/mnt` for data
- Created your `~/project_1` folder

## Want to go deeper on Linux and terminal basics?
Software Carpentry has a free, beginner-friendly course that complements this part well:
[The Unix Shell — Software Carpentry](https://swcarpentry.github.io/shell-novice/)

**Next:** [Part 4 — Managing Projects with Conda Environments](https://abhigyan-pro.github.io/Blogs/Part4.html)