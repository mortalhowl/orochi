// src/App.tsx (ví dụ)
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function App() {
  return (
    <div className="p-10 bg-background text-foreground min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Thử nghiệm Shadcn/UI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <Button className="mt-4">Gửi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;