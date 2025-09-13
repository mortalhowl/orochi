// supabase/functions/send-password-otp/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

async function hashOtp(otp: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  console.log('--- Invoking send-password-otp function ---');
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const { email } = await req.json();
    console.log('Received request for email:', email);
    if (!email) {
      throw new Error('Email is required.');
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Dùng Service Role Key
    );
    if(!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    
    // 1. Kiểm tra user tồn tại
    console.log(`Checking for staff with email: ${email}`);
    const { data: user, error: userError } = await supabaseAdmin.from('staff').select('id').eq('email', email).single();
    
    if (userError) {
      // Nếu lỗi không phải là "không tìm thấy" thì mới là lỗi nghiêm trọng
      if (userError.code !== 'PGRST116') {
        console.error('Database error checking user:', userError);
        throw new Error('Lỗi cơ sở dữ liệu khi kiểm tra người dùng.');
      }
    }
    if (!user) {
        console.warn('User not found in staff table.');
        throw new Error('Email không tồn tại trong hệ thống nhân viên.');
    }
    console.log('User found:', user.id);

    // 2. Tạo OTP và thời gian hết hạn
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const otp_hash = await hashOtp(otp);
    console.log(`Generated OTP for ${email}. OTP will expire at ${expires_at}`);

    // 3. Lưu OTP đã băm vào CSDL
    const { error: insertError } = await supabaseAdmin.from('password_resets').insert({ email, otp_hash, expires_at });
    if (insertError) {
        console.error('Error inserting OTP:', insertError);
        throw new Error('Không thể lưu mã OTP.');
    }
    console.log('OTP hash stored successfully.');

    // 4. Gọi function `send-email` để gửi OTP
    console.log('Invoking send-email function...');
    const { error: invokeError } = await supabaseAdmin.functions.invoke('send-email', {
      body: {
        to: email,
        subject: 'Mã OTP khôi phục mật khẩu Orochi',
        templateId: 'a208b59d-34af-4424-8672-d7cf588f7b3b', // <<<--- NHỚ THAY UUID TEMPLATE
        variables: { otp_code: otp }
      }
    });
    if (invokeError) {
        console.error('Error invoking send-email function:', invokeError);
        throw new Error('Không thể gửi email OTP.');
    }
    console.log('send-email function invoked successfully.');

    return new Response(JSON.stringify({ success: true, message: 'OTP đã được gửi.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // Trả về lỗi cụ thể hơn
    console.error('An error occurred:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, // Sử dụng 400 cho các lỗi logic
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})