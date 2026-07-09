# Part 11 — Building Reproducible Python Workflows

*Python Development with WSL, Ubuntu, Miniconda, and VS Code — Part 11 of 12*

---

## Objective

Writing code that works on your machine is only half the job. Reproducible research means someone else — or your future self six months from now — can take your project, set it up, and get the same results.

This part builds on the project structure from Part 8 and adds the tools and practices that make your work shareable, maintainable, and reproducible.

By the end, you'll have:

- A complete, reproducible project structure
- Dependencies captured in `environment.yml` and `requirements.txt`
- Configuration files separating settings from code
- A documented project others can understand and run
- A basic understanding of Docker for full environment reproducibility

---

## Using This Article

If you get stuck at any step, use a ChatAI (Claude, ChatGPT, Gemini, or Grok) with this prompt:

> I am following this article: [paste this article's link]
> I am on Step [X].
> I did: [describe what you did]
> I got: [paste the exact error or describe what happened]
> Help me troubleshoot.

To go deeper on any step: *"I am following [link]. In Step X it says to run [command] — explain what each part does."*

---

## Prerequisites

- `~/project_1` set up with Git and GitHub ([Parts 3–7](#))
- Project structure created ([Part 8](#))
- `env_project1` Conda environment ([Part 4](#))

---

## Step 1 — Revisiting Project Structure

In Part 8, we built this structure:

````
project_1/
├── notebooks/
├── scripts/
├── results/
│   ├── figures/
│   └── outputs/
├── .gitignore
└── README.md
````

In this part, we add three more files that make the project reproducible:

````
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
````

These three files are what allow someone else to rebuild your exact environment and run your code without guessing.

---

## Step 2 — Managing Dependencies

### What is `environment.yml`?

`environment.yml` is a Conda-specific file that captures your entire environment — Python version, Conda channels, and all installed packages. Anyone with Miniconda can recreate your exact environment from this file.

Generate it from your active environment:

````bash
conda activate env_project1
conda env export > environment.yml
````

Open it to see what was captured:

````bash
cat environment.yml
````

It will look something like:

````yaml
name: env_project1
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11.0
  - numpy=1.26.0
  - jupyterlab=4.0.0
  - pip:
    - some-pip-package==1.0.0
````

To recreate this environment on another machine:

````bash
conda env create -f environment.yml
````

---

### What is `requirements.txt`?

`requirements.txt` is a pip-specific file listing Python packages and their versions. It's the most widely used format for sharing dependencies — you'll see it in almost every Python project on GitHub, regardless of whether they use Conda.

Generate it:

````bash
pip freeze > requirements.txt
````

To install from it on another machine:

````bash
pip install -r requirements.txt
````

**When to use which:**

| | `environment.yml` | `requirements.txt` |
|--|---|---|
| Tool | Conda | pip |
| Captures Python version | Yes | No |
| Captures Conda packages | Yes | No |
| Works without Conda | No | Yes |
| Include in your project | Yes | Yes |

Include both in your project. `environment.yml` is for Conda users (your primary workflow). `requirements.txt` is for anyone who isn't using Conda and just wants to install your dependencies with pip.

---

### A Note on `venv`

If you read other Python tutorials or open a project on GitHub, you'll often see `venv` used instead of Conda:

````bash
python -m venv myenv
source myenv/bin/activate
````

`venv` is Python's built-in virtual environment tool. It creates isolated environments like Conda does, but it:
- Only manages Python packages — not system-level dependencies
- Doesn't manage Python versions
- Uses `requirements.txt` for dependency management

For scientific computing and research, Conda is more capable — which is why we've used it throughout this series. But knowing `venv` exists helps you read other projects without confusion.

For a full `venv` walkthrough: [Python venv documentation](https://docs.python.org/3/library/venv.html)

---

## Step 3 — Configuration Files

### Why Configuration Files?

Hardcoding values directly in your scripts is a common beginner habit:

````python
data_path = "/mnt/d/datasets/project_1/raw/data.csv"
learning_rate = 0.001
batch_size = 32
````

This causes problems when:
- Someone else runs your code on a different machine with a different path
- You want to run the same script with different settings
- You share your code publicly but don't want to expose local paths

Configuration files solve this by separating settings from code.

### `.env` Files

For sensitive or machine-specific values — paths, API keys, credentials:

````bash
touch .env
nano .env
````

Add:

````
DATA_PATH=/mnt/d/datasets/project_1/raw
RESULTS_PATH=/home/abhigyan/project_1/results
````

Read in Python using `python-dotenv`:

````bash
conda install python-dotenv
````

````python
from dotenv import load_dotenv
import os

load_dotenv()
data_path = os.getenv("DATA_PATH")
````

Always add `.env` to `.gitignore` — never commit it to GitHub:

````bash
nano .gitignore
````

Add:

````
.env
````

---

### `config.yaml`

For project settings that aren't sensitive — parameters, model settings, file paths that are safe to share:

````bash
touch config.yaml
nano config.yaml
````

Add:

````yaml
data:
  raw: /mnt/d/datasets/project_1/raw
  processed: /mnt/d/datasets/project_1/processed

model:
  learning_rate: 0.001
  batch_size: 32
  epochs: 50

results:
  figures: results/figures
  outputs: results/outputs
````

Read in Python using `PyYAML`:

````bash
conda install pyyaml
````

````python
import yaml

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

learning_rate = config["model"]["learning_rate"]
data_path = config["data"]["raw"]
````

---

### `argparse` — Command-Line Arguments

For scripts you run from the terminal with different settings each time:

````python
import argparse

parser = argparse.ArgumentParser(description="Train model")
parser.add_argument("--epochs", type=int, default=50)
parser.add_argument("--learning-rate", type=float, default=0.001)
args = parser.parse_args()

print(f"Training for {args.epochs} epochs at lr={args.learning_rate}")
````

Run with:

````bash
python train.py --epochs 100 --learning-rate 0.0001
````

`argparse` is built into Python — no installation needed.

**When to use which:**

| | `.env` | `config.yaml` | `argparse` |
|--|--------|--------------|------------|
| Sensitive values | ✅ | ❌ | ❌ |
| Shareable settings | ❌ | ✅ | ✅ |
| Changed at runtime | ❌ | ❌ | ✅ |
| Committed to GitHub | Never | Yes | Yes (in code) |

---

## Step 4 — Documenting Your Project

### README.md

In Part 8, we created a minimal README. Now we expand it into something a collaborator or reviewer can actually use.

A complete research project README:

````markdown
# Project 1

## What this is
One paragraph describing the project, its goal, and its context.

## Requirements
- Python 3.11
- Conda (Miniconda recommended)

## Setup

Clone the repository:
```bash
git clone git@github.com:yourusername/project_1.git
cd project_1
```

Create the environment:
```bash
conda env create -f environment.yml
conda activate env_project1
```

Set up configuration:
```bash
cp .env.example .env
# Edit .env with your local paths
```

## Data
Where the data comes from, how to obtain it, and where to place it.

## How to run
Step by step instructions in order:
1. Run `scripts/01_process_data.py` to clean raw data
2. Run `scripts/02_train_model.py` to train
3. Results appear in `results/`

## Project structure
Brief description of each folder.

## Citation
If others should cite this work, include the reference here.
````

---

### `.env.example`

Since `.env` is never committed to GitHub, provide a template so others know what values to fill in:

````bash
touch .env.example
nano .env.example
````

Add:

````
DATA_PATH=           # path to your raw data folder
RESULTS_PATH=        # path to your results folder
````

Commit this file — it's a safe template with no real values.

---

### Inline Code Comments

Comments explain why, not what:

````python
# Bad — states the obvious
learning_rate = 0.001  # set learning rate to 0.001

# Good — explains the reasoning
learning_rate = 0.001  # lower than default; large datasets with this architecture
                       # tend to diverge at 0.01
````

---

## Step 5 — Docker: Full Environment Reproducibility

`environment.yml` and `requirements.txt` reproduce your Python environment. But they don't capture:
- The operating system
- System-level software (`apt` packages, compilers)
- Exact library versions at the system level

**Docker** solves this by packaging your entire environment — OS, system software, Python, and packages — into a single portable container. Anyone with Docker installed can run your container and get an identical environment, regardless of their machine.

Think of it as the difference between sharing a recipe (environment.yml) and sharing the fully prepared meal in a sealed box (Docker).

### A Minimal Dockerfile

A `Dockerfile` defines what goes into your container:

````dockerfile
# Start from an official Python base image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy dependency file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Default command to run
CMD ["python", "scripts/main.py"]
````

Build the container:

````bash
docker build -t project_1 .
````

Run it:

````bash
docker run project_1
````

For most research projects, `environment.yml` is sufficient. Docker becomes important when:
- You're sharing work with people on different operating systems
- You're deploying code to a server or cloud
- You need exact reproducibility including system-level dependencies

For a full Docker walkthrough: [Docker Get Started Guide](https://docs.docker.com/get-started/)

---

## Step 6 — Best Practices for Long-Term Projects

A few habits that pay off as projects grow:

**Version your data alongside your code**
When your raw data changes, note it. Keep old versions if possible. A result from six months ago should be reproducible with the data from six months ago.

**Tag releases**
When you reach a milestone — a paper submission, a working model — tag it in Git:

````bash
git tag -a v1.0 -m "Results for paper submission"
git push origin v1.0
````

You can always return to this exact state later.

**Keep a changelog**
A simple `CHANGELOG.md` at the root of your project:

````markdown
# Changelog

## v1.0 — 2024-07-01
- Initial model training pipeline
- Preprocessing scripts for raw data

## v0.1 — 2024-05-15
- Project structure set up
````

**Never hardcode paths**
Use `config.yaml` or `.env` instead. Your project should run on any machine with minimal changes.

**Commit often, with clear messages**
A commit message like `fix bug` tells you nothing in six months. `fix off-by-one error in sliding window preprocessing` does.

**Keep results out of GitHub**
Push code, not outputs. Results are reproducible from code — they don't need version control.

---

## What You've Done

- Built on Part 8's project structure with reproducibility files
- Generated `environment.yml` and `requirements.txt`
- Understood `venv` and how it relates to Conda
- Created `.env`, `config.yaml`, and `argparse` for configuration
- Wrote a complete, usable README
- Understood what Docker is and when it matters
- Applied long-term project best practices

**Next:** [Part 12 — Contributing to Open Science](#)