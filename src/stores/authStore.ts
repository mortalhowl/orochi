// src/stores/authStore.ts

import { create } from 'zustand';
import { getFullCurrentUser } from '@/services/authService';
import type { UserWithRole } from '@/types/auth';

// Định nghĩa "hình dạng" của state
interface AuthState {
  user: UserWithRole | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Trạng thái loading khi đang kiểm tra session lúc đầu
}

// Định nghĩa các "hành động" có thể thay đổi state
interface AuthActions {
  checkUserSession: () => Promise<void>;
  setUser: (user: UserWithRole | null) => void;
  clearSession: () => void;
}

// Tạo store
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // State ban đầu
  user: null,
  isAuthenticated: false,
  isLoading: true, // Bắt đầu với trạng thái loading

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  checkUserSession: async () => {
    try {
      const user = await getFullCurrentUser();
      set({ user, isAuthenticated: !!user, isLoading: false });
    } catch (error) {
      console.error('Failed to check user session:', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearSession: () => {
    // Logic đăng xuất sẽ được gọi ở service, store chỉ cần clear state
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));