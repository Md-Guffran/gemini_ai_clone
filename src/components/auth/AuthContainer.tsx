import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OTPVerification from './OTPVerification';
import type { SignupData, LoginData } from '../../types/auth';

type AuthMode = 'login' | 'signup' | 'verify-otp';

const AuthContainer: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [pendingEmail, setPendingEmail] = useState('');
  
  const { signup, login, verifyOTP, resendOTP, isLoading, error, clearError } = useAuth();

  const handleSignup = async (data: SignupData) => {
    clearError();
    const result = await signup(data);
    
    if (result.success) {
      setPendingEmail(data.email);
      setMode('verify-otp');
    }
  };

  const handleLogin = async (data: LoginData) => {
    clearError();
    const result = await login(data);
    
    if (result.success) {
      // User will be redirected by the main App component
    }
  };

  const handleOTPVerification = async (otp: string) => {
    clearError();
    const result = await verifyOTP(pendingEmail, otp);
    
    if (result.success) {
      // User will be redirected by the main App component
    }
  };

  const handleResendOTP = async () => {
    clearError();
    await resendOTP(pendingEmail);
  };

  const switchToLogin = () => {
    clearError();
    setMode('login');
  };

  const switchToSignup = () => {
    clearError();
    setMode('signup');
  };

  const backToSignup = () => {
    clearError();
    setMode('signup');
  };

  if (mode === 'verify-otp') {
    return (
      <OTPVerification
        email={pendingEmail}
        onVerify={handleOTPVerification}
        onResend={handleResendOTP}
        onBack={backToSignup}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  if (mode === 'signup') {
    return (
      <SignupForm
        onSubmit={handleSignup}
        onSwitchToLogin={switchToLogin}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <LoginForm
      onSubmit={handleLogin}
      onSwitchToSignup={switchToSignup}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AuthContainer;