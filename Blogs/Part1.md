# Understanding the Modern Research Computing Stack
### Building a Research Computing Environment — Part 1 of 12

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

This article maps out the development stack we'll build across the series — Windows, WSL2, Ubuntu, Miniconda, Conda environments, and VS Code — and explains why each layer is there before we install any of it. No installation happens in this article; that starts in Part 2.

---

## Objective

In this article, we'll understand the development environment we'll build throughout this series.

By the end, you'll know:

* Why many Python developers work with Linux.
* Why we're using WSL2 instead of replacing Windows.
* Why Ubuntu.
* Why Miniconda.
* Why VS Code.
* How all these tools fit together.

> **We won't install anything yet.** That begins in the next article.

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

### Why Not Just Install Python on Windows?

If you're learning Python, installing Python directly on Windows is perfectly reasonable.

However, as you move into areas such as:

* Data Science
* Machine Learning
* Artificial Intelligence
* Scientific Computing
* Research
* Software Development

You'll notice something.

Many tutorials, development tools, cloud platforms, and research environments assume you're working in Linux.

That doesn't mean Windows is a bad choice.

Instead, we'll keep Windows while gradually learning Linux using WSL2.

### The Development Stack

By the end of this series, your setup will look like this:

```bash
                             Windows 11
                                 │
                    ┌────────────┴────────────┐
                    │                         │
               VS Code                  WSL2 (Linux)
                                              │
                                              ▼
                                           Ubuntu
                                              │
                                              ▼
                                         Miniconda
                                              │
                                              ▼
                                     Conda Environment
                                              │
                                              ▼
                                            Python
```

Each layer has a different responsibility. Let's understand them one by one.

### Windows

Windows remains your primary operating system.

You'll continue using:

* File Explorer
* Web browser
* Microsoft Office
* VS Code

Nothing changes here.

### WSL2

Windows Subsystem for Linux (WSL2) lets Linux run directly inside Windows.

**Why are we using it?**

Many Python development tools and servers use Linux. WSL2 allows us to learn and use Linux without replacing Windows or setting up a dual-boot system.

### Ubuntu

Ubuntu is the Linux operating system we'll install inside WSL2.

**Why Ubuntu?**

It's one of the most widely used Linux distributions and has excellent documentation and community support. Many tutorials also assume Ubuntu.

### Miniconda

Miniconda provides Python and Conda.

**Why Miniconda?**

Different projects often require different versions of Python and different packages. Miniconda makes managing these environments straightforward.

### Conda Environments

Instead of installing everything into one Python installation, each project gets its own isolated environment.

This keeps projects independent and reproducible. We'll learn how to create and manage environments later in the series.

### VS Code

VS Code is the editor we'll use throughout this series.

Although VS Code runs on Windows, it can connect directly to Ubuntu through WSL. This gives us the convenience of a graphical editor while running our code inside Linux.

### Putting It All Together

The workflow we'll build looks like this:

```bash
                        Ubuntu Terminal
                               │
                               ▼
                        Project Directory
                               │
                               ▼
                        Conda Environment
                               │
                               ▼
                      VS Code (Remote - WSL)
                               │
                               ▼
                   Develop & Execute Python Code
```

Each component has a specific purpose. Together, they create a development environment that is widely used in software development, data science, machine learning, and scientific research.

---

## What's Next

Now that you understand the overall development stack, it's time to build it.

In the next article, we'll install:

* WSL2
* Ubuntu
* Miniconda

and verify that everything is working correctly before moving on.

**Next:** [Part 2  — Installing WSL2 with Ubuntu, and Miniconda](https://abhigyan-pro.github.io/Blogs/Part2.html)
|
**Previous:** [Preface — Building a Research Computing Environment](https://abhigyan-pro.github.io/Blogs/Preface.html)

[All Blogs](https://abhigyan-pro.github.io/#blogs)