import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShieldCheck, Mail, Phone } from 'lucide-react';

interface LegalPageProps {
  type: 'editorial-standards' | 'about' | 'privacy-policy' | 'terms' | 'refund-policy' | 'contact';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigate, siteSettings } = useApp();

  let title = 'About Soch Wale';
  let titleUr = 'سوچ والے کا تعارف';

  if (type === 'editorial-standards') {
    title = 'Editorial Standards & Medical Review';
    titleUr = 'ادارتی معیارات اور سائنسی جانچ';
  } else if (type === 'privacy-policy') {
    title = 'Privacy Policy & Confidentiality';
    titleUr = 'پرائیویسی پالیسی اور رازداری';
  } else if (type === 'terms') {
    title = 'Terms of Use';
    titleUr = 'استعمال کے قواعد و ضوابط';
  } else if (type === 'refund-policy') {
    title = 'Refund & Purchasing Policy';
    titleUr = 'ادائیگی اور رقم واپسی کی پالیسی';
  } else if (type === 'contact') {
    title = 'Contact & Purchasing Assistance';
    titleUr = 'رابطہ اور رہنمائی';
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      <div className="bg-[#0A0A0A] text-white py-14 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            {title}
          </h1>
          <p className="font-urdu text-lg text-[#B89A5A] text-right sm:text-left">
            {titleUr}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#E5E1D9] p-8 sm:p-12 shadow-sm space-y-8 text-stone-800 text-sm leading-relaxed">
          {type === 'editorial-standards' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                Our Commitment to Truth, Dignity & Evidence
              </h2>
              <p>
                At <strong>SOCH WALE (سوچ والے)</strong>, we hold educational publishing to the highest ethical and scientific rigor.
                Our mission is to replace myths, taboo, and misinformation with clear, dignified Urdu educational knowledge.
              </p>
              <h3 className="text-base font-bold text-[#161616]">1. Qualified Review Workflow</h3>
              <p>
                Articles relating to biology, adolescent changes, and psychological counseling undergo rigorous review by verified medical and clinical specialists. We clearly distinguish established educational consensus from individual opinions.
              </p>
              <h3 className="text-base font-bold text-[#161616]">2. No Unverified Health Guarantees</h3>
              <p>
                We never publish speculative medical cures, sensationalist marketing claims, or unsubstantiated guarantees. Our educational materials serve public literacy and never replace in-person consultation with licensed clinicians.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                SOCH WALE — Better Thinking. Better Life.
              </h2>
              <p>
                Soch Wale was founded on a fundamental conviction: <em>When people learn how to think critically and communicate empathetically in their native language, families thrive and communities flourish.</em>
              </p>
              <p className="font-urdu text-base leading-loose text-right p-4 bg-[#FAF7F0] rounded-xl border border-[#E5E1D9]">
                سوچ والے کا مقصد اردو بولنے والے خاندانوں، نوجوانوں اور والدین تک ایسی مستند، سائنسی اور باوقار تعلیمی معلومات پہنچانا ہے جو ان کی روزمرہ زندگی، باہمی رشتوں اور جذباتی فیصلوں کو نکھار سکیں۔
              </p>
              <h3 className="text-base font-bold text-[#161616]">Our Core Pillars</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Parenting with Dignity:</strong> Guiding parents away from shouting toward empathetic discipline.</li>
                <li><strong>Emotional Intelligence:</strong> Teaching self-awareness, anxiety relief, and constructive conflict resolution.</li>
                <li><strong>Adolescent & Health Literacy:</strong> Breaking silence on puberty and physical development with scientific respect.</li>
              </ul>
            </div>
          )}

          {type === 'privacy-policy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                Your Privacy is Sacred
              </h2>
              <p>
                We recognize that educational topics such as family difficulties, puberty, and emotional distress are deeply personal. We collect only the minimum data required to facilitate your course enrollment and progress.
              </p>
              <h3 className="text-base font-bold text-[#161616]">Anonymous Questions Protection</h3>
              <p>
                Questions submitted via "Ask Soch Wale" are completely anonymized. Any private names, locations, or identifying phone numbers are permanently redacted before publication.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                Terms of Use
              </h2>
              <p>
                By using Soch Wale, you agree to respect our educational community guidelines. Content, video lectures, and PDF booklets are protected by copyright and licensed exclusively for personal educational study.
              </p>
            </div>
          )}

          {type === 'refund-policy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                Purchasing & Refund Guarantee
              </h2>
              <p>
                We strive for absolute educational excellence. If you experience technical difficulties accessing any purchased course, booklet, or video, our team provides full assistance via WhatsApp at <strong>{siteSettings.whatsAppNumber}</strong>.
              </p>
              <p>
                Refund requests submitted within 7 days of purchase where content has not been downloaded in full are reviewed promptly by our customer care department.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#161616]">
                Get in Touch with Soch Wale
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-[#FAF8F5] border border-[#E5E1D9] rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#967B43] font-bold">
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp Purchasing & Care</span>
                  </div>
                  <p className="text-xs text-stone-600">Immediate assistance for admissions and manual payments.</p>
                  <a
                    href={siteSettings.whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-mono font-bold text-sm text-[#0A0A0A] hover:underline"
                  >
                    {siteSettings.whatsAppNumber}
                  </a>
                </div>

                <div className="p-5 bg-[#FAF8F5] border border-[#E5E1D9] rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#967B43] font-bold">
                    <Mail className="w-5 h-5" />
                    <span>Super Administrator Email</span>
                  </div>
                  <p className="text-xs text-stone-600">Editorial inquiries and partnership proposals.</p>
                  <a
                    href={`mailto:${siteSettings.superAdminEmail}`}
                    className="inline-block mt-2 font-mono font-semibold text-xs text-[#0A0A0A] hover:underline"
                  >
                    {siteSettings.superAdminEmail}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
