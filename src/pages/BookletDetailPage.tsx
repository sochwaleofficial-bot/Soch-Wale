import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookMarked, Download, FileText, Lock, MessageCircle, ShieldCheck } from 'lucide-react';

export const BookletDetailPage: React.FC<{ id: string }> = ({ id }) => {
  const { booklets, navigate, hasAccessToProduct, setCheckoutProduct, notify } = useApp();
  const booklet = booklets.find((b) => b.id === id) || booklets[0];
  const hasAccess = hasAccessToProduct(booklet.id, 'booklet') || booklet.isFree;

  const prefilledMessage = encodeURIComponent(
    `Hello Soch Wale, I would like information about purchasing the booklet: ${booklet.titleEn} (PKR ${booklet.pricePkr}).`
  );
  const whatsAppBookletUrl = `https://wa.me/923032226181?text=${prefilledMessage}`;

  const handleDownload = () => {
    if (!hasAccess) {
      setCheckoutProduct({
        type: 'booklet',
        id: booklet.id,
        title: booklet.titleEn,
        titleUr: booklet.titleUr,
        pricePkr: booklet.pricePkr,
      });
      return;
    }
    notify('success', 'Downloading Booklet', `Preparing "${booklet.titleEn}" PDF for download...`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      <div className="bg-[#0A0A0A] text-white py-12 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/booklets')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Booklets & Guides</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#B89A5A] bg-[#181818] px-2.5 py-1 rounded">
                {booklet.category.replace('-', ' ')}
              </span>

              <h1 className="font-urdu-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-3 mb-2 text-right">
                {booklet.titleUr}
              </h1>

              <h2 className="text-base text-stone-300 font-medium mb-4">
                {booklet.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mb-6">
                {booklet.descriptionEn}
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-400 font-mono">
                <span>{booklet.pageCount} Pages</span>
                <span>·</span>
                <span>{booklet.chapterCount} Chapters</span>
                <span>·</span>
                <span>{booklet.format}</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-[3/4] max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border-2 border-stone-800">
                <img src={booklet.coverImage} alt={booklet.titleEn} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Download & Chapters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D9]">
            <div>
              <span className="text-2xl font-bold text-[#161616] font-mono">
                {booklet.isFree ? 'FREE · مفت' : `PKR ${booklet.pricePkr}`}
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                {hasAccess ? 'You have access to this PDF booklet' : 'Instant digital PDF download'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {hasAccess ? (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-[#0A0A0A] hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete PDF</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setCheckoutProduct({
                        type: 'booklet',
                        id: booklet.id,
                        title: booklet.titleEn,
                        titleUr: booklet.titleUr,
                        pricePkr: booklet.pricePkr,
                      })
                    }
                    className="px-6 py-3 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Purchase PDF Guide</span>
                  </button>

                  <a
                    href={whatsAppBookletUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                    title="Purchase via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Chapters Table */}
          <div className="pt-6">
            <h3 className="text-base font-serif font-bold text-[#161616] mb-4">
              Booklet Contents & Chapters
            </h3>
            {booklet.chapters && booklet.chapters.length > 0 ? (
              <div className="divide-y divide-[#F0ECE1] border border-[#E5E1D9] rounded-xl overflow-hidden">
                {booklet.chapters.map((ch) => (
                  <div key={ch.number} className="p-3.5 flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-400">Chapter {ch.number}</span>
                    <span className="font-urdu font-bold text-stone-800 text-sm text-right flex-1 mx-4">
                      {ch.titleUr}
                    </span>
                    <span className="text-stone-400 font-mono">Pages {ch.pages}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-urdu text-sm text-stone-700 leading-loose text-right">
                {booklet.descriptionUr}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
