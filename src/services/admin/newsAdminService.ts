// src/services/admin/newsAdminService.ts
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type News = Database['public']['Tables']['news']['Row'];
// Bỏ đi các trường CSDL tự quản lý khi tạo mới/cập nhật
type NewsPayload = Omit<News, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'published_at'>;

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
    const articleToInsert = {
        ...newsData,
        created_by: authorId,
        // SỬA LỖI Ở ĐÂY: Chuyển Date object thành ISO string
        published_at: new Date().toISOString(), 
    };

    const { data, error } = await supabase
        .from('news')
        .insert([articleToInsert])
        .select()
        .single();
    
    if (error) {
        console.error('Error creating news article:', error);
        throw new Error('Tạo bài viết thất bại.');
    }
    return data;
};

/**
 * Cập nhật một bài viết.
 * @param articleId - ID của bài viết cần cập nhật.
 * @param newsData - Dữ liệu cần cập nhật.
 */
export const updateNewsArticle = async (
  articleId: string,
  newsData: Partial<NewsPayload>
): Promise<News> => {
  const articleToUpdate = {
    ...newsData,
    // Cập nhật thời gian updated_at mỗi khi chỉnh sửa
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('news')
    .update(articleToUpdate)
    .eq('id', articleId)
    .select()
    .single();

  if (error) {
    console.error('Error updating news article:', error);
    throw new Error('Cập nhật bài viết thất bại.');
  }
  return data;
};

/**
 * Xóa một bài viết.
 * @param articleId - ID của bài viết cần xóa.
 */
export const deleteNewsArticle = async (articleId: string): Promise<void> => {
  const { error } = await supabase.from('news').delete().eq('id', articleId);

  if (error) {
    console.error('Error deleting news article:', error);
    throw new Error('Xóa bài viết thất bại.');
  }
};