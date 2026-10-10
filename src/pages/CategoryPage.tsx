import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft, BookOpen, FileText, Video, BookMarked } from 'lucide-react';
import { CategorySlug } from '../types';

export const CategoryPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { categories, courses, articles, videoLectures, booklets, navigate } = useApp();
  const category = categories.find((c) => c.slug === slug) || categories[0];

  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'articles' | 'videos' | 'booklets'>('all');

  const catCourses = courses.filter((c) => c.category === category.slug);
  const catArticles = articles.filter((a) => a.category === category.slug);
  const catVideos = videoLectures.filter((v) => v.category === category.slug);
  const catBooklets = booklets.filter((b) => b.category === category.slug);

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      {/* Category Marquee Banner */}
      <div className="bg-[#0A0A0A] text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#B89A5A] bg-[#181818] px-2.5 py-1 rounded">
              Knowledge Hub
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-2">
              {category.nameEn}
            </h1>

            <p className="font-urdu text-xl font-bold text-[#B89A5A] mb-3 text-right">
              {category.nameUr}
            </p>

            <p className="text-sm text-stone-300 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 border-b border-[#E5E1D9] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'all'
                ? 'bg-[#0A0A0A] text-white shadow'
                : 'text-stone-600 hover:text-black bg-white border border-[#E5E1D9]'
            }`}
          >
            All Resources ({catCourses.length + catArticles.length + catVideos.length + catBooklets.length})
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'courses'
                ? 'bg-[#0A0A0A] text-white shadow'
                : 'text-stone-600 hover:text-black bg-white border border-[#E5E1D9]'
            }`}
          >
            Courses ({catCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'articles'
                ? 'bg-[#0A0A0A] text-white shadow'
                : 'text-stone-600 hover:text-black bg-white border border-[#E5E1D9]'
            }`}
          >
            Articles ({catArticles.length})
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'videos'
                ? 'bg-[#0A0A0A] text-white shadow'
                : 'text-stone-600 hover:text-black bg-white border border-[#E5E1D9]'
            }`}
          >
            Videos ({catVideos.length})
          </button>

          <button
            onClick={() => setActiveTab('booklets')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'booklets'
                ? 'bg-[#0A0A0A] text-white shadow'
                : 'text-stone-600 hover:text-black bg-white border border-[#E5E1D9]'
            }`}
          >
            Booklets ({catBooklets.length})
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          {(activeTab === 'all' || activeTab === 'courses') && catCourses.length > 0 && (
            <div>
              <h3 className="text-xl font-serif font-bold text-[#161616] mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#B89A5A]" />
                <span>Courses in {category.nameEn}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'articles') && catArticles.length > 0 && (
            <div>
              <h3 className="text-xl font-serif font-bold text-[#161616] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B89A5A]" />
                <span>Urdu Articles in {category.nameEn}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catArticles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'videos') && catVideos.length > 0 && (
            <div>
              <h3 className="text-xl font-serif font-bold text-[#161616] mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#B89A5A]" />
                <span>Video Lectures in {category.nameEn}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catVideos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => navigate(`/videos/${v.id}`)}
                    className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] p-4 cursor-pointer shadow-sm hover:shadow transition-all"
                  >
                    <div className="aspect-video w-full rounded-lg bg-stone-900 overflow-hidden mb-3">
                      <img src={v.thumbnail} alt={v.titleEn} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-urdu text-sm font-bold text-stone-900 text-right mb-1">
                      {v.titleUr}
                    </h4>
                    <p className="text-xs text-stone-500">{v.titleEn} · {v.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {catCourses.length === 0 && catArticles.length === 0 && catVideos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E1D9] text-xs text-stone-500">
              No educational items currently listed in this category view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
