import React from 'react';
import { useApp } from '../context/AppContext';
import { LogoSW } from './LogoSW';
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, siteSettings } = useApp();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-stone-800" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LogoSW size={52} />
              <div>
                <span className="text-xl font-bold font-serif tracking-tight text-white">
                  SOCH WALE
                </span>
                <span className="block text-xs font-urdu text-[#B89A5A] mt-0.5">
                  سوچ والے — بہتر سوچ، بہتر زندگی
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              An evidence-informed, dignified Urdu educational publishing platform dedicated to emotional intelligence, positive parenting, adolescent literacy, and healthy interpersonal relationships.
            </p>

            {/* Social Channels */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
                Connect With Soch Wale
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/sochwale.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#181818] border border-stone-700 hover:border-[#B89A5A] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                  aria-label="Soch Wale on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594587364213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#181818] border border-stone-700 hover:border-[#B89A5A] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                  aria-label="Soch Wale on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@SochWale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#181818] border border-stone-700 hover:border-[#B89A5A] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                  aria-label="Soch Wale on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#181818] border border-stone-700 hover:border-[#B89A5A] flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  aria-label="WhatsApp Contact"
                  title="WhatsApp Support"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Official WhatsApp Purchasing Notice */}
            <div className="pt-2 text-xs text-stone-300 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Purchasing Helpline: <strong className="text-white">{siteSettings.whatsAppNumber}</strong></span>
            </div>
          </div>

          {/* Educational Domains */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A5A] mb-4">
              Core Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => navigate('/category/parenting')} className="hover:text-white transition-colors">
                  Parenting (والدین کی رہنمائی)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/emotional-intelligence')} className="hover:text-white transition-colors">
                  Emotional Intelligence (جذباتی ذہانت)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/sex-education')} className="hover:text-white transition-colors">
                  Sex Education (جنسی تعلیم)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/relationships')} className="hover:text-white transition-colors">
                  Relationships (باہمی تعلقات)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/marriage')} className="hover:text-white transition-colors">
                  Marriage (ازدواجی زندگی)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/adolescence')} className="hover:text-white transition-colors">
                  Adolescence (نو عمری)
                </button>
              </li>
            </ul>
          </div>

          {/* Formats & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A5A] mb-4">
              Learning Resources
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => navigate('/courses')} className="hover:text-white transition-colors">
                  Complete Courses (کورسز)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/videos')} className="hover:text-white transition-colors">
                  Video Lectures (لیکچرز)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/booklets')} className="hover:text-white transition-colors">
                  Booklets & PDF Guides (کتابچے)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/articles')} className="hover:text-white transition-colors">
                  Educational Articles (مضامین)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ask')} className="hover:text-white transition-colors">
                  Ask Soch Wale (گمنام سوال)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Editorial Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A5A] mb-4">
              Editorial & Legal
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => navigate('/editorial-standards')} className="hover:text-white transition-colors">
                  Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Soch Wale
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} className="hover:text-white transition-colors">
                  Refund & Purchasing Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SOCH WALE (سوچ والے). All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#B89A5A] font-semibold font-serif">Better Thinking. Better Life.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span className="text-[11px]">Domain: <strong className="text-stone-300">sochwale.com</strong></span>
            <span>·</span>
            <span className="text-[11px]">Support: <a href="mailto:sochwale.official@gmail.com" className="text-stone-300 hover:underline">sochwale.official@gmail.com</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
