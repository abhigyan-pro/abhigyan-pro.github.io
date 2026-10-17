# Linux Essentials for HPC and Remote Servers
### Phase 2: The Research Infrastructure — Part 1
(Part 5 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

Unlike previous parts, this article serves as a map rather than a build tutorial. It covers directory organization, file management, permissions, installing system software with `apt`, environment variables, SSH, and the basics of HPC clusters and SLURM job submission — the concepts researchers need once they move beyond their local machine to remote servers.

---

## Objective

In previous parts, you built a concrete environment on your local machine. Here, the goal is different: this is a **map**. As a researcher, you'll eventually work on remote servers and university HPC (High Performance Computing) clusters. This article provides the foundational knowledge needed to navigate these environments confidently.

By the end, you'll have:
- An understanding of directory structures, file management, and permissions.
- Knowledge of system-level software installation using `apt`.
- Clarity on environment variables and how to configure them.
- Familiarity with remote access via SSH and job scheduling via SLURM.

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Grok, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Open this link in a new tab: [Part5.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/src/content/blogs/Part5.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part5.md` into the chat).

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

  > I have attached the `Part5.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Prerequisites

- Comfortable with the terminal ([Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html))
- `~/project_1` with `env_project1` set up ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html))

### Section 1 — Creating and Organizing Directories

Create nested directories in one command:
```bash
mkdir -p ~/project_1/data/raw
mkdir -p ~/project_1/data/processed
mkdir -p ~/project_1/scripts
mkdir -p ~/project_1/results
```

The `-p` flag creates all parent directories that don't exist yet. 

View your structure:
```bash
find ~/project_1 -type d
```

### Section 2 — Managing Files

Beyond basic navigation, these tools are essential for file management:

- **Delete a file**: `rm file.txt`
- **Delete a folder**: `rm -rf foldername/` (⚠️ *This is permanent; there is no recycle bin*)
- **View file contents**: `cat file.txt` or `less file.txt` (press `q` to exit)
- **Check disk usage**: `du -sh ~/project_1/`

#### Terminal Text Editors
- **`nano`**: Simple, opens files directly in the terminal; ideal for quick config edits.
- **`vim`**: More powerful but has a steep learning curve; useful for remote servers.

### Section 3 — File Permissions

Every file and folder in Linux has permissions controlling read, write, and execute access.

Run `ls -l ~/project_1/` to see permissions. Change them with `chmod`:
- Make a file executable: `chmod +x first_script.py`
- Restrict file access: `chmod 600 ~/.ssh/id_rsa`

### Section 4 — Installing Software with `apt`

Use `apt` for system-level software, distinct from Python-level packages managed by `conda` or `pip`.

- **Update repositories**: `sudo apt update`
- **Install Git**: `sudo apt install git`
- **Install compilers**: `sudo apt install gcc g++ gfortran`

### Section 5 — Environment Variables

Environment variables are configuration values bash reads at startup. 
- **View variables**: `env` or `echo $PATH`
- **Create a variable**: `export MY_DATA="/mnt/d/datasets"`
- **Make permanent**: Add the export line to `~/.bashrc` and run `source ~/.bashrc`

### Section 6 — SSH: Connecting to Remote Machines

SSH lets you control remote machines from your terminal.

1. **Generate SSH key**: `ssh-keygen -t ed25519 -C "email@example.com"`
2. **Connect**: `ssh username@server_address`
3. **Copy key**: `ssh-copy-id username@server_address` (enables password-less login)
4. **Transfer files**: Use `scp` or `rsync -avz` for efficient directory synchronization

### Section 7 — HPC Systems and Job Schedulers

An HPC (High Performance Computing) cluster is not one powerful computer — it's hundreds or thousands of ordinary computers ("nodes") wired together, shared by many researchers at once. Because it's shared, you can't just run your script the moment you connect. You have to *ask* for a slice of the cluster's resources, wait your turn, and let it run there. This section walks through that process in the order you'll actually encounter it.

> 📌 **A note on schedulers**: This tutorial uses **SLURM**, the most common scheduler at university clusters today. Some clusters instead run **PBS/Torque**, **LSF**, or a vendor-specific scheduler — e.g., Japan's Fugaku supercomputer uses the **Fujitsu Technical Computing Suite** (`pjsub` instead of `sbatch`, `pjstat` instead of `squeue`, `pjdel` instead of `scancel`). The concepts below are identical across all of them, only the command names change. Check `man sbatch` or your cluster's documentation to confirm which one you have.

#### 7.1 — The Basics: Login Nodes, Compute Nodes, and the Scheduler

Before running anything, understand the three pieces you're working with:

- **Login node**: Where you land when you `ssh` into the cluster. It's shared by *every* user connected at that moment, and it's meant only for light tasks — editing files, writing job scripts, submitting jobs, checking results. It is **not** meant for running your actual code.
- **Compute node**: Where real work happens — your Python script, your model training, your simulation. You never log into a compute node directly; instead, you *request* one through the scheduler, which hands you a node (or several) for a limited time.
- **The scheduler**: Sits in between the two. You describe what you need (how many CPUs, how much memory, how long), and the scheduler finds an available compute node matching that request — queuing your job if nothing is free yet.

**The one rule to remember**: if you're typing a heavy command directly after `ssh`-ing in, without going through the scheduler, you're on the login node — stop, and submit it as a job instead (more in 7.6).

#### 7.2 — Submitting Your First Job

A job script describes what you want to run and how much of the cluster it needs. Save this as `job.sh`:

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

Each `#SBATCH` line is a request to the scheduler — here, one task, 4 CPU cores, 8GB memory, and a 2-hour time limit. Go over the time or memory limit and the scheduler kills your job, so estimate generously but not wastefully.

- **Submit it**: `sbatch job.sh`
- **Check if it's running or queued**: `squeue -u username`
- **See the output**: once finished, read the file named in `--output` above (e.g., `my_job_12345.out`)

#### 7.3 — Interactive vs. Batch Jobs

`sbatch` above submits a **batch** job — it runs unattended, and you only see the result afterward in the `.out` file. That's great for long runs, but painful for debugging. For quick tests, request an **interactive** session instead, which drops you into a live shell on a compute node:

- **`salloc --time=01:00:00 --cpus-per-task=4`**: Reserve resources and get a shell on a compute node.
- **`srun --pty bash`**: A similar way to start an interactive shell on an allocated node.

A good habit as a beginner: test your script interactively first, confirm it runs correctly, *then* submit the same command as a batch job for the full run.

#### 7.4 — Loading Software with Modules (Lmod)

HPC clusters don't install every version of every tool system-wide — instead, software is made available through **modules**, managed by a system called **Lmod**. You load only what your job needs, when it needs it:

- **`module avail`**: List software available on the cluster.
- **`module load python/3.11`**: Load a specific version into your environment.
- **`module list`**: See what's currently loaded.
- **`module spider <name>`**: Search *all* versions of a piece of software cluster-wide, including ones hidden until a prerequisite is loaded first.
- **`module purge`**: Unload everything — a good first line in a job script, so you start from a clean slate instead of inheriting a messy environment.
- **`module swap <old> <new>`**: Replace one loaded module with another (e.g., switching compiler versions) without unloading everything else.

⚠️ Loading modules with conflicting dependencies (e.g., two different MPI implementations at once) is a common source of confusing build errors. If something breaks unexpectedly, `module purge` and reload only what you actually need.

#### 7.5 — Compilers on HPC

Unlike your local machine, a cluster usually offers **multiple compiler toolchains** side by side — GCC, Intel, and NVIDIA HPC are common — rather than one system compiler, and you pick between them using modules (7.4). This matters for two reasons:

- Software built with one toolchain (e.g., Intel) often expects matching math libraries and won't mix cleanly with builds from another toolchain.
- Performance on numerically heavy code can differ meaningfully between compilers, which is why clusters offer more than one.

As a beginner, you likely won't need to touch this directly — but if you ever see a build error mentioning a compiler mismatch, this is why. Check what's available with `module avail gcc` or `module avail intel`.

#### 7.6 — Login Node Etiquette

Worth repeating on its own: running heavy computation on the login node (7.1) slows the cluster down for *every other user* connected to it at that moment, and most clusters treat it as a policy violation — some will automatically kill offending processes. Always route real work through `sbatch`, `salloc`, or `srun`.

#### 7.7 — Storage Tiers and Quotas

Clusters typically split storage into a few areas, each with different rules:

- **`$HOME`**: Small quota, usually backed up — for scripts and configs, not large datasets.
- **`/scratch`**: Large, fast storage for active job I/O, but often **not backed up** and periodically purged (e.g., files older than 30–90 days deleted automatically).
- **`/project`** (naming varies): Shared, larger-quota space for a research group's longer-term data.

Check your usage against your limit with `quota -s` (the exact command varies by site — check your cluster's documentation).

#### 7.8 — Monitoring and Cancelling Jobs

Once a job is submitted, a few more commands help you manage it:

- **`squeue -u username`**: Check whether it's still queued or already running.
- **`scancel <job_id>`**: Cancel a running or queued job.
- **`sacct -j <job_id>`**: View accounting details — runtime, memory used, exit status — including for jobs that already finished.

---

## What's Next

**What You've Done:**
- Organized directories and managed files
- Understood permissions, system software installation, and environment variables
- Learned SSH for remote connectivity and SLURM for HPC job submission

**Further reading:**
- [The Unix Shell — Software Carpentry](https://swcarpentry.github.io/shell-novice/)
- [RIT Research Computing — SLURM Quick Start Tutorial](https://research-computing.git-pages.rit.edu/docs/slurm_quick_start_tutorial.html)

**Next:** [Part 6 — Git and GitHub for Reproducible Research](https://abhigyan-pro.github.io/Blogs/Part6.html)
|
**Previous:** [Part 4 — Setting Up VS Code](https://abhigyan-pro.github.io/Blogs/Part4.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)