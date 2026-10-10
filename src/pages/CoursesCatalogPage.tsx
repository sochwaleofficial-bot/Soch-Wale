import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { Search, Filter, BookOpen } from 'lucide-react';
import { CategorySlug } from '../types';

export const CoursesCatalogPage: React.FC = () => {
  const { courses, categories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (filterType === 'free' && !c.isFree) return false;
    if (filterType === 'paid' && c.isFree) return false;
    if (
      searchQuery &&
      !c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.titleUr.includes(searchQuery) &&
      !c.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Course Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            All Educational Courses
          </h1>
          <p className="font-urdu text-lg text-[#B89A5A]">
            سوچ والے کے جامع تعلیمی کورسز — اپنے موضوع کا انتخاب کیجیے
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white border border-[#E5E1D9] rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses in English or Urdu..."
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#B89A5A]"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === 'all'
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setFilterType('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === 'free'
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                }`}
              >
                Free Only
              </button>
              <button
                onClick={() => setFilterType('paid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === 'paid'
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                }`}
              >
                Premium Curricula
              </button>
            </div>
          </div>

          {/* Categories Pill Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-[#F0ECE1]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded text-xs font-medium shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#B89A5A] text-black font-semibold'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1 rounded text-xs font-medium shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#B89A5A] text-black font-semibold'
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                {cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E1D9] text-xs text-stone-500">
            No courses found matching the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
