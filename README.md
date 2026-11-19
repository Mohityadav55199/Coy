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
- **Coy-Style Stamps**: **🤫 SECRETLY LIKED** fades in on drag right and **NOT THIS TIME** on drag left.
- **Spoiler Photos**: Each profile has 4 photos. Photo 1 is always clear, so you can judge someone at a glance. Photo 2 is a tap-to-reveal spoiler (tap anywhere and it stays revealed). Photos 3–4 are hold-to-peek: visible only while pressed and blurred again on release. A segmented bar and a counter chip (e.g. "📸 1/4 · +3 secret") show how many photos there are and which ones are hidden.
- **Mystery Match**: A match first shows a sealed 💌 "Someone liked you back…" screen. Tap it to see who.
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

**The gap both features solve:** Coy's anonymous heads-up tells someone that *someone* has a crush on them, but gives them nothing to go on. If they never think of the right person, a real mutual crush never becomes a match. Separately, Coy can't help at all when you don't have the person's number.

### 1. Clue Drop + Silent Guesses
- **The Feature**: The sender can attach up to 2 clues from a fixed menu (verified college or workplace, how you know each other, how long). Example: *"Someone from IIT Delhi who's known you for years has a crush on you 🤫"*. The recipient gets 2 free **Silent Guesses**: adds that never message the person guessed, and only matter if that person had already added them.
- **Why Required**: It fixes the step where Coy loses the most matches. Wrong guesses cost nothing and notify no one, and a clue is only shown if at least 25 members share it, so it can never identify the sender.

### 2. Crush Night (event mode)
- **The Feature**: At a fest or offsite, attendees check in with a venue QR code and appear on an opt-in, first-names-only roster. They secretly pick up to 3 names, and all matches are revealed at once at a set time. Unmatched picks are deleted immediately.
- **Why Required**: It solves the "I don't have their number" gap with no profiles or browsing, and Coy's existing campus ambassadors can bring in hundreds of users from the same campus in one night.

> Unlike Tinder or Bumble, neither feature adds browsing strangers, profiles or chat. They help people who already know each other find out that the feeling is mutual.

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

