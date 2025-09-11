// src/hooks/useEventDetail.ts
import { useQuery } from '@tanstack/react-query';
import { getEventBySlug } from '@/services/eventService';

export const useEventDetail = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['events', 'detail', slug],
    // queryFn chỉ chạy khi slug có giá trị
    queryFn: () => getEventBySlug(slug!),
    // Tùy chọn `enabled` ngăn query tự động chạy nếu slug chưa tồn tại
    enabled: !!slug, 
  });
};