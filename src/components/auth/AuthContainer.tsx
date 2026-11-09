import React, { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PhoneAuthScreen } from './PhoneAuthScreen';
import { OtpVerificationScreen } from './OtpVerificationScreen';
import { ProfileSetupScreen } from './ProfileSetupScreen';
import { ConfirmationResult, User } from 'firebase/auth';

type AuthStep = 'welcome' | 'phone' | 'otp' | 'profile_setup';

export const AuthContainer: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const handleOtpSent = (confResult: ConfirmationResult, phone: string) => {
    setConfirmationResult(confResult);
    setPhoneNumber(phone);
    setStep('otp');
  };

  const handleOtpVerified = (user: User, hasProfile: boolean) => {
    if (hasProfile) {
      // User already has profile -> Auth state will automatically enter dashboard
    } else {
      setStep('profile_setup');
    }
  };

  if (step === 'welcome') {
    return <WelcomeScreen onAgreeAndContinue={() => setStep('phone')} />;
  }

  if (step === 'phone') {
    return (
      <PhoneAuthScreen
        onBack={() => setStep('welcome')}
        onOtpSent={handleOtpSent}
      />
    );
  }

  if (step === 'otp' && confirmationResult) {
    return (
      <OtpVerificationScreen
        phoneNumber={phoneNumber}
        confirmationResult={confirmationResult}
        onBack={() => setStep('phone')}
        onSuccess={handleOtpVerified}
      />
    );
  }

  if (step === 'profile_setup') {
    return <ProfileSetupScreen onComplete={() => {}} />;
  }

  return null;
};

