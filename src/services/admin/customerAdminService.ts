// src/services/admin/customerAdminService.ts

import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/user';

/**
 * Lấy danh sách tất cả khách hàng.
 * @returns Mảng các profile khách hàng.
 */
export const getAllCustomers = async (): Promise<Profile[]> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
        throw new Error('Không thể tải danh sách khách hàng.');
    }
    return data || [];
};

/**
 * Lấy thông tin chi tiết một khách hàng và lịch sử đơn hàng của họ.
 * @param userId - ID của khách hàng.
 * @returns Profile của khách hàng kèm theo danh sách đơn hàng.
 */
export const getCustomerDetails = async (
  userId: string
): Promise<(Profile & { orders: any[] }) | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      *,
      orders!user_id(*) 
    `
      // SỬA Ở ĐÂY: orders!user_id(*) báo Supabase tìm các order có user_id khớp với id của profile này
    )
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching customer details:', error);
    throw new Error('Không thể tải chi tiết khách hàng.');
  }
  return data;
};