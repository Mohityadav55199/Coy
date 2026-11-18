export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  photos: string[];
  bio: string;
  college: string;
  city: string;
  interests: string[];
  verified?: boolean;
  distanceKm?: number;
}

export interface InternalProfile extends Profile {
  hasLikedUser: boolean; // Server-only: true if this mock profile has liked the logged-in user
}

export interface SwipeRecord {
  id: string;
  userId: string;
  profileId: string;
  action: 'like' | 'pass';
  timestamp: string;
}

export interface MatchRecord {
  id: string;
  userId: string;
  profileId: string;
  profile: Profile;
  matchedAt: string;
  lastMessage?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface DatabaseState {
  currentUser: CurrentUser;
  profiles: InternalProfile[];
  swipes: SwipeRecord[];
  matches: MatchRecord[];
}

export interface SwipeRequest {
  profileId: string;
  action: 'like' | 'pass';
}

export interface SwipeResponse {
  success: boolean;
  action: 'like' | 'pass';
  match: boolean;
  profile?: Profile;
  message?: string;
}

