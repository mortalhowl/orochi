// src/utils/image.ts

/**
 * Cung cấp một URL ảnh placeholder.
 * Rất hữu ích khi một sự kiện hoặc profile chưa có ảnh đại diện/banner.
 * @param width - Chiều rộng của ảnh.
 * @param height - Chiều cao của ảnh.
 * @param text - Chữ hiển thị trên ảnh.
 * @returns URL của ảnh placeholder.
 */
export const getPlaceholderImage = (
  width: number,
  height: number,
  text = 'Orochi Event'
): string => {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};

/**
 * Kiểm tra và trả về URL ảnh hợp lệ từ Supabase hoặc ảnh placeholder.
 * @param supabaseUrl - URL ảnh từ Supabase Storage.
 * @returns URL ảnh hợp lệ hoặc URL placeholder nếu URL đầu vào không hợp lệ.
 */
export const getValidImageUrl = (supabaseUrl: string | null | undefined): string => {
  if (supabaseUrl && supabaseUrl.startsWith('http')) {
    return supabaseUrl;
  }
  // Trả về ảnh mặc định nếu không có URL hoặc URL không hợp lệ
  return getPlaceholderImage(1280, 720, 'Event Image Not Found');
};