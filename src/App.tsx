// src/App.tsx
import { useEffect } from 'react';
import AppRoutes from '@/router/AppRoutes';
import { useAuthStore } from '@/stores/authStore';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const checkUserSession = useAuthStore((state) => state.checkUserSession);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;