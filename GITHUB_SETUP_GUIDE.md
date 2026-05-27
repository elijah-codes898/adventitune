# GitHub Repository Setup Guide — AdventiTune

Follow these steps to create the AdventiTune GitHub repository and push all documentation.

---

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name:** `adventitune`
   - **Description:** `🎵 A music streaming and download app for the SDA community in Uganda and East Africa`
   - **Visibility:** Public ✅ (needed to attract collaborators)
   - **DO NOT** tick "Add a README file" — we are adding our own
   - **DO NOT** select a .gitignore template — we have our own
   - **License:** Leave blank — we have our own
3. Click **Create repository**

---

## Step 2: Set Up Git Locally

Open your terminal (Git Bash, Command Prompt, or Linux terminal) and run:

```bash
# Navigate to where you want to keep the project
cd ~/Documents   # or wherever you prefer

# Create the project folder
mkdir adventitune
cd adventitune

# Initialise git
git init

# Set your identity (first time only)
git config --global user.name "Elijah Kayongo"
git config --global user.email "your-github-email@example.com"
```

---

## Step 3: Copy the Documentation Files

Copy all the files from the provided zip/folder into your `adventitune/` folder. Your folder structure should look like:

```
adventitune/
├── README.md
├── CONTRIBUTING.md
├── ROADMAP.md
├── ARCHITECTURE.md
├── LICENSE
├── .gitignore
├── .env.example
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── PULL_REQUEST_TEMPLATE.md
```

---

## Step 4: Push to GitHub

```bash
# Stage all files
git add .

# Make your first commit
git commit -m "docs: initial project documentation and architecture"

# Connect to your GitHub repository
git remote add origin https://github.com/devbyelijah/adventitune.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 5: Configure the Repository on GitHub

After pushing, go to your repository on GitHub and do the following:

### Add Topics (helps discovery)
1. On the repo page, click the ⚙️ gear icon next to **About**
2. Add these topics:
   ```
   react-native music-streaming sda adventist uganda east-africa
   nodejs mobile-app flutterwave gospel-music open-source
   ```
3. Add a website URL if you have one (e.g. your X profile for now)
4. Click **Save changes**

### Set Up Branch Protection
1. Go to **Settings → Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Tick:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale pull request approvals
5. Click **Create**

### Enable Issues and Discussions
1. Go to **Settings → General**
2. Under **Features**, make sure **Issues** is ticked ✅
3. Also enable **Discussions** ✅ — great for community feedback

### Pin Important Issues (after creating them)
Create these initial issues to signal active development:
- `[HELP WANTED] React Native developer needed for mobile UI`
- `[HELP WANTED] Node.js/Express backend contributor`
- `[HELP WANTED] Luganda translator for UI strings`
- `[DISCUSSION] Tech stack feedback welcome`

---

## Step 6: Share for Collaborators

Share the repository link:
```
https://github.com/devbyelijah/adventitune
```

Post on X (@ElijahKayongo3):
> 🎵 I'm building AdventiTune — a music streaming app for the SDA community in Uganda & East Africa.
> 
> Looking for React Native devs, Node.js engineers, and designers to collaborate.
> 
> Open source | Mobile money payments | Offline support
> 
> ⭐ Star & contribute: github.com/devbyelijah/adventitune
> 
> #OpenSource #Uganda #ReactNative #BuildInPublic #SDA

---

## You're Live! 🎉

Once done, your repository will have:
- A professional README that explains the project clearly
- Full architecture documentation for developers
- A roadmap showing project seriousness
- Contribution guidelines for collaborators
- Issue and PR templates for structured collaboration
- Proper branch protection for code quality

---

*Built with ❤️ by Elijah Kayongo | GenKindle Uganda*
