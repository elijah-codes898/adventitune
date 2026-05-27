# AdventiTune — Technical Architecture

This document describes the technical architecture of AdventiTune, intended to help contributors understand how the system is structured and how the components interact.

---

## System Overview

AdventiTune follows a **client-server architecture** with a React Native mobile client, a Node.js REST API backend, and several managed cloud services for storage, auth, and payments.

```
┌─────────────────────────────────────────────────────────────────┐
│                        MOBILE CLIENT                            │
│                  React Native (iOS + Android)                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│    │  Screens │  │Components│  │Navigation│  │  State   │     │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST
┌──────────────────────────▼──────────────────────────────────────┐
│                      BACKEND API                                │
│               Node.js + Express (Railway.app)                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│    │  Routes  │  │Controllers│ │Middleware│  │  Models  │     │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└────┬────────────────┬──────────────────┬────────────────────────┘
     │                │                  │
     ▼                ▼                  ▼
┌─────────┐    ┌────────────┐    ┌──────────────┐
│Supabase │    │Cloudflare  │    │ Flutterwave  │
│PostgreSQL│   │   R2       │    │  Payments    │
│         │    │(Audio Files│    │(MTN / Airtel)│
└─────────┘    └────────────┘    └──────────────┘
     ▲
     │ Auth token validation
┌────────────┐
│  Firebase  │
│    Auth    │
└────────────┘
```

---

## Component Breakdown

### Mobile Client (React Native)

The mobile app is built with **React Native** using **Expo** for cross-platform support (iOS and Android).

**Key Libraries:**
| Library | Purpose |
|---|---|
| `react-navigation` | Screen routing and navigation |
| `expo-av` | Audio playback |
| `expo-file-system` | Offline file download/storage |
| `zustand` or `redux-toolkit` | Global state management |
| `react-query` | Server state + caching |
| `axios` | HTTP requests to backend |
| `i18next` | Multilingual support (EN/Luganda) |

**Screen Map:**
```
/onboarding         → Welcome, Login, Register
/home               → Featured tracks, playlists, new releases
/search             → Search by title, artist, hymn number
/player             → Now Playing screen
/library            → Downloads, liked songs, history
/settings           → Language, account, subscription
/payment            → Subscription & payment flow
/profile            → User account details
```

---

### Backend API (Node.js + Express)

The REST API is hosted on **Railway.app** and serves the mobile client.

**API Base URL:** `https://api.adventitune.app/v1`

**Core Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/verify` | Verify Firebase token |
| GET | `/tracks` | List/paginate tracks |
| GET | `/tracks/:id` | Single track details |
| GET | `/tracks/:id/stream` | Signed streaming URL |
| GET | `/tracks/:id/download` | Signed download URL (Premium) |
| GET | `/albums` | List albums |
| GET | `/albums/:id` | Album with tracks |
| GET | `/artists` | List artists/choirs |
| GET | `/search` | Full-text search |
| GET | `/playlists` | Curated playlists |
| POST | `/payments/initiate` | Start payment via Flutterwave |
| POST | `/payments/webhook` | Flutterwave webhook handler |
| GET | `/users/me` | Current user profile |
| PATCH | `/users/me` | Update profile |

---

### Database (Supabase / PostgreSQL)

**Core Tables:**

```sql
users
  id, firebase_uid, email, display_name, avatar_url,
  subscription_tier, subscription_expires_at, created_at

tracks
  id, title, artist_id, album_id, duration_seconds,
  r2_key, hymn_number, language, genre, play_count, created_at

albums
  id, title, artist_id, cover_image_url, release_year, created_at

artists
  id, name, bio, avatar_url, is_choir, created_at

playlists
  id, title, description, cover_image_url, is_curated, created_at

playlist_tracks
  playlist_id, track_id, position

user_likes
  user_id, track_id, created_at

user_downloads
  user_id, track_id, downloaded_at, device_id

payments
  id, user_id, amount_ugx, currency, provider,
  flutterwave_tx_id, status, plan, created_at
```

---

### File Storage (Cloudflare R2)

Audio files are stored in **Cloudflare R2** (S3-compatible). The backend generates **short-lived signed URLs** for both streaming and downloads, so audio files are never exposed directly to the client.

**Folder structure in R2:**
```
adventitune-audio/
├── tracks/
│   ├── {track_id}.mp3
│   └── {track_id}.m4a
└── covers/
    └── {album_id}.jpg
```

---

### Authentication (Firebase Auth)

Users authenticate via **Firebase Authentication**. The mobile app handles login (email/password + Google OAuth) and passes a **JWT ID token** to the backend with every request. The backend verifies this token using the Firebase Admin SDK.

**Auth Flow:**
```
1. User logs in via Firebase on mobile app
2. Firebase returns an ID token (JWT, expires in 1 hour)
3. Mobile app includes token in Authorization header:
   Authorization: Bearer <firebase_id_token>
4. Backend middleware calls Firebase Admin SDK to verify token
5. Backend attaches user info to request context
6. Route handler processes request
```

---

### Payments (Flutterwave)

Payments are processed via **Flutterwave**, which supports MTN Mobile Money, Airtel Money, and card payments in Uganda.

**Payment Flow:**
```
1. User selects a subscription plan in the app
2. App calls POST /payments/initiate
3. Backend calls Flutterwave API to create a payment link
4. App opens the Flutterwave payment modal (WebView)
5. User completes payment on MTN/Airtel/card
6. Flutterwave sends webhook to POST /payments/webhook
7. Backend verifies webhook signature
8. Backend upgrades user subscription in database
9. App polls GET /users/me to detect subscription change
```

---

## Security Considerations

- All API endpoints (except public search/browse) require a valid Firebase ID token
- Audio file URLs are signed and expire after 15 minutes to prevent sharing
- Flutterwave webhook payloads are verified with HMAC signature
- Sensitive keys stored as environment variables (never committed to git)
- Rate limiting applied to auth and payment endpoints
- CORS restricted to known mobile app origins in production

---

## Development vs Production Environments

| Config | Development | Production |
|---|---|---|
| Database | Supabase (dev project) | Supabase (prod project) |
| Storage | R2 dev bucket | R2 prod bucket |
| Payments | Flutterwave test mode | Flutterwave live mode |
| Auth | Firebase dev project | Firebase prod project |
| API URL | `localhost:3000` | `api.adventitune.app` |

---

*For setup instructions, see [docs/SETUP.md](SETUP.md)*
*For API reference, see [docs/API_REFERENCE.md](API_REFERENCE.md)*
