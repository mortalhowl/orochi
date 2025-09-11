// src/config/payment.ts
import { env } from './environment';

export const vietQRConfig = {
  // Các giá trị này nên được lấy từ biến môi trường
  apiKey: env.VIETQR_API_KEY,
  clientId: env.VIETQR_CLIENT_ID,
  accountNumber: env.BANK_ACCOUNT_NUMBER,
  bankCode: env.BANK_CODE, // Ví dụ: 970422 cho MB Bank
  accountName: env.ACCOUNT_NAME,
} as const;

// Kiểm tra các biến môi trường cần thiết cho thanh toán
if (!vietQRConfig.apiKey || !vietQRConfig.clientId || !vietQRConfig.accountNumber) {
  throw new Error('Missing VietQR environment variables');
}