import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Send, Shield, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { CategorySlug } from '../types';

export const AskSochWaleSection: React.FC = () => {
  const {
    anonymousQuestions,
    submitAnonymousQuestion,
    categories,
    navigate,
    setAskModalOpen,
  } = useApp();

  const [category, setCategory] = useState<CategorySlug>('parenting');
  const [questionText, setQuestionText] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [emailOptional, setEmailOptional] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const approvedQuestions = anonymousQuestions.filter((q) => q.status === 'approved').slice(0, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    if (!consent) return;

    setIsSubmitting(true);
    await submitAnonymousQuestion({
      category,
      questionText,
      ageRange: ageRange || undefined,
      emailOptional: emailOptional || undefined,
    });
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setQuestionText('');
    setAgeRange('');
    setEmailOptional('');
    setConsent(false);
  };

  return (
    <section className="py-20 bg-[#141414] text-white border-b border-[#252525]" aria-label="Ask Soch Wale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Featured Answered Questions */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-2">
                <Shield className="w-4 h-4" />
                <span>100% Anonymous & Dignified</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Ask Soch Wale
              </h2>
              <p className="text-xl font-urdu text-[#B89A5A] mt-2">
                کیا آپ کے ذہن میں کوئی ایسا سوال ہے جو پوچھتے ہوئے جھجھک ہوتی ہے؟
              </p>
              <p className="text-sm text-stone-300 mt-3 leading-relaxed">
                Ask anonymously and receive an educational, evidence-informed response from the Soch Wale editorial panel and verified medical/family counseling specialists.
              </p>
            </div>

            {/* Answered Questions Showcase */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Recently Answered Questions
              </h3>

              {approvedQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="text-[#B89A5A] uppercase font-semibold">
                      {q.category.replace('-', ' ')}
                    </span>
                    <span>{q.submittedDate}</span>
                  </div>

                  {/* Urdu Question text */}
                  <p className="font-urdu text-sm font-semibold text-white leading-loose text-right">
                    "{q.questionText}"
                  </p>

                  {/* Editorial Answer */}
                  {q.answerUr && (
                    <div className="pt-3 border-t border-stone-800 bg-[#161616] -mx-5 -mb-5 p-4 rounded-b-xl">
                      <div className="text-[11px] text-stone-400 mb-1 flex items-center justify-between">
                        <span className="text-[#B89A5A] font-semibold">جواب از: {q.answeredBy}</span>
                        <span className="text-stone-500 text-[10px]">مستند تعلیمی رائے</span>
                      </div>
                      <p className="font-urdu text-xs text-stone-300 leading-loose text-right">
                        {q.answerUr}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => navigate('/ask')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B89A5A] hover:underline font-semibold"
                >
                  <span>View All Answered Questions Archive</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Submission Form */}
          <div className="lg:col-span-6 bg-[#1A1A1A] border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Submit Your Question
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  No public name or personal identification will ever be displayed.
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#B89A5A]/10 text-[#B89A5A] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            {submittedSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-white">
                  آپ کا سوال وصول ہو گیا ہے
                </h4>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your question has entered our confidential moderation panel. Our qualified specialists review questions thoroughly before publishing dignified educational answers.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-white rounded transition-colors"
                >
                  Ask Another Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Question Category <span className="text-[#B89A5A]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full bg-[#121212] border border-stone-700 rounded-lg px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#B89A5A]"
                    required
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.nameEn} — {c.nameUr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Urdu or English Question Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Your Question <span className="text-[#B89A5A]">*</span>
                  </label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    rows={4}
                    placeholder="اپنا تعلیمی سوال یہاں تفصیل سے لکھیے۔ (اردو یا انگریزی دونوں میں لکھ سکتے ہیں)"
                    className="w-full bg-[#121212] border border-stone-700 rounded-lg p-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#B89A5A] font-urdu leading-loose"
                    required
                  />
                </div>

                {/* Optional Demographic & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-400 mb-1">
                      Age Range (Optional)
                    </label>
                    <input
                      type="text"
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      placeholder="e.g. 18-24 or Parent"
                      className="w-full bg-[#121212] border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-400 mb-1">
                      Private Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={emailOptional}
                      onChange={(e) => setEmailOptional(e.target.value)}
                      placeholder="If you want private reply"
                      className="w-full bg-[#121212] border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#B89A5A]"
                    />
                  </div>
                </div>

                {/* Privacy & Educational Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-stone-400 text-[11px] leading-relaxed">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-stone-700 text-[#B89A5A] focus:ring-0"
                      required
                    />
                    <span>
                      I understand this educational service provides general knowledge and does not replace individualized clinical, psychological, or medical treatment. Identifying details will be redacted before publication.
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || !consent || !questionText.trim()}
                  className="w-full py-3.5 bg-[#B89A5A] hover:bg-[#967B43] disabled:opacity-50 text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Anonymously'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
