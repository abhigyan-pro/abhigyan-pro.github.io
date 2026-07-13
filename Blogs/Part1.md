# Installing WSL2, Ubuntu, and Miniconda
### Phase 1: The Local Workbench — Part 1
(Part 1 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

- This article first shows how to install WSL2 with Ubuntu on a Windows 11 machine.
- From there, all processes are the same whether you are on WSL2 or a native Linux OS.
- We will then install Miniconda and verify that each piece is working.
- It closes by explaining where your Linux files, Windows drives, and future projects actually live.

---

## Objective

In this article, we'll build the foundation of our Python development environment.

By the end, you'll have:
- WSL2 installed.
- Ubuntu installed.
- Miniconda installed.
- A working Ubuntu terminal ready for development.

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Click this link: [Part1.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part1.md.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part1.md` into the chat).

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

  > I have attached the `Part1.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- Windows 11
- Administrator access
- Internet connection

## Install WSL with Ubuntu

<details markdown="1">
  <summary>
  <strong>💡 Expand for details</strong>
  </summary>


### Step 1 — Open Windows Terminal

  1. Open the **Start Menu**.
  2. Search for **Windows Terminal**.
  3. Right-click **Windows Terminal**.
  4. Select **Run as administrator**.
  5. If prompted by **User Account Control (UAC)**, click **Yes**.

  A Windows Terminal window should now open.

### Step 2 — View Available Linux Distributions

  Run:
  ```bash
  wsl --list --online
  ```

  Choose the Ubuntu version you'd like to install.

  For this series, we'll use: `Ubuntu-24.04`

### Step 3 — Install Ubuntu

  Run:
  ```bash
  wsl --install -d Ubuntu-24.04
  ```

  Windows will:
  - Enable WSL.
  - Download Ubuntu.
  - Install Ubuntu.

  Restart your computer if prompted.

### Step 4 — Launch Ubuntu

  Open Ubuntu from the Start Menu.

  If you don't see it yet, open Windows Terminal and run:
  ```bash
  wsl -d Ubuntu-24.04
  ```

  The first launch may take a minute.

### Step 5 — Create Your Linux User

  Ubuntu will ask you to create:
  - A username
  - A password

  Choose any username you'd like.

  While typing your password, nothing will appear on the screen. This is normal.

  Press Enter after typing the password.

### Step 6 — Update Ubuntu

  Run:
  ```bash
  sudo apt update
  ```

  Then:
  ```bash
  sudo apt upgrade -y
  ```

  Ubuntu may ask for the password you created.

### Step 7 — Install Basic Utilities

  Run:
  ```bash
  sudo apt install -y wget curl git build-essential ca-certificates
  ```
  These utilities are commonly required by development tools.

</details>

---

## Install Miniconda (Same process for both WSL2 user and Native Linux user)

<details markdown="1">
  <summary>
  <strong>💡 Expand for details</strong>
  </summary>

### Step 8 — Download Miniconda

  Move to your home directory:
  ```bash
  cd ~
  ```

  Download Miniconda:
  ```bash
  wget [https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh](https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh)
  ```

### Step 9 — Install Miniconda

  Run:
  ```bash
  bash Miniconda3-latest-Linux-x86_64.sh
  ```

  During installation:
  1. Press Enter to read the license.
  2. Type `yes` to accept it.
  3. Press Enter to use the default installation location.
  4. When asked to initialize Miniconda, type `yes`.

### Step 10 — Restart Ubuntu

  Close Ubuntu. Open it again.

  You should now see `(base)` at the beginning of the terminal prompt.

### Step 11 — Verify the Installation

  Run:
  ```bash
  conda --version
  ```

  Then:
  ```bash
  python --version
  ```

  Then:
  ```bash
  pip --version
  ```
  Each command should display a version number.

</details>

---

## Understanding Where Everything Lives

<details markdown="1">
  <summary>
  <strong>💡 Expand for details</strong>
  </summary>

  Before moving on, let's understand where your files are stored.

#### Your Home Directory

  Your Linux home directory is:
  ```text
  /home/<your-username>
  ```

  or simply `~`.

  To return here at any time:
  ```bash
  cd ~
  ```

  To see your current location:
  ```bash
  pwd
  ```

#### Windows Drives

  Inside Ubuntu, your Windows drives appear under `/mnt`:

  | Windows Drive | WSL Path |
  |---|---|
  | C:\ | /mnt/c |
  | D:\ | /mnt/d |
  | E:\ | /mnt/e |


#### Where Is Miniconda?

  By default, Miniconda is installed in:
  ```text
  ~/miniconda3
  ```

#### Where Should You Keep Projects?

  Although you can work inside `/mnt/c` or `/mnt/d`, it's generally recommended to keep Python projects inside your Linux home directory.

  For example:
  ```text
  /home/<your-username>/
  └── projects/
  ```

  Don't worry — the projects directory doesn't exist yet. We'll create it properly in a later article on Linux essentials for Python developers.

  For now, simply remember that your home directory (`~`) is the recommended place for your future projects.

</details>

---

## What's Next

You now have WSL2, Ubuntu, and Miniconda installed and ready to use.

**Next:** [Part 2 — Terminal Basics and File Navigation](https://abhigyan-pro.github.io/Blogs/Part2.html)
|
**Previous:** [Preface — Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)