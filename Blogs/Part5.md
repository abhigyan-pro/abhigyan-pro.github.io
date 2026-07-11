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

### Section 7 — HPC Systems and SLURM

HPC clusters connect hundreds of computers to run massive jobs. Unlike local machines, you submit these jobs to a queue managed by a scheduler like **SLURM**.

A basic SLURM job script (`job.sh`):
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

- **Submit**: `sbatch job.sh`
- **Check status**: `squeue -u username`

On HPC, use the module system to load software: `module avail`, `module load python/3.11`, `module list`.

---

## What's Next

**What You've Done:**
- Organized directories and managed files
- Understood permissions, system software installation, and environment variables
- Learned SSH for remote connectivity and SLURM for HPC job submission

**Further reading:**
- [The Unix Shell — Software Carpentry](https://swcarpentry.github.io/shell-novice/)
- [RIT Research Computing — SLURM Quick Start Tutorial](https://research-computing.git-pages.rit.edu/docs/slurm_quick_start_tutorial.html)

**Next:** [Part 6 — Git and GitHub for Reproducible Research](https://abhigyan-pro.github.io/Blogs/Part67.html)
|
**Previous:** [Part 4 — Setting Up VS Code](https://abhigyan-pro.github.io/Blogs/Part4.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)