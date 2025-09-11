// src/types/global.ts

// Mở rộng interface ImportMetaEnv để có type-safety cho các biến môi trường của Vite
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Thêm các biến môi trường khác ở đây nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}