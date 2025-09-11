// src/lib/qr-code.ts

import QRCode from 'qrcode';

/**
 * Tạo một Data URL (base64) cho ảnh QR code từ một chuỗi văn bản.
 * Data URL này có thể được dùng trực tiếp trong thuộc tính `src` của thẻ <img>.
 * @param text - Chuỗi văn bản cần mã hóa thành QR code.
 * @returns Promise chứa chuỗi Data URL của ảnh QR.
 */
export const generateQRCodeDataURL = async (text: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H', // Mức độ sửa lỗi cao, tốt cho QR phức tạp
      margin: 2,
      width: 256, // Kích thước ảnh QR
    });
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    // Trả về một giá trị mặc định hoặc throw lỗi tùy theo logic của bạn
    throw new Error('Không thể tạo mã QR.');
  }
};