// src/utils/string.ts

/**
 * Cắt ngắn một chuỗi nếu nó dài hơn độ dài cho phép và thêm dấu '...'.
 * @param text - Chuỗi cần cắt.
 * @param maxLength - Độ dài tối đa.
 * @returns Chuỗi đã được cắt ngắn.
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * Viết hoa chữ cái đầu tiên của chuỗi.
 * @param text - Chuỗi đầu vào.
 * @returns Chuỗi đã được viết hoa chữ cái đầu.
 */
export const capitalize = (text: string): string => {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};