import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  HeartHandshake,
  Brain,
  Users,
  Sparkles,
  Compass,
  Activity,
  BookOpen,
  FolderHeart,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';

export const ExploreCategories: React.FC = () => {
  const { categories, navigate } = useApp();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'sex-education':
        return <ShieldCheck className="w-5 h-5 text-[#B89A5A]" />;
      case 'parenting':
        return <HeartHandshake className="w-5 h-5 text-[#B89A5A]" />;
      case 'emotional-intelligence':
        return <Brain className="w-5 h-5 text-[#B89A5A]" />;
      case 'relationships':
        return <Users className="w-5 h-5 text-[#B89A5A]" />;
      case 'marriage':
        return <Sparkles className="w-5 h-5 text-[#B89A5A]" />;
      case 'adolescence':
        return <Compass className="w-5 h-5 text-[#B89A5A]" />;
      case 'health-wellbeing':
        return <Activity className="w-5 h-5 text-[#B89A5A]" />;
      case 'personal-development':
        return <BookOpen className="w-5 h-5 text-[#B89A5A]" />;
      default:
        return <FolderHeart className="w-5 h-5 text-[#B89A5A]" />;
    }
  };

  return (
    <section className="py-16 bg-[#F7F4EE] border-b border-[#E5E1D9]" aria-label="Explore Categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-2">
            <LayoutGrid className="w-4 h-4" />
            <span>Knowledge Domains</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
            Explore Categories
          </h2>
          <p className="text-sm font-urdu text-stone-600 mt-2">
            مستند اور بامقصد تعلیمی موضوعات — اپنی دلچسپی اور ضرورت کے مطابق منتخب کیجیے
          </p>
        </div>

        {/* 9 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E5E1D9] flex items-center justify-center group-hover:bg-[#B89A5A]/10 transition-colors">
                    {getIcon(cat.slug)}
                  </div>

                  {/* Urdu Name */}
                  <span className="font-urdu-inline text-base font-bold text-stone-800 group-hover:text-[#967B43] transition-colors">
                    {cat.nameUr}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#161616] mb-2">
                  {cat.nameEn}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              {/* Unboxed Counts + Explore Link */}
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] text-stone-500">
                <span className="tabular-nums">
                  {cat.contentCount.articles} Articles · {cat.contentCount.courses} Courses
                </span>

                <span className="inline-flex items-center gap-1 font-semibold text-[#0A0A0A] group-hover:text-[#967B43]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
