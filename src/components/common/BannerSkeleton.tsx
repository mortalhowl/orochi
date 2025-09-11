// src/components/common/BannerSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export const BannerSkeleton = () => {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      {/* Skeleton cho ảnh nền */}
      <Skeleton className="absolute inset-0" />
      
      {/* Skeleton cho phần text */}
      <div className="relative z-20 mt-auto space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};