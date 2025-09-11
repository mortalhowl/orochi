// src/lib/auth.ts

import { supabase } from './supabase';
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

/**
 * Xử lý đăng nhập bằng Google OAuth.
 * Chuyển hướng người dùng đến trang đăng nhập của Google.
 */
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Bạn có thể thêm các scope khác ở đây nếu cần
      scopes: 'email profile',
      // URL để redirect về sau khi đăng nhập thành công
      redirectTo: `${window.location.origin}/`,
    },
  });
  if (error) {
    console.error('Error signing in with Google:', error.message);
    // Xử lý lỗi (ví dụ: hiển thị thông báo cho người dùng)
    throw error;
  }
};

/**
 * Xử lý đăng nhập bằng email và password.
 * @param credentials - Email và password của người dùng.
 */
export const signInWithEmail = async (credentials: SignInWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error('Error signing in with email:', error.message);
    throw error;
  }
  return data;
};

/**
 * Xử lý đăng xuất.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

/**
 * Lấy thông tin session hiện tại của người dùng.
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error.message);
    throw error;
  }
  return data.session;
};

/**
 * Lấy thông tin người dùng hiện tại.
 */
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};