import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, BookOpen, FileText, Video, BookMarked, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, searchContent, navigate } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const results = searchContent(query);
  const totalResults =
    results.courses.length +
    results.articles.length +
    results.videos.length +
    results.booklets.length;

  const handleSelect = (url: string) => {
    navigate(url);
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#181818] border border-stone-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B89A5A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to learn? (English, Urdu: بلوغت، تربیت, or Roman Urdu: baloghat, tarbiyat)"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="text-xs text-stone-400 hover:text-white px-2 py-1 bg-stone-800 rounded transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-500 text-xs">
              <p className="font-semibold text-stone-400 mb-1">
                Suggested searches:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <button
                  onClick={() => setQuery('Parenting')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-stone-300 rounded"
                >
                  Parenting
                </button>
                <button
                  onClick={() => setQuery('بلوغت')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-[#B89A5A] font-urdu rounded"
                >
                  بلوغت
                </button>
                <button
                  onClick={() => setQuery('baloghat')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-stone-300 rounded"
                >
                  baloghat
                </button>
                <button
                  onClick={() => setQuery('Emotional Intelligence')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-stone-300 rounded"
                >
                  Emotional Intelligence
                </button>
                <button
                  onClick={() => setQuery('جذبات')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-[#B89A5A] font-urdu rounded"
                >
                  جذبات
                </button>
                <button
                  onClick={() => setQuery('Marriage')}
                  className="px-2.5 py-1 bg-[#222222] hover:bg-stone-800 text-stone-300 rounded"
                >
                  Marriage
                </button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              No matching educational resources found for "{query}". Try searching in English, Urdu or Roman Urdu.
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Courses Matches */}
              {results.courses.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#B89A5A] flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Courses ({results.courses.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.courses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.slug}`)}
                        className="p-3 bg-[#202020] hover:bg-[#282828] rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-[#B89A5A]">
                            {course.titleEn}
                          </p>
                          <p className="font-urdu text-xs text-stone-400 mt-0.5">
                            {course.titleUr}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-stone-300 tabular-nums">
                          {course.isFree ? 'FREE' : `PKR ${course.pricePkr}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Matches */}
              {results.articles.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5 mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Articles ({results.articles.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.articles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/articles/${art.slug}`)}
                        className="p-3 bg-[#202020] hover:bg-[#282828] rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-[#B89A5A]">
                            {art.titleEn}
                          </p>
                          <p className="font-urdu text-xs text-stone-400 mt-0.5">
                            {art.titleUr}
                          </p>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {art.readingTimeMin} min read
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Matches */}
              {results.videos.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5 mb-2">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Lectures ({results.videos.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.videos.map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => handleSelect(`/videos/${vid.id}`)}
                        className="p-3 bg-[#202020] hover:bg-[#282828] rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-[#B89A5A]">
                            {vid.titleEn}
                          </p>
                          <p className="font-urdu text-xs text-stone-400 mt-0.5">
                            {vid.titleUr}
                          </p>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {vid.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booklets Matches */}
              {results.booklets.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5 mb-2">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Booklets & Guides ({results.booklets.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.booklets.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleSelect(`/booklets/${b.id}`)}
                        className="p-3 bg-[#202020] hover:bg-[#282828] rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-[#B89A5A]">
                            {b.titleEn}
                          </p>
                          <p className="font-urdu text-xs text-stone-400 mt-0.5">
                            {b.titleUr}
                          </p>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {b.pageCount} Pages
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#121212] border-t border-stone-800 text-[11px] text-stone-500 text-center">
          Multilingual search supports English, Urdu characters, and Roman Urdu transliterations.
        </div>
      </div>
    </div>
  );
};
