// src/types/permission.ts

import type { Database } from './database';

// Type cho vai trò, lấy từ database
export type Role = Database['public']['Tables']['roles']['Row'];

// Định nghĩa các resource và action dựa trên tài liệu phân tích [cite: 270-285]
export type PermissionResource =
  | 'events'
  | 'tickets'
  | 'orders'
  | 'users'
  | 'staff'
  | 'settings'
  | 'reports'
  | 'invitations';

export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'publish'
  | 'archive'
  | 'validate'
  | 'checkin'
  | 'resend'
  | 'process'
  | 'refund'
  | 'cancel'
  | 'export';

export type Permission = `${PermissionResource}.${PermissionAction}`;