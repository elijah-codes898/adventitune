# AdventiTune — Development Roadmap

This document outlines the planned development phases for AdventiTune. It is a living document and will be updated as the project evolves.

---

## 🗂️ Overview

| Phase | Name | Status | Target Quarter |
|---|---|---|---|
| 1 | Foundation & Architecture | 🔄 In Progress | Q3 2025 |
| 2 | Core Streaming & Auth | 🔲 Planned | Q4 2025 |
| 3 | Payments & Downloads | 🔲 Planned | Q1 2026 |
| 4 | Multilingual & Discovery | 🔲 Planned | Q2 2026 |
| 5 | Beta Launch (Uganda) | 🔲 Planned | Q3 2026 |
| 6 | East Africa Expansion | 🔲 Planned | Q4 2026 |

---

## Phase 1 — Foundation & Architecture
**Target: Q3 2025**

Setting up the core development infrastructure and repository.

- [x] Project conceptualisation and vision document
- [x] Technology stack decision
- [x] GitHub repository setup and documentation
- [ ] Monorepo structure scaffolded (`/mobile`, `/backend`, `/docs`)
- [ ] ESLint, Prettier, Husky hooks configured
- [ ] Supabase project created (dev + prod environments)
- [ ] Firebase Authentication project created
- [ ] Cloudflare R2 bucket configured
- [ ] Railway.app backend deployment pipeline
- [ ] Initial PostgreSQL database schema (users, tracks, albums, artists)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] `.env.example` with all required keys documented

---

## Phase 2 — Core Streaming & Authentication
**Target: Q4 2025**

The listening experience and user accounts.

- [ ] User registration and login (Firebase Auth)
- [ ] Social login (Google)
- [ ] User profile screen
- [ ] Music upload pipeline (admin panel for content ingestion)
- [ ] Track metadata management (title, artist, album, hymn number)
- [ ] Audio streaming from Cloudflare R2
- [ ] Basic player UI (play, pause, skip, seek bar)
- [ ] Now Playing screen
- [ ] Home screen with featured content
- [ ] Library screen (liked songs, albums)
- [ ] REST API: `/tracks`, `/albums`, `/artists`, `/search`
- [ ] Basic search functionality

---

## Phase 3 — Payments & Offline Downloads
**Target: Q1 2026**

Monetisation and offline access — key for East African users.

- [ ] Flutterwave integration
- [ ] MTN Mobile Money (Uganda) payment flow
- [ ] Airtel Money (Uganda) payment flow
- [ ] Subscription plans (Free / Premium)
- [ ] Free tier limits (streaming with ads or limited skips)
- [ ] Premium tier (unlimited streaming + downloads)
- [ ] Track download to device storage
- [ ] Offline playback mode
- [ ] Download manager UI (progress, storage management)
- [ ] Receipt and transaction history screen
- [ ] Webhook handling for payment confirmation

---

## Phase 4 — Multilingual & Discovery
**Target: Q2 2026**

Making the app accessible to all East African users.

- [ ] Luganda language translation (full UI)
- [ ] Language switcher (English / Luganda)
- [ ] SDA Hymnal browser (search by hymn number)
- [ ] Genre and mood-based playlists
- [ ] Curated playlists (Sabbath, Morning Devotion, Youth, Choir)
- [ ] Artist/choir profile pages
- [ ] Recommended content algorithm
- [ ] Share track/playlist functionality
- [ ] Push notifications (new releases, Sabbath playlists)
- [ ] Onboarding screens for new users

---

## Phase 5 — Beta Launch (Uganda)
**Target: Q3 2026**

Soft launch in Uganda with real users.

- [ ] Android APK on Google Play Store (Beta track)
- [ ] iOS TestFlight build
- [ ] Beta tester recruitment (SDA churches in Kampala, Mityana, Jinja)
- [ ] In-app feedback / bug report mechanism
- [ ] Analytics integration (Mixpanel or Amplitude)
- [ ] Performance optimisation (audio buffering, cold start time)
- [ ] Security audit
- [ ] Terms of Service and Privacy Policy pages
- [ ] Admin dashboard for content management
- [ ] Press release and launch communications

---

## Phase 6 — East Africa Expansion
**Target: Q4 2026**

Scaling beyond Uganda.

- [ ] Kenya market — M-Pesa payment integration
- [ ] Tanzania market — TiGo Pesa / Airtel Tanzania
- [ ] Rwanda market
- [ ] Swahili language translation
- [ ] Regional content partnerships (SDA East Africa Division)
- [ ] Artist/choir onboarding portal (self-upload with approval)
- [ ] Royalty tracking and payments to artists
- [ ] Public API for third-party SDA app integrations

---

## 💬 Have Ideas?

Open a [GitHub Issue](../../issues/new/choose) with the label `feature` or `roadmap` to suggest additions or changes to this roadmap.

---

*Last updated: May 2025 | Maintained by [@devbyelijah](https://github.com/devbyelijah)*
