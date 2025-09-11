// File: supabase/functions/send-email/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Import thư viện SMTP cho Deno
import { SmtpClient } from 'https://deno.land/x/denomailer/mod.ts'

// Lấy thông tin đăng nhập SMTP từ Supabase Secrets
const SMTP_USER = Deno.env.get('SMTP_USER')
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD')

serve(async (req) => {
  // --- 1. Xử lý CORS và lấy payload (giữ nguyên) ---
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, templateId, variables } = await req.json()

    // --- 2. Cấu hình SMTP client ---
    const client = new SmtpClient()
    await client.connect({
        hostname: 'smtp.gmail.com',
        port: 465,
        username: SMTP_USER,
        password: SMTP_PASSWORD,
    })

    // --- 3. Lấy template email từ database (giữ nguyên) ---
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )
    const { data: templateData, error: templateError } = await supabaseClient
      .from('email_templates')
      .select('html_content')
      .eq('id', templateId)
      .single()
      
    if (templateError || !templateData) {
      throw new Error(`Template with id ${templateId} not found.`)
    }
    
    // --- 4. Điền các biến vào template (giữ nguyên) ---
    let htmlBody = templateData.html_content || ''
    for (const key in variables) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
      htmlBody = htmlBody.replace(regex, String(variables[key]))
    }
    
    // --- 5. Gửi email bằng SMTP ---
    await client.send({
        from: `Orochi Events <${SMTP_USER}>`,
        to: to,
        subject: subject,
        html: htmlBody,
    })

    await client.close()

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// Cấu hình CORS Headers (giữ nguyên)
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}