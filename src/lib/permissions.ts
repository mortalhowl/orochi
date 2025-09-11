// src/lib/permissions.ts

import { PERMISSIONS } from '@/constants/permissions';
import type { Permission } from '@/constants/permissions';
import type { Role } from '@/types/user';

/**
 * Kiểm tra xem một vai trò có chứa một quyền hạn cụ thể hay không.
 * @param role - Object vai trò của người dùng, chứa mảng các permissions.
 * @param requiredPermission - Quyền hạn cần kiểm tra (lấy từ PERMISSIONS).
 * @returns `true` nếu có quyền, `false` nếu không.
 */
export const checkPermission = (
  role: Role | null | undefined,
  requiredPermission: Permission
): boolean => {
  if (!role || !role.permissions) {
    return false;
  }
  
  // Kiểm tra trường hợp đặc biệt: Super Admin có tất cả các quyền
  if (role.name === 'Super Admin') {
      return true;
  }

  return role.permissions.includes(requiredPermission);
};