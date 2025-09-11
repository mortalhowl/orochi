// src/types/auth.ts

import type { Session, User } from '@supabase/supabase-js';
import type { Profile, Staff } from './user';

// Mở rộng type User mặc định của Supabase để có thể chứa thông tin profile hoặc staff
export type UserWithRole = User & {
  profile: Profile | null;
  staff: Staff | null;
};

// Type cho session, có thể bao gồm thông tin người dùng đã được mở rộng
export type AuthSession = Session | null;

// Type cho trạng thái của context hoặc store quản lý auth
export interface AuthState {
  session: AuthSession;
  user: UserWithRole | null;
  loading: boolean;
}