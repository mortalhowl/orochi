// src/config/security.ts

export const securityConfig = {
  // Cấu hình cho thư viện DOMPurify để làm sạch HTML
  domPurify: {
    // Cho phép một số thẻ và thuộc tính an toàn
    ALLOWED_TAGS: ['b', 'i', 'u', 'p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'target'],
  },
} as const;