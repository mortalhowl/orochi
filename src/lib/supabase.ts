// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database'; // '@/' là alias cho 'src/', cần cấu hình trong tsconfig.json
import { env } from '@/config/environment';

/**
 * Khởi tạo Supabase client.
 * Việc sử dụng generic <Database> từ file type tự động tạo ra
 * sẽ mang lại type-safety và autocomplete cho toàn bộ các tương tác với CSDL.
 */
export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);