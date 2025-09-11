// src/utils/email-templates.ts

/**
 * Thay thế các biến trong một mẫu email bằng dữ liệu thực tế.
 * Hữu ích cho tính năng xem trước email trong trang Admin.
 * @param template - Chuỗi template chứa các biến dạng {{variable_name}}.
 * @param variables - Một object chứa các cặp key-value của biến.
 * @returns Chuỗi nội dung email đã được điền dữ liệu.
 */
export const populateEmailTemplate = (
  template: string,
  variables: Record<string, string | number>
): string => {
  let populatedTemplate = template;
  for (const key in variables) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    populatedTemplate = populatedTemplate.replace(regex, String(variables[key]));
  }
  return populatedTemplate;
};