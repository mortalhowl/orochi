// src/services/admin/voucherAdminService.ts

import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Voucher = Database['public']['Tables']['vouchers']['Row'];
// Dùng cho việc tạo mới, bỏ đi các trường CSDL tự quản lý
type VoucherPayload = Omit<Voucher, 'id' | 'created_at' | 'used_count'>;

/**
 * Lấy danh sách tất cả voucher.
 */
export const getVouchers = async (): Promise<Voucher[]> => {
  const { data, error } = await supabase
    .from('vouchers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vouchers:', error);
    throw new Error('Không thể tải danh sách voucher.');
  }
  return data || [];
};

/**
 * Tạo một voucher mới.
 * @param voucherData - Dữ liệu voucher mới.
 */
export const createVoucher = async (voucherData: VoucherPayload): Promise<Voucher> => {
  const { data, error } = await supabase
    .from('vouchers')
    .insert([voucherData])
    .select()
    .single();

  if (error) {
    console.error('Error creating voucher:', error);
    throw new Error('Tạo voucher thất bại.');
  }
  return data;
};

/**
 * Cập nhật một voucher.
 * @param voucherId - ID của voucher cần cập nhật.
 * @param voucherData - Dữ liệu cần cập nhật.
 */
export const updateVoucher = async (
  voucherId: string,
  voucherData: Partial<VoucherPayload>
): Promise<Voucher> => {
  const { data, error } = await supabase
    .from('vouchers')
    .update(voucherData)
    .eq('id', voucherId)
    .select()
    .single();

  if (error) {
    console.error('Error updating voucher:', error);
    throw new Error('Cập nhật voucher thất bại.');
  }
  return data;
};

/**
 * Xóa một voucher.
 * @param voucherId - ID của voucher cần xóa.
 */
export const deleteVoucher = async (voucherId: string): Promise<void> => {
  const { error } = await supabase.from('vouchers').delete().eq('id', voucherId);

  if (error) {
    console.error('Error deleting voucher:', error);
    throw new Error('Xóa voucher thất bại.');
  }
};