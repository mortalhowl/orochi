// src/types/user.ts

import type { Database } from './database';

// Type cho thông tin public của khách hàng, lấy từ bảng `profiles`
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Type cho thông tin nhân viên, lấy từ bảng `staff`
export type Staff = Database['public']['Tables']['staff']['Row'];

// Type cho vai trò, có thể mở rộng sau này
export type Role = Database['public']['Tables']['roles']['Row'];