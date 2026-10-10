import React from 'react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, Clock, ArrowRight, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { navigate, currentUser, toggleBookmarkArticle } = useApp();
  const isBookmarked = currentUser?.bookmarkedArticleIds.includes(article.id);

  return (
    <article className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <img
          src={article.featuredImage}
          alt={article.titleEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#0A0A0A]/90 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
            {article.category.replace('-', ' ')}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmarkArticle(article.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-colors ${
            isBookmarked
              ? 'bg-[#B89A5A] text-[#0A0A0A]'
              : 'bg-[#0A0A0A]/70 text-white hover:bg-[#0A0A0A]'
          }`}
          title={isBookmarked ? 'Bookmarked' : 'Bookmark article'}
          aria-label="Bookmark"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Unboxed Metadata (Category / Read Time / Date) */}
        <div className="text-[11px] text-stone-500 flex items-center gap-2 mb-2">
          <span>{article.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400" />
            <span className="tabular-nums">{article.readingTimeMin} min read</span>
          </span>
        </div>

        {/* Urdu Headline */}
        <h3
          onClick={() => navigate(`/articles/${article.slug}`)}
          className="font-urdu-heading text-lg font-bold text-[#161616] group-hover:text-[#967B43] transition-colors cursor-pointer text-right mb-2 leading-relaxed"
        >
          {article.titleUr}
        </h3>

        {/* Short Urdu Excerpt */}
        <p className="font-urdu text-xs text-stone-600 leading-loose text-right line-clamp-3 mb-4">
          {article.excerptUr}
        </p>

        {/* Author Byline & Read CTA */}
        <div className="mt-auto pt-3 border-t border-[#E5E1D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 overflow-hidden shrink-0">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-stone-700 font-medium truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>

          <button
            onClick={() => navigate(`/articles/${article.slug}`)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] group-hover:text-[#967B43] hover:underline cursor-pointer"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
