// src/services/authService.ts

import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { signInWithEmail } from '@/lib/auth';
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

/**
 * Xử lý luồng đăng nhập cho Admin/Staff.
 * @param credentials - Email và password.
 * @returns Thông tin chi tiết của staff sau khi đăng nhập thành công.
 */
export const loginAdmin = async (credentials: Parameters<typeof signInWithEmail>[0]) => {
  const { session } = await signInWithEmail(credentials);

  if (!session?.user) {
    throw new Error('Đăng nhập thất bại, không có thông tin người dùng.');
  }

  // Sau khi đăng nhập, lấy thông tin staff để xác thực
  const { data: staffProfile, error: staffError } = await supabase
    .from('staff')
    .select('*, roles(*)')
    .eq('id', session.user.id)
    .single();
  
  if (staffError || !staffProfile) {
    // Đăng xuất người dùng nếu họ không phải là staff
    await supabase.auth.signOut();
    throw new Error('Tài khoản này không có quyền truy cập trang quản trị.');
  }

  // Trả về user đầy đủ thông tin
  return { ...session.user, profile: null, staff: staffProfile };
};