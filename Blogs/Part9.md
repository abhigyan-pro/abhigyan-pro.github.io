# Installing PyTorch and TensorFlow
### Phase 3: High-Performance Computing — Part 2
(Part 9 of series [Blueprint for a Modern Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html))

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

This article installs PyTorch and TensorFlow, each in its own dedicated Conda environment, using pip so both frameworks bundle their own CUDA and cuDNN libraries. You'll verify GPU detection for both, benchmark CPU vs GPU speed with a matrix multiplication test, and — if needed — resolve the WSL library-path issue flagged back in Part 9.

---

## Objective

In Part 9, we set up GPU access — and flagged one thing to expect here in Part 10: TensorFlow's pip-bundled CUDA libraries sometimes need one extra step to be found on WSL. In this part, we'll install PyTorch and TensorFlow, verify that both can see and use your GPU, and walk through that extra step if you need it.

By the end, you'll have:
- A dedicated Conda environment with PyTorch installed
- A dedicated Conda environment with TensorFlow installed
- GPU acceleration verified for both
- A clear picture of when to use which framework

---

## Content

<details>
  <summary><strong>💡 Getting Unstuck (Expand for AI Troubleshooting Prompts)</strong></summary>
  
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

- GPU access verified ([Part 9](https://abhigyan-pro.github.io/Blogs/Part9.html))
- Miniconda installed ([Part 1](https://abhigyan-pro.github.io/Blogs/Part1.html))
- Know the maximum CUDA version your driver supports (run `nvidia-smi` if unsure).

### PyTorch vs TensorFlow — A Brief Overview
Both are open-source deep learning frameworks running on GPU. **PyTorch** (Meta) is flexible and dominant in research, while **TensorFlow** (Google) is more structured and common in production.

### Why Two Separate Environments?
PyTorch and TensorFlow can conflict regarding CUDA library or dependency versions. Installing each in its own Conda environment keeps them isolated and stable.

### Why We Use pip for Both Frameworks
We use `pip` because it installs the latest versions directly from PyPI and bundles the required CUDA/cuDNN libraries automatically, removing the need for a system-wide CUDA Toolkit.

---

## Section 1 — Installing PyTorch

<details>
  <summary><strong>💡Expand for details</strong></summary>

  #### Step 1 — Create a Dedicated Environment
  ```bash
  conda create -n env_pytorch python=3.11 pip
  conda activate env_pytorch
  ```

  #### Step 2 — Get the Correct Install Command
  Visit [pytorch.org/get-started/locally/](https://pytorch.org/get-started/locally/) and generate your command using the **Pip** package option and your `nvidia-smi` reported CUDA version.

  Run the generated command (example):
  ```bash
  pip3 install torch torchvision --index-url [https://download.pytorch.org/whl/cu132](https://download.pytorch.org/whl/cu132)
  ```

  #### Step 3 — Register the Kernel
  ```bash
  conda install ipykernel
  python -m ipykernel install --user --name env_pytorch --display-name "Python (env_pytorch)"
  ```

  #### Step 4 — Verify PyTorch Installation
  Verify version: `python -c "import torch; print(torch.__version__)"`.
  Verify GPU: `python -c "import torch; print(torch.cuda.is_available())"`.

</details>

---

## Section 2 — Installing TensorFlow

<details>
  <summary><strong>💡Expand for details</strong></summary>

  #### Step 1 — Create a Dedicated Environment
  ```bash
  conda create -n env_tensorflow python=3.11 pip
  conda activate env_tensorflow
  ```

  #### Step 2 — Install TensorFlow
  Ensure pip is current, then install with GPU support:
  ```bash
  pip install --upgrade pip
  pip install tensorflow[and-cuda]
  ```

  #### Step 3 — Confirm the CUDA Packages
  Ensure the NVIDIA packages landed:
  ```bash
  pip list | grep -i nvidia
  ```
  If empty, reinstall using `pip install --force-reinstall "tensorflow[and-cuda]"` or pin to a specific version if needed.

  #### Step 4 — Register the Kernel
  ```bash
  conda install ipykernel
  python -m ipykernel install --user --name env_tensorflow --display-name "Python (env_tensorflow)"
  ```

  #### Step 5 — Verify Installation and WSL Pathing
  Verify: `python -c "import tensorflow as tf; print(tf.__version__)"`.
  GPU Check: `python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"`.

  *If empty on WSL or Linux, fix the library path:* 
  1. Find the location: `pip show nvidia-cudnn-cu12`.
  2. Identify the `nvidia` path: `/home/<user>/miniconda3/envs/env_tensorflow/lib/python3.11/site-packages/nvidia`.
  3. Apply the library path fix and make it permanent for this environment only.** Rather than adding this to `~/.bashrc` (which would apply it globally, even to environments that don't need it), scope it to `env_tensorflow` using conda's activation hooks:

  ```bash
  mkdir -p $(conda info --base)/envs/env_tensorflow/etc/conda/activate.d
  cat > $(conda info --base)/envs/env_tensorflow/etc/conda/activate.d/env_vars.sh << 'EOF'
  NVIDIA_BASE=/home/<your-user>/miniconda3/envs/env_tensorflow/lib/python3.11/site-packages/nvidia
  export LD_LIBRARY_PATH=$(find "$NVIDIA_BASE" -maxdepth 2 -type d -name lib | tr '\n' ':')$LD_LIBRARY_PATH
  EOF
  ```
  Then reactivate the environment to pick it up:

  ```bash
  conda deactivate
  conda activate env_tensorflow
  ```

  From now on, every time you activate `env_tensorflow`, this path is set automatically — no need to repeat the fix.

  **If you're still seeing an empty list after this:**

  1. Confirm `nvidia-smi` still runs cleanly and shows your GPU.
  2. Check `~/.bashrc` for a leftover `LD_LIBRARY_PATH=/usr/local/cuda/lib64` line from an older system CUDA Toolkit install — this can conflict with the path you just set.
  3. Use the ChatAI prompt at the top of this article — paste your `nvidia-smi` output and the output of the GPU detection command — to troubleshoot further.

</details>

---

## Section 3 — Verifying GPU Acceleration

Create and run these files to compare CPU vs GPU performance.

## **PyTorch Benchmark (`pytorch_project.py`)**:

<details>
  <summary><strong>💡Expand for details</strong></summary>

  In Terminal:
  ```bash
  conda activate env_pytorch
  nano pytorch_project.py
  ```
  Paste the following:
  ```python
  import torch
  import time
  size = 10000
  # CPU
  a_cpu = torch.randn(size, size)
  b_cpu = torch.randn(size, size)
  start = time.time()
  c_cpu = torch.matmul(a_cpu, b_cpu)
  cpu_time = time.time() - start
  print(f"CPU time: {cpu_time:.4f} seconds")
  # GPU
  a_gpu = a_cpu.cuda()
  b_gpu = b_cpu.cuda()
  torch.cuda.synchronize()
  start = time.time()
  c_gpu = torch.matmul(a_gpu, b_gpu)
  torch.cuda.synchronize()[]
  gpu_time = time.time() - start
  print(f"GPU time: {gpu_time:.4f} seconds")
  print(f"Speedup: {cpu_time / gpu_time:.1f}x")
  ```
  Then (`ctrl+X`, `Y`, `Enter`).
  Run the code:

  ```bash
  python pytorch_project.py
  ```
</details>

---

## **TensorFlow Benchmark (`tensorflow_project.py`)**:

<details>
  <summary><strong>💡Expand for details</strong></summary>

  In Terminal:
  ```bash
  conda activate env_tensorflow
  nano tensorflow_project.py
  ```
  Paste the following:
  ```python
  import tensorflow as tf
  import time
  size = 10000
  # CPU
  with tf.device('/CPU:0'):
      a_cpu = tf.random.normal([size, size])
      b_cpu = tf.random.normal([size, size])
      start = time.time()
      c_cpu = tf.matmul(a_cpu, b_cpu)
      cpu_time = time.time() - start
      print(f"CPU time: {cpu_time:.4f} seconds")
  # GPU
  with tf.device('/GPU:0'):
      a_gpu = tf.random.normal([size, size])
      b_gpu = tf.random.normal([size, size])
      start = time.time()
      c_gpu = tf.matmul(a_gpu, b_gpu)
      gpu_time = time.time() - start
      print(f"GPU time: {gpu_time:.4f} seconds")
      print(f"Speedup: {cpu_time / gpu_time:.1f}x")
```
  Then (`ctrl+X`, `Y`, `Enter`).
  Run the code:

  ```bash
  python tensorflow_project.py
  ```
</details>

---

### CPU-Only Users
If you lack an NVIDIA GPU, install the CPU-only version:
- PyTorch: Select "CPU" on the install page.
- TensorFlow: Use `pip install tensorflow`.

---

## What's Next

**What You've Done:**
- Created isolated environments for PyTorch and TensorFlow
- Installed via pip to bundle CUDA libraries without system-wide tools
- Registered kernels and verified GPU performance via benchmarks

**Next:** [Part 10 — Building Reproducible Research Workflows](https://abhigyan-pro.github.io/Blogs/Part11.html)
|
**Previous:** [Part 9 — Enabling GPU Computing in WSL2 and Linux with CUDA](https://abhigyan-pro.github.io/Blogs/Part9.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)