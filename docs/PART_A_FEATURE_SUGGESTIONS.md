# Part A: Coy Product Analysis & Feature Proposals

## 1. Coy App Walkthrough & Experience Notes
During our hands-on exploration of the live Coy application ([app.getcoy.com](https://app.getcoy.com)), we evaluated the end-to-end user journey across all key milestones:

1. **Phone OTP Onboarding**: Fast, frictionless authentication via mobile number OTP. Clean minimal landing screen.
2. **Adding a Crush**: Allows adding up to 3 crushes (by name and phone number). When added, the crush receives an anonymous notification heads-up (*"Someone added you to their Coy crush list"*), preserving absolute anonymity.
3. **Email Verification & Alerts**: Verifies email address and enables push/SMS alerts for when someone adds you or when a mutual match is formed.
4. **Invite Link & Viral Referral Loop**: Generates a custom referral code (`K868PJY`) and link (`https://app.getcoy.com/i/k868pjy`). For every 3 friends who join and add a crush, the user unlocks +1 free crush slot.
5. **Monetization & Slot Expansion**: The `/buy` screen offers +1 crush (₹49), +3 crushes (₹129), and +5 crushes (₹199) powered by Cashfree UPI/card payments.

---

## 2. Core Feature Proposals

### Feature 1: "Coy Campus Circles" — Privacy-Preserving Contact-Free Crush Matching

#### What it is:
A closed, verified community layer (e.g., universities, colleges, corporate campuses, or residential societies) where users can discover and select crushes by name, department/major, year, or campus handle **without requiring their private 10-digit phone number**.

- **Verification**: Students verify using their institutional email (e.g., `@iitd.ac.in`, `@du.ac.in`) or student ID badge.
- **Directory Discovery**: Within their campus circle, students can view a directory of campus members (or search by first name, club, or batch).
- **Zero-Knowledge Mutual Match**: A student can secretly mark someone in their campus circle as a crush. The recipient gets an anonymous campus heads-up: *"Someone in your college added you as their crush! 🤫"*. Only if the recipient also marks them does a mutual match occur.

#### Why it is required:
1. **Solves the "I Don't Have Their Phone Number" Problem**:
   In reality, college students often crush on someone they see in their lecture hall, sports club, or cafeteria. They know their name, face, or department, but *not* their phone number. Forcing users to hunt down a private number creates friction and anxiety, defeating the very premise of being "coy".
2. **Ignites Hyper-Local Viral Network Effects**:
   Dating apps live or die by liquidity. Campus circles create intense localized density. When students know their batchmates are in a specific campus circle, word-of-mouth adoption skyrockets.
3. **Maintains Coy's Absolute Privacy Promise**:
   Even within a campus circle, likes remain 100% blind and double-opt-in. No one ever knows who liked them unless the feeling is mutual.

---

### Feature 2: "Ephemeral 24-Hour Coy Lounge" — Safe Post-Match Icebreaker

#### What it is:
A lightweight, in-app ephemeral chat room that automatically activates for 24 hours immediately upon a mutual match, featuring interactive blind icebreaker games.

- **24-Hour Countdown Timer**: Encourages immediate, low-stakes conversation rather than letting matches go cold.
- **Interactive Icebreakers**: Pre-seeded prompts like:
  - *"Guess who added who first! (Select to reveal)"*
  - *"Two Truths and a Lie"*
  - *"What's your go-to late-night food spot around campus?"*
- **Gradual Contact Reveal**: Users chat anonymously inside the app first. If both users tap *"Exchange Contact Details"*, their real phone numbers / social handles are unlocked. If either user feels uncomfortable, they can exit the lounge at any point with zero exposure of their personal phone number.

#### Why it is required:
1. **Eliminates Post-Match Paralysis**:
   Currently, when a match happens on Coy, users are directly handed each other's phone numbers. This creates immense performance anxiety: *"Who texts first on WhatsApp? What if it looks desperate?"*. The Coy Lounge provides a comfortable middle ground that breaks the ice.
2. **Protects Privacy at the Most Sensitive Moment**:
   Revealing someone's personal phone number immediately upon matching is a privacy risk. An in-app sandbox chat allows both parties to verify good chemistry before handing over their personal WhatsApp number.
3. **Improves Daily Active Retention (DAU & LTV)**:
   Currently, all user engagement leaves Coy immediately for WhatsApp/SMS. By providing an in-app icebreaker, Coy keeps user retention, engagement, and brand affinity inside its own ecosystem.

