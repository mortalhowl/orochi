// src/config/environment.ts

// Lấy các biến môi trường từ import.meta.env của Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem các biến môi trường quan trọng đã được định nghĩa chưa
if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL is not defined in your .env file');
}
if (!SUPABASE_ANON_KEY) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined in your .env file');
}

// Export một object chứa các biến môi trường đã được xác thực
export const env = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
};