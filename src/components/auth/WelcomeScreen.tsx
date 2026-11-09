import React from 'react';
import { KoodiLogo } from '../common/KoodiLogo';
import { ShieldCheck, MessageSquare, PhoneCall, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface WelcomeScreenProps {
  onAgreeAndContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAgreeAndContinue }) => {
  const { loginWithTestAccount } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8F6] dark:bg-[#111B21] flex flex-col items-center justify-between p-6">
      {/* Top Header */}
      <div className="w-full max-w-md pt-8 flex flex-col items-center text-center">
        <KoodiLogo size={76} />
        <h1 className="mt-4 text-3xl font-extrabold text-[#075E54] dark:text-[#25D366]">
          Koodi Maatadona
        </h1>
        <p className="mt-1 text-sm font-medium text-[#667781] dark:text-[#8696A0]">
          Let's Talk Together • WhatsApp-Inspired Messaging
        </p>
      </div>

      {/* Middle Card: Features & Intro */}
      <div className="w-full max-w-md bg-white dark:bg-[#202C33] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4 my-6">
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#128C7E]" />
          Real-time Private & Cloud Messaging
        </h2>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-[#F7F8F6] dark:bg-[#111B21] rounded-xl flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-[#128C7E]" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fast Chat & Media</span>
          </div>
          <div className="p-3 bg-[#F7F8F6] dark:bg-[#111B21] rounded-xl flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-[#128C7E]" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">WebRTC Calls</span>
          </div>
          <div className="p-3 bg-[#F7F8F6] dark:bg-[#111B21] rounded-xl flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#25D366]" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Gemini AI Inside</span>
          </div>
          <div className="p-3 bg-[#F7F8F6] dark:bg-[#111B21] rounded-xl flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#128C7E]" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Firebase Backend</span>
          </div>
        </div>

        <p className="text-xs text-[#667781] dark:text-[#8696A0] leading-relaxed pt-2">
          Read our <span className="text-[#128C7E] font-medium cursor-pointer">Privacy Policy</span>. Tap "Agree & continue" to accept the Terms of Service.
        </p>

        {/* Primary Action Button */}
        <button
          onClick={onAgreeAndContinue}
          className="w-full py-3.5 px-4 bg-[#128C7E] hover:bg-[#075E54] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all text-sm tracking-wide"
        >
          AGREE AND CONTINUE
        </button>

        {/* Instant Multi-Client Test Accounts (Requirement 13) */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
            Or test instantly with two multi-client accounts:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => loginWithTestAccount(1)}
              className="py-2.5 px-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-[#075E54] dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200 dark:border-emerald-800"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Alice (+91 98765 43210)
            </button>
            <button
              onClick={() => loginWithTestAccount(2)}
              className="py-2.5 px-3 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 text-[#128C7E] dark:text-teal-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-teal-200 dark:border-teal-800"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Bob (+91 98765 43211)
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-2">
        Koodi Maatadona © 2026 • Powered by Firebase & Google Gemini
      </footer>
    </div>
  );
};

