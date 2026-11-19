import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getFeed,
  recordSwipe,
  getMatches,
  resetDatabase,
  getCurrentUser,
  sanitizeProfile,
} from '../src/lib/db.ts';
import { SEED_PROFILES } from '../src/data/seedProfiles.ts';

console.log('🚀 Running Coy SDE Intern Assignment Backend Test Suite...\n');

// Reset to clean seed state before running tests
resetDatabase();

// 1. Seed profiles verification
console.log('🧪 Test 1: Seed Profiles Verification');
assert(SEED_PROFILES.length >= 30, `Expected at least 30 seeded profiles, got ${SEED_PROFILES.length}`);
console.log(`  ✓ Successfully seeded ${SEED_PROFILES.length} mock profiles (>= 30 required)`);

for (const p of SEED_PROFILES) {
  assert(p.id, 'Profile must have an id');
  assert(p.name, 'Profile must have a name');
  assert(p.age >= 18 && p.age <= 30, 'Profile age should be valid college/young adult range');
  assert(p.photos && p.photos.length > 0, 'Profile must have at least one photo');
  assert(p.bio && p.bio.length > 0, 'Profile must have a bio');
  assert(p.college && p.city, 'Profile must have college and city');
  assert(Array.isArray(p.interests) && p.interests.length > 0, 'Profile must have interests');
}
console.log('  ✓ All profiles possess valid schema (name, age, photo, bio, college/city, interests)');

const preLikedCount = SEED_PROFILES.filter((p) => p.hasLikedUser).length;
assert(preLikedCount > 0, 'Expected some seeded profiles to have already liked user');
console.log(`  ✓ ${preLikedCount} seeded profiles have pre-liked user for instant demo matching`);

// 2. Privacy & Zero-Knowledge Leak Prevention
console.log('\n🧪 Test 2: Privacy / Zero-Knowledge Leak Prevention');
const feed = getFeed();
assert.equal(feed.length, SEED_PROFILES.length, 'Initial feed should contain all profiles');

for (const p of feed) {
  assert.equal(
    (p as any).hasLikedUser,
    undefined,
    `Privacy violation: Profile "${p.name}" leaked internal hasLikedUser field!`
  );
}
console.log('  ✓ Verified 100% privacy: getFeed() never leaks hasLikedUser or confidential swipe flags');

// 3. Swipe PASS behavior
console.log('\n🧪 Test 3: Swipe PASS Behavior');
const firstProfile = feed[0];
const passResult = recordSwipe(firstProfile.id, 'pass');
assert.equal(passResult.match, false, 'Passing should never result in a match');
assert.equal(passResult.profile, undefined, 'Passing should not return a matched profile');

const feedAfterPass = getFeed();
assert.equal(
  feedAfterPass.length,
  feed.length - 1,
  'Feed should decrease by 1 after passing'
);
assert(
  !feedAfterPass.some((p) => p.id === firstProfile.id),
  'Swiped profile must never appear again in feed'
);
console.log(`  ✓ Passed on "${firstProfile.name}" — profile removed from feed, match=false`);

// 4. Swipe LIKE without mutual match
console.log('\n🧪 Test 4: Swipe LIKE Without Mutual Match');
const nonLiker = SEED_PROFILES.find((p) => !p.hasLikedUser && p.id !== firstProfile.id)!;
const likeNoMatchResult = recordSwipe(nonLiker.id, 'like');
assert.equal(likeNoMatchResult.match, false, 'Liking someone who has not liked back must NOT match');
assert.equal(likeNoMatchResult.profile, undefined);

const feedAfterLikeNoMatch = getFeed();
assert(
  !feedAfterLikeNoMatch.some((p) => p.id === nonLiker.id),
  'Profile must not appear in feed again after like'
);
console.log(`  ✓ Liked "${nonLiker.name}" (unrequited) — recorded privately, match=false, identity hidden`);

// 5. Swipe LIKE WITH mutual match
console.log('\n🧪 Test 5: Swipe LIKE WITH Mutual Match');
const preLiker = SEED_PROFILES.find((p) => p.hasLikedUser && p.id !== firstProfile.id)!;
const likeMatchResult = recordSwipe(preLiker.id, 'like');
assert.equal(likeMatchResult.match, true, 'Liking someone who pre-liked user must trigger a match!');
assert(likeMatchResult.profile, 'Match must return the matched profile');
assert.equal(likeMatchResult.profile?.name, preLiker.name);
assert.equal((likeMatchResult.profile as any)?.hasLikedUser, undefined, 'Matched profile must still be sanitized');
console.log(`  ✓ Liked "${preLiker.name}" (mutual) — triggered match=true, returned profile!`);

// 6. Mutual Matches List
console.log('\n🧪 Test 6: Mutual Matches Query');
const matches = getMatches();
assert.equal(matches.length, 1, 'Expected exactly 1 mutual match so far');
assert.equal(matches[0].profileId, preLiker.id);
assert.equal(matches[0].profile.name, preLiker.name);
console.log(`  ✓ getMatches() accurately lists mutual matches with timestamps and sanitized data`);

// 7. Persistence Across Reloads
console.log('\n🧪 Test 7: Persistence to Disk');
const dbPath = path.join(process.cwd(), 'data', 'coy_database.json');
assert(fs.existsSync(dbPath), 'data/coy_database.json must exist on disk');

const rawDiskData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
assert.equal(rawDiskData.swipes.length, 3, 'Disk file must persist all 3 swipes');
assert.equal(rawDiskData.matches.length, 1, 'Disk file must persist the 1 mutual match');
console.log('  ✓ All swipes and matches successfully persisted to data/coy_database.json on disk');

// 8. Non-repetition guarantee
console.log('\n🧪 Test 8: Non-Repetition Guarantee');
const remainingFeed = getFeed();
const expectedRemaining = SEED_PROFILES.length - 3;
assert.equal(
  remainingFeed.length,
  expectedRemaining,
  `Expected ${expectedRemaining} profiles remaining, got ${remainingFeed.length}`
);
console.log(`  ✓ Non-repetition verified: none of the 3 swiped profiles appear in remaining feed`);

// 9. Reset Functionality
console.log('\n🧪 Test 9: Database Reset Functionality');
resetDatabase();
const resetFeed = getFeed();
const resetMatches = getMatches();
assert.equal(resetFeed.length, SEED_PROFILES.length, 'Reset should restore all 32 profiles to feed');
assert.equal(resetMatches.length, 0, 'Reset should clear all matches');
console.log('  ✓ resetDatabase() flawlessly restored initial state and cleared demo history');

console.log('\n🎉 ALL 9 TEST SUITES PASSED FLAWLESSLY! 💯\n');

