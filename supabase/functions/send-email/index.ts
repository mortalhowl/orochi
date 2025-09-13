// supabase/functions/send-email/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
// Thay đổi 1: Import nodemailer từ npm
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  console.log('--- Invoking send-email function (v2 using nodemailer) ---');
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, templateId, variables } = await req.json();
    console.log(`Attempting to send email to: ${to}`);

    // Lấy các biến môi trường
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');

    if (!smtpUser || !smtpPassword) {
      throw new Error('Server configuration error: Missing SMTP credentials.');
    }
    
    // Logic lấy template email từ CSDL (giữ nguyên)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    const { data: templateData, error: templateError } = await supabaseClient
      .from('email_templates').select('html_content').eq('id', templateId).single();
      
    if (templateError) throw templateError;
    if (!templateData) throw new Error(`Template with id ${templateId} not found.`);
    
    let htmlBody = templateData.html_content || '';
    for (const key in variables) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      htmlBody = htmlBody.replace(regex, String(variables[key]));
    }
    
    // Thay đổi 2: Tạo "transporter" của nodemailer thay vì SmtpClient
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true cho port 465
        auth: {
          user: smtpUser,
          pass: smtpPassword, // Dùng 'pass' cho nodemailer
        },
    });

    console.log('Nodemailer transporter created. Sending email...');
    
    // Thay đổi 3: Dùng transporter.sendMail để gửi
    await transporter.sendMail({
      from: `Orochi Events <${smtpUser}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    });
    
    console.log('Email sent successfully via nodemailer.');

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error within send-email function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})