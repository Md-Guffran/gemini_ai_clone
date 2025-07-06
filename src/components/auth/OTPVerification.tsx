import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerify,
  onResend,
  onBack,
  isLoading,
  error
}) => {
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      await onVerify(otp);
    }
  };

  const handleResend = async () => {
    await onResend();
    setResendCooldown(60);
    setOtp(''); // Clear the OTP input when resending
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  // Check if the error is related to expired or invalid token
  const isTokenExpiredError = error && (
    error.includes('Token has expired') || 
    error.includes('is invalid') ||
    error.includes('otp_expired')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          
          <p className="text-gray-600 mb-4">
            We've sent a 6-digit verification code to
          </p>
          
          <p className="text-blue-600 font-medium">
            {email}
          </p>
        </div>

        {error && (
          <div className={`border rounded-xl p-4 mb-6 ${
            isTokenExpiredError 
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isTokenExpiredError ? 'text-amber-600' : 'text-red-600'
              }`} />
              <div className={`text-sm ${
                isTokenExpiredError ? 'text-amber-800' : 'text-red-800'
              }`}>
                {isTokenExpiredError ? (
                  <div>
                    <p className="font-medium mb-1">Verification code expired</p>
                    <p>Your verification code has expired or is invalid. Please click "Resend Code" below to get a new one.</p>
                  </div>
                ) : (
                  <p>{error}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?
          </p>
          
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`inline-flex items-center space-x-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isTokenExpiredError 
                ? 'text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </span>
          </button>
          
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-700 font-medium transition-colors"
            >
              ← Back to signup
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Check your email</p>
              <p>The verification code may take a few minutes to arrive. Check your spam folder if you don't see it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;