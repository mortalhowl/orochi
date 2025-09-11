// src/types/ui.ts

// Type cho một thông báo (Toast)
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// Props cho component Modal chung
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Type cho một item trong breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
}