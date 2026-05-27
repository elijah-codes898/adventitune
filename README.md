# 🎵 AdventiTune

> **A music streaming and download platform built for the Seventh-day Adventist community in Uganda and East Africa.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: In Development](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()
[![Platform: React Native](https://img.shields.io/badge/Platform-React%20Native-61DAFB.svg)]()
[![Backend: Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🌍 What is AdventiTune?

AdventiTune is an open-source music streaming and download app designed specifically for the Seventh-day Adventist (SDA) community across Uganda and East Africa. Think Spotify — but built for gospel, hymns, worship, and SDA musical content, with offline support and local mobile money payment integration.

The app is being developed by **Elijah Kayongo** ([@devbyelijah](https://github.com/devbyelijah)) and the [GenKindle Uganda](https://x.com/ElijahKayongo3) initiative, with a vision to make faith-based music accessible, affordable, and beautifully designed for East African users.

---

## 🎯 Core Features (Planned)

| Feature | Description | Status |
|---|---|---|
| 🎵 Music Streaming | Stream SDA hymns, worship songs & gospel content | 🔲 Planned |
| 📥 Offline Downloads | Download tracks to listen without internet | 🔲 Planned |
| 💳 Mobile Money Payments | MTN MoMo & Airtel Money integration | 🔲 Planned |
| 🌐 Multilingual UI | English + Luganda interface | 🔲 Planned |
| 📱 Cross-Platform | iOS & Android via React Native | 🔲 Planned |
| 🔍 Search & Discovery | Search by hymn number, artist, or keyword | 🔲 Planned |
| 📚 Hymnal Integration | Structured SDA Hymnal browser | 🔲 Planned |
| 🔔 Notifications | New releases, Sabbath playlists & alerts | 🔲 Planned |

---

## 🛠️ Technology Stack

```
Frontend       → React Native (iOS + Android)
Backend        → Node.js + Express.js
Database       → PostgreSQL via Supabase
File Storage   → Cloudflare R2 (audio files)
Auth           → Firebase Authentication
Payments       → Flutterwave (MTN MoMo, Airtel Money, Card)
Hosting        → Railway.app
```

---

## 📁 Project Structure

```
adventitune/
├── mobile/               # React Native mobile app
│   ├── src/
│   │   ├── screens/      # App screens (Home, Player, Library, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── navigation/   # React Navigation setup
│   │   ├── store/        # State management
│   │   └── services/     # API calls, auth, payments
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   └── middleware/   # Auth, error handling
├── docs/                 # Extended documentation
│   ├── ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   └── DESIGN_SPEC.md
└── scripts/              # Utility scripts
```

---

## 🚀 Getting Started

> ⚠️ **The project is in early setup phase.** Full setup instructions will be published once the initial codebase is scaffolded. Star or Watch this repo to stay updated.

### Prerequisites
- Node.js v18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- A Supabase account (free tier works)
- A Firebase project (for Auth)

### Quick Start *(coming soon)*
```bash
# Clone the repository
git clone https://github.com/devbyelijah/adventitune.git
cd adventitune

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase, Firebase, Flutterwave keys

# Start the mobile app
cd mobile && expo start

# Start the backend
cd backend && npm run dev
```

---

## 🤝 Contributing

We warmly welcome contributors — developers, designers, musicians, translators, and testers! This is a community-driven project.

👉 **Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.**

Key areas where we need help:
- **React Native developers** — UI screens and components
- **Node.js/Express developers** — API and backend logic
- **Supabase / PostgreSQL** — Database schema and queries
- **UI/UX Designers** — Figma mockups and design review
- **Translators** — Luganda and other East African language support
- **Music curators** — SDA content sourcing and metadata
- **Testers** — Manual and automated QA

---

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development roadmap.

| Phase | Focus | Target |
|---|---|---|
| Phase 1 | Foundation & Architecture Setup | Q3 2025 |
| Phase 2 | Core Streaming & Auth | Q4 2025 |
| Phase 3 | Payments & Downloads | Q1 2026 |
| Phase 4 | Multilingual & Discovery | Q2 2026 |
| Phase 5 | Beta Launch (Uganda) | Q3 2026 |
| Phase 6 | East Africa Expansion | Q4 2026 |

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 📬 Contact & Community

- **GitHub:** [@devbyelijah](https://github.com/devbyelijah)
- **X (Twitter):** [@ElijahKayongo3](https://x.com/ElijahKayongo3)
- **Organisation:** [GenKindle Uganda](https://x.com/ElijahKayongo3)
- **Location:** Mityana District, Uganda 🇺🇬

---

> *"Make a joyful noise unto the LORD, all the earth: make a loud noise, and rejoice, and sing praise."* — Psalm 98:4

Built with ❤️ in Uganda for East Africa.
