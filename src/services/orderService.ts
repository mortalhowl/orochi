// src/services/orderService.ts

import { supabase } from '@/lib/supabase';
import type { OrderItem } from '@/types/order';

// Định nghĩa kiểu dữ liệu cho payload để tạo đơn hàng
type OrderItemPayload = Pick<OrderItem, 'ticket_type_id' | 'quantity' | 'unit_price'>;

interface CreateOrderPayload {
  userId: string;
  totalAmount: number;
  discountAmount: number;
  paymentMethod: string;
  notes?: string;
  orderItems: OrderItemPayload[];
}

/**
 * Gọi RPC function trên database để tạo một đơn hàng mới.
 * @param payload - Dữ liệu cần thiết để tạo đơn hàng.
 * @returns ID của đơn hàng mới được tạo.
 */
export const createOrder = async (payload: CreateOrderPayload): Promise<string> => {
  const { data, error } = await supabase.rpc('create_order', {
    p_user_id: payload.userId,
    p_total_amount: payload.totalAmount,
    p_discount_amount: payload.discountAmount,
    p_payment_method: payload.paymentMethod,
    p_notes: payload.notes ?? '',  
    p_order_items: payload.orderItems,
  });

  if (error) {
    console.error('Error creating order:', error);
    throw new Error(error.message || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
  }

  return data;
};