import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from './CourseCard';
import { ArrowRight, BookMarked } from 'lucide-react';

export const FeaturedCourses: React.FC = () => {
  const { courses, navigate } = useApp();
  const featured = courses.filter((c) => c.isFeatured).slice(0, 3);

  return (
    <section className="py-16 bg-[#F7F4EE] border-b border-[#E5E1D9]" aria-label="Featured Courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A5A] mb-1">
              <BookMarked className="w-4 h-4" />
              <span>Specialized Curricula</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
              Featured Courses
            </h2>
            <p className="text-sm font-urdu text-stone-600 mt-1">
              سوچ والے کے منتخب تعلیمی کورسز — بامقصد زندگی اور بہتر فیصلوں کی رہنمائی
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] hover:text-[#967B43] group cursor-pointer"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Courses 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
