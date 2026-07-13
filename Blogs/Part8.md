# Enabling GPU Computing in WSL2 and Linux with CUDA
### Phase 3: High-Performance Computing — Part 1
(Part 8 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

This article installs and verifies NVIDIA drivers so your GPU is accessible from Ubuntu — one path for WSL2 users, one for native Linux users — and deliberately skips a system-wide CUDA Toolkit install to avoid conflicts with the pip-bundled CUDA libraries Part 10 will install. It closes with a heads-up on one extra step TensorFlow on WSL sometimes needs, so it doesn't read as an error when it happens.

---

## Objective

This part is only relevant if your computer has an NVIDIA GPU. If you have an AMD or Intel GPU, or no dedicated GPU, skip to Part 10 — GPU setup for those is a different process entirely.

By the end, you'll have:
- NVIDIA drivers installed and up to date
- GPU access verified and ready for Part 10
- No conflicting CUDA installs to trip you up later
- A heads-up on one extra step Part 10 may ask you to do

---

## Content

<details markdown="1">
  <summary>
  <strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong>
  </summary>
  
  AI tools (like Claude, Gemini, or ChatGPT) give the best troubleshooting advice when they have the exact text of the tutorial. To ensure the AI understands what you are trying to build, we will give it the actual file.

  **1. Download the tutorial file**
  * Click this link: [Part8.md on GitHub](https://github.com/abhigyan-pro/abhigyan-pro.github.io/blob/main/Blogs/Part8.md)
  * Look near the top-right corner of the text box on that page.
  * Click the **Download raw file** button (it looks like a downward arrow ⬇️).

  **2. Upload it to your AI**
  * Open your AI tool (ChatGPT, Claude, Gemini, etc.).
  * Click the **paperclip (📎)** or **plus (➕)** icon next to the text box to upload the file (or simply drag and drop `Part8.md` into the chat).

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

  > I have attached the `Part8.md` file. Look at Step [X] and explain exactly what the command does and why we are doing it before I run it.

  Think of this series as the roadmap and your AI assistant as your learning companion.

</details>

### Why GPU Matters for Research and ML
GPUs run thousands of small operations in parallel, making them exceptionally powerful for machine learning and scientific computing. For large datasets or complex models, GPU access is a practical necessity.

### Prerequisites
- WSL2 and Ubuntu installed ([Part 1](https://abhigyan-pro.github.io/Blogs/Part1.html)), or native Linux
- Miniconda and `env_project1` set up ([Part 3](https://abhigyan-pro.github.io/Blogs/Part3.html))
- An NVIDIA GPU

### How GPU Access Works: WSL vs Native Linux
**WSL:** Your GPU is managed by Windows; you never install drivers inside Ubuntu on WSL.
**Native Linux:** You install the NVIDIA driver on the Linux system itself.

**Note on CUDA Toolkit:** This article skips the system-wide CUDA Toolkit to avoid conflicts with pip-bundled libraries.

---

# NVIDIA GPU drivers installation
## For WSL2 Users

<details markdown="1">
  <summary>
  <strong>💡Expand for details </strong>
  </summary>

#### Step 1 — Install or Update NVIDIA Drivers on Windows
  CUDA support on WSL is powered by your Windows NVIDIA driver, which acts as a bridge between the hardware and your Linux environment. If your driver is outdated, WSL may fail to detect your GPU.

  **1. Identify your GPU:** Not sure which card you have? Open **Task Manager** (`Ctrl+Shift+Esc`), go to the **Performance** tab, and click **GPU** on the left. The name of your card is in the top-right corner.

  **2. Download the Driver:** Visit the [NVIDIA Driver Downloads page](https://www.nvidia.com/Download/index.aspx).
  - Select your **Product Type**, **Series**, and **Product** based on your Task Manager info.
  - **Operating System**: Choose Windows 11.
  - **Download Type**: "Game Ready Driver" is standard, but "Studio Driver" is often more stable for research/ML tasks.
  - Click **Search**, then **Download**.

  **3. Installation:** Run the downloaded file. Select **Express Installation** to let the installer handle the settings automatically.

  **4. Finalize:** **Restart your computer.** This step is mandatory for the new driver to properly initialize the communication layer between Windows and WSL.

#### Step 2 — Verify GPU Access Inside WSL
  Open your Ubuntu terminal and run:
  ```bash
  nvidia-smi
  ```
  If you see a table showing your GPU name, driver, and CUDA version, you are set. If `command not found`, update your Windows driver.

#### Step 3 — Set the WSL GPU Library Path
  WSL exposes GPU driver interfaces via `/usr/lib/wsl/lib`. Open your `.bashrc` (`nano ~/.bashrc`) and add:
  ```bash
  export LD_LIBRARY_PATH=/usr/lib/wsl/lib:$LD_LIBRARY_PATH
  ```
  Save (`Ctrl+X`, `Y`, `Enter`) and run `source ~/.bashrc`.

#### Step 4 — A Heads-Up About Part 10
  When installing TensorFlow in Part 10 (`pip install tensorflow[and-cuda]`), it is normal for it to occasionally fail to locate libraries on WSL. This is an issue with library discovery, not your driver. We will fix this in Part 10 with a scoped `LD_LIBRARY_PATH` export.

</details>

---

## Native Linux Users

<details markdown="1">
  <summary>
  <strong>💡Expand for details </strong>
  </summary>

#### Step 1 — Install NVIDIA Drivers
  Follow NVIDIA's [official installation guide](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/). You only need the **driver**—the next part will handle the specific CUDA libraries.

#### Step 2 — Verify GPU Access
  Run `nvidia-smi`. You should see your GPU name and version without errors.

  ---

### Before You Proceed to Part 10
  Run `nvidia-smi` and note the maximum supported **CUDA Version** (e.g., `12.x`). Use this as an upper bound when installing PyTorch and TensorFlow.

  **Warning:** Check `~/.bashrc` for old `LD_LIBRARY_PATH=/usr/local/cuda/lib64` entries and remove them; they conflict with pip-installed CUDA libraries.

</details>

---

## What's Next

**What You've Done:**
- Understood why GPU matters for research
- Installed/updated NVIDIA drivers and verified access
- Configured WSL library paths
- Avoided system-level CUDA conflicts

**Next:** [Part 9 — Installing PyTorch and TensorFlow](https://abhigyan-pro.github.io/Blogs/Part9.html)
|
**Previous:** [Part 7 — Project Organization and Managing Scientific Data](https://abhigyan-pro.github.io/Blogs/Part7.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)