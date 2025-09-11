// src/types/email.ts

import type { Database } from './database';

// Type cho một mẫu email, lấy từ database
export type EmailTemplate = Database['public']['Tables']['email_templates']['Row'];

// Type cho dữ liệu cần thiết để gửi một email
export interface EmailPayload {
  to: string | string[];
  subject: string;
  templateId: string; // ID của mẫu email trong DB
  variables: Record<string, any>; // Các biến để thay thế trong template, vd: { customer_name: 'John' }
}