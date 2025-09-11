// src/services/admin/ticketAdminService.ts

import { supabase } from '@/lib/supabase';
import type { TicketType } from '@/types/ticket';

// Dùng type có sẵn, bỏ đi các trường tự động tạo
type TicketTypePayload = Omit<TicketType, 'id' | 'created_at' | 'updated_at' | 'quantity_sold'>;

/**
 * Lấy tất cả loại vé của một sự kiện.
 * @param eventId - ID của sự kiện.
 */
export const getTicketTypesForEvent = async (eventId: string): Promise<TicketType[]> => {
  const { data, error } = await supabase
    .from('ticket_types')
    .select('*')
    .eq('event_id', eventId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching ticket types:', error);
    throw new Error('Không thể tải danh sách loại vé.');
  }
  return data || [];
};

/**
 * Tạo một loại vé mới cho sự kiện.
 * @param ticketTypeData - Dữ liệu của loại vé mới.
 */
export const createTicketType = async (ticketTypeData: TicketTypePayload): Promise<TicketType> => {
  const { data, error } = await supabase
    .from('ticket_types')
    .insert([ticketTypeData])
    .select()
    .single();

  if (error) {
    console.error('Error creating ticket type:', error);
    throw new Error('Tạo loại vé thất bại.');
  }
  return data;
};

/**
 * Cập nhật một loại vé.
 * @param ticketTypeId - ID của loại vé cần cập nhật.
 * @param ticketTypeData - Dữ liệu cần cập nhật.
 */
export const updateTicketType = async (
  ticketTypeId: string,
  ticketTypeData: Partial<TicketTypePayload>
): Promise<TicketType> => {
  const { data, error } = await supabase
    .from('ticket_types')
    .update(ticketTypeData)
    .eq('id', ticketTypeId)
    .select()
    .single();

  if (error) {
    console.error('Error updating ticket type:', error);
    throw new Error('Cập nhật loại vé thất bại.');
  }
  return data;
};

/**
 * Xóa một loại vé.
 * @param ticketTypeId - ID của loại vé cần xóa.
 */
export const deleteTicketType = async (ticketTypeId: string): Promise<void> => {
  const { error } = await supabase.from('ticket_types').delete().eq('id', ticketTypeId);

  if (error) {
    console.error('Error deleting ticket type:', error);
    throw new Error('Xóa loại vé thất bại.');
  }
};