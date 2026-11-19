import fs from 'fs';
import path from 'path';
import type { DatabaseState, InternalProfile, MatchRecord, Profile, SwipeRecord } from '../types/index.ts';
import { SEED_PROFILES } from '../data/seedProfiles.ts';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'coy_database.json');

// Default initial state: a single mock logged-in user (no real contact details)
const INITIAL_STATE: DatabaseState = {
  currentUser: {
    id: 'usr_mohit',
    name: 'Mohit',
    phone: '+91 98765 43210',
    email: 'you@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  },
  profiles: SEED_PROFILES,
  swipes: [],
  matches: [],
};

// In-memory cache for fast read/write
let memoryState: DatabaseState | null = null;

function ensureDataDirectory(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

function loadState(): DatabaseState {
  if (memoryState) return memoryState;

  ensureDataDirectory();

  if (fs.existsSync(DB_PATH)) {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      memoryState = JSON.parse(data) as DatabaseState;
      // Keep saved swipes/matches, but refresh profile galleries from the seed.
      const seedById = new Map(SEED_PROFILES.map((sp) => [sp.id, sp]));
      for (const prof of memoryState.profiles) {
        const seeded = seedById.get(prof.id);
        if (seeded) prof.photos = [...seeded.photos];
      }
      return memoryState;
    } catch (err) {
      console.error('Error reading Coy database, falling back to initial seeds:', err);
    }
  }

  // Write initial seeds
  memoryState = JSON.parse(JSON.stringify(INITIAL_STATE));
  saveState();
  return memoryState!;
}

function saveState(): void {
  if (!memoryState) return;
  try {
    ensureDataDirectory();
    // Atomic write via temp file
    const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(memoryState, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
  } catch (err) {
    console.error('Error saving Coy database to disk:', err);
  }
}

/**
 * Strips confidential backend fields like `hasLikedUser` before sending to the client.
 * Enforces Coy's core privacy promise:
 * "Never reveal who has liked the user unless it is mutual; this is the core promise of Coy."
 */
export function sanitizeProfile(profile: InternalProfile): Profile {
  const { hasLikedUser: _excluded, ...publicProfile } = profile;
  return publicProfile;
}

/**
 * Returns profiles that the user has not swiped on yet.
 */
export function getFeed(userId: string = INITIAL_STATE.currentUser.id): Profile[] {
  const state = loadState();
  const swipedProfileIds = new Set(
    state.swipes.filter((s) => s.userId === userId).map((s) => s.profileId)
  );

  return state.profiles
    .filter((p) => !swipedProfileIds.has(p.id))
    .map(sanitizeProfile);
}

/**
 * Records a swipe (like or pass).
 * If it is a like and the profile has pre-liked the user, a mutual match is formed!
 */
/** Error with an HTTP status, so API routes can return 404 / 409 instead of 500. */
export class SwipeError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'SwipeError';
  }
}

export function recordSwipe(
  profileId: string,
  action: 'like' | 'pass',
  userId: string = INITIAL_STATE.currentUser.id
): { match: boolean; profile?: Profile } {
  const state = loadState();

  const profile = state.profiles.find((p) => p.id === profileId);
  if (!profile) {
    throw new SwipeError(`Profile with id "${profileId}" not found`, 404);
  }

  // A swipe is final: a profile can be swiped once. Allowing a pass to be
  // flipped into a like would let a client probe who has liked the user.
  const alreadySwiped = state.swipes.some(
    (s) => s.userId === userId && s.profileId === profileId
  );
  if (alreadySwiped) {
    throw new SwipeError(`Profile "${profileId}" has already been swiped`, 409);
  }

  const newSwipe: SwipeRecord = {
    id: `swp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    profileId,
    action,
    timestamp: new Date().toISOString(),
  };

  state.swipes.push(newSwipe);

  let isMatch = false;
  let matchedProfile: Profile | undefined = undefined;

  // Check for mutual match
  if (action === 'like' && profile.hasLikedUser) {
    isMatch = true;
    matchedProfile = sanitizeProfile(profile);

    // Record mutual match if not already recorded
    const existingMatch = state.matches.find(
      (m) => m.userId === userId && m.profileId === profileId
    );

    if (!existingMatch) {
      const newMatch: MatchRecord = {
        id: `mtc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        userId,
        profileId,
        profile: matchedProfile,
        matchedAt: new Date().toISOString(),
      };
      state.matches.unshift(newMatch); // Most recent match first
    }
  }

  saveState();

  return {
    match: isMatch,
    profile: matchedProfile,
  };
}

/**
 * Returns all mutual matches for the user.
 */
export function getMatches(userId: string = INITIAL_STATE.currentUser.id): MatchRecord[] {
  const state = loadState();
  return state.matches.filter((m) => m.userId === userId);
}

/**
 * Resets database back to default seed state (helpful for demo testing).
 */
export function resetDatabase(): DatabaseState {
  memoryState = JSON.parse(JSON.stringify(INITIAL_STATE));
  saveState();
  return memoryState!;
}

/**
 * Returns current logged-in user details.
 */
export function getCurrentUser() {
  const state = loadState();
  return state.currentUser;
}
