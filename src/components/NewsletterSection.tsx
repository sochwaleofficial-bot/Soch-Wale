import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { notify } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      notify('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      notify('success', 'Subscribed', 'Thank you for subscribing to The Soch Wale Newsletter.');
    }, 600);
  };

  return (
    <section className="py-16 bg-[#181818] text-white border-b border-[#252525]" aria-label="Newsletter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-2">
          <Mail className="w-4 h-4" />
          <span>Weekly Digest</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          The Soch Wale Newsletter
        </h2>

        <p className="text-base font-urdu text-[#B89A5A] mt-2">
          سوچ بدلیں، زندگی نکھاریں — ہفتہ وار اردو تعلیمی مضامین اپنے ان باکس میں حاصل کریں
        </p>

        <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto leading-relaxed">
          Get thoughtful Urdu educational content delivered directly to your inbox. No spam, ever.
        </p>

        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-4 bg-[#222222] border border-[#B89A5A]/40 rounded-xl flex items-center justify-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-xs font-medium text-white">
                You are successfully subscribed to the Soch Wale newsletter!
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#0A0A0A] border border-stone-700 rounded-lg px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B89A5A]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        <p className="text-[11px] text-stone-400 mt-4">
          By subscribing you agree with our Privacy Policy. You can unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};
