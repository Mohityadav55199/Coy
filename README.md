# Coy — Discover Tab & Product Architecture (SDE Intern Assignment)

A mobile-first, privacy-preserving swipe discovery experience built alongside Coy's double-blind mutual crush app.

---

## 📌 Assignment Overview

This repository contains the complete implementation and technical documentation for the **Coy SDE Intern Assignment**:

- **Part A**: Live product exploration of [app.getcoy.com](https://app.getcoy.com) and two strategic core feature proposals with detailed product and privacy rationale. (See [docs/PART_A_FEATURE_SUGGESTIONS.md](docs/PART_A_FEATURE_SUGGESTIONS.md) and summary below).
- **Part B**: A standalone, production-ready "Discover" swipe feed built with **Next.js 14 (App Router)**, **TypeScript**, **Framer Motion**, and **Tailwind CSS**, powered by a persistent file-backed database layer.

---

## 🚀 Key Features Implemented

### 1. 30+ High-Fidelity Seed Profiles
- **32 realistic, diverse student profiles** representing universities across India (IIT Delhi, St. Stephen's, BITS Pilani, NID, LSR, Miranda House, SRCC, etc.).
- Complete with verified badges, multi-photo carousels, distance calculations, rich bios, and interest tags.
- **10 profiles pre-seeded as having liked the user** (e.g. Ananya, Rhea, Tara, Zoya, Diya, Aashi, Tanvi, Avani, Kriti, Priyanka) to ensure instant, repeatable mutual matches during live demos.

### 2. Smooth Swipe Physics & Gestures
- **Mobile Touch Gestures**: Smooth horizontal drag gestures using Framer Motion with elastic drag constraints, dynamic card tilt, and rotation.
- **Real-Time Visual Stamps**: Proportional opacity fading for the emerald **LIKE** stamp (drag right) and rose **PASS** stamp (drag left).
- **Desktop Friendly**: Dedicated action buttons (Pass, Info, Like) and **keyboard shortcuts** (`←` / `A` to pass, `→` / `D` to like).
- **Stack Card Elevation**: Underneath card scales and elevates smoothly as top card is swiped.
- **Non-Repetition Guarantee**: Once swiped (liked or passed), a profile is persistently marked and never appears again in the user's feed.
- **Polished Empty State**: Clear feedback when all profiles in the radius have been reviewed, with quick links to Matches or a 1-click Demo Reset.

### 3. Absolute Zero-Knowledge Matching (Coy Privacy Promise)
- **Zero Client Leakage**: The backend API (`GET /api/feed` or `GET /feed`) **strictly sanitizes** all profile objects. Confidential fields like `hasLikedUser` are completely stripped on the server.
- **Double-Opt-In Mutual Reveal**: A match occurs **only** when both users like each other. Unrequited likes are kept strictly secret.
- **"It's a Match!" Celebration**: Instant full-screen celebratory modal with confetti particle animation (`canvas-confetti`), dual user avatar glow, and prompt to start chatting.

### 4. Mutual Matches View & Interactive Icebreaker Chat
- Dedicated **Matches Tab** with real-time match badge count.
- Displays all mutual matches with avatars, college, city, and relative match timestamps (`"Just now"`, `"5m ago"`).
- Click any match to open an **Interactive Icebreaker Drawer** with pre-filled coy conversation starters (*"Guess who made the first move! 😉"*).

### 5. Persistent State & Robust REST APIs
- All swipes and mutual matches persist across page reloads in `data/coy_database.json`.
- Next.js Rewrites configured so endpoints work cleanly at both root and `/api`:
  - `GET /feed` (or `/api/feed`): Returns unswiped, sanitized profiles.
  - `POST /swipe` (or `/api/swipe`): Records a like/pass, updates match state, returns `{ match: boolean, profile?: Profile }`.
  - `GET /matches` (or `/api/matches`): Returns mutual matches.
  - `POST /api/reset`: Resets demo state back to 32 fresh profiles.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS (Custom Coy brand palette & neo-minimalist mobile card styling)
- **Animations**: Framer Motion (Drag physics, tilt, spring transitions) & Canvas-Confetti
- **Icons**: Lucide React
- **Data & Persistence**: Atomic JSON File-backed Database Engine (zero native build dependencies, works seamlessly on Windows/macOS/Linux/Vercel)
- **Testing**: Automated Node test runner with strict assertion assertions

---

## 📋 Part A: Suggested Core Features

### 1. Coy Campus Circles (Privacy-Preserving Contact-Free Matching)
- **The Problem**: Currently, Coy requires knowing someone's exact 10-digit mobile number. In college campuses, students often crush on someone whose name, department, or Instagram handle they know, but whose private phone number they don't have. Forcing them to track down a phone number creates friction and defeats the purpose of being "coy".
- **The Feature**: Verified campus directories (e.g., via `@college.edu` email). Students can secretly select a crush from their campus circle without needing their phone number. An anonymous heads-up is sent: *"Someone in your college added you as their crush! 🤫"*.
- **Why Required**: Solves the cold-start and contact-discovery barrier, while igniting hyper-local network effects on college campuses.

### 2. Ephemeral 24-Hour Coy Lounge (Safe Post-Match Activation)
- **The Problem**: When a match occurs, users are directly given each other's phone numbers. This causes immediate post-match paralysis: *"Who texts first on WhatsApp? What if it feels desperate?"*. Furthermore, all user engagement immediately leaves Coy for external apps.
- **The Feature**: A private 24-hour in-app chat sandbox with gamified icebreakers (*"Guess who liked who first!"*). Users chat anonymously first, and only exchange phone numbers / social handles once both tap "Exchange Numbers".
- **Why Required**: Eliminates first-move awkwardness, protects personal phone numbers before trust is established, and boosts in-app Daily Active Users (DAU).

*(See full breakdown in [docs/PART_A_FEATURE_SUGGESTIONS.md](docs/PART_A_FEATURE_SUGGESTIONS.md))*

---

## 🧪 Automated Test Suite

Run the automated test suite verifying all 9 core backend requirements:

```bash
npm test
```

### Test Coverage Highlights:
- [x] **Test 1**: Seed profile count (>= 30 profiles) & schema verification.
- [x] **Test 2**: Zero-knowledge privacy check: verifies `hasLikedUser` is NEVER leaked in `getFeed()`.
- [x] **Test 3**: Swipe PASS removes profile from feed and yields `match: false`.
- [x] **Test 4**: Swipe LIKE on unrequited profile records swipe secretly and yields `match: false`.
- [x] **Test 5**: Swipe LIKE on pre-liked profile triggers mutual match and returns sanitized profile.
- [x] **Test 6**: `getMatches()` returns only mutual matches with timestamps.
- [x] **Test 7**: Disk persistence verification across reloads (`data/coy_database.json`).
- [x] **Test 8**: Non-repetition guarantee (swiped profiles never reappear).
- [x] **Test 9**: Database reset functionality.

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Coy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run tests
```bash
npm test
```

### 4. Start local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser (or use mobile emulation mode in DevTools for the ideal mobile-first experience).

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 📱 Live Demo Walkthrough Tips
1. When you first open the app, you start on the **Discover** tab.
2. Swipe right on **Ananya Sharma** or click the pink Heart button: notice the instant **"It's a Match!"** screen with confetti!
3. Click **"Say Hello"** to open the chat icebreaker and send a message.
4. Go back to Discover and swipe left (or press `←`) to pass on **Kabir Mehta**.
5. Switch to the **Matches** tab to see your mutual match history and count.
6. Check the **Home** tab to see how Discover fits alongside Coy's existing crush slots and referral card.
7. Click the **Reset Feed** button anytime in the header or settings to restore all 32 profiles for a fresh demo run.

---
*Built with ❤️ for the Coy SDE Intern Assignment.*

