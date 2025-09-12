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

/**
 * Gửi yêu cầu gửi mã OTP đến email.
 * @param email - Email của người dùng.
 */
export const sendPasswordResetOtp = async (email: string) => {
  const { data, error } = await supabase.functions.invoke('send-password-otp', {
    body: { email },
  });
  
  // XỬ LÝ LỖI CHI TIẾT
  if (error) {
    // Supabase trả về lỗi chi tiết trong 'context' khi invoke function
    // Lỗi có thể là một object JSON hoặc một chuỗi
    let errorMessage = 'Đã xảy ra lỗi không xác định.';
    if (error.context && typeof error.context.error === 'string') {
        errorMessage = error.context.error;
    } else if(error.context && error.context.error && typeof error.context.error.message === 'string') {
        errorMessage = error.context.error.message;
    } else {
        errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }

  return data;
};

/**
 * Xác thực OTP và đặt lại mật khẩu mới.
 * Đây là một quy trình 2 bước của Supabase.
 * @param email - Email của người dùng.
 * @param otp - Mã OTP người dùng nhập.
 * @param newPassword - Mật khẩu mới.
 */
export const resetPasswordWithOtp = async (email: string, otp: string, newPassword: string) => {
  // Bước 1: Xác thực OTP để nhận được session tạm thời
  const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: 'recovery',
  });
  if (verifyError) throw new Error('Mã OTP không hợp lệ hoặc đã hết hạn.');

  // Bước 2: Dùng session tạm thời đó để đặt mật khẩu mới
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) throw new Error('Đặt lại mật khẩu thất bại.');

  return { success: true, message: 'Mật khẩu đã được cập nhật thành công.' };
};