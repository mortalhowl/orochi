// src/utils/file.ts

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

/**
 * Chuyển đổi kích thước file từ bytes sang định dạng dễ đọc hơn (KB, MB, GB...).
 * @param bytes - Kích thước file tính bằng bytes.
 * @returns Chuỗi kích thước file đã định dạng.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${FILE_SIZE_UNITS[i]}`;
};

/**
 * Kiểm tra xem loại file có được phép upload hay không.
 * @param fileType - MIME type của file (ví dụ: 'image/jpeg').
 * [cite_start]@param allowedTypes - Mảng các loại file được phép (ví dụ: ['jpg', 'png']). [cite: 349]
 * @returns True nếu được phép, ngược lại là false.
 */
export const isFileTypeAllowed = (fileType: string, allowedTypes: string[]): boolean => {
  const extension = fileType.split('/').pop();
  return extension ? allowedTypes.includes(extension) : false;
};