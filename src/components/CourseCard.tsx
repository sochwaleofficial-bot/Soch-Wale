import React from 'react';
import { Course } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, BookOpen, Video, FileText, ArrowRight, Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { navigate, hasAccessToProduct } = useApp();
  const isUnlocked = hasAccessToProduct(course.id, 'course');

  return (
    <div className="bg-white rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
      {/* 16:9 Thumbnail container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
        <img
          src={course.thumbnail}
          alt={course.titleEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top badges: quiet text tag + Free/Price */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="bg-[#0A0A0A]/90 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
            {course.category.replace('-', ' ')}
          </span>

          <span
            className={`text-xs font-bold px-2.5 py-1 rounded shadow-sm ${
              course.isFree
                ? 'bg-emerald-700 text-white'
                : 'bg-[#B89A5A] text-[#0A0A0A]'
            }`}
          >
            {course.isFree ? 'FREE · مفت' : `PKR ${course.pricePkr.toLocaleString()}`}
          </span>
        </div>

        {isUnlocked && (
          <div className="absolute bottom-2 right-2 bg-emerald-600/95 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
            Enrolled · شامل ہیں
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Urdu Title in Noto Nastaliq Urdu */}
        <h3
          onClick={() => navigate(`/courses/${course.slug}`)}
          className="font-urdu-heading text-lg sm:text-xl font-bold text-[#161616] group-hover:text-[#967B43] transition-colors cursor-pointer text-right mb-2 line-clamp-2"
        >
          {course.titleUr}
        </h3>

        {/* English Title & Subtitle */}
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          {course.titleEn}
        </h4>

        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
          {course.descriptionEn}
        </p>

        {/* Unboxed Metadata row (No pills, clean separators) */}
        <div className="mt-auto pt-3 border-t border-[#E5E1D9] text-[11px] text-stone-500 flex flex-wrap items-center gap-y-1.5 gap-x-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{course.duration}</span>
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{course.articleCount}</span> Articles
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{course.videoCount}</span> Videos
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{course.bookletCount}</span> Booklets
          </span>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            {course.rating && (
              <div className="flex items-center text-amber-600 font-semibold gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{course.rating}</span>
                <span className="text-[10px] text-stone-400">({course.ratingCount})</span>
              </div>
            )}
            <span className="text-stone-400 ml-1">·</span>
            <span className="text-[11px] text-stone-500 tabular-nums">
              {course.learnerCount.toLocaleString()} learners
            </span>
          </div>

          <button
            onClick={() => navigate(`/courses/${course.slug}`)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] group-hover:text-[#967B43] hover:underline cursor-pointer"
          >
            <span>View Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
