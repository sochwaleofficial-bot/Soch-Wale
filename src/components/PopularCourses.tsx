import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from './CourseCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PopularCourses: React.FC = () => {
  const { courses, navigate } = useApp();
  // Show courses from index 2 onwards to provide varied curated cards
  const popular = courses.slice(2, 5);

  return (
    <section className="py-16 bg-white border-b border-[#E5E1D9]" aria-label="Popular Courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Trending Curricula</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
              Popular Courses
            </h2>
            <p className="text-sm font-urdu text-stone-600 mt-1">
              طلبہ اور والدین میں سب سے زیادہ سنے اور پڑھے جانے والے کورسز
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] hover:text-[#967B43] group cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popular.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
