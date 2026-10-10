import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, FileText, Video, BookOpen, BookMarked, ArrowRight } from 'lucide-react';

export const LatestFromSochWale: React.FC = () => {
  const { articles, courses, videoLectures, booklets, navigate } = useApp();

  // Combine items into a mixed feed
  const mixedItems = [
    {
      type: 'ARTICLE' as const,
      id: articles[0]?.id || '',
      titleEn: articles[0]?.titleEn || '',
      titleUr: articles[0]?.titleUr || '',
      image: articles[0]?.featuredImage || '',
      category: articles[0]?.category || '',
      link: `/articles/${articles[0]?.slug}`,
      meta: `${articles[0]?.readingTimeMin} min read · ${articles[0]?.publishedDate}`,
      price: 'FREE',
    },
    {
      type: 'COURSE' as const,
      id: courses[0]?.id || '',
      titleEn: courses[0]?.titleEn || '',
      titleUr: courses[0]?.titleUr || '',
      image: courses[0]?.thumbnail || '',
      category: courses[0]?.category || '',
      link: `/courses/${courses[0]?.slug}`,
      meta: `${courses[0]?.duration} · ${courses[0]?.articleCount} Articles · ${courses[0]?.videoCount} Videos`,
      price: `PKR ${courses[0]?.pricePkr}`,
    },
    {
      type: 'VIDEO' as const,
      id: videoLectures[0]?.id || '',
      titleEn: videoLectures[0]?.titleEn || '',
      titleUr: videoLectures[0]?.titleUr || '',
      image: videoLectures[0]?.thumbnail || '',
      category: videoLectures[0]?.category || '',
      link: `/videos/${videoLectures[0]?.id}`,
      meta: `${videoLectures[0]?.duration} · Video Lecture`,
      price: videoLectures[0]?.isFree ? 'FREE' : `PKR ${videoLectures[0]?.pricePkr}`,
    },
    {
      type: 'BOOKLET' as const,
      id: booklets[0]?.id || '',
      titleEn: booklets[0]?.titleEn || '',
      titleUr: booklets[0]?.titleUr || '',
      image: booklets[0]?.coverImage || '',
      category: booklets[0]?.category || '',
      link: `/booklets/${booklets[0]?.id}`,
      meta: `${booklets[0]?.pageCount} Pages · ${booklets[0]?.format}`,
      price: booklets[0]?.isFree ? 'FREE' : `PKR ${booklets[0]?.pricePkr}`,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ARTICLE':
        return <FileText className="w-3.5 h-3.5 text-stone-300" />;
      case 'COURSE':
        return <BookOpen className="w-3.5 h-3.5 text-[#B89A5A]" />;
      case 'VIDEO':
        return <Video className="w-3.5 h-3.5 text-rose-400" />;
      case 'BOOKLET':
        return <BookMarked className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-[#F7F4EE] border-b border-[#E5E1D9]" aria-label="Latest Publications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Multi-format Learning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
              Latest From Soch Wale
            </h2>
            <p className="text-sm font-urdu text-stone-600 mt-1">
              مختلف تعلیمی اصناف کا تازہ ترین انتخاب — مضامین، ویڈیوز، کورسز اور کتب
            </p>
          </div>
        </div>

        {/* Mixed Feed 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mixedItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.link)}
              className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-stone-900 mb-3.5">
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#0A0A0A]/90 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                    {getTypeIcon(item.type)}
                    <span>{item.type}</span>
                  </div>

                  <div className="absolute top-2 right-2 bg-[#B89A5A] text-[#0A0A0A] font-bold px-2 py-0.5 rounded text-[10px]">
                    {item.price}
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 uppercase tracking-wide mb-1">
                  {item.category.replace('-', ' ')}
                </div>

                <h3 className="font-urdu-heading text-base font-bold text-[#161616] group-hover:text-[#967B43] transition-colors text-right mb-1 line-clamp-2">
                  {item.titleUr}
                </h3>

                <h4 className="text-xs text-stone-700 font-medium line-clamp-1 mb-2">
                  {item.titleEn}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] text-stone-500">
                <span className="truncate max-w-[140px]">{item.meta}</span>
                <span className="text-[#0A0A0A] group-hover:text-[#967B43] font-semibold flex items-center gap-0.5">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
