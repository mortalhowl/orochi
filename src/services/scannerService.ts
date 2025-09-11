// src/services/scannerService.ts

import { supabase } from '@/lib/supabase';
import type { TicketWithDetails } from '@/types/ticket';
import type { Database } from '@/types/database';

// Lấy định nghĩa đối số của function từ file database.ts
type CheckInTicketArgs = Database['public']['Functions']['check_in_ticket']['Args'];

// ... hàm validateTicketByCode giữ nguyên ...
export const validateTicketByCode = async (ticketCode: string): Promise<TicketWithDetails | null> => {
  const { data, error } = await supabase
    .from('tickets')
    .select(
      `
      *,
      ticket_types(*),
      orders!inner(events(*))
    `
    )
    .eq('ticket_code', ticketCode)
    .single();
    
  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error validating ticket:', error);
      throw new Error('Lỗi khi xác thực vé.');
    }
  }
  return data as unknown as TicketWithDetails | null;
};

/**
 * Gọi RPC function để thực hiện check-in cho vé.
 * @param ticketId - ID của vé.
 * @param staffId - ID của nhân viên quét vé.
 * @param gate - Cổng check-in.
 */
export const checkInTicket = async (
  ticketId: string,
  staffId: string,
  gate: string
): Promise<{ success: boolean; message: string }> => {

  // Định nghĩa các đối số để truyền vào
  const args: CheckInTicketArgs = {
    p_ticket_id: ticketId,
    p_staff_id: staffId,
    p_gate: gate,
  };
  
  // SỬA Ở ĐÂY: Cung cấp cả tên function và kiểu đối số cho generic
  const { data, error } = await supabase.rpc(
    'check_in_ticket',
    args
  );

  if (error) {
    console.error('Error checking in ticket:', error);
    throw new Error(error.message || 'Check-in thất bại.');
  }

  if (!data) {
    throw new Error('Không nhận được phản hồi từ server sau khi check-in.');
  }
  
  // Ép kiểu data trả về vì RPC chỉ trả về kiểu Json
  return data as { success: boolean; message: string };
};