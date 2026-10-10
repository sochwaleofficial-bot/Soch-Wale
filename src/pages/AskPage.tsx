import React from 'react';
import { useApp } from '../context/AppContext';
import { AskSochWaleSection } from '../components/AskSochWaleSection';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export const AskPage: React.FC = () => {
  const { anonymousQuestions, navigate } = useApp();
  const approved = anonymousQuestions.filter((q) => q.status === 'approved');

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      {/* Top Banner */}
      <div className="bg-[#0A0A0A] text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-2xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#B89A5A] bg-[#181818] px-2.5 py-1 rounded">
              Confidential Community Guidance
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-2">
              Ask Soch Wale — گمنام سوال پوچھیں
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed">
              Have questions about family relationships, puberty, or emotional health? Submit your question anonymously. Our team of clinical psychologists and educators regularly reviews and publishes evidence-based Urdu answers.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Submission Section */}
      <AskSochWaleSection />

      {/* All Answered Archive */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <h2 className="text-2xl font-serif font-bold text-[#161616] mb-8 text-center">
          Public Educational Archive
        </h2>

        <div className="space-y-6">
          {approved.map((q) => (
            <div key={q.id} className="bg-white border border-[#E5E1D9] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="text-[#967B43] font-bold uppercase tracking-wider">{q.category.replace('-', ' ')}</span>
                <span>Answered: {q.answeredDate || q.submittedDate}</span>
              </div>

              <h3 className="font-urdu text-lg font-bold text-stone-900 text-right leading-loose">
                "{q.questionText}"
              </h3>

              {q.answerUr && (
                <div className="pt-4 border-t border-[#F0ECE1] bg-[#FAF8F5] -mx-6 -mb-6 p-6 rounded-b-2xl">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-800">جواب از: {q.answeredBy}</span>
                    <span className="text-emerald-700 font-medium">مستند جائزہ شدہ</span>
                  </div>
                  <p className="font-urdu text-sm text-stone-800 leading-loose text-right">
                    {q.answerUr}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
