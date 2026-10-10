import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Clock, ArrowRight, Video, Lock } from 'lucide-react';

export const VideoLecturesSection: React.FC = () => {
  const { videoLectures, navigate, hasAccessToProduct, setCheckoutProduct } = useApp();

  return (
    <section className="py-16 bg-[#0A0A0A] text-white border-b border-[#1E1E1E]" aria-label="Video Lectures">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <Video className="w-4 h-4" />
              <span>Video Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Video Lectures
            </h2>
            <p className="text-sm font-urdu text-stone-300 mt-1">
              ماہرین کے خصوصی معلوماتی و تربیتی ویڈیو سیشنز — باوقار اور پرسکون رہنمائی
            </p>
          </div>

          <button
            onClick={() => navigate('/videos')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B89A5A] hover:text-[#D4AF37] group cursor-pointer"
          >
            <span>Explore Video Library</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoLectures.slice(0, 4).map((vid) => {
            const hasAccess = hasAccessToProduct(vid.id, 'video');

            return (
              <div
                key={vid.id}
                className="bg-[#141414] rounded-xl border border-stone-800 hover:border-[#B89A5A] transition-all flex flex-col overflow-hidden group shadow-md"
              >
                {/* Thumbnail + Play Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                    loading="lazy"
                  />

                  {/* Play Action / Lock Badge */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <button
                      onClick={() => {
                        if (hasAccess || vid.isFree) {
                          navigate(`/videos/${vid.id}`);
                        } else {
                          setCheckoutProduct({
                            type: 'video',
                            id: vid.id,
                            title: vid.titleEn,
                            titleUr: vid.titleUr,
                            pricePkr: vid.pricePkr,
                          });
                        }
                      }}
                      className="w-12 h-12 rounded-full bg-[#B89A5A] text-[#0A0A0A] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                      aria-label="Play video"
                    >
                      {hasAccess || vid.isFree ? (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Top Tags */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="bg-[#0A0A0A]/90 text-[10px] font-semibold uppercase tracking-wider text-stone-300 px-2 py-0.5 rounded">
                      {vid.category.replace('-', ' ')}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        vid.isFree ? 'bg-emerald-700 text-white' : 'bg-[#B89A5A] text-black'
                      }`}
                    >
                      {vid.isFree ? 'FREE · مفت' : `PKR ${vid.pricePkr}`}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-stone-300 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3
                    onClick={() => navigate(`/videos/${vid.id}`)}
                    className="font-urdu-heading text-base font-bold text-white group-hover:text-[#B89A5A] transition-colors cursor-pointer text-right mb-1.5 line-clamp-2"
                  >
                    {vid.titleUr}
                  </h3>
                  <h4 className="text-[11px] text-stone-400 uppercase tracking-wide mb-3">
                    {vid.titleEn}
                  </h4>

                  <div className="mt-auto pt-3 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 tabular-nums">
                      {vid.viewsCount?.toLocaleString()} views
                    </span>

                    {hasAccess || vid.isFree ? (
                      <button
                        onClick={() => navigate(`/videos/${vid.id}`)}
                        className="text-xs font-semibold text-[#B89A5A] hover:underline cursor-pointer"
                      >
                        Watch Lecture →
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setCheckoutProduct({
                            type: 'video',
                            id: vid.id,
                            title: vid.titleEn,
                            titleUr: vid.titleUr,
                            pricePkr: vid.pricePkr,
                          })
                        }
                        className="text-xs font-semibold text-[#B89A5A] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Unlock (PKR {vid.pricePkr})</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
