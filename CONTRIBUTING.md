# Contributing to AdventiTune

Thank you for considering a contribution to AdventiTune! 🙏 This project is community-driven and every contribution matters — whether you write code, design interfaces, translate text, or test features.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Issue Labels](#issue-labels)

---

## Code of Conduct

This project is built on Christian values of respect, humility, and collaboration. All contributors are expected to engage with:

- Kindness and professionalism
- Patience with contributors of all skill levels
- Constructive, solution-focused feedback
- Zero tolerance for harassment, discrimination, or disrespect

Violations may result in removal from the project.

---

## How Can I Contribute?

### 🐛 Report a Bug
- Check existing [Issues](../../issues) to avoid duplicates
- Use the **Bug Report** issue template
- Include your OS, device, and app version

### 💡 Suggest a Feature
- Open an issue using the **Feature Request** template
- Describe the problem it solves and who benefits
- Reference user stories if possible

### 💻 Submit Code
- See [Getting Started](#getting-started) below
- Look for issues labelled `good first issue` or `help wanted`
- Comment on an issue before starting to avoid duplicate work

### 🎨 Design / UI Feedback
- Share Figma links or screenshots in relevant issues
- Provide feedback on open design discussions

### 🌐 Translate
- Help translate the UI into Luganda, Swahili, or other East African languages
- Open a translation issue or comment on existing ones

### 🎵 Music & Content
- Help with SDA hymnal metadata and content curation
- Suggest licensed sources of SDA music

---

## Getting Started

### 1. Fork the Repository

Click **Fork** at the top right of this page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/adventitune.git
cd adventitune
```

### 3. Set Upstream Remote

```bash
git remote add upstream https://github.com/devbyelijah/adventitune.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Up Environment Variables

```bash
cp .env.example .env
```

Fill in the required keys (see [docs/SETUP.md](docs/SETUP.md) for guidance).

### 6. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

---

## Development Workflow

```bash
# Keep your fork up to date
git fetch upstream
git rebase upstream/main

# Run the mobile app
cd mobile && expo start

# Run the backend
cd backend && npm run dev

# Run tests
npm test
```

---

## Pull Request Guidelines

Before submitting a PR:

- [ ] Your branch is up to date with `main`
- [ ] All tests pass (`npm test`)
- [ ] Code follows the style guide (ESLint passes)
- [ ] You've written tests for new functionality
- [ ] The PR description explains *what* and *why*
- [ ] Screenshots included for UI changes
- [ ] Linked to the relevant issue (e.g. `Closes #42`)

**PR Title Format:**
```
feat: add offline download functionality
fix: resolve audio playback on Android
docs: update API reference for /tracks endpoint
```

---

## Coding Standards

- **JavaScript/TypeScript:** Follow the project ESLint config
- **React Native:** Functional components + hooks only (no class components)
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Comments:** Write comments for non-obvious logic
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/)
  ```
  feat: ...    (new feature)
  fix: ...     (bug fix)
  docs: ...    (documentation)
  style: ...   (formatting, no logic change)
  refactor: ...
  test: ...
  chore: ...
  ```

---

## Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Great for new contributors |
| `help wanted` | Extra attention needed |
| `bug` | Something isn't working |
| `feature` | New feature request |
| `design` | UI/UX related |
| `backend` | Server/API related |
| `mobile` | React Native app |
| `translation` | Localisation work |
| `documentation` | Docs improvements |
| `in progress` | Being actively worked on |

---

Thank you for building AdventiTune with us. 🎶🇺🇬
