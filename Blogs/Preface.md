# Preface
### Building a Research Computing Environment — A Practical Guide for Researchers and Scientists

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

![Modern Research Computing Stack](../img/blog1.png)

---

## Quick Summary

This series builds a complete research computing environment on Linux, using Python as the working language — covering WSL2, Ubuntu, Miniconda, VS Code, Jupyter, Git/GitHub, CUDA, and PyTorch/TensorFlow. Rather than a list of commands to copy and paste, each article explains *why* a tool is used and how it fits into the larger workflow, so you end up with an environment you actually understand. Windows users set up Ubuntu via WSL2 in Part 2 and the start of Part 3; from there, the rest of the series is identical for WSL2 and native Linux users alike.

---

## Objective

This preface orients you before you begin: why this series exists, what practical questions it answers that most tutorials skip, what you'll have built by the end, how the series is organized part by part, and how to use an AI assistant to get unstuck along the way.

---

## Content

### Why This Series Exists

There are countless tutorials that show you how to install Python, WSL, Ubuntu, Miniconda, or VS Code. Many of them are excellent at helping you get started quickly.

However, as I learned Python and gradually moved into machine learning, scientific computing, and research, I often found myself asking practical questions that weren't always answered in one place. Questions like:

- Why are we using WSL?
- Why Ubuntu?
- Why Miniconda instead of installing Python directly?
- Where are my files actually stored?
- Where should I keep my projects?
- How do all these tools fit together?

None of these questions are particularly difficult, but the answers are often scattered across documentation, videos, blog posts, and discussions. Much of this understanding is something developers gradually build through experience.

This series is my attempt to bring those pieces together. Rather than simply showing commands to copy and paste, we'll build a modern Python development environment step by step while understanding the purpose of each tool and the workflow that connects them.

> **The goal is simple:**
>
> **Build a Python development environment that you understand — not just one that works.**

### Who This Is For

This series assumes **no prior programming or Linux experience**. We'll begin with the fundamentals and gradually build the skills needed for:

- Python development
- Data science
- Machine learning
- Scientific computing
- Research

Each article has a single objective, allowing you to learn one concept at a time without feeling overwhelmed.

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

### What You'll Build

By the end of this series, you'll have a modern Python development environment consisting of:

- WSL2
- Ubuntu
- Miniconda
- Conda Environments
- VS Code
- Jupyter
- Git and GitHub
- CUDA
- PyTorch or TensorFlow

More importantly, you'll understand **how these tools fit together** and **why they're commonly used**.

### Series Roadmap

| Part | Topic | What You'll Learn |
|------|-------|--------------------|
| **Part 1** | Understanding the Modern Research Computing Stack | Understand the development environment before installing anything. |
| **Part 2** | Building Your Research Computing Environment | Install WSL2, Ubuntu, and Miniconda. |
| **Part 3** | Using Ubuntu on Windows | Become comfortable using the Linux terminal and filesystem. |
| **Part 4** | Managing Research Projects with Conda Environments | Learn Python environments, packages, package managers, and Jupyter. |
| **Part 5** | Setting Up VS Code for Research Computing | Connect VS Code to WSL and run your first Python program and notebook. |
| **Part 6** | Linux Essentials for Researchers | Learn the Linux skills you'll use throughout your research journey. |
| **Part 7** | Git and GitHub from WSL | Learn modern version control. |
| **Part 8** | Project Organization and Scientific Data | Organize projects and work with common scientific data formats. |
| **Part 9** | Enabling GPU Computing in WSL with CUDA | Prepare your environment for GPU computing. |
| **Part 10** | Installing PyTorch and TensorFlow | Set up a deep learning environment. |
| **Part 11** | Building Reproducible Research Workflows | Learn how to build projects that are easy to reproduce, share, and maintain. |
| **Part 12** | Contributing to Open Science | Share your code, contribute to open-source projects, and make your work useful to the broader scientific community. |

---

## What's Next

In the first article, we'll understand the development stack we'll build throughout this series and why each component has an important role.

**Next:** [Part 1 — Understanding the Modern Research Computing Stack](https://abhigyan-pro.github.io/Blogs/Part1.html)

---

*Happy learning!*