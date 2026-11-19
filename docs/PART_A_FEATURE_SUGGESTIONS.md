# Part A: Coy Product Analysis & Feature Proposals

## 1. What Coy is

Coy (by Fiquity Technology Pvt Ltd) is a **double-blind crush-matching app** for adults 18+. Its promise: *"Find out if your crush likes you back."* It is deliberately not a dating app: **no profiles, no photos, no swiping, no chat**.

### How it works (from using app.getcoy.com and reading getcoy.com)

1. **Phone OTP login.** Sign in with a mobile number; no password.
2. **Add up to 3 crushes** by phone number and/or email. Only you can see your list. Adding is final, and a removed slot stays locked for 30 days, so people can't add and remove someone to test whether that person added them.
3. **The crush gets an anonymous heads-up** on WhatsApp, SMS or email: someone has a crush on them, never who. Messages are rate-limited (max one a week, three in total, never at night) and every message has a stop link.
4. **If they add you back, it's a match.** Both people see the match and how to reach each other. If they don't, nothing happens and nobody ever knows.
5. **Email verification and alerts.** Users can add an email and turn on alerts for "when someone new adds you, or it's a match".
6. **Invite link and referrals.** Each user gets a referral code and link. When 3 invited friends join and add a crush, the user earns a free slot.
7. **Extra slots (`/buy`).** One-time packs: +1 for ₹49, +3 for ₹129, +5 for ₹199 (launch prices), paid via Cashfree.

### The gap: a heads-up nobody can act on

The whole loop depends on one step: **the person who receives the heads-up has to guess who sent it and add that person back.**

The heads-up carries no information, so the recipient has nothing to go on. They either add nobody, or they add the "obvious" people and miss the classmate or colleague who actually sent it. Every time that happens, a real mutual crush exists but **never becomes a match**. This is the step where Coy loses the most value.

A second version of the same gap: Coy only works when you **have the person's phone number or email**. At a fest, a party or an offsite, you can see the person you like but can't add them.

Both features below close this gap **without breaking Coy's rules**: no profiles, no browsing strangers, and nobody learns who added them unless it is mutual.

> **Why this is different from Tinder or Bumble:** those apps help you find strangers by browsing profiles. Coy helps two people who **already know each other** find out that the feeling is mutual. Neither feature adds browsing, profiles or chat.

---

## 2. Feature 1: Clue Drop + Silent Guesses

### The problem
The heads-up says "someone has a crush on you", with no way to narrow it down. Most recipients give up or guess wrong, and the match is lost.

### How it works

1. **The sender can attach a clue.** When adding a crush, the sender may pick **up to 2 clues from a fixed menu**. There is no free text, so a clue cannot be used to harass or to slip in a name.
   - **Where you know each other:** college, workplace or society. Only allowed if it is **verified**, e.g. through a college or company email domain.
   - **How:** classmate, colleague, friend of a friend, met once.
   - **How long:** weeks, months, years.
2. **The heads-up shows the clue**, for example:
   > *"Someone from IIT Delhi who's known you for years has a crush on you 🤫"*
3. **The recipient gets 2 free Silent Guesses, valid for 7 days.** A Silent Guess is an add with one difference: **the person guessed is never messaged.**
   - If that person had already added you, it is an **instant match**.
   - If not, nothing happens. Nobody is notified and nobody ever knows you guessed.

### Privacy and safety rules
- **k-anonymity on clues.** A "where" clue is only shown if **at least 25 Coy members** share it. Otherwise the heads-up stays generic. A clue can never point to one person.
- **Guesses leak nothing new.** They follow Coy's existing add rules: final, no undo, and they stay pending for 180 days. A wrong guess tells you exactly as much as a normal add that hasn't matched yet. With only 2 guesses per heads-up, nobody can test a whole list of people.
- **No spam.** A wrong guess never sends anyone a message.
- **Abuse controls.** Clues come from a menu only. Reporting and the 18+ rule still apply, and a sender can't attach a clue they can't verify.

### Why Coy needs it
- **It fixes the step where matches are lost.** Turning heads-ups into matches is Coy's core number, and today the recipient has nothing to go on.
- **Guessing costs nothing.** Today, guessing wrong uses up a scarce slot and may message the wrong person. Silent Guesses remove both costs, so people actually try.
- **It helps revenue.** When the free guesses run out, extra guesses or slots are a natural purchase.
- **It matches the brand.** Guessing a secret admirer from clues is curious and playful.

### What to measure
- How often a heads-up leads to a sign-up and then a match, with a clue vs without one.
- The share of all matches that come from Silent Guesses.
- How often people buy more guesses or slots after using the free ones.

---

## 3. Feature 2: Crush Night (event mode)

### The problem
Coy only works if you have the person's number. At college fests, parties and office offsites, the person you like is in the same room, but you can't add them.

### How it works

1. **An organiser creates an event**, e.g. "Rendezvous '27, Day 2". Attendees join by **scanning a QR code at the venue**. The code only works there and only during the event.
2. **The roster is opt-in and first names only.** People who check in choose how they appear, e.g. "Riya, 3rd yr ECE" or "Riya, red jacket". There are **no photos and no profiles**.
3. **During the event, everyone secretly picks up to 3 names.** Nobody is told anything during the night, so nobody waits nervously for a message.
4. **Everything is revealed at once at a set time**, e.g. 11 pm. Everyone gets their matches together. **Unmatched picks are deleted immediately** and never shown or counted.
5. **Matches become normal Coy matches**, with contact details exchanged under Coy's usual rules. The roster disappears when the event ends.

### Privacy and safety rules
- **Only people who chose to be on the roster can be picked**, so Coy's rule against adding people without their knowledge still holds.
- **The venue QR check-in keeps outsiders out**, so strangers can't browse the list.
- **No counts.** There's never a "5 people picked you". Unmatched picks are deleted when the reveal happens.
- **Moderation.** Organisers can remove reported entries, and the 18+ rule still applies.

### Why Coy needs it
- **It solves the "no number" gap.** The roster reminds you of people you can't add today.
- **More matches.** Everyone at the event picks at the same time and is reminded who is there, so the person you like is far more likely to have picked you too.
- **Growth through campuses.** Coy already runs campus ambassadors. One fest can sign up hundreds of people from the same campus in one night, so more of each new user's crushes are already on Coy.
- **New revenue.** Organisers or sponsors can pay per event, and attendees can buy extra picks on the night.
- **Nothing like it exists.** It's offline first and only exists for one night, and everyone finds out together. It turns a real event into a moment of mutual reveal, with no browsing.

### What to measure
- The share of attendees who check in, and the share of those who make picks.
- The share of picks that become matches.
- How many event sign-ups are still using Coy 30 days later.

---

## 4. Recommendation

**Build Clue Drop + Silent Guesses first.** It fixes the gap on every heads-up Coy sends and uses the existing add rules. **Crush Night** is the bigger growth bet and builds on the campus ambassadors Coy already has.
