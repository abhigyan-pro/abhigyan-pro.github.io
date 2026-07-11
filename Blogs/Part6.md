# Linux Essentials
### Building a Research Computing Environment — Part 6 of 12

<p align="center">
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
</p>

---

## Quick Summary

Unlike Parts 2–5, this article is a map, not a build. It covers directory organization, file management, permissions, installing system software with `apt`, environment variables, SSH, and the basics of HPC clusters and SLURM job submission — the concepts researchers need once they move beyond their local machine to remote servers and shared computing environments.

---

## Objective

This part is different from the others.

In Parts 2–5, you built something concrete at every step. Here, the goal is different — this is a **map**.

As a researcher, you'll eventually work beyond your local machine — on remote servers, university HPC clusters, and shared computing environments. Most Python books and tutorials don't cover this. When researchers first encounter these environments, they're often lost — not because the concepts are hard, but because nobody showed them the map first.

That's what this part does. You won't build a complete setup here. You'll learn what exists, what each thing does, and where to go deeper when you need to.

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

- Comfortable with the terminal ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html))
- `~/project_1` with `env_project1` set up ([Part 4](https://abhigyan-pro.github.io/Blogs/Part4.html))

### Section 1 — Creating and Organizing Directories

You already know `mkdir`, `cd`, and `ls` from Part 3. Here's how to use them for real project organization.

Create nested directories in one command:

```bash
mkdir -p ~/project_1/data/raw
mkdir -p ~/project_1/data/processed
mkdir -p ~/project_1/scripts
mkdir -p ~/project_1/results
```

The `-p` flag creates all parent directories that don't exist yet. Without it, `mkdir` would fail if an intermediate folder is missing.

View your structure:

```bash
find ~/project_1 -type d
```

This prints every directory inside `project_1` — useful for verifying your structure at a glance.

### Section 2 — Managing Files

Beyond `cp` and `mv` from Part 3, a few more tools you'll use regularly:

**Delete a file:**

```bash
rm file.txt
```

**Delete a folder and everything inside it:**

```bash
rm -rf foldername/
```

> ⚠️ `rm -rf` is permanent. Linux has no recycle bin. Double-check before running this.

**View the contents of a file:**

```bash
cat file.txt
```

**View a large file one page at a time:**

```bash
less file.txt
```

Press `q` to exit.

Try these for the `first_script.py` file you had created

**Check disk usage of a folder:**

```bash
du -sh ~/project_1/
```

Useful when working with large datasets to see how much space your project is using.

#### Terminal Text Editors

In Part 4, we used `nano` to write our first script. Here's what that actually is and how it fits in.

**`nano`** — simple terminal text editor. Opens a file directly in the terminal. Good for quick edits to config files and scripts without leaving the terminal.

**`vim`** — another terminal editor, available on almost every Linux and HPC system. More powerful than `nano` but has a steep learning curve. Worth learning eventually, but not required for this series.

**VS Code** — a full graphical editor running on your desktop. Better for writing and navigating larger codebases.

**When to use which:**
- Quick edit to `.bashrc` or a config file → `nano`
- Working on a remote server with no graphical interface → `nano` or `vim`
- Writing and organizing project code → VS Code

On HPC systems, you'll often have no choice but to use a terminal editor — VS Code won't be available. Knowing `nano` is enough to get by.

### Section 3 — File Permissions

Every file and folder in Linux has permissions that control who can read, write, or execute it.

Run this to see permissions:

```bash
ls -l ~/project_1/
```

You'll see output something like:

```
drwxr-xr-x  2 abhigyan abhigyan 4096 Jul  1 10:00 scripts
-rw-r--r--  1 abhigyan abhigyan  512 Jul  1 10:00 first_script.py
```

The permission string breaks down as:

| Characters | Meaning |
|------------|---------|
| `d` | Directory (or `-` for file) |
| `rwx` | Owner can read, write, execute |
| `r-x` | Group can read and execute |
| `r--` | Everyone else can only read |

**Change permissions with `chmod`:**

```bash
chmod +x first_script.py
```

Makes a file executable — you'll need this when writing shell scripts.

```bash
chmod 600 ~/.ssh/id_rsa
```

Restricts a file so only you can read it — required for SSH keys to work (covered in Section 5).

For now, the key takeaway is: **permissions control access, and some tools will refuse to work if permissions are wrong.**

### Section 4 — Installing Software with `apt`

In Part 4, you installed Python packages with `conda` and `pip`. Those install packages inside your Python environment.

`apt` is different — it installs system-level software on Ubuntu itself.

```bash
sudo apt update
```

Always run this first — it refreshes the list of available packages.

```bash
sudo apt install git
```

Installs Git system-wide. You'll use this in Part 7.

```bash
sudo apt install gcc g++ gfortran
```

Installs C, C++, and Fortran compilers. On HPC systems, some scientific software needs to be compiled from source — these compilers are what make that possible. You may not need them now, but knowing they exist and how to install them matters.

**When to use `apt` vs `conda` vs `pip`:**

| Tool | Installs | Use when |
|------|----------|----------|
| `apt` | System software | Git, compilers, system tools |
| `conda` | Python packages | Default for Python packages |
| `pip` | Python packages | Package not available via conda |

### Section 5 — Environment Variables

Remember from Part 3 — bash is the shell running inside your terminal. Every time you open a terminal, bash starts fresh with a set of named values already configured — things like where your home directory is, who you are, and where to find programs. These are called **environment variables**.

Think of them as sticky notes bash reads at startup to know how to behave.

See all current environment variables:

```bash
env
```

This prints a long list. Don't worry about most of them — a few matter more than others.

See a specific one:

```bash
echo $PATH
```

`echo` simply prints whatever you give it — type `echo hello` and it prints `hello`. The `$` before `PATH` tells bash "give me the value stored in this variable, not the word PATH itself."

`PATH` is one of the most important environment variables — it's the list of directories your shell searches when you type a command. When you type `python`, Linux looks through each directory in `PATH` one by one until it finds an executable named `python`. This is why activating a Conda environment works — it puts that environment's Python at the front of `PATH`.

**Create your own variable:**

```bash
export MY_DATA="/mnt/d/datasets"
```

`export` creates a variable and makes it available to bash for this terminal window and any programs you run from it. Think of it as a temporary sticky note — close the terminal window and it's gone. Open a new terminal and it won't exist there either.

Use it:

```bash
ls $MY_DATA
```

Instead of typing the full path every time, you use `$MY_DATA`. Useful for long paths you reference repeatedly.

**Make it permanent by adding it to `.bashrc`:**

`.bashrc` is a file that runs automatically every time you open a new terminal. Anything you add here is set up fresh each session — permanently.

```bash
nano ~/.bashrc
```

Add this line at the bottom:

```bash
export MY_DATA="/mnt/d/datasets"
```

Save and exit (`Ctrl+X`, `Y`, `Enter`). Apply the change to your current session without closing the terminal:

```bash
source ~/.bashrc
```

`source` tells bash to re-read and apply `.bashrc` right now, without needing to close and reopen the terminal.

### Section 6 — SSH: Connecting to Remote Machines

SSH (Secure Shell) lets you connect to and control a remote machine from your terminal — as if you were sitting in front of it.

#### Generate an SSH Key Pair

SSH keys are more secure than passwords. You generate a pair — a private key (stays on your machine) and a public key (you give to the remote server).

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

You'll be asked:
- **Where to save the key** — press Enter to accept the default (`~/.ssh/id_ed25519`)
- **Passphrase** — optional but recommended. Adds a password to your key.

This creates two files:

```
~/.ssh/id_ed25519        ← private key (never share this)
~/.ssh/id_ed25519.pub    ← public key (you share this)
```

Set correct permissions on your private key:

```bash
chmod 600 ~/.ssh/id_ed25519
```

#### Connect to a Remote Server

```bash
ssh username@server_address
```

For example:

```bash
ssh abhigyan@login.university.edu
```

The first time you connect, you'll be asked to confirm the server's identity. Type `yes`.

#### Copy Your Public Key to the Server

```bash
ssh-copy-id username@server_address
```

After this, you can connect without typing a password every time.

#### Transfer Files

Copy a file **to** a remote server:

```bash
scp ~/project_1/first_script.py username@server_address:~/
```

Copy a file **from** a remote server:

```bash
scp username@server_address:~/results/output.csv ~/project_1/results/
```

Copy an entire folder:

```bash
scp -r ~/project_1/ username@server_address:~/
```

For large transfers, `rsync` is more efficient — it only transfers files that have changed:

```bash
rsync -avz ~/project_1/ username@server_address:~/project_1/
```

### Section 7 — HPC Systems: What They Are and How They Work

A personal computer runs one or a few programs at a time. An HPC (High Performance Computing) cluster is hundreds or thousands of computers connected together — allowing researchers to run jobs that would take weeks on a laptop in hours.

**Key differences from your local machine:**

| | Local machine | HPC cluster |
|--|---------------|-------------|
| Who uses it | Just you | Many researchers simultaneously |
| How you run code | Directly | Submit a job to a queue |
| Software available | Whatever you install | Managed via modules |
| Storage | Your drive | Shared filesystems with quotas |

When you connect to an HPC, you land on a **login node** — a shared gateway machine. You never run heavy computations here. Instead, you write a **job script** and submit it to a **scheduler** which queues and runs your job on compute nodes when resources are available.

The most widely used scheduler is **SLURM**.

### Section 8 — SLURM: Submitting Jobs

A SLURM job script is a shell script with special `#SBATCH` lines that tell SLURM what resources your job needs.

A basic job script looks like this:

```bash
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --output=my_job_%j.out
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=02:00:00

conda activate env_project1
python first_script.py
```

Save this as `job.sh`, then submit it:

```bash
sbatch job.sh
```

Other useful SLURM commands:

| Command | What it does |
|---------|--------------|
| `sbatch job.sh` | Submit a job |
| `squeue -u username` | Check your job status in the queue |
| `scancel job_id` | Cancel a job |
| `sinfo` | See available partitions and nodes |

#### Software Modules on HPC

HPC systems don't let you install software with `apt`. Instead, they use a **module system** to manage software — multiple versions of the same tool can coexist, and you load only what you need.

```bash
module avail
```

Lists all available software on the system.

```bash
module load python/3.11
```

Loads Python 3.11 into your environment.

```bash
module list
```

Shows what you currently have loaded.

```bash
module unload python/3.11
```

Removes it.

On many HPC systems you'll still use Conda inside your job scripts — load a base Python module first, then activate your Conda environment.

---

## What's Next

**What You've Done:**

- Organized directories with `mkdir -p`
- Managed files with `rm`, `cat`, `less`, `du`
- Understood file permissions and `chmod`
- Installed system software with `apt`
- Understood environment variables, `$PATH`, `export`, and `.bashrc`
- Generated SSH keys and connected to a remote server
- Transferred files with `scp` and `rsync`
- Understood what HPC systems are and how they differ from local machines
- Learned SLURM job submission and software modules

**Further reading:**
For a more comprehensive Linux command reference, Software Carpentry's Unix Shell course covers these topics in depth with exercises: [The Unix Shell — Software Carpentry](https://swcarpentry.github.io/shell-novice/)

**Don't have HPC access yet?**
You can practice SLURM locally on your own Ubuntu machine or WSL. This tutorial walks through setting up a single-node SLURM instance: [How to set up SLURM on Ubuntu for single-node scheduling](https://drtailor.medium.com/how-to-setup-slurm-on-ubuntu-20-04-for-single-node-work-scheduling-6cc909574365)

When you do get HPC access, this is a solid beginner tutorial for using SLURM on a real cluster: [RIT Research Computing — SLURM Quick Start Tutorial](https://research-computing.git-pages.rit.edu/docs/slurm_quick_start_tutorial.html)

**Next:** [Part 7 — Git and GitHub](https://abhigyan-pro.github.io/Blogs/Part7.html)