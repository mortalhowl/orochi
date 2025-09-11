// src/services/admin/orderAdminService.ts

import { supabase } from '@/lib/supabase';
import type { OrderWithDetails } from '@/types/order'; // 'Order' có thể không cần nữa
import { ORDER_STATUS } from '@/constants/status';

const ORDER_DETAILS_QUERY = `
  *,
  order_items(*, ticket_types(*)),
  profiles:user_id(name, email, phone) 
`;
// SỬA Ở ĐÂY: profiles:user_id(...) chỉ rõ cho Supabase join profiles thông qua cột user_id

export const getAllOrdersForAdmin = async (): Promise<OrderWithDetails[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_DETAILS_QUERY) // Dùng query đã định nghĩa
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    throw new Error('Không thể tải danh sách đơn hàng.');
  }
  return data as OrderWithDetails[];
};

export const updateOrderStatus = async (
  orderId: string,
  status: typeof ORDER_STATUS[keyof typeof ORDER_STATUS]
): Promise<OrderWithDetails> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: status })
    .eq('id', orderId)
    .select(ORDER_DETAILS_QUERY) // SỬA Ở ĐÂY: Dùng lại query chi tiết để data trả về đúng type
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error('Cập nhật trạng thái đơn hàng thất bại.');
  }
  return data as OrderWithDetails;
};