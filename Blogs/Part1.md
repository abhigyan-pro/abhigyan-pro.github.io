# Understanding the Modern Python Development Stack

*Python Development for Research and Scientific Computing — Part 1 of 12*

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

## Using This Series

Each article is designed to be followed **step by step**.

If you encounter an error, **don't immediately search for a different tutorial or start changing commands.**

Instead:

1. Copy the link to the article you're following.
2. Open your preferred AI assistant.

   * ChatGPT
   * Claude
   * Gemini
   * Grok
   * or another assistant
3. Tell it:

   * which article you're following,
   * which step you're on,
   * the command you ran, and
   * the exact error message.

This gives the AI the context needed to troubleshoot your issue while keeping you on the same workflow.

If you're curious about:

* why a command is used,
* what a particular option means, or
* how something works internally,

ask your AI assistant while continuing with the article.

> **Think of this series as the roadmap and your AI assistant as your learning companion.**

---

## Why Not Just Install Python on Windows?

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

---

## The Development Stack

By the end of this series, your setup will look like this:

```text
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

Each layer has a different responsibility.

Let's understand them one by one.

---

## Windows

Windows remains your primary operating system.

You'll continue using:

* File Explorer
* Web browser
* Microsoft Office
* VS Code

Nothing changes here.

---

## WSL2

Windows Subsystem for Linux (WSL2) lets Linux run directly inside Windows.

### Why are we using it?

Many Python development tools and servers use Linux.

WSL2 allows us to learn and use Linux without replacing Windows or setting up a dual-boot system.

---

## Ubuntu

Ubuntu is the Linux operating system we'll install inside WSL2.

### Why Ubuntu?

It's one of the most widely used Linux distributions and has excellent documentation and community support.

Many tutorials also assume Ubuntu.

---

## Miniconda

Miniconda provides Python and Conda.

### Why Miniconda?

Different projects often require different versions of Python and different packages.

Miniconda makes managing these environments straightforward.

---

## Conda Environments

Instead of installing everything into one Python installation, each project gets its own isolated environment.

This keeps projects independent and reproducible.

We'll learn how to create and manage environments later in the series.

---

## VS Code

VS Code is the editor we'll use throughout this series.

Although VS Code runs on Windows, it can connect directly to Ubuntu through WSL.

This gives us the convenience of a graphical editor while running our code inside Linux.

---

## Putting It All Together

The workflow we'll build looks like this:

```text
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

Each component has a specific purpose.

Together, they create a development environment that is widely used in software development, data science, machine learning, and scientific research.

---

## What's Next?

Now that you understand the overall development stack, it's time to build it.

**Next Article:** *Building Your Python Development Environment*

In the next article, we'll install:

* WSL2
* Ubuntu
* Miniconda

and verify that everything is working correctly before moving on.
