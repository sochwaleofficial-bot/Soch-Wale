import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle, GraduationCap, Users } from 'lucide-react';

export const ContributorsSection: React.FC = () => {
  const { contributors } = useApp();

  return (
    <section className="py-16 bg-white border-b border-[#E5E1D9]" aria-label="Our Contributors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-2">
            <Users className="w-4 h-4" />
            <span>Editorial Board & Specialists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
            Our Contributors & Reviewers
          </h2>
          <p className="text-sm font-urdu text-stone-600 mt-2">
            مستند ماہرین نفسیات، خاندانی مشیر اور طبی ماہرین کی زیر نگرانی مواد کی تیاری و جانچ
          </p>
        </div>

        {/* Contributors 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contributors.map((c) => (
            <div
              key={c.id}
              className="bg-[#FAF8F5] border border-[#E5E1D9] hover:border-[#B89A5A] rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-300 border-2 border-white shadow shrink-0">
                    <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#161616] flex items-center gap-1.5">
                      <span>{c.name}</span>
                      <span title="Verified Specialist">
                        <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                      </span>
                    </h3>
                    <p className="font-urdu-inline text-sm font-bold text-[#967B43]">
                      {c.nameUr}
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                      {c.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {c.bio}
                </p>

                {/* Verified Qualifications */}
                <div className="space-y-1.5 mb-4 pt-3 border-t border-[#EFECE5]">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Verified Credentials</span>
                  </div>
                  {c.verifiedQualifications.map((q, i) => (
                    <div key={i} className="text-xs text-stone-700 font-medium">
                      • {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="pt-3 border-t border-[#EFECE5] flex flex-wrap gap-1.5">
                {c.areasOfExpertise.map((exp, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-white border border-[#E5E1D9] text-stone-600 px-2 py-0.5 rounded"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Curatorial Disclaimer */}
        <div className="mt-10 p-4 bg-[#FAF7F0] border border-[#E5E1D9] rounded-xl text-center text-xs text-stone-600 max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-stone-800">Editorial Standards:</span> All articles on Soch Wale undergo systematic internal editorial verification. Content is designed exclusively for educational literacy and does not constitute individual clinical advice.
        </div>
      </div>
    </section>
  );
};
