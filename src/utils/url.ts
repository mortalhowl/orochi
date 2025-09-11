// src/utils/url.ts

/**
 * Chuyển đổi một chuỗi thành dạng slug URL-friendly.
 * Loại bỏ dấu tiếng Việt, chuyển thành chữ thường và thay thế khoảng trắng bằng '-'.
 * @param text - Chuỗi cần chuyển đổi.
 * @returns Slug.
 */
export const createEventSlug = (text: string): string => {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode (tách dấu)
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự dấu
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng -
    .replace(/[^\w\-]+/g, '') // Loại bỏ các ký tự không phải chữ, số, -, _
    .replace(/\-\-+/g, '-') // Thay thế nhiều - thành một -
    .replace(/^-+/, '') // Cắt bỏ - ở đầu
    .replace(/-+$/, ''); // Cắt bỏ - ở cuối
};