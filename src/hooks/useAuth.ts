// src/hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook tiện ích để truy cập authStore.
 * Cung cấp một facade đơn giản, giúp dễ dàng thay đổi thư viện state management sau này nếu cần.
 */
export const useAuth = useAuthStore;