# Enabling GPU Computing in WSL and Linux with CUDA
### Building a Research Computing Environment — Part 9 of 12

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

This article installs and verifies NVIDIA drivers so your GPU is accessible from Ubuntu — one path for WSL users, one for native Linux users — and deliberately skips a system-wide CUDA Toolkit install to avoid conflicts with the pip-bundled CUDA libraries Part 10 will install. It closes with a heads-up on one extra step TensorFlow on WSL sometimes needs, so it doesn't read as an error when it happens.

---

## Objective

This part is only relevant if your computer has an NVIDIA GPU. If you have an AMD or Intel GPU, or no dedicated GPU, skip to Part 10 — GPU setup for those is a different process entirely and beyond the scope of this series.

Not sure if you have an NVIDIA GPU? On Windows, open Device Manager → Display Adapters. If you see an NVIDIA card listed, you're good to proceed.

This part is split into two sections — one for WSL users and one for native Linux users. Jump to the section that applies to you:

- WSL users → [WSL Users](#wsl-users)
- Native Linux users → [Native Linux Users](#native-linux-users)

Both sections end at [Before You Proceed to Part 10](#before-you-proceed-to-part-10) — which applies to everyone.

By the end, you'll have:

- NVIDIA drivers installed and up to date
- GPU access verified and ready for Part 10
- No conflicting CUDA installs to trip you up later
- A heads-up on one extra step Part 10 may ask you to do — so it doesn't feel like something went wrong when it happens

---

## Content

### Why GPU Matters for Research and ML

A CPU (your computer's main processor) is designed to handle a few complex tasks at a time. A GPU was originally built for graphics — rendering thousands of pixels simultaneously. That same ability to run thousands of small operations in parallel makes GPUs exceptionally powerful for machine learning, numerical simulations, and scientific computing.

Training a deep learning model that takes days on a CPU can take hours on a GPU. For researchers working with large datasets or complex models, GPU access is not a luxury — it's a practical necessity.

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

- WSL2 and Ubuntu installed [Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html), or native Linux
- Miniconda and env_project1 set up [Part 4](https://abhigyan-pro.github.io/Blogs/Part4.html)
- An NVIDIA GPU

### How GPU Access Works: WSL vs Native Linux

Before touching anything, it helps to understand how GPU access works differently on WSL and native Linux — and a design decision this article makes for both.

**WSL:** Your GPU is managed entirely by Windows. You install the NVIDIA driver on Windows once, and WSL automatically inherits GPU access. You never install drivers inside Ubuntu on WSL — attempting to do so will break things.

**Native Linux:** Your GPU is managed by Linux directly. You install the NVIDIA driver on the Linux system itself.

**A note on the CUDA Toolkit:** You might expect the next step to be installing the CUDA Toolkit system-wide (via `apt`). This article skips that deliberately. In Part 10, we install PyTorch and TensorFlow using their GPU-enabled pip packages, which bundle their own CUDA and cuDNN libraries — no system-wide toolkit required. Installing a separate system CUDA Toolkit *alongside* these pip packages is a common source of hard-to-debug conflicts (mismatched library versions shadowing each other via `LD_LIBRARY_PATH`), so we avoid it entirely unless you have a specific reason to need `nvcc` (the CUDA compiler) for compiling custom CUDA C++ code — which most PyTorch/TensorFlow users never do.

Once your driver is verified, everything from Part 10 onwards is identical for both WSL and native Linux.

### WSL Users

#### Step 1 — Install or Update NVIDIA Drivers on Windows

CUDA support on WSL comes entirely from your Windows NVIDIA driver. If your driver is up to date, WSL already has what it needs.

Check your current driver version:

1. Right-click the desktop → NVIDIA Control Panel
2. Click Help → System Information
3. Note the Driver Version shown

Update to the latest driver:

1. Go to https://www.nvidia.com/drivers
2. Select your GPU model, OS (Windows), and click Search
3. Download and run the installer
4. During installation select Express Installation
5. Restart your computer after installation

#### Step 2 — Verify GPU Access Inside WSL

Open your Ubuntu terminal and run:

```bash
nvidia-smi
```

You should see a table showing your GPU name, driver version, and CUDA version. For example:

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 545.xx       Driver Version: 545.xx    CUDA Version: 12.x       |
+-----------------------------------------------------------------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  Off  | 00000000:01:00.0 Off |                  N/A |
```

If you see this, your GPU is accessible from WSL. Move to Step 3.

If you get `command not found`, your driver may need updating — go back to Step 1.

**About the CUDA Version shown here:** this is the *maximum* CUDA version your driver supports — not a toolkit you've installed. In Part 10, when you install PyTorch and TensorFlow's GPU-enabled pip packages, you'll want to make sure the CUDA version those packages target is at or below this number.

#### Step 3 — Set the WSL GPU Library Path

WSL exposes the GPU driver interface through a small set of libraries that live outside your Ubuntu filesystem, at `/usr/lib/wsl/lib`. PyTorch and TensorFlow's pip packages don't know to look there by default, so we add it to your library path once, here.

Open your `.bashrc`:

```bash
nano ~/.bashrc
```

Add this line at the bottom:

```bash
export LD_LIBRARY_PATH=/usr/lib/wsl/lib:$LD_LIBRARY_PATH
```

Save and exit (`Ctrl+X`, `Y`, `Enter`). Apply the change:

```bash
source ~/.bashrc
```

That's it for driver-level setup. Before you move on, read the heads-up below — it'll save you a confusing moment in Part 10.

#### Step 4 — A Heads-Up About Part 10 (read this before moving on)

In Part 10, you'll install TensorFlow with:

```bash
pip install tensorflow[and-cuda]
```

This bundles CUDA and cuDNN as pip packages, installed directly inside that conda environment's `site-packages/nvidia/` folder, rather than in a system-wide location.

Most of the time, TensorFlow finds these automatically and everything just works. But on WSL, it's common — not a sign you did something wrong — for TensorFlow to fail to locate them on its own, even with a clean setup and nothing else installed. You'll know this is happening if `tf.config.list_physical_devices('GPU')` returns an empty list `[]`, often alongside a warning that says `Cannot dlopen some GPU libraries`.

If you hit this, it isn't a driver problem, and it isn't something you misconfigured — it's just this one pip package's library discovery being unreliable on WSL. Part 10 shows you exactly how to check for it and fix it with one extra `LD_LIBRARY_PATH` export, scoped just to that conda environment. Think of it as a normal, expected extra step for TensorFlow on WSL — not a troubleshooting detour.

(PyTorch is generally more reliable here and usually doesn't need this extra step, but the same fix applies if you ever see the same symptom there.)

Skip to [Before You Proceed to Part 10](#before-you-proceed-to-part-10).

### Native Linux Users

#### Step 1 — Install NVIDIA Drivers

On native Linux, driver installation varies depending on your GPU model, Linux distribution, and desktop environment. A single set of commands that works for everyone doesn't exist here.

The most reliable approach is to follow NVIDIA's official documentation directly:

- [NVIDIA CUDA Installation Guide for Linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/)

For a beginner-friendly walkthrough specific to Ubuntu, this guide is widely recommended:

- [How to install NVIDIA drivers on Ubuntu — Lambda Labs](https://lambdalabs.com/)

You only need the **driver** here — not the CUDA Toolkit. As with WSL, PyTorch and TensorFlow's GPU pip packages in Part 10 bundle their own CUDA and cuDNN libraries, so a separate system-wide toolkit isn't necessary unless you specifically plan to compile custom CUDA C++ code with `nvcc`.

#### Step 2 — Verify GPU Access

Once the driver is installed, verify it:

```bash
nvidia-smi
```

This should print your GPU name, driver version, and supported CUDA version without errors — no separate toolkit verification needed.

Native Linux installs are generally less prone to the pip-bundled library discovery issue described above, since there's no WSL translation layer involved — but if you do see an empty GPU list in Part 10, the same fix applies.

### Before You Proceed to Part 10

This section applies to everyone — WSL and native Linux users.

Run this to confirm your driver and note the maximum CUDA version it supports:

```bash
nvidia-smi
```

Look at the top-right of the output, e.g.:

```
CUDA Version: 12.x
```

In Part 10, we'll use this number as an upper bound when installing PyTorch and TensorFlow's GPU-enabled pip packages — the CUDA version those packages target needs to be at or below what your driver supports. If there's a mismatch, we'll handle it there; it's a straightforward adjustment.

**A quick note if you've followed older tutorials:** many guides (including an earlier version of this one) have you install the CUDA Toolkit via `apt` and export `LD_LIBRARY_PATH=/usr/local/cuda/lib64`. If you've done this in the past, it's worth checking your `~/.bashrc` for those lines and removing them — they can silently conflict with the pip-installed CUDA libraries PyTorch and TensorFlow bring in during Part 10, causing GPU detection to fail with errors like `Cannot dlopen some GPU libraries` even when everything else is set up correctly.

---

## What's Next

**What You've Done:**

- Understood why GPU matters for research and ML
- Understood how GPU access differs between WSL and native Linux
- Installed or updated NVIDIA drivers
- Verified GPU access with `nvidia-smi`
- Set up WSL's GPU library path (WSL users)
- Avoided a system CUDA Toolkit conflict before it could happen
- Learned what to expect in Part 10 if TensorFlow doesn't find its GPU libraries right away — so it reads as a normal step, not an error

**Next:** [Part 10 — Installing PyTorch and TensorFlow](https://abhigyan-pro.github.io/Blogs/Part10.html)
|
**Previous:** [Part 8 — Project Organization and Managing Scientific Data](https://abhigyan-pro.github.io/Blogs/Part8.html)
|
**All Blogs** [Link](https://abhigyan-pro.github.io/#blogs)