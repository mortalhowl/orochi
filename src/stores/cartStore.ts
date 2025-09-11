// src/stores/cartStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TicketType } from '@/types/ticket';

// Định nghĩa một item trong giỏ hàng
export interface CartItem {
  ticket: TicketType;
  quantity: number;
}

// Định nghĩa state
interface CartState {
  items: CartItem[];
}

// Định nghĩa actions
interface CartActions {
  addItem: (ticket: TicketType, quantity?: number) => void;
  removeItem: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create(
  // Sử dụng middleware `persist` để lưu state vào localStorage
  persist<CartState & CartActions>(
    (set, get) => ({
      // State ban đầu
      items: [],

      // Actions
      addItem: (ticket, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.ticket.id === ticket.id);

        if (existingItem) {
          // Nếu vé đã có trong giỏ, tăng số lượng
          const updatedItems = currentItems.map((item) =>
            item.ticket.id === ticket.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          // Nếu vé chưa có, thêm mới vào giỏ
          set({ items: [...currentItems, { ticket, quantity }] });
        }
      },

      removeItem: (ticketId) => {
        set({
          items: get().items.filter((item) => item.ticket.id !== ticketId),
        });
      },

      updateQuantity: (ticketId, quantity) => {
        if (quantity <= 0) {
          // Nếu số lượng <= 0, xóa item
          get().removeItem(ticketId);
        } else {
          set({
            items: get().items.map((item) =>
              item.ticket.id === ticketId ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),
      
      // Getter functions
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.ticket.price * item.quantity, 0);
      },
    }),
    {
      name: 'orochi-cart-storage', // Tên key trong localStorage
    }
  )
);