// src/hooks/useCart.ts
import { useCartStore } from '@/stores/cartStore';

/**
 * Hook tiện ích để truy cập cartStore.
 * Các component sẽ dùng hook này để tương tác với giỏ hàng.
 * * Ví dụ tối ưu re-render:
 * const totalItems = useCart(state => state.getTotalItems());
 */
export const useCart = useCartStore;