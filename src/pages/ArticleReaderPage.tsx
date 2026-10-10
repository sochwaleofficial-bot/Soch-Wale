import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Bookmark,
  Share2,
  Printer,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  CheckCircle,
  FileText,
  Calendar,
  User,
} from 'lucide-react';

export const ArticleReaderPage: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    articles,
    navigate,
    currentUser,
    toggleBookmarkArticle,
    rateArticleHelpful,
    notify,
  } = useApp();

  const article = articles.find((a) => a.slug === slug || a.id === slug) || articles[0];
  const isBookmarked = currentUser?.bookmarkedArticleIds.includes(article.id);

  // Text size state: normal, large, xlarge
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.titleUr,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      notify('success', 'Link Copied', 'Article link copied to clipboard.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#161616] pb-24">
      {/* Editorial Header */}
      <div className="bg-[#0A0A0A] text-white py-12 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#B89A5A] bg-[#181818] px-2.5 py-1 rounded">
              {article.category.replace('-', ' ')}
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMin} min read</span>
            </span>
          </div>

          {/* Urdu Title in Noto Nastaliq Urdu */}
          <h1 className="font-urdu-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-right leading-[1.9]">
            {article.titleUr}
          </h1>

          <h2 className="text-sm sm:text-base text-stone-300 font-medium mb-6">
            {article.titleEn}
          </h2>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-700">
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-white font-medium block">{article.author.name}</span>
                  <span className="text-[11px] text-stone-400">{article.author.role}</span>
                </div>
              </div>

              {article.reviewer && (
                <div className="pl-4 border-l border-stone-800 hidden sm:block">
                  <span className="text-[11px] text-stone-400 block">Reviewed By</span>
                  <span className="text-stone-300 font-medium flex items-center gap-1">
                    <span>{article.reviewer.name}</span>
                    {article.reviewer.verified && (
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Published: {article.publishedDate}</span>
              {article.lastReviewedDate && (
                <span>(Reviewed: {article.lastReviewedDate})</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar: Text Size, Bookmark, Share, Print */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#E5E1D9] py-3 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Text Size Controls */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span className="text-[11px] text-stone-400 mr-1">Text size:</span>
            <button
              onClick={() => setFontSizeClass('text-base')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                fontSizeClass === 'text-base' ? 'bg-[#0A0A0A] text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeClass('text-lg')}
              className={`px-2 py-1 rounded text-sm font-semibold ${
                fontSizeClass === 'text-lg' ? 'bg-[#0A0A0A] text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSizeClass('text-xl')}
              className={`px-2 py-1 rounded text-base font-semibold ${
                fontSizeClass === 'text-xl' ? 'bg-[#0A0A0A] text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              A++
            </button>
          </div>

          {/* Social & Save Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkArticle(article.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-[#B89A5A] text-black font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 transition-colors"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Editorial Canvas */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Featured Image */}
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm mb-8 bg-stone-900">
          <img src={article.featuredImage} alt={article.titleEn} className="w-full h-full object-cover" />
        </div>

        {/* Short Urdu Excerpt Callout */}
        <div className="p-5 bg-[#FAF7F0] border border-[#E5E1D9] rounded-xl mb-8">
          <p className="font-urdu text-sm font-semibold text-stone-800 leading-loose text-right">
            خلاصہ: {article.excerptUr}
          </p>
        </div>

        {/* Article Body in Jameel Noori Nastaleeq / Noto Nastaliq Urdu */}
        <div className={`font-urdu ${fontSizeClass} text-[#161616] leading-[2.2] text-right whitespace-pre-line space-y-6`}>
          {article.contentUr}
        </div>

        {/* Helpfulness Feedback Box */}
        <div className="mt-14 p-6 bg-white border border-[#E5E1D9] rounded-2xl text-center space-y-3 shadow-sm">
          <h4 className="text-sm font-semibold text-stone-800">
            Was this educational article helpful?
          </h4>
          <p className="text-xs text-stone-500">
            Your feedback guides our editorial and medical review panel in publishing better Urdu knowledge.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => rateArticleHelpful(article.id, true)}
              className="px-4 py-2 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Yes ({article.helpfulYesCount})</span>
            </button>
            <button
              onClick={() => rateArticleHelpful(article.id, false)}
              className="px-4 py-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 border border-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>No ({article.helpfulNoCount})</span>
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E5E1D9]">
            <h3 className="text-lg font-serif font-bold text-[#161616] mb-6">
              Related Educational Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/articles/${rel.slug}`)}
                  className="bg-white border border-[#E5E1D9] hover:border-[#B89A5A] p-4 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-semibold text-[#B89A5A] block mb-1">
                    {rel.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-urdu text-sm font-bold text-stone-900 line-clamp-2 text-right mb-2">
                    {rel.titleUr}
                  </h4>
                  <span className="text-xs text-stone-500 block truncate">
                    {rel.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
