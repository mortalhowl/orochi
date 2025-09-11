// src/utils/security.ts
import DOMPurify from 'dompurify';

/**
 * Làm sạch một chuỗi HTML để ngăn chặn các cuộc tấn công XSS.
 * Rất quan trọng khi bạn hiển thị nội dung do người dùng nhập (ví dụ từ trình soạn thảo văn bản).
 * @param dirtyHtml - Chuỗi HTML có khả năng chứa mã độc.
 * @returns Chuỗi HTML đã được làm sạch.
 */
export const sanitizeHtml = (dirtyHtml: string): string => {
  // Kiểm tra xem có đang chạy trong môi trường trình duyệt không
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(dirtyHtml);
  }
  // Trả về chuỗi gốc nếu không ở trong môi trường trình duyệt (ví dụ: Server-Side Rendering)
  return dirtyHtml;
};