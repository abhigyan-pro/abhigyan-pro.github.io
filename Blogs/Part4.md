# Managing Projects with Conda Environments
### Building a Research Computing Environment — Part 4 of 12

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

This article creates an isolated Conda environment (`env_project1`), installs numpy through it, and explains when to use `conda install` vs `pip install`. You'll then run the same piece of Python code two ways — as a `.py` script and inside a JupyterLab `.ipynb` notebook — to see how the two workflows differ.

---

## Objective

In Part 3, we created `~/project_1` — a folder for our first project. But a folder alone is not enough. Every Python project also needs its own environment — a controlled space where you install only the packages that project needs.

In this article, we'll create that environment, install packages, and run our first Python code in both a `.py` and `.ipynb` file.

By the end, you'll have:

- A Conda environment named `env_project1`
- numpy installed
- Run code in both a `.py` script and a `.ipynb` notebook
- JupyterLab set up and working

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
- `~/project_1` folder created ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html))

### Step 1 — What Are Python Packages?

Python by itself is minimal. Packages are collections of code written by others that you can use in your own projects.

For example:
- `numpy` — numerical computing
- `pandas` — data analysis
- `matplotlib` — plotting
- `scikit-learn` — machine learning

Instead of writing everything from scratch, you install a package and use it.

### Step 2 — Why Virtual Environments?

Imagine two projects:
- Project A needs numpy version 1.21
- Project B needs numpy version 2.0

If you install both on the same Python, they conflict. Virtual environments solve this — each project gets its own isolated Python with its own packages and versions.

With Miniconda, these are called **Conda environments**.

### Step 3 — Create a Conda Environment

Navigate to your project folder:

```bash
cd ~/project_1
```

Create an environment named `env_project1` with Python 3.11:

```bash
conda create -n env_project1 python=3.11 pip
```

> **Note:** Always include `pip` explicitly when creating an environment. Unlike the defaults channel, conda-forge doesn't bundle pip automatically with Python — skip it, and later `pip install` commands will fail with errors like `pip3: command not found` or `No module named pip`.

Conda will show a list of packages to install. Type `y` and press Enter.

Activate the environment:

```bash
conda activate env_project1
```

Your prompt will change from `(base)` to `(env_project1)`:

```
(env_project1) abhigyan@DESKTOP-XXXX:~/project_1$
```

This means you are now inside your isolated environment. Any package you install from this point goes into `env_project1` only — not into any other environment.

### Step 4 — Managing Your Environments

Before we install anything, a few commands worth knowing now that you have your first environment.

**List all environments:**

```bash
conda env list
```

Output:

```
# conda environments:
#
base                  *  ~/miniconda3
env_project1             ~/miniconda3/envs/env_project1
```

The `*` shows your currently active environment.

**Where environments are stored:**

Each environment lives inside `~/miniconda3/envs/`. You never need to go there directly — Conda manages it for you. But knowing this helps when you're wondering where your packages actually live.

**Deactivate an environment:**

```bash
conda deactivate
```

Switches you back to `(base)`. Always deactivate before deleting an environment.

**Delete an environment:**

```bash
conda env remove -n env_project1
```

This permanently deletes the environment and all packages inside it. Don't run this now — we'll need `env_project1` for the rest of the series.

### Step 5 — Installing Packages (also called Libraries)

Make sure `env_project1` is active before installing anything:

```bash
conda activate env_project1
```

#### `conda install` vs `pip install`

There are two ways to install packages:

| | `conda install` | `pip install` |
|---|---|---|
| Source | Conda repositories | Python Package Index (PyPI) |
| Handles non-Python dependencies | Yes | No |
| Environment safety | Better | Can break Conda environments if overused |
| When to use | Default choice | When package is not available via Conda |

**Rule of thumb:** always try `conda install` first. Use `pip install` only if the package is not available through Conda.

#### The `conda-forge` Channel

Conda packages are hosted in **channels** — think of them as app stores. The default Conda channel has many packages, but `conda-forge` is a community-maintained channel with significantly more packages and more up-to-date versions.

Set `conda-forge` as your default channel:

```bash
conda config --add channels conda-forge
conda config --set channel_priority strict
```

You only need to do this once — it applies to all environments.

#### Install numpy

NumPy is a Python package that provides support for arrays and mathematical operations. It is one of the core libraries used in data science and scientific computing.

```bash
conda install numpy
```

Type `y` when prompted.

Verify the installation:

```bash
python -c "import numpy; print(numpy.__version__)"
```

You should see a version number printed.

### Step 6 — Two Ways to Write Python: `.py` and `.ipynb`

Before writing any code, it helps to understand the two file types you'll use throughout this series.

#### `.py` — Python Script

A plain text file containing Python code. You run it from the terminal and it executes top to bottom.

Best for:
- Automation and pipelines
- Reusable functions and modules
- Code you want to run repeatedly without interaction

#### `.ipynb` — Jupyter Notebook

A notebook file where code, output, and text live together in cells. You run cells one at a time and see the output immediately below each cell.

Best for:
- Exploration and analysis
- Visualising results step by step
- Sharing work with explanations alongside code

Both are valid. Most research workflows use both — notebooks for exploration, scripts for automation.

### Step 7 — Run Your First `.py` Script

Make sure you are in `~/project_1` with `env_project1` active.

Create a file:

```bash
touch first_script.py
```

Open it in a terminal text editor. We'll use `nano` — a simple terminal text editor — to write our script directly in the terminal. (More about `nano` in Part 6.)

```bash
nano first_script.py
```

Type this code:

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
print("Array:", a)
print("Mean:", np.mean(a))
print("Sum:", np.sum(a))
```

Save and exit: press `Ctrl+X`, then `Y`, then `Enter`.

Run the script:

```bash
python first_script.py
```

Expected output:

```
Array: [1 2 3 4 5]
Mean: 3.0
Sum: 15
```

### Step 8 — What is Jupyter Notebook and JupyterLab?

**Jupyter Notebook** is the original browser-based interface for `.ipynb` files. You write code in cells, run them one at a time, and see output immediately below.

**JupyterLab** is the modern replacement. It has the same notebook functionality but adds a file browser, terminal, text editor, and multiple tabs — all in one browser window.

For this series, we use **JupyterLab**.

### Step 9 — Install JupyterLab and ipykernel

`ipykernel` is what connects your Conda environment to JupyterLab. Without it, JupyterLab won't see `env_project1` as an available kernel.

Install both:

```bash
conda install jupyterlab ipykernel
```

Type `y` when prompted.

Register your environment as a Jupyter kernel:

```bash
python -m ipykernel install --user --name env_project1 --display-name "Python (env_project1)"
```

### Step 10 — Run Your First `.ipynb` Notebook

Launch JupyterLab:

```bash
jupyter lab
```

JupyterLab will open in your browser automatically. If it doesn't, copy the URL from the terminal — it will look like:

```
http://localhost:8888/lab?token= ...... copy the entire line
```

and paste it into your browser.

In JupyterLab:

1. Click **File → New → Notebook**
2. Select **Python (env_project1)** as the kernel
3. In the first cell, type:

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
print("Array:", a)
print("Mean:", np.mean(a))
print("Sum:", np.sum(a))
```

4. Press `Shift+Enter` to run the cell

Expected output:

```
Array: [1 2 3 4 5]
Mean: 3.0
Sum: 15
```

Same result as the `.py` script — but this time inside a notebook cell, with output directly below your code.

To stop JupyterLab, go back to the terminal and press `Ctrl+C`.

### Step 11 — Why Use an IDE Like VS Code?

JupyterLab is a capable environment. For notebooks and interactive work, it works well on its own.

But as your projects grow, you'll find yourself needing more:

- **Git integration** — track changes, commit, and push to GitHub without leaving your editor
- **Debugger** — step through code line by line when something breaks
- **File management** — navigate your entire project, not just one notebook
- **Built-in terminal** — run commands alongside your code
- **Both `.py` and `.ipynb` in one place** — switch between scripts and notebooks seamlessly
- **Extensions** — linting, formatting, autocomplete, and language support all in one place

JupyterLab is purpose-built for notebooks and interactive computing — and it does that extremely well. An IDE like VS Code goes further by bringing your entire development workflow — code, terminal, Git, debugger, and notebooks — into a single environment. As your projects grow in complexity, having everything in one place makes a real difference.

In Part 5, we'll set up VS Code and connect it to the environment we built here.

---

## What's Next

**What You've Done:**

- Understood what packages and virtual environments are
- Created Conda environment `env_project1`
- Learned to list, deactivate, and delete Conda environments
- Learned `conda install` vs `pip install` and set up `conda-forge`
- Installed numpy
- Understood the difference between `.py` and `.ipynb`
- Ran your first Python code in both a script and a notebook
- Set up JupyterLab

**Next:** [Part 5 — Setting Up VS Code](https://abhigyan-pro.github.io/Blogs/Part5.html)