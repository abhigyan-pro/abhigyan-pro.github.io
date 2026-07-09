# Installing WSL2, Ubuntu, and Miniconda

*Building a Research Computing Environment — Part 2 of 12*

---

Socials: [LinkedIN](https://www.linkedin.com/in/abhigyan-chakraborty/) [Website](https://abhigyan-pro.github.io/)

## Objective

In this article, we'll build the foundation of our Python development environment.

By the end, you'll have:

- WSL2 installed.
- Ubuntu installed.
- Miniconda installed.
- A working Ubuntu terminal ready for development.

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

Think of this series as the roadmap and your AI assistant as your learning companion.

## Prerequisites

- Windows 11
- Administrator access
- Internet connection

## Step 1 — Open Windows Terminal

1. Open the **Start Menu**.
2. Search for **Windows Terminal**.
3. Right-click **Windows Terminal**.
4. Select **Run as administrator**.
5. If prompted by **User Account Control (UAC)**, click **Yes**.

A Windows Terminal window should now open.

## Step 2 — View Available Linux Distributions

Run:

```
wsl --list --online
```

Choose the Ubuntu version you'd like to install.

For this series, we'll use: `Ubuntu-24.04`

## Step 3 — Install Ubuntu

Run:

```
wsl --install -d Ubuntu-24.04
```

Windows will:

- Enable WSL.
- Download Ubuntu.
- Install Ubuntu.

Restart your computer if prompted.

## Step 4 — Launch Ubuntu

Open Ubuntu from the Start Menu.

If you don't see it yet, open Windows Terminal and run:

```
wsl -d Ubuntu-24.04
```

The first launch may take a minute.

## Step 5 — Create Your Linux User

Ubuntu will ask you to create:

- A username
- A password

Choose any username you'd like.

While typing your password, nothing will appear on the screen. This is normal.

Press Enter after typing the password.

## Step 6 — Update Ubuntu

Run:

```
sudo apt update
```

Then:

```
sudo apt upgrade -y
```

Ubuntu may ask for the password you created.

## Step 7 — Install Basic Utilities

Run:

```
sudo apt install -y wget curl git build-essential ca-certificates
```

These utilities are commonly required by development tools.

## Step 8 — Download Miniconda

Move to your home directory:

```
cd ~
```

Download Miniconda:

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

## Step 9 — Install Miniconda

Run:

```
bash Miniconda3-latest-Linux-x86_64.sh
```

During installation:

1. Press Enter to read the license.
2. Type `yes` to accept it.
3. Press Enter to use the default installation location.
4. When asked to initialize Miniconda, type `yes`.

## Step 10 — Restart Ubuntu

Close Ubuntu. Open it again.

You should now see `(base)` at the beginning of the terminal prompt.

## Step 11 — Verify the Installation

Run:

```
conda --version
```

Then:

```
python --version
```

Then:

```
pip --version
```

Each command should display a version number.

## Understanding Where Everything Lives

Before moving on, let's understand where your files are stored.

### Your Home Directory

Your Linux home directory is:

```
/home/<your-username>
```

or simply `~`.

To return here at any time:

```
cd ~
```

To see your current location:

```
pwd
```

### Windows Drives

Inside Ubuntu, your Windows drives appear under `/mnt`:

| Windows Drive | WSL Path |
|---|---|
| C:\ | /mnt/c |
| D:\ | /mnt/d |
| E:\ | /mnt/e |

### Where Is Miniconda?

By default, Miniconda is installed in:

```
~/miniconda3
```

### Where Should You Keep Projects?

Although you can work inside `/mnt/c` or `/mnt/d`, it's generally recommended to keep Python projects inside your Linux home directory.

For example:

```
/home/<your-username>/
└── projects/
```

Don't worry — the projects directory doesn't exist yet. We'll create it properly in a later article on Linux essentials for Python developers.

For now, simply remember that your home directory (`~`) is the recommended place for your future projects.

## Verification

You now have:

- WSL2
- Ubuntu
- Miniconda

installed and ready to use.

**Next:** [Part 3 — Terminal Basics and File Navigation](https://abhigyan-pro.github.io/Blogs/Part3.html)
