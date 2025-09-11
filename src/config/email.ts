// src/config/email.ts
import { env } from './environment'; // Giả sử env đã có các biến này

export const emailConfig = {
  // Email sẽ được hiển thị ở trường "From"
  fromEmail: env.FROM_EMAIL || 'noreply@orochi.vn',

  // Email để người dùng trả lời (reply-to)
  replyToEmail: env.REPLY_TO_EMAIL || 'support@orochi.vn',
} as const;