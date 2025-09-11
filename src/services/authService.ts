// src/services/authService.ts

import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import type { Profile, Role, Staff } from '@/types/user';
import type { UserWithRole } from '@/types/auth';

/**
 * Lấy thông tin đầy đủ của người dùng hiện tại, bao gồm profile và vai trò.
 * @returns Một object UserWithRole đầy đủ hoặc null nếu chưa đăng nhập.
 */
export const getFullCurrentUser = async (): Promise<UserWithRole | null> => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  // Thử lấy staff profile trước, vì staff cũng là user
  const { data: staffProfile } = await supabase
    .from('staff')
    .select('*, roles(*)') // Lấy kèm thông tin vai trò
    .eq('id', user.id)
    .single<Staff & { roles: Role }>();

  if (staffProfile) {
    return {
      ...user,
      profile: null, // Staff không có profile khách hàng
      staff: staffProfile,
    };
  }

  // Nếu không phải staff, lấy customer profile
  const { data: customerProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>();

  return {
    ...user,
    profile: customerProfile,
    staff: null,
  };
};