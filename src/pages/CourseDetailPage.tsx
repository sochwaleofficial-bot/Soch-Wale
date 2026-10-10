import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  BookOpen,
  Video,
  FileText,
  Star,
  CheckCircle2,
  Lock,
  Play,
  Download,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  User,
} from 'lucide-react';

export const CourseDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    courses,
    navigate,
    hasAccessToProduct,
    enrollCourse,
    completeLesson,
    currentUser,
    setCheckoutProduct,
    siteSettings,
  } = useApp();

  const course = courses.find((c) => c.slug === slug || c.id === slug) || courses[0];
  const isEnrolled = hasAccessToProduct(course.id, 'course');
  const userProgress = currentUser?.courseProgress[course.id] || { completedLessonIds: [], percentage: 0 };

  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // WhatsApp prefilled dynamic message
  const prefilledMessage = encodeURIComponent(
    `Hello Soch Wale, I would like information about purchasing the course: ${course.titleEn} (PKR ${course.pricePkr}).`
  );
  const whatsAppCourseUrl = `https://wa.me/923032226181?text=${prefilledMessage}`;

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#0A0A0A] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89A5A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Courses</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#B89A5A] bg-[#181818] px-2.5 py-1 rounded">
                  {course.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-stone-400">· {course.duration}</span>
              </div>

              {/* Urdu Course Title in Noto Nastaliq Urdu */}
              <h1 className="font-urdu-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-right">
                {course.titleUr}
              </h1>

              {/* English Subtitle */}
              <h2 className="text-base sm:text-lg text-stone-300 font-medium mb-4">
                {course.titleEn}
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed mb-6 max-w-2xl">
                {course.descriptionEn}
              </p>

              {/* Stats & Instructor */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#B89A5A]" />
                  <span>Instructor: <strong className="text-stone-200">{course.instructor.name}</strong></span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{course.rating}</span>
                  <span className="text-stone-400 font-normal">({course.ratingCount} reviews)</span>
                </div>
                <span>·</span>
                <span className="tabular-nums">{course.learnerCount.toLocaleString()} enrolled learners</span>
              </div>
            </div>

            {/* Right Card / CTA Enrollment Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#181818] border border-stone-800 rounded-2xl p-6 shadow-2xl">
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-5 bg-black">
                  <img src={course.thumbnail} alt={course.titleEn} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-2xl font-bold text-white font-mono">
                    {course.isFree ? 'FREE · مفت' : `PKR ${course.pricePkr.toLocaleString()}`}
                  </span>
                  <span className="text-xs text-stone-400">Lifetime access</span>
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>You are enrolled in this course ({userProgress.percentage}% complete)</span>
                    </div>
                    <button
                      onClick={() => {
                        const firstLesson = course.modules[0]?.lessons[0]?.id;
                        if (firstLesson) setActiveLesson(firstLesson);
                      }}
                      className="w-full py-3 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Continue Learning
                    </button>
                  </div>
                ) : course.isFree ? (
                  <button
                    onClick={() => enrollCourse(course.id)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow"
                  >
                    Start Free Course Now
                  </button>
                ) : (
                  <div className="space-y-2.5">
                    <button
                      onClick={() =>
                        setCheckoutProduct({
                          type: 'course',
                          id: course.id,
                          title: course.titleEn,
                          titleUr: course.titleUr,
                          pricePkr: course.pricePkr,
                        })
                      }
                      className="w-full py-3.5 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow"
                    >
                      Buy Course (PKR {course.pricePkr})
                    </button>

                    <a
                      href={whatsAppCourseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#242424] hover:bg-[#2c2c2c] text-white border border-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Purchasing Help</span>
                    </a>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-stone-800 text-[11px] text-stone-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Articles</span>
                    <span className="font-semibold text-white">{course.articleCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Video Lectures</span>
                    <span className="font-semibold text-white">{course.videoCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PDF Booklets</span>
                    <span className="font-semibold text-white">{course.bookletCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Language</span>
                    <span className="font-semibold text-white">Urdu (اردو)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Curriculum */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Learning Objectives */}
            <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-[#161616] mb-4">
                What You Will Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningObjectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span className="font-urdu text-xs text-stone-800 leading-loose text-right flex-1">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum & Interactive Lesson Viewer */}
            <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#161616]">
                    Course Curriculum
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Structured into comprehensive Urdu learning modules
                  </p>
                </div>
                <span className="text-xs font-semibold text-stone-600">
                  {course.modules.reduce((a, m) => a + m.lessons.length, 0)} Total Lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="border border-[#E5E1D9] rounded-xl overflow-hidden">
                    <div className="bg-[#FAF8F5] px-5 py-3.5 border-b border-[#E5E1D9] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          {mod.titleEn}
                        </span>
                        <h4 className="font-urdu text-sm font-bold text-stone-800 mt-0.5 text-right">
                          {mod.titleUr}
                        </h4>
                      </div>
                      <span className="text-xs text-stone-500">{mod.lessons.length} lessons</span>
                    </div>

                    <div className="divide-y divide-[#F0ECE1]">
                      {mod.lessons.map((lesson) => {
                        const canView = isEnrolled || lesson.isFreePreview;
                        const isDone = userProgress.completedLessonIds.includes(lesson.id);

                        return (
                          <div key={lesson.id} className="p-4 hover:bg-[#FAF8F5] transition-colors">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {lesson.type === 'video' ? (
                                  <Video className="w-4 h-4 text-rose-500 shrink-0" />
                                ) : lesson.type === 'booklet' ? (
                                  <BookOpen className="w-4 h-4 text-sky-500 shrink-0" />
                                ) : (
                                  <FileText className="w-4 h-4 text-[#B89A5A] shrink-0" />
                                )}

                                <div className="min-w-0 flex-1">
                                  <span className="text-xs font-medium text-stone-700 block truncate">
                                    {lesson.titleEn}
                                  </span>
                                  <span className="font-urdu text-xs text-stone-900 block truncate">
                                    {lesson.titleUr}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[11px] text-stone-400 font-mono">
                                  {lesson.duration}
                                </span>

                                {canView ? (
                                  <button
                                    onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                                    className="px-3 py-1 bg-[#0A0A0A] hover:bg-stone-800 text-white text-[11px] font-semibold rounded transition-colors"
                                  >
                                    {activeLesson === lesson.id ? 'Close' : 'View Lesson'}
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Premium</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Expanded Interactive Lesson Content */}
                            {activeLesson === lesson.id && (
                              <div className="mt-4 pt-4 border-t border-[#E5E1D9] bg-white p-4 rounded-lg shadow-inner">
                                {lesson.type === 'video' ? (
                                  <div className="aspect-video w-full rounded bg-black overflow-hidden mb-3">
                                    <iframe
                                      src={lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                                      title={lesson.titleEn}
                                      className="w-full h-full"
                                      allowFullScreen
                                    />
                                  </div>
                                ) : (
                                  <div className="font-urdu text-sm text-stone-800 leading-loose text-right mb-4 whitespace-pre-line p-2">
                                    {lesson.contentUr || 'سبق کی تفصیلات اور تفصیلی مطالعہ لوڈ ہو رہا ہے۔۔۔'}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                                  <span className="text-xs text-stone-500">
                                    {isDone ? 'Completed' : 'In Progress'}
                                  </span>
                                  <button
                                    onClick={() => completeLesson(course.id, lesson.id)}
                                    className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
                                      isDone
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-[#B89A5A] text-black hover:bg-[#967B43]'
                                    }`}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{isDone ? 'Marked Complete' : 'Mark as Complete'}</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {course.faqs.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-serif font-bold text-[#161616] mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {course.faqs.map((faq, i) => (
                    <div key={i} className="border border-[#E5E1D9] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-4 text-left font-urdu text-sm font-bold text-stone-800 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors"
                      >
                        <span className="text-right flex-1">{faq.question}</span>
                        {openFaq === i ? (
                          <ChevronUp className="w-4 h-4 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400" />
                        )}
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 font-urdu text-xs text-stone-600 leading-loose text-right border-t border-[#F0ECE1] pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Instructor Profile */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
                Course Instructor
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0">
                  <img src={course.instructor.avatar} alt={course.instructor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#161616]">{course.instructor.name}</p>
                  <p className="text-xs text-stone-500">{course.instructor.role}</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Expert educator and counselor focusing on child development, emotional safety, and evidence-informed Urdu educational curriculum.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#E5E1D9] rounded-2xl p-6 text-center space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#161616]">
                Need Purchasing Assistance?
              </h4>
              <p className="text-xs text-stone-600">
                You can easily activate your course enrollment via JazzCash, EasyPaisa or Bank Transfer by contacting our team on WhatsApp.
              </p>
              <a
                href={whatsAppCourseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+92 303 2226181)</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
