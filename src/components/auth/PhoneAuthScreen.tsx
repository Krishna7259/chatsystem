import React, { useState } from 'react';
import { KoodiLogo } from '../common/KoodiLogo';
import { ArrowLeft, Loader2, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

interface PhoneAuthScreenProps {
  onBack: () => void;
  onOtpSent: (confirmationResult: ConfirmationResult, phoneNumber: string) => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
];

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({ onBack, onOtpSent }) => {
  const { setupRecaptcha, sendOtp } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanNum = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanNum || cleanNum.length < 7) {
      setError('Please enter a valid phone number');
      return;
    }

    const fullPhoneNumber = `${selectedCountry.code}${cleanNum}`;
    setLoading(true);

    try {
      const verifier = setupRecaptcha('recaptcha-container');
      const confirmationResult = await sendOtp(fullPhoneNumber, verifier);
      onOtpSent(confirmationResult, fullPhoneNumber);
    } catch (err: any) {
      console.error('[Firebase Phone Auth Error]', err);
      if (err.code === 'auth/invalid-phone-number') {
        setError('The phone number format is invalid. Please check the country code and number.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment before trying again.');
      } else if (err.code === 'auth/billing-not-enabled' || err.message?.includes('BILLING')) {
        setError('Firebase SMS Quota / Billing notice. You can also use the instant test accounts or test numbers.');
      } else {
        setError(err.message || 'Failed to send OTP. Please check connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] dark:bg-[#111B21] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-[#202C33] rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
        
        {/* Navigation / Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Enter your phone number
          </h2>
        </div>

        <p className="text-xs text-[#667781] dark:text-[#8696A0] leading-relaxed mb-6">
          Koodi Maatadona will send an SMS message to verify your phone number with a 6-digit OTP. Carrier SMS charges may apply.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Selection */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Country
            </label>
            <select
              value={selectedCountry.country}
              onChange={(e) => {
                const found = COUNTRY_CODES.find(c => c.country === e.target.value);
                if (found) setSelectedCountry(found);
              }}
              className="w-full py-2.5 px-3 bg-gray-50 dark:bg-[#111B21] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#128C7E]"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.flag} {c.country} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Phone Number
            </label>
            <div className="flex gap-2">
              <span className="py-2.5 px-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center select-none">
                {selectedCountry.code}
              </span>
              <input
                type="tel"
                placeholder="e.g. 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoFocus
                className="flex-1 py-2.5 px-3 bg-gray-50 dark:bg-[#111B21] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#128C7E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !phoneNumber.trim()}
            className="w-full mt-6 py-3.5 px-4 bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all text-sm tracking-wide flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Code...</span>
              </>
            ) : (
              <span>NEXT</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

