// src/components/auth/AdminLoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { loginSchema } from '@/lib/validation';
import { loginAdmin } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/routes';

type LoginFormValues = z.infer<typeof loginSchema>;

export const AdminLoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const user = await loginAdmin(values);
      setUser(user);
      toast({ title: 'Đăng nhập thành công!' });
      navigate(ROUTES.ADMIN.DASHBOARD);
    } catch (error) {
      toast({
        title: 'Đăng nhập thất bại',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="lg:p-8 flex items-center h-full">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* <div className="flex flex-col space-y-2 text-center">
          <img src="/logo.png" alt="Orochi Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập Admin</h1>
          <p className="text-sm text-muted-foreground">Nhập email và mật khẩu của bạn</p>
        </div> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@orochi.vn" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" {...form.register('password')} />
            {form.formState.errors.password && <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>}
            <div className="flex">
              <Link to={ROUTES.ADMIN.FORGOT_PASSWORD} className="text-sm text-muted-foreground hover:underline">
                    Quên mật khẩu?
                </Link>
            </div>

          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
      </div>
    </div>
  );
};