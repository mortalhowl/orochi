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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    if(!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    
    // SỬA LẠI LOGIC TẠI ĐÂY
    // Bước 1: Tìm user trong bảng auth.users bằng email
    console.log(`Checking for user in auth.users with email: ${email}`);
    const { data: authUser, error: authUserError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (authUserError || !authUser) {
      console.warn('User email not found in auth.users table.');
      throw new Error('Email không tồn tại trong hệ thống.');
    }
    console.log('User found in auth.users with ID:', authUser.id);
    
    // Bước 2: Dùng ID user tìm được để xác minh họ có phải là nhân viên không
    console.log(`Verifying if user ID ${authUser.id} exists in staff table.`);
    const { data: staff, error: staffError } = await supabaseAdmin
      .from('staff')
      .select('id')
      .eq('id', authUser.id)
      .single();
      
    if (staffError || !staff) {
      console.warn(`Verification failed: User ID ${authUser.id} is not a staff member.`);
      throw new Error('Tài khoản này không phải là tài khoản nhân viên.');
    }
    console.log('User is verified as a staff member.');

    // Logic tạo và gửi OTP vẫn giữ nguyên
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const otp_hash = await hashOtp(otp);
    console.log(`Generated OTP for ${email}.`);

    const { error: insertError } = await supabaseAdmin.from('password_resets').insert({ email, otp_hash, expires_at });
    if (insertError) {
        console.error('Error inserting OTP:', insertError);
        throw new Error('Không thể lưu mã OTP.');
    }
    console.log('OTP hash stored successfully.');

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
    console.error('An error occurred:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})