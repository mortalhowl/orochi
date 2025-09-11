// src/types/payment.ts

import type { Database } from './database';

// Type cho trạng thái thanh toán, đồng bộ với schema
export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';

// Type cho log thanh toán, lấy từ database
export type PaymentLog = Database['public']['Tables']['payment_logs']['Row'];

// [cite_start]// Type cho dữ liệu cần thiết để tạo mã VietQR [cite: 146-148]
export interface VietQRGenerationPayload {
  accountNo: string;
  accountName: string;
  acqId: number; // Mã BIN của ngân hàng
  amount: number;
  addInfo: string; // Nội dung chuyển khoản (thường là mã đơn hàng)
  template?: string;
}