// src/utils/number.ts

/**
 * Định dạng một số với dấu phẩy ngăn cách hàng nghìn.
 * @param num - Số cần định dạng.
 * @returns Chuỗi số đã định dạng (ví dụ: 12345 -> "12,345").
 */
export const formatNumber = (num: number): string => {
  if (isNaN(num)) {
    return '0';
  }
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Thêm số 0 vào trước một số để đảm bảo nó có đủ hai chữ số.
 * Hữu ích cho việc hiển thị đồng hồ đếm ngược (09, 08, 07...).
 * @param num - Số cần xử lý.
 * @returns Chuỗi số đã được thêm số 0 nếu cần.
 */
export const padNumber = (num: number): string => {
  return String(num).padStart(2, '0');
};