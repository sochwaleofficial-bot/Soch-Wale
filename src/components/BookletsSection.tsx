import React from 'react';
import { useApp } from '../context/AppContext';
import { BookMarked, Download, FileText, ArrowRight, Lock, ExternalLink } from 'lucide-react';

export const BookletsSection: React.FC = () => {
  const { booklets, navigate, hasAccessToProduct, setCheckoutProduct, notify } = useApp();

  const handleDownload = (bookletId: string) => {
    const item = booklets.find((b) => b.id === bookletId);
    if (!item) return;

    if (!hasAccessToProduct(bookletId, 'booklet') && !item.isFree) {
      setCheckoutProduct({
        type: 'booklet',
        id: item.id,
        title: item.titleEn,
        titleUr: item.titleUr,
        pricePkr: item.pricePkr,
      });
      return;
    }

    notify('success', 'Download Started', `Downloading "${item.titleEn}" (PDF Guide)...`);
  };

  return (
    <section className="py-16 bg-[#F7F4EE] border-b border-[#E5E1D9]" aria-label="Booklets & Guides">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <BookMarked className="w-4 h-4" />
              <span>Digital Publications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
              Booklets & Downloadable Guides
            </h2>
            <p className="text-sm font-urdu text-stone-600 mt-1">
              پی ڈی ایف کتب اور رہنما کتابچے — والدین، نوجوانوں اور خاندانوں کے لیے محفوظ رہنمائی
            </p>
          </div>

          <button
            onClick={() => navigate('/booklets')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] hover:text-[#967B43] group cursor-pointer"
          >
            <span>All Booklets & Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Booklets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {booklets.slice(0, 4).map((book) => {
            const hasAccess = hasAccessToProduct(book.id, 'booklet') || book.isFree;

            return (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] transition-all flex flex-col p-5 shadow-sm hover:shadow-md group"
              >
                {/* Portrait Book Cover container */}
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-900 mb-4 shadow">
                  <img
                    src={book.coverImage}
                    alt={book.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top status */}
                  <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                    <span className="bg-[#0A0A0A]/90 text-[10px] uppercase font-semibold text-white px-2 py-0.5 rounded">
                      {book.format}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                        book.isFree
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#B89A5A] text-[#0A0A0A]'
                      }`}
                    >
                      {book.isFree ? 'FREE · مفت' : `PKR ${book.pricePkr}`}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between">
                    <span className="text-[11px] text-stone-300 font-mono">
                      {book.pageCount} Pages · {book.chapterCount} Ch.
                    </span>
                  </div>
                </div>

                {/* Urdu Title in Noto Nastaliq Urdu */}
                <h3
                  onClick={() => navigate(`/booklets/${book.id}`)}
                  className="font-urdu-heading text-base font-bold text-[#161616] group-hover:text-[#967B43] transition-colors cursor-pointer text-right mb-1 line-clamp-2"
                >
                  {book.titleUr}
                </h3>

                <h4 className="text-[11px] font-medium text-stone-500 uppercase tracking-wide mb-2">
                  {book.titleEn}
                </h4>

                <p className="font-urdu text-[11px] text-stone-600 leading-relaxed text-right line-clamp-2 mb-4">
                  {book.descriptionUr}
                </p>

                {/* Bottom Actions */}
                <div className="mt-auto pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/booklets/${book.id}`)}
                    className="text-xs text-stone-600 hover:text-black font-medium"
                  >
                    View Details
                  </button>

                  {hasAccess ? (
                    <button
                      onClick={() => handleDownload(book.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setCheckoutProduct({
                          type: 'booklet',
                          id: book.id,
                          title: book.titleEn,
                          titleUr: book.titleUr,
                          pricePkr: book.pricePkr,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] text-xs font-semibold rounded transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Get PDF</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
