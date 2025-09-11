// src/config/upload.ts

export const uploadConfig = {
  // Giới hạn kích thước file tối đa (tính bằng bytes)
  // Ví dụ: 10MB
  maxFileSize: 10 * 1024 * 1024,

//   [cite_start]// Các loại file được phép, dựa trên tài liệu [cite: 349]
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'pdf'],
} as const;