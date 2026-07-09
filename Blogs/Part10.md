# Part 10 — Installing PyTorch and TensorFlow

*Python Development with WSL, Ubuntu, Miniconda, and VS Code — Part 10 of 12*

---

Socials: [LinkedIN](https://www.linkedin.com/in/abhigyan-chakraborty/) [Website](https://abhigyan-pro.github.io/)

## Objective

In Part 9, we set up GPU access — and flagged one thing to expect here in Part 10: TensorFlow's pip-bundled CUDA libraries sometimes need one extra step to be found on WSL. In this part, we'll install the two most widely used deep learning frameworks — PyTorch and TensorFlow — each in its own dedicated Conda environment, verify that both can see and use your GPU, and walk through that extra step if you need it.

By the end, you'll have:

- A dedicated Conda environment with PyTorch installed
- A dedicated Conda environment with TensorFlow installed
- GPU acceleration verified for both
- A clear picture of when to use which framework

---

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

---

## Prerequisites

- GPU access verified ([Part 9](https://abhigyan-pro.github.io/Blogs/Part9.html))
- Miniconda installed ([Part 2](https://abhigyan-pro.github.io/Blogs/Part2.html))
- Know the maximum CUDA version your driver supports — run this if you're unsure:

```bash
nvidia-smi
```

Look at the top-right of the output, e.g. `CUDA Version: 13.2`. Note this number — you'll need it in Step 2.

> **Why `nvidia-smi` and not `nvcc --version`?** In Part 9 we deliberately skipped installing a system CUDA Toolkit, so there's no `nvcc` on this machine — and that's fine. PyTorch and TensorFlow's GPU pip packages bring their own CUDA and cuDNN libraries with them. The number `nvidia-smi` reports isn't an installed toolkit version; it's the *maximum* CUDA version your driver can support. That's the ceiling we'll use below.

---

## PyTorch vs TensorFlow — A Brief Overview

Both are open-source deep learning frameworks. Both run on GPU. Both are widely used in research and industry.

**PyTorch** — developed by Meta. Flexible and Pythonic. The dominant framework in academic research and increasingly in industry. Most new research papers publish PyTorch code.

**TensorFlow** — developed by Google. More structured. Widely used in production deployments and industry pipelines. Comes with Keras as its high-level API, making it approachable for beginners.

For most researchers starting out, PyTorch is where you'll spend most of your time. TensorFlow is worth knowing — you'll encounter it in existing codebases and production systems.

---

## Why Two Separate Environments?

PyTorch and TensorFlow can conflict when installed together in the same environment — they may require different versions of CUDA libraries, numpy, or other dependencies. Installing each in its own environment keeps them isolated and stable.

This is exactly why Conda environments exist — one environment per framework, no conflicts.

---

## Why We Use pip for Both Frameworks

TensorFlow is only officially released to PyPI — the Python Package Index. The conda-forge version may lag behind or be missing features. For TensorFlow, pip is the correct and recommended install method.

For PyTorch, we use pip too — it's the simplest method and, like TensorFlow's `[and-cuda]` option, bundles the required CUDA and cuDNN libraries automatically. Neither framework needs a system-wide CUDA Toolkit — that's why Part 9 didn't install one.

---

## Section 1 — Installing PyTorch

### Step 1 — Create a Dedicated Environment

```bash
conda create -n env_pytorch python=3.11 pip
```

```bash
conda activate env_pytorch
```

Your prompt will change to `(env_pytorch)`.

---

### Step 2 — Get the Correct Install Command

PyTorch provides an install command generator on their website that matches your CUDA version automatically.

Go to: [https://pytorch.org/get-started/locally/](https://pytorch.org/get-started/locally/)

Select:
- **OS:** Linux
- **Package:** Pip
- **Language:** Python
- **Compute Platform:** the CUDA version you noted from `nvidia-smi` in the Prerequisites above (e.g. 13.2)

> **Note:** The CUDA version on the PyTorch website may not exactly match yours. Pick the highest version listed that is less than or equal to your driver's supported version. For example, if `nvidia-smi` showed CUDA 13.2 and the website shows 12.6, 13.0, and 13.2 — pick 13.2. If it only shows options above what your driver supports, pick the highest one at or below it.

Run the generated command, which will look like:

```bash
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu132
```

---

### Step 3 — Register the Kernel

```bash
conda install ipykernel
```

```bash
python -m ipykernel install --user --name env_pytorch --display-name "Python (env_pytorch)"
```

You'll see this kernel available in JupyterLab and VS Code.

---

### Step 4 — Verify PyTorch Installation

```bash
python -c "import torch; print(torch.__version__)"
```

You should see a version number printed.

Now verify GPU access:

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

If this prints `True`, PyTorch can see your GPU. PyTorch's pip wheels are generally reliable at locating their own bundled CUDA libraries, so most learners won't need any extra step here.

If this prints `False`:

1. Double-check the CUDA version you selected on the PyTorch website against your `nvidia-smi` output, and reinstall with the generated command if there's a mismatch.
2. Confirm `~/.bashrc` doesn't have a leftover `LD_LIBRARY_PATH=/usr/local/cuda/lib64` entry from an old system CUDA Toolkit install (see the note at the end of Part 9) — this can shadow the pip-installed libraries.
3. If neither resolves it, the same library-path fix described in Section 2, Step 4 below (for TensorFlow) applies here too — just point it at PyTorch's bundled `nvidia` folder instead.

---

## Section 2 — Installing TensorFlow

### Step 1 — Create a Dedicated Environment

```bash
conda create -n env_tensorflow python=3.11 pip
```

```bash
conda activate env_tensorflow
```

Your prompt will change to `(env_tensorflow)`.

---

### Step 2 — Install TensorFlow

TensorFlow's `[and-cuda]` option installs TensorFlow along with the CUDA and cuDNN libraries it needs — all in one command. This works on Linux and WSL2.

First, make sure pip is up to date:

```bash
pip install --upgrade pip
```

Install TensorFlow with CUDA support:

```bash
pip install tensorflow[and-cuda]
```

This may take a few minutes — it's downloading TensorFlow and its CUDA dependencies together.

---

### Step 3 — Confirm the CUDA Packages Actually Installed

This step matters on **both WSL and native Linux** — it isn't OS-specific.

`pip install tensorflow[and-cuda]` can, in some cases, silently resolve to a TensorFlow version that doesn't fully support the `[and-cuda]` extra. When that happens, pip installs plain TensorFlow with no CUDA/cuDNN packages at all — no error is raised, and nothing in the terminal output makes this obvious unless you're watching closely. This is a pip dependency-resolution quirk, not something tied to WSL, so it's worth checking before you move on regardless of which platform you're on.

Check that the CUDA packages actually landed:

```bash
pip list | grep -i nvidia
```

You should see a list of packages like `nvidia-cublas-cu12`, `nvidia-cudnn-cu12`, `nvidia-cufft-cu12`, and others.
If this shows the packages, Congratulations!! Proceed to [Step 4](#step-4--register-the-kernel)

**If this list is empty**, reinstall explicitly:

```bash
pip install --force-reinstall "tensorflow[and-cuda]"
```

Watch the install output this time for a line like:

```
tensorflow X.X.X does not provide the extra 'and-cuda'
```

If you see that warning, pip resolved to an incompatible TensorFlow version. Pin to a known-good recent release instead, e.g.:

```bash
pip install "tensorflow[and-cuda]==2.21.*"
```

(Check [https://pypi.org/project/tensorflow/](https://pypi.org/project/tensorflow/) for the current stable version and swap it in above.)

Re-run `pip list | grep -i nvidia` afterward to confirm the packages are now present before continuing.

---

### Step 4 — Register the Kernel

```bash
conda install ipykernel
```

```bash
python -m ipykernel install --user --name env_tensorflow --display-name "Python (env_tensorflow)"
```

---

### Step 5 — Verify TensorFlow Installation, and the WSL Heads-Up From Part 9

```bash
python -c "import tensorflow as tf; print(tf.__version__)"
```

You should see a version number printed.

Now verify GPU access:

```bash
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

**If this prints a list containing your GPU** (e.g. `[PhysicalDevice(name='/physical_device:GPU:0', ...)]`) — you're done, skip to Section 3.

**If this prints an empty list `[]`**, possibly alongside a warning like `Cannot dlopen some GPU libraries`, there are two possible causes:

1. **The CUDA packages aren't installed at all.** If you haven't already, go back to Step 3 above and run `pip list | grep -i nvidia` to check. This can happen on WSL or native Linux alike.
2. **The packages are installed but TensorFlow can't find them.** This is the WSL-common issue flagged in Part 9 — on WSL, it's common for TensorFlow's pip-bundled CUDA/cuDNN libraries to not be found automatically, even with a completely clean setup. It doesn't mean anything is broken. Native Linux installs are generally less prone to this specific discovery problem, since there's no WSL translation layer involved, but the same fix applies if you see it there too.

If you've confirmed the packages are installed (Step 3) and you're still seeing an empty list, here's the fix:

**1. Confirm the libraries are actually installed:**

```bash
pip show nvidia-cudnn-cu12
```

Note the `Location:` path in the output.
it will be something like `/home/abhigyan/miniconda3/envs/env_tensorflow/lib/python3.11/site-packages`

**2. Point TensorFlow at them directly.** Build the library path from that location and export it:

```bash
NVIDIA_BASE=<Location>/nvidia              # paste the copied location path before /nvidia
export LD_LIBRARY_PATH=$(find "$NVIDIA_BASE" -maxdepth 2 -type d -name lib | tr '\n' ':')$LD_LIBRARY_PATH
```

(Replace `<Location>` with the path `pip show` gave you — it'll look something like `/home/<you>/miniconda3/envs/env_tensorflow/lib/python3.11/site-packages`.)

**3. Re-test:**

```bash
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

You should now see your GPU listed.

**4. Make it permanent for this environment only.** Rather than adding this to `~/.bashrc` (which would apply it globally, even to environments that don't need it), scope it to `env_tensorflow` using conda's activation hooks:

```bash
mkdir -p $(conda info --base)/envs/env_tensorflow/etc/conda/activate.d
cat > $(conda info --base)/envs/env_tensorflow/etc/conda/activate.d/env_vars.sh << 'EOF'
NVIDIA_BASE=<Location>/nvidia
export LD_LIBRARY_PATH=$(find "$NVIDIA_BASE" -maxdepth 2 -type d -name lib | tr '\n' ':')$LD_LIBRARY_PATH
EOF
```

(Replace `<Location>` with the path `pip show` gave you — it'll look something like `/home/<you>/miniconda3/envs/env_tensorflow/lib/python3.11/site-packages`.)

Then reactivate the environment to pick it up:

```bash
conda deactivate
conda activate env_tensorflow
```

From now on, every time you activate `env_tensorflow`, this path is set automatically — no need to repeat the fix.

**If you're still seeing an empty list after this:**

1. Confirm `nvidia-smi` still runs cleanly and shows your GPU.
2. Check `~/.bashrc` for a leftover `LD_LIBRARY_PATH=/usr/local/cuda/lib64` line from an older system CUDA Toolkit install (see the note at the end of Part 9) — this can conflict with the path you just set.
3. Use the ChatAI prompt at the top of this article — paste your `nvidia-smi` output and the output of the GPU detection command — to troubleshoot further.

---

## Section 3 — Verifying GPU Acceleration

Now let's confirm GPU acceleration is actually working — not just that the GPU is detected, but that it's running computations faster than the CPU.

We'll do this with a simple matrix multiplication benchmark in both frameworks.

### PyTorch Benchmark

Activate the PyTorch environment:

```bash
conda activate env_pytorch
```

```bash
cd ~/project_1
nano pytorch_project.py
```

Paste this script:

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
torch.cuda.synchronize()
gpu_time = time.time() - start
print(f"GPU time: {gpu_time:.4f} seconds")
print(f"Speedup: {cpu_time / gpu_time:.1f}x")
```

Save and exit (`ctrl+X`, `Y`, `enter`)

Run the python file `pytorch_project.py`
```bash
python pytorch_project.py
```

You should see the GPU completing the same operation significantly faster than the CPU. The exact speedup depends on your GPU.

---

### TensorFlow Benchmark

Activate the TensorFlow environment:

```bash
conda activate env_tensorflow
```
```bash
cd ~/project_1
nano tensorflow_project.py
```

Paste this script:

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

Save and exit (`ctrl+X`, `Y`, `enter`)

Run the python file `tensorflow_project.py`
```bash
python tensorflow_project.py
```

---

## CPU-Only Users

If you don't have an NVIDIA GPU, you can still install both frameworks for CPU use. This guide covers CPU-only installation clearly:

[PyTorch and TensorFlow CPU installation — official PyTorch docs](https://pytorch.org/get-started/locally/)

Select **CPU** instead of a CUDA version in the PyTorch selector. For TensorFlow, use:

```bash
pip install tensorflow
```

instead of `tensorflow[and-cuda]`.

---

## What You've Done

- Understood when to use PyTorch vs TensorFlow
- Created dedicated Conda environments for each framework
- Installed PyTorch using the official pip method with CUDA support
- Installed TensorFlow using `pip install tensorflow[and-cuda]`, and confirmed the CUDA packages actually landed
- Registered both environments as Jupyter kernels
- Verified GPU detection and acceleration for both frameworks
- Resolved the WSL library-path heads-up from Part 9, if you needed to — and scoped the fix to just the environment that needed it

**Next:** [Part 11 — Building Reproducible Python Workflows](https://abhigyan-pro.github.io/Blogs/Part11.html)