// src/services/admin/staffAdminService.ts
import { supabase } from '@/lib/supabase';
import type { Staff, Role } from '@/types/user';

type StaffWithRole = Staff & { roles: Role | null };

/**
 * Lấy danh sách tất cả nhân viên và vai trò của họ.
 */
export const getStaffList = async (): Promise<StaffWithRole[]> => {
    const { data, error } = await supabase
        .from('staff')
        .select(`*, roles(*)`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching staff list:', error);
        throw new Error('Không thể tải danh sách nhân viên.');
    }
    return data;
};

/**
 * Lấy tất cả các vai trò có sẵn trong hệ thống.
 */
export const getRoles = async (): Promise<Pick<Role, 'id' | 'name'>[]> => {
    const { data, error } = await supabase.rpc('get_all_roles');

    if (error) {
        console.error('Error fetching roles:', error);
        throw new Error('Không thể tải danh sách vai trò.');
    }
    return data;
};