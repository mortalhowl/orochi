// src/stores/uiStore.ts

import { create } from 'zustand';
import type { ToastNotification } from '@/types/ui';
import type { ReactNode } from 'react';

// Định nghĩa state
interface UIState {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  notifications: ToastNotification[];
}

// Định nghĩa actions
interface UIActions {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<ToastNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State ban đầu
  isModalOpen: false,
  modalContent: null,
  notifications: [],

  // Actions
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  
  addNotification: (notification) => {
    const id = new Date().getTime().toString();
    const newNotification = { ...notification, id };
    set({ notifications: [...get().notifications, newNotification] });

    // Tự động xóa notification sau một khoảng thời gian
    setTimeout(() => {
      get().removeNotification(id);
    }, notification.duration || 5000);
  },
  
  removeNotification: (id) => {
    set({
      notifications: get().notifications.filter((n) => n.id !== id),
    });
  },
}));