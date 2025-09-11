// src/utils/currency.ts

/**
 * Định dạng một số thành chuỗi tiền tệ VND.
 * Sử dụng Intl.NumberFormat API có sẵn trong trình duyệt để có hiệu suất tốt nhất.
 * @param amount - Số tiền cần định dạng.
 * @returns Chuỗi tiền tệ đã định dạng (ví dụ: "100.000 ₫").
 */
export const formatCurrency = (amount: number): string => {
  if (isNaN(amount)) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};