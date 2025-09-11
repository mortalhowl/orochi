// src/hooks/useAdminOrders.ts
import { useQuery } from '@tanstack/react-query';
import { getAllOrdersForAdmin } from '@/services/admin/orderAdminService';

const QUERY_KEY = ['admin', 'orders'];

export const useAdminOrders = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAllOrdersForAdmin,
  });
};