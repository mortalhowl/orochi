// src/lib/payment.ts

import { vietQRConfig } from '@/config/payment';

/**
 * Tạo nội dung chuỗi Quick Link cho VietQR.
 * Chuỗi này chứa tất cả thông tin cần thiết để một ứng dụng ngân hàng có thể quét và tự động điền.
 * @param amount - Số tiền cần thanh toán.
 *- * @param orderInfo - Thông tin cho nội dung chuyển khoản (thường là mã đơn hàng).
 * @returns Một chuỗi đã được định dạng cho việc tạo QR.
 */
export const generateVietQRPayload = (amount: number, orderInfo: string): string => {
  const { accountNumber, bankCode, accountName } = vietQRConfig;

  // Tạo URLSearchParams để xử lý và encode các tham số một cách an toàn
  const params = new URLSearchParams({
    'accountNo': accountNumber,
    'accountName': accountName,
    'acqId': String(bankCode),
    'amount': String(amount),
    'addInfo': orderInfo,
    'template': 'compact',
  });

  // URL base của VietQR Quick Link
  const vietQRUrl = `https://api.vietqr.io/image/${bankCode}/${accountNumber}/${amount}/${orderInfo}?accountName=${encodeURIComponent(accountName)}`;

  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-${params.get('template')}.png?${params.toString()}`;
};