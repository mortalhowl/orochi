// src/components/common/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Chạy lại mỗi khi đường dẫn thay đổi

  return null; // Component này không render ra bất cứ thứ gì
};

export default ScrollToTop;