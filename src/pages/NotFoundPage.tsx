// src/pages/NotFoundPage.tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Trang không tồn tại</h2>
      <p className="mt-2 text-muted-foreground">
        Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Về trang chủ</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;