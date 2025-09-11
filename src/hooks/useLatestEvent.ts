// src/hooks/useLatestEvent.ts
import { useQuery } from '@tanstack/react-query';
import { getLatestPublishedEvent } from '@/services/eventService';

const QUERY_KEY = ['events', 'latest'];

export const useLatestEvent = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getLatestPublishedEvent,
    staleTime: Infinity, // Dữ liệu này ít thay đổi, có thể cache lâu
  });
};