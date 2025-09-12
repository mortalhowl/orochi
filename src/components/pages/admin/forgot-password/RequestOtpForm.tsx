// src/components/pages/admin/forgot-password/RequestOtpForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetOtp } from '@/services/authService';

const requestOtpSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ.' }),
});
type RequestOtpFormValues = z.infer<typeof requestOtpSchema>;

interface RequestOtpFormProps {
  onSuccess: (email: string) => void;
}

export const RequestOtpForm = ({ onSuccess }: RequestOtpFormProps) => {
  const { toast } = useToast();
  const form = useForm<RequestOtpFormValues>({
    resolver: zodResolver(requestOtpSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: RequestOtpFormValues) => {
    try {
      await sendPasswordResetOtp(values.email);
      toast({
        title: 'Thành công',
        description: 'Mã OTP đã được gửi đến email của bạn.',
      });
      onSuccess(values.email);
    } catch (error) {
      toast({
        title: 'Gửi OTP thất bại',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn để nhận mã OTP khôi phục.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@orochi.vn" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Đang gửi...' : 'Gửi mã OTP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};