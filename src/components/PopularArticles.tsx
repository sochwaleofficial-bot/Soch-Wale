import React from 'react';
import { useApp } from '../context/AppContext';
import { ArticleCard } from './ArticleCard';
import { ArrowRight, Newspaper } from 'lucide-react';

export const PopularArticles: React.FC = () => {
  const { articles, navigate } = useApp();
  const popular = articles.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-[#E5E1D9]" aria-label="Popular Articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <Newspaper className="w-4 h-4" />
              <span>Evidence-Informed Publishing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
              Popular Educational Articles
            </h2>
            <p className="text-sm font-urdu text-stone-600 mt-1">
              سوچ والے کے مقبول تحریری مضامین — خاندانی، نفسیاتی اور سماجی آگہی
            </p>
          </div>

          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] hover:text-[#967B43] group cursor-pointer"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
