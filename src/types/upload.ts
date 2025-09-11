// src/types/upload.ts

// Cấu trúc data trả về từ API sau khi upload file thành công
export interface FileUploadResponse {
  success: boolean;
  message: string;
  url: string; // Đường dẫn tới file đã upload
  path: string; // Path trong storage của Supabase
  fileName: string;
  fileSize: number;
  fileType: string;
}