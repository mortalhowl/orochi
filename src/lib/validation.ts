// src/lib/validation.ts

import { z } from 'zod';

// Schema cho form đăng nhập
export const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
});

// Schema cho form đăng ký
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
});

// Schema cho việc tạo/cập nhật sự kiện (ví dụ)
export const eventSchema = z.object({
  name: z.string().min(5, { message: 'Tên sự kiện phải có ít nhất 5 ký tự.' }),
  description: z.string().optional(),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ngày bắt đầu không hợp lệ.',
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ngày kết thúc không hợp lệ.',
  }),
  location: z.string().min(5, { message: 'Địa điểm phải có ít nhất 5 ký tự.' }),
}).refine(data => new Date(data.start_date) < new Date(data.end_date), {
  message: "Ngày kết thúc phải sau ngày bắt đầu.",
  path: ["end_date"], // Gắn lỗi vào trường end_date
});