// src/hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query';
import { getPublishedEvents } from '@/services/eventService';

const QUERY_KEY = ['events', 'published'];

export const useEvents = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getPublishedEvents,
  });
};