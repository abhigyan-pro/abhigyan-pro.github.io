# Part 5 — Setting Up VS Code for Python Development

*Python Development with WSL, Ubuntu, Miniconda, and VS Code — Part 5 of 12*

---

## Objective

In Part 4, we ran Python code in both a `.py` script and a `.ipynb` notebook using JupyterLab. In this part, we'll set up VS Code — a single environment where you can work with both file types, alongside your terminal, Git, and debugger.

By the end, you'll have:

- VS Code installed and configured
- Python and Jupyter extensions set up
- `env_project1` connected as your interpreter and kernel
- Run `first_script.py` and your notebook directly inside VS Code

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

- WSL2 or native Linux with Miniconda installed ([Part 2](#))
- `~/project_1` with `env_project1`, `first_script.py`, and a `.ipynb` notebook ([Part 4](#))

---

## Step 1 — Installing VS Code

### Windows (WSL) Users

Go to [https://code.visualstudio.com/](https://code.visualstudio.com/) and click **Download for Windows**.

Run the downloaded file — it will be named something like `VSCodeUserSetup-x64-1.xx.x.exe`.

The installer will walk you through these screens:

1. **License Agreement** — Select **I accept the agreement** → click **Next**
2. **Select Destination Location** — leave the default path as is → click **Next**
3. **Select Start Menu Folder** — leave as is → click **Next**
4. **Select Additional Tasks** — this is the important screen. You will see a list of checkboxes. Make sure these two are checked:
   - ✅ **Add to PATH** — allows you to type `code .` in the terminal to open VS Code from any folder
   - ✅ **Open with Code** (under the File Explorer options) — lets you right-click any folder in Windows Explorer and open it in VS Code
   - Leave everything else as is → click **Next**
5. **Ready to Install** — click **Install**
6. **Finish** — leave **Launch Visual Studio Code** checked → click **Finish**

Now open your Ubuntu terminal and verify:

```bash
code --version
```

You should see a version number. If you get `command not found`, close the terminal completely, reopen it, and try again.

---

### Native Linux Users

Open your terminal and run these commands one by one:

```bash
sudo apt update
```

```bash
sudo apt install wget gpg
```

```bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
```

```bash
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
```

```bash
echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
```

```bash
sudo apt update
```

```bash
sudo apt install code
```

Verify:

```bash
code --version
```

You should see a version number printed.

---

## Step 2 — Installing the Remote WSL Extension

> **Windows (WSL) users only. Native Linux users skip to Step 3.**

The Remote WSL extension allows VS Code running on Windows to connect to your Ubuntu environment. Without it, VS Code won't see your Linux files, Conda environments, or packages.

1. Open VS Code
2. Press `Ctrl+Shift+X` to open the Extensions panel
3. Search for **Remote - WSL**
4. Click **Install**

---

## Step 3 — Installing Python and Jupyter Extensions

Open VS Code. Press `Ctrl+Shift+X` to open the Extensions panel.

Search for and install these two extensions:

- **Python** — by Microsoft
- **Jupyter** — by Microsoft

These give VS Code the ability to:
- Run `.py` scripts with a selected Conda interpreter
- Run `.ipynb` notebooks with a selected Conda kernel

---

## Step 4 — Opening Your Project in VS Code

Activate your environment and navigate to your project folder in the terminal:

```bash
conda activate env_project1
```

```bash
cd ~/project_1
```

Open VS Code from the terminal:

```bash
code .
```

**WSL users:** VS Code will open on Windows and automatically connect to your Ubuntu environment via the Remote WSL extension. You'll see a green indicator in the bottom-left corner of VS Code showing `WSL: Ubuntu`.

**Native Linux users:** VS Code opens locally with `~/project_1` as the workspace.

From this point, everything is identical for both.

---

## Step 5 — Selecting a Conda Interpreter for `.py` Files

VS Code needs to know which Python environment to use when running `.py` files.

1. Press `Ctrl+Shift+P` to open the Command Palette
2. Type **Python: Select Interpreter** and press Enter
3. You'll see a list of available Python environments
4. Select **Python (env_project1)**

VS Code will now use `env_project1` when running any `.py` file in this project.

---

## Step 6 — Running `first_script.py`

In the VS Code file browser on the left, click on `first_script.py` to open it.

To run it:
- Press `Ctrl+F5`, or
- Click the **Run** button (▷) in the top-right corner

The output will appear in the **Terminal** panel at the bottom:

```
Array: [1 2 3 4 5]
Mean: 3.0
Sum: 15
```

Same output as Part 4 — but now running directly inside VS Code.

---

## Step 7 — Selecting a Jupyter Kernel for `.ipynb` Files

In the VS Code file browser on the left, click on your `.ipynb` notebook to open it.

In the top-right corner of the notebook, you'll see a **kernel selector** showing either a kernel name or **Select Kernel**. Click it.

A dropdown will appear at the top of the screen. Select **Python (env_project1)**.

This connects your notebook to the same Conda environment you've been working in.

---

## Step 8 — Running Your Notebook in VS Code

With your notebook open and `env_project1` selected as the kernel, you'll see the same cells you wrote in Part 4.

Key notebook controls in VS Code:

| Action | How |
|--------|-----|
| Run a cell | `Shift+Enter` or click ▷ next to the cell |
| Run all cells | Click **Run All** in the top toolbar |
| Clear output of a cell | Right-click the cell → **Clear Cell Output** |
| Clear all outputs | Click **Clear All Outputs** in the top toolbar |
| Restart kernel | Click **Restart** in the top toolbar |
| Restart and run all | Click **Restart** → **Restart and Run All Cells** |

Run your notebook. Expected output in the first cell:

```
Array: [1 2 3 4 5]
Mean: 3.0
Sum: 15
```

Same result as Part 4 — the environment, the code, and the output are identical. The difference is you now have your terminal, file browser, Git, and debugger all in the same window.

---

## What You've Done

- Installed VS Code on Windows (WSL) or Linux
- Connected VS Code to your Ubuntu environment (WSL users)
- Installed Python and Jupyter extensions
- Opened `~/project_1` in VS Code from the terminal
- Selected `env_project1` as your interpreter and kernel
- Ran `first_script.py` and your notebook inside VS Code

**Next:** [Part 6 — Linux Essentials for Python Developers](#)