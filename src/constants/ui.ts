// src/constants/ui.ts

export const BREAKPOINTS = {
//   [cite_start]// Dựa trên tài liệu [cite: 357-359]
  mobile: '768px',
  tablet: '1024px',
} as const;

// Quản lý z-index để tránh các phần tử che lấp nhau ngoài ý muốn
export const Z_INDEX = {
  HEADER: 10,
  MODAL: 100,
  TOAST: 1000,
} as const;

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;