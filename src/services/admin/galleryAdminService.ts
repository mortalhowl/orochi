// src/services/admin/galleryAdminService.ts
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type GalleryImage = Database['public']['Tables']['gallery']['Row'];
type GalleryImagePayload = Omit<GalleryImage, 'id' | 'created_at' | 'uploaded_by'>;

/**
 * Lấy danh sách ảnh của một sự kiện.
 * @param eventId - ID của sự kiện.
 */
export const getGalleryImages = async (eventId: string): Promise<GalleryImage[]> => {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('event_id', eventId)
        .order('order_index', { ascending: true });
    
    if (error) {
        console.error('Error fetching gallery images:', error);
        throw new Error('Không thể tải thư viện ảnh.');
    }
    return data || [];
};

/**
 * Thêm một ảnh mới vào thư viện.
 * @param imageData - Dữ liệu ảnh (thường chứa URL sau khi đã upload).
 * @param uploaderId - ID người upload.
 */
export const addImageToGallery = async (imageData: GalleryImagePayload, uploaderId: string): Promise<GalleryImage> => {
    const { data, error } = await supabase
        .from('gallery')
        .insert([{ ...imageData, uploaded_by: uploaderId }])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding image to gallery:', error);
        throw new Error('Thêm ảnh thất bại.');
    }
    return data;
};