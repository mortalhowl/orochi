// src/services/eventService.ts

import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/event';
import type { TicketType } from '@/types/ticket';

/**
 * Lấy danh sách các sự kiện đã được công bố và sắp diễn ra.
 * @returns Mảng các sự kiện.
 */
export const getPublishedEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gt('end_date', new Date().toISOString()) // Lớn hơn ngày hiện tại
    .order('start_date', { ascending: true }); // Sắp xếp theo ngày bắt đầu gần nhất

  if (error) {
    console.error('Error fetching published events:', error);
    throw new Error('Không thể tải danh sách sự kiện.');
  }

  return data || [];
};

/**
 * Lấy thông tin chi tiết của một sự kiện bằng slug, bao gồm cả các loại vé.
 * @param slug - Slug của sự kiện.
 * @returns Object sự kiện chi tiết hoặc null nếu không tìm thấy.
 */
export const getEventBySlug = async (
  slug: string
): Promise<(Event & { ticket_types: TicketType[] }) | null> => {
  const { data, error } = await supabase
    .from('events')
    .select(
      `
      *,
      ticket_types(*)
    `
    )
    .eq('slug', slug)
    .single();

  if (error) {
    // Lỗi 'PGRST116' của PostgREST có nghĩa là không tìm thấy dòng nào
    if (error.code !== 'PGRST116') {
      console.error('Error fetching event by slug:', error);
      throw new Error('Không thể tải chi tiết sự kiện.');
    }
  }

  return data;
};

/**
 * Lấy sự kiện đã công bố gần đây nhất để hiển thị trên trang đăng nhập.
 * @returns Một object sự kiện hoặc null.
 */
export const getLatestPublishedEvent = async (): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // Bỏ qua lỗi not found
    console.error('Error fetching latest event:', error);
  }

  return data;
};