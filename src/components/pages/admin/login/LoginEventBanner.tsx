// src/components/auth/LoginEventBanner.tsx
import type { Event } from '@/types/event';
import { formatDateTime } from '@/utils/date';

interface LoginEventBannerProps {
  event?: Event | null; // Cho phép prop là null hoặc undefined
}

export const LoginEventBanner = ({ event }: LoginEventBannerProps) => {
  // Xác định ảnh nền: ưu tiên banner sự kiện, sau đó là ảnh mặc định
  const backgroundImageUrl = event?.banner_url || '/default-banner.jpg';

  return (
    <div
      className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-zinc-900 opacity-60" />
      <div className="relative z-20 mt-auto">
        {event ? (
          <blockquote className="space-y-2">
            <p className="text-2xl font-bold">&ldquo;{event.name}&rdquo;</p>
            <footer className="text-sm">Diễn ra vào {formatDateTime(event.start_date)}</footer>
          </blockquote>
        ) : (
          <blockquote className="space-y-2">
            <p className="text-2xl font-bold">Chào mừng đến với Orochi Events</p>
            <footer className="text-sm">Nền tảng quản lý sự kiện hàng đầu.</footer>
          </blockquote>
        )}
      </div>
    </div>
  );
};