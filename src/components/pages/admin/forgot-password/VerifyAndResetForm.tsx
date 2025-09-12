// src/components/pages/admin/forgot-password/VerifyAndResetForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { resetPasswordWithOtp } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

const resetSchema = z.object({
  otp: z.string().min(6, { message: 'OTP phải có 6 ký tự.' }),
  password: z.string().min(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp.",
  path: ["confirmPassword"],
});
type ResetFormValues = z.infer<typeof resetSchema>;

interface VerifyAndResetFormProps {
  email: string;
}

export const VerifyAndResetForm = ({ email }: VerifyAndResetFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetFormValues) => {
    try {
      await resetPasswordWithOtp(email, values.otp, values.password);
      toast({
        title: 'Thành công',
        description: 'Mật khẩu của bạn đã được đặt lại. Vui lòng đăng nhập.',
      });
      navigate(ROUTES.ADMIN.LOGIN);
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đặt lại mật khẩu</CardTitle>
        <CardDescription>Mã OTP đã được gửi đến {email}. Vui lòng nhập OTP và mật khẩu mới.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2 text-center">
            <Label htmlFor="otp">Mã OTP</Label>
            <InputOTP maxLength={6} {...form.register('otp')} onChange={(value) => form.setValue('otp', value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} /> <InputOTPSlot index={1} /> <InputOTPSlot index={2} />
                <InputOTPSlot index={3} /> <InputOTPSlot index={4} /> <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {form.formState.errors.otp && <p className="text-xs text-red-500">{form.formState.errors.otp.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu mới</Label>
            <Input id="password" type="password" {...form.register('password')} />
            {form.formState.errors.password && <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
            {form.formState.errors.confirmPassword && <p className="text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};