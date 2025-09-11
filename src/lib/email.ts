// src/lib/email.ts

import { supabase } from './supabase';

interface EmailPayload {
  to: string;
  subject: string;
  templateId: string;
  variables: Record<string, any>;
}

/**
 * Gọi một Supabase Edge Function để gửi email giao dịch.
 * @param payload - Dữ liệu cần thiết để gửi email.
 * @returns Dữ liệu trả về từ Edge Function.
 */
export const sendTransactionalEmail = async (payload: EmailPayload) => {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: payload,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Không thể gửi email.');
  }

  return data;
};