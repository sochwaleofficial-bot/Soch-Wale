import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogoSW } from './LogoSW';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    login,
    signup,
    siteSettings,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredPendingMessage, setRegisteredPendingMessage] = useState<string | null>(null);

  if (!authModalOpen) return null;

  // Sync mode with trigger
  if (authModalOpen !== mode && authModalOpen !== null && !registeredPendingMessage) {
    setMode(authModalOpen);
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      setAuthModalOpen(null);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    if (!termsAgreed) {
      alert('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (result.success) {
      setRegisteredPendingMessage(result.message);
    } else {
      alert(result.message);
    }
  };

  const fillQuickSuperAdmin = () => {
    setEmail(siteSettings.superAdminEmail);
    setPassword('SuperAdmin2026!');
  };

  const fillQuickStudent = () => {
    setEmail('learner@example.com');
    setPassword('Learner2026!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#181818] border border-stone-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setAuthModalOpen(null);
            setRegisteredPendingMessage(null);
          }}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="p-6 text-center border-b border-stone-800 bg-[#141414]">
          <LogoSW size={48} className="mx-auto mb-2" />
          <h3 className="text-xl font-bold font-serif text-white">
            {mode === 'login' ? 'Sign In to Soch Wale' : mode === 'signup' ? 'Create Your Account' : 'Reset Password'}
          </h3>
          <p className="text-xs font-urdu text-[#B89A5A] mt-0.5">
            سوچ والے — بہتر سوچ، بہتر زندگی
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {registeredPendingMessage ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-white">
                Verification Required
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {registeredPendingMessage}
              </p>
              <div className="p-3 bg-[#111111] rounded-lg border border-stone-800 text-[11px] text-stone-400">
                Notification successfully dispatched to <strong>{siteSettings.superAdminEmail}</strong> for access review.
              </div>
              <button
                onClick={() => {
                  setRegisteredPendingMessage(null);
                  setAuthModalOpen(null);
                }}
                className="w-full py-2.5 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded transition-colors"
              >
                Done
              </button>
            </div>
          ) : mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#B89A5A] hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Quick Testing Helper */}
              <div className="pt-3 border-t border-stone-800">
                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold text-center mb-2">
                  Quick Access Profiles
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={fillQuickSuperAdmin}
                    className="p-2 bg-[#202020] hover:bg-[#282828] border border-stone-800 rounded text-[11px] text-[#B89A5A] text-left transition-colors"
                  >
                    <span className="font-semibold block">Super Admin</span>
                    <span className="text-[9px] text-stone-400 truncate block">sochwale.official...</span>
                  </button>

                  <button
                    type="button"
                    onClick={fillQuickStudent}
                    className="p-2 bg-[#202020] hover:bg-[#282828] border border-stone-800 rounded text-[11px] text-stone-300 text-left transition-colors"
                  >
                    <span className="font-semibold block">Sample Learner</span>
                    <span className="text-[9px] text-stone-400 truncate block">learner@example...</span>
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-stone-400 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#B89A5A] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : mode === 'signup' ? (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#111111] border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-stone-400">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    required
                    className="mt-0.5 rounded border-stone-700 text-[#B89A5A] focus:ring-0"
                  />
                  <span>
                    I agree to the Terms of Use and Privacy Policy of Soch Wale.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAgreed}
                className="w-full py-3 bg-[#B89A5A] hover:bg-[#967B43] disabled:opacity-50 text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow mt-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center text-xs text-stone-400 pt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#B89A5A] font-semibold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-stone-300">
                Enter your registered email address and we will send you instructions to reset your password.
              </p>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#111111] border border-stone-700 rounded-lg px-3 py-2.5 text-xs text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Password reset instructions sent to your email.');
                  setMode('login');
                }}
                className="w-full py-2.5 bg-[#B89A5A] text-black font-semibold text-xs rounded"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-stone-400 hover:text-white"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
