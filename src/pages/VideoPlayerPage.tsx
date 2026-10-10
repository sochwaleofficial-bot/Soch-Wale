import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, Lock, Play, Shield, MessageCircle } from 'lucide-react';

export const VideoPlayerPage: React.FC<{ id: string }> = ({ id }) => {
  const { videoLectures, navigate, hasAccessToProduct, setCheckoutProduct } = useApp();
  const video = videoLectures.find((v) => v.id === id) || videoLectures[0];
  const hasAccess = hasAccessToProduct(video.id, 'video') || video.isFree;

  const prefilledMessage = encodeURIComponent(
    `Hello Soch Wale, I would like information about purchasing the video lecture: ${video.titleEn} (PKR ${video.pricePkr}).`
  );
  const whatsAppVideoUrl = `https://wa.me/923032226181?text=${prefilledMessage}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/videos')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Video Lectures</span>
        </button>

        {/* Video Player Box / Protected Lock Screen */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-2xl relative mb-8">
          {hasAccess ? (
            <iframe
              src={video.videoUrl}
              title={video.titleEn}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-900/90 backdrop-blur-md">
              <div className="w-16 h-16 rounded-full bg-[#B89A5A]/10 text-[#B89A5A] flex items-center justify-center mb-4 border border-[#B89A5A]/30">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white mb-2">
                Protected Premium Lecture
              </h3>
              <p className="font-urdu text-base text-[#B89A5A] mb-2">
                یہ ایک خصوصی معلوماتی ویڈیو لیکچر ہے
              </p>
              <p className="text-xs text-stone-300 max-w-md mb-6 leading-relaxed">
                To unlock full unlimited access to this 18-minute session, purchase with one click or contact our WhatsApp purchasing helpline.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() =>
                    setCheckoutProduct({
                      type: 'video',
                      id: video.id,
                      title: video.titleEn,
                      titleUr: video.titleUr,
                      pricePkr: video.pricePkr,
                    })
                  }
                  className="px-6 py-3 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow"
                >
                  Unlock Lecture (PKR {video.pricePkr})
                </button>

                <a
                  href={whatsAppVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#1C1C1C] hover:bg-stone-800 border border-stone-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Assist</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs text-[#B89A5A] uppercase tracking-wider font-semibold mb-2">
              <span>{video.category.replace('-', ' ')}</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{video.duration}</span>
              </span>
            </div>

            <h1 className="font-urdu-heading text-2xl sm:text-3xl font-bold text-white mb-2 text-right">
              {video.titleUr}
            </h1>

            <h2 className="text-base text-stone-300 font-medium mb-4">
              {video.titleEn}
            </h2>

            <p className="font-urdu text-sm text-stone-300 leading-loose text-right bg-[#141414] p-4 rounded-xl border border-stone-800">
              {video.descriptionUr}
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#141414] border border-stone-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Lecture Information
            </h3>
            <div className="text-xs text-stone-300 space-y-2">
              <div className="flex justify-between">
                <span>Access Status</span>
                <span className={hasAccess ? 'text-emerald-400 font-semibold' : 'text-[#B89A5A]'}>
                  {hasAccess ? 'Unlocked' : 'Premium'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{video.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Language</span>
                <span>Urdu (اردو)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
