// src/services/admin/eventAdminService.ts

import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/event';

type EventPayload = Omit<Event, 'id' | 'created_at' | 'updated_at'>;

/**
 * Lấy danh sách tất cả sự kiện (bao gồm cả bản nháp) cho trang admin.
 * @returns Mảng các sự kiện.
 */
export const getAllEventsForAdmin = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all events for admin:', error);
    throw new Error('Không thể tải danh sách sự kiện.');
  }
  return data || [];
};

/**
 * Tạo một sự kiện mới.
 * @param eventData - Dữ liệu của sự kiện mới.
 * @returns Sự kiện vừa được tạo.
 */
export const createEvent = async (eventData: EventPayload): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw new Error('Tạo sự kiện thất bại.');
  }
  return data;
};

/**
 * Cập nhật thông tin một sự kiện.
 * @param eventId - ID của sự kiện cần cập nhật.
 * @param eventData - Dữ liệu cần cập nhật.
 * @returns Sự kiện sau khi đã cập nhật.
 */
export const updateEvent = async (eventId: string, eventData: Partial<EventPayload>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', eventId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error('Cập nhật sự kiện thất bại.');
  }
  return data;
};

/**
 * Xóa một sự kiện.
 * @param eventId - ID của sự kiện cần xóa.
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    console.error('Error deleting event:', error);
    throw new Error('Xóa sự kiện thất bại.');
  }
};