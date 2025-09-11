// src/utils/error-handling.ts

/**
 * Trích xuất thông báo lỗi từ một đối tượng error không xác định.
 * @param error - Đối tượng lỗi được bắt từ khối catch.
 * @returns Một chuỗi thông báo lỗi mà người dùng có thể đọc được.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
    return (error as { message: string }).message;
  }
  return 'Đã xảy ra một lỗi không mong muốn.';
};