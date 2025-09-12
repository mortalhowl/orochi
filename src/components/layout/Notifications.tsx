// src/components/layout/Notifications.tsx
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Dữ liệu mẫu, sau này sẽ lấy từ API
const notifications = [
    { title: 'Đơn hàng mới', description: 'Bạn có một đơn hàng mới #1234.' },
    { title: 'Vé đã được quét', description: 'Vé VIPTICKET001 đã check-in thành công.' },
    { title: 'Sự kiện sắp bắt đầu', description: 'Đại Nhạc Hội Mùa Hè sẽ bắt đầu trong 1 giờ nữa.' },
];

export const Notifications = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {/* Badge thông báo */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông báo</CardTitle>
                        <CardDescription>Bạn có {notifications.length} thông báo mới.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {notifications.map((notification, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    );
}