// src/lib/upload.ts

import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Tải một file lên Supabase Storage.
 * @param file - Đối tượng File lấy từ input.
 * @param bucket - Tên của bucket trong Supabase Storage (ví dụ: 'event-banners').
 * @returns URL công khai (public URL) của file sau khi đã tải lên.
 */
export const uploadFile = async (file: File, bucket: string): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Tải file thất bại.');
  }
};