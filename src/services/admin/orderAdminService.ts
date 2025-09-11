// src/services/admin/orderAdminService.ts

import { supabase } from '@/lib/supabase';
import type { OrderWithDetails } from '@/types/order';
import { ORDER_STATUS } from '@/constants/status';

// Vì đã có foreign key, Supabase sẽ tự hiểu mối quan hệ này
const ORDER_DETAILS_QUERY = `
  *,
  order_items(*, ticket_types(*)),
  profiles(name, email, phone) 
`;

export const getAllOrdersForAdmin = async (): Promise<OrderWithDetails[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_DETAILS_QUERY)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    throw new Error('Không thể tải danh sách đơn hàng.');
  }
  // Giờ đây kiểu dữ liệu trả về sẽ khớp, không cần ép kiểu mạnh nữa
  return data || [];
};

export const updateOrderStatus = async (
  orderId: string,
  status: typeof ORDER_STATUS[keyof typeof ORDER_STATUS]
): Promise<OrderWithDetails> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: status })
    .eq('id', orderId)
    .select(ORDER_DETAILS_QUERY)
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error('Cập nhật trạng thái đơn hàng thất bại.');
  }
  return data;
};