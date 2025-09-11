// src/services/admin/newsAdminService.ts
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type News = Database['public']['Tables']['news']['Row'];
type NewsPayload = Omit<News, 'id' | 'created_at' | 'updated_at' | 'created_by'>;

/**
 * Lấy danh sách tất cả tin tức.
 */
export const getNewsList = async (): Promise<News[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching news list:', error);
        throw new Error('Không thể tải danh sách tin tức.');
    }
    return data || [];
};

/**
 * Tạo một bài viết mới.
 * @param newsData - Dữ liệu bài viết.
 * @param authorId - ID của người tạo.
 */
export const createNewsArticle = async (newsData: NewsPayload, authorId: string): Promise<News> => {
    const { data, error } = await supabase
        .from('news')
        .insert([{ ...newsData, created_by: authorId, published_at: new Date() }])
        .select()
        .single();
    
    if (error) {
        console.error('Error creating news article:', error);
        throw new Error('Tạo bài viết thất bại.');
    }
    return data;
};

// ... Các hàm update và delete cho News có thể được viết tương tự ...