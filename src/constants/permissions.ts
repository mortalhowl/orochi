// src/constants/permissions.ts

/**
 * File này định nghĩa tất cả các hằng số quyền hạn trong hệ thống.
 * Dựa trên tài liệu phân tích, mục 4.2: Permissions chi tiết [cite: 270-285].
 */

// Định nghĩa các "tài nguyên" (resources) mà hệ thống quản lý.
export const RESOURCES = {
  EVENTS: 'events',
  TICKETS: 'tickets',
  ORDERS: 'orders',
  USERS: 'users',
  STAFF: 'staff',
  SETTINGS: 'settings',
  REPORTS: 'reports',
  INVITATIONS: 'invitations',
  // Bổ sung các resource khác từ cấu trúc dự án để hoàn thiện
  VOUCHERS: 'vouchers',
  GALLERY: 'gallery',
  NEWS: 'news',
  TEMPLATES: 'templates',
} as const;

// Định nghĩa các "hành động" (actions) có thể thực hiện trên tài nguyên.
export const ACTIONS = {
  // CRUD cơ bản
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  // Actions cho Events [cite: 273]
  PUBLISH: 'publish',
  ARCHIVE: 'archive',

  // Actions cho Tickets [cite: 276]
  VALIDATE: 'validate',
  CHECKIN: 'checkin',
  RESEND: 'resend',

  // Actions cho Orders [cite: 278, 279]
  PROCESS: 'process',
  REFUND: 'refund',
  CANCEL: 'cancel',
  
  // Actions cho Reports [cite: 285]
  VIEW: 'view',
  EXPORT: 'export',
} as const;

// Kết hợp RESOURCES và ACTIONS thành một object PERMISSIONS hoàn chỉnh.
// Đây sẽ là "nguồn chân lý duy nhất" (single source of truth) cho việc kiểm tra quyền.
export const PERMISSIONS = {
  // Event Permissions [cite: 272, 273]
  EVENTS_CREATE: `${RESOURCES.EVENTS}.${ACTIONS.CREATE}`,
  EVENTS_READ: `${RESOURCES.EVENTS}.${ACTIONS.READ}`,
  EVENTS_UPDATE: `${RESOURCES.EVENTS}.${ACTIONS.UPDATE}`,
  EVENTS_DELETE: `${RESOURCES.EVENTS}.${ACTIONS.DELETE}`,
  EVENTS_PUBLISH: `${RESOURCES.EVENTS}.${ACTIONS.PUBLISH}`,
  EVENTS_ARCHIVE: `${RESOURCES.EVENTS}.${ACTIONS.ARCHIVE}`,

  // Ticket Permissions [cite: 275, 276]
  TICKETS_CREATE: `${RESOURCES.TICKETS}.${ACTIONS.CREATE}`,
  TICKETS_READ: `${RESOURCES.TICKETS}.${ACTIONS.READ}`,
  TICKETS_UPDATE: `${RESOURCES.TICKETS}.${ACTIONS.UPDATE}`,
  TICKETS_DELETE: `${RESOURCES.TICKETS}.${ACTIONS.DELETE}`,
  TICKETS_VALIDATE: `${RESOURCES.TICKETS}.${ACTIONS.VALIDATE}`,
  TICKETS_CHECKIN: `${RESOURCES.TICKETS}.${ACTIONS.CHECKIN}`,
  TICKETS_RESEND: `${RESOURCES.TICKETS}.${ACTIONS.RESEND}`,

  // Order Permissions [cite: 278, 279]
  ORDERS_READ: `${RESOURCES.ORDERS}.${ACTIONS.READ}`,
  ORDERS_UPDATE: `${RESOURCES.ORDERS}.${ACTIONS.UPDATE}`,
  ORDERS_PROCESS: `${RESOURCES.ORDERS}.${ACTIONS.PROCESS}`,
  ORDERS_REFUND: `${RESOURCES.ORDERS}.${ACTIONS.REFUND}`,
  ORDERS_CANCEL: `${RESOURCES.ORDERS}.${ACTIONS.CANCEL}`,
  
  // User & Staff Permissions [cite: 281, 282]
  USERS_READ: `${RESOURCES.USERS}.${ACTIONS.READ}`,
  USERS_UPDATE: `${RESOURCES.USERS}.${ACTIONS.UPDATE}`,
  USERS_DELETE: `${RESOURCES.USERS}.${ACTIONS.DELETE}`,
  
  STAFF_CREATE: `${RESOURCES.STAFF}.${ACTIONS.CREATE}`,
  STAFF_READ: `${RESOURCES.STAFF}.${ACTIONS.READ}`,
  STAFF_UPDATE: `${RESOURCES.STAFF}.${ACTIONS.UPDATE}`,
  STAFF_DELETE: `${RESOURCES.STAFF}.${ACTIONS.DELETE}`,
  
  // System Permissions [cite: 284, 285]
  SETTINGS_READ: `${RESOURCES.SETTINGS}.${ACTIONS.READ}`,
  SETTINGS_UPDATE: `${RESOURCES.SETTINGS}.${ACTIONS.UPDATE}`,
  
  REPORTS_VIEW: `${RESOURCES.REPORTS}.${ACTIONS.VIEW}`,
  REPORTS_EXPORT: `${RESOURCES.REPORTS}.${ACTIONS.EXPORT}`,
  
  // Permissions suy ra từ các module khác
  INVITATIONS_CREATE: `${RESOURCES.INVITATIONS}.${ACTIONS.CREATE}`,
  INVITATIONS_READ: `${RESOURCES.INVITATIONS}.${ACTIONS.READ}`,
  INVITATIONS_UPDATE: `${RESOURCES.INVITATIONS}.${ACTIONS.UPDATE}`,
  INVITATIONS_DELETE: `${RESOURCES.INVITATIONS}.${ACTIONS.DELETE}`,
  
} as const;

// Tạo một type TypeScript từ tất cả các giá trị quyền hạn
// Giúp cho việc kiểm tra quyền được an toàn về kiểu dữ liệu
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];