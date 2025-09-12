// src/pages/admin/ForgotPasswordPage.tsx
import { useState } from "react";
import { RequestOtpForm } from "@/components/pages/admin/forgot-password/RequestOtpForm";
import { VerifyAndResetForm } from "@/components/pages/admin/forgot-password/VerifyAndResetForm";

type Step = 'request-otp' | 'verify-reset';

export const ForgotPasswordPage = () => {
    const [step, setStep] = useState<Step>('request-otp');
    const [email, setEmail] = useState('');

    const handleOtpRequested = (requestedEmail: string) => {
        setEmail(requestedEmail);
        setStep('verify-reset');
    };
    
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            {step === 'request-otp' && <RequestOtpForm onSuccess={handleOtpRequested} />}
            {step === 'verify-reset' && <VerifyAndResetForm email={email} />}
        </div>
    );
}