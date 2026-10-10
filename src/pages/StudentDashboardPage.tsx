import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogoSW } from '../components/LogoSW';
import {
  BookOpen,
  FileText,
  Video,
  BookMarked,
  Award,
  CreditCard,
  Settings,
  Clock,
  ArrowRight,
  Download,
  CheckCircle2,
  Lock,
  Printer,
  ExternalLink,
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const {
    currentUser,
    courses,
    articles,
    booklets,
    orders,
    navigate,
    setAuthModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'articles' | 'booklets' | 'certificates' | 'orders' | 'settings'
  >('overview');

  const [selectedCertificate, setSelectedCertificate] = useState<{
    id: string;
    courseId: string;
    courseTitleUr: string;
    issueDate: string;
    certificateNumber: string;
  } | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E5E1D9] rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <LogoSW size={48} className="mx-auto" />
          <h2 className="text-xl font-bold font-serif text-[#161616]">
            Sign In to View Dashboard
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Please log in with your Soch Wale student account to track your course progress, view certificates, and manage downloads.
          </p>
          <button
            onClick={() => setAuthModalOpen('login')}
            className="w-full py-3 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const enrolled = courses.filter((c) =>
    currentUser.enrolledCourseIds.includes(c.id) || currentUser.enrolledCourseIds.includes(c.slug)
  );

  const bookmarked = articles.filter((a) =>
    currentUser.bookmarkedArticleIds.includes(a.id)
  );

  const purchasedBooklets = booklets.filter((b) =>
    currentUser.purchasedProductIds.includes(b.id) || b.isFree
  );

  const userOrders = orders.filter((o) => o.userEmail === currentUser.email);

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-24">
      {/* Top Welcome Bar */}
      <div className="bg-[#0A0A0A] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#B89A5A] text-[#0A0A0A] font-bold text-2xl flex items-center justify-center shadow-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-white">
                  Welcome, {currentUser.name}
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-stone-800 text-[#B89A5A] px-2 py-0.5 rounded">
                  {currentUser.role === 'super_admin' ? 'Super Administrator' : 'Learner'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Explore New Courses
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 bg-white border border-[#E5E1D9] rounded-2xl p-3 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#B89A5A]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'courses' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#B89A5A]" />
              <span>My Enrolled Courses ({enrolled.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'articles' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <FileText className="w-4 h-4 text-[#B89A5A]" />
              <span>Saved Articles ({bookmarked.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('booklets')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'booklets' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BookMarked className="w-4 h-4 text-[#B89A5A]" />
              <span>Available Downloads</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'certificates' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4 text-[#B89A5A]" />
              <span>Certificates Earned ({currentUser.certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'orders' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#B89A5A]" />
              <span>Purchase History</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings' ? 'bg-[#0A0A0A] text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Settings className="w-4 h-4 text-[#B89A5A]" />
              <span>Account Settings</span>
            </button>
          </div>

          {/* Tab Content Canvas */}
          <div className="lg:col-span-9 space-y-8">
            
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Summary row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E5E1D9] shadow-sm">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                      Enrolled Courses
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#161616]">
                      {enrolled.length}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E5E1D9] shadow-sm">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                      Certificates Earned
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#161616]">
                      {currentUser.certificates.length}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E5E1D9] shadow-sm">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                      Saved Bookmarks
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#161616]">
                      {currentUser.bookmarkedArticleIds.length}
                    </span>
                  </div>
                </div>

                {/* Continue Learning Widget */}
                <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-serif font-bold text-[#161616] mb-4">
                    Continue Learning
                  </h3>

                  {enrolled.length === 0 ? (
                    <div className="text-center py-8 text-xs text-stone-500">
                      You are not enrolled in any courses yet. Browse our catalog to start learning.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enrolled.map((course) => {
                        const progress = currentUser.courseProgress[course.id] || {
                          completedLessonIds: [],
                          percentage: 0,
                        };
                        const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

                        return (
                          <div
                            key={course.id}
                            className="p-4 rounded-xl border border-[#E5E1D9] hover:border-[#B89A5A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex-1">
                              <span className="text-[10px] uppercase font-bold text-[#B89A5A] tracking-wider">
                                {course.category.replace('-', ' ')}
                              </span>
                              <h4 className="font-urdu text-base font-bold text-stone-900 text-right sm:text-left mt-0.5">
                                {course.titleUr}
                              </h4>
                              <p className="text-xs text-stone-600 mb-3">{course.titleEn}</p>

                              {/* Progress Bar */}
                              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden mb-1.5">
                                <div
                                  className="bg-[#B89A5A] h-full rounded-full transition-all duration-500"
                                  style={{ width: `${progress.percentage}%` }}
                                />
                              </div>
                              <div className="text-[11px] text-stone-500 flex justify-between font-mono">
                                <span>{progress.completedLessonIds.length} / {totalLessons} lessons completed</span>
                                <span>{progress.percentage}%</span>
                              </div>
                            </div>

                            <button
                              onClick={() => navigate(`/courses/${course.slug}`)}
                              className="px-4 py-2 bg-[#0A0A0A] hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
                            >
                              <span>Continue Learning</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#161616]">
                  My Enrolled Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolled.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => navigate(`/courses/${course.slug}`)}
                      className="border border-[#E5E1D9] hover:border-[#B89A5A] rounded-xl p-4 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <div className="aspect-video w-full rounded-lg bg-stone-900 overflow-hidden mb-3">
                        <img src={course.thumbnail} alt={course.titleEn} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-urdu text-base font-bold text-stone-900 text-right mb-1">
                        {course.titleUr}
                      </h4>
                      <p className="text-xs text-stone-500 truncate mb-2">{course.titleEn}</p>
                      <span className="text-xs font-semibold text-[#967B43] flex items-center gap-1">
                        <span>Go to Lessons</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#161616]">
                  Certificates Earned
                </h3>

                {currentUser.certificates.length === 0 ? (
                  <div className="text-center py-12 text-xs text-stone-500">
                    Complete all modules and lessons in a course to automatically generate your official Soch Wale completion certificate.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentUser.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-[#FAF8F5] border-2 border-[#B89A5A]/50 rounded-2xl p-6 relative overflow-hidden shadow-md flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <LogoSW size={40} />
                          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500">
                            {cert.certificateNumber}
                          </span>
                        </div>

                        <div className="text-center py-4 border-y border-[#E5E1D9] my-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#B89A5A] font-bold block mb-1">
                            Certificate of Educational Completion
                          </span>
                          <h4 className="font-urdu text-lg font-bold text-stone-900 mb-2">
                            {cert.courseTitleUr}
                          </h4>
                          <p className="text-xs text-stone-600">
                            Proudly awarded to <strong>{currentUser.name}</strong> on {cert.issueDate}
                          </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <span className="text-[10px] text-stone-500 font-serif italic">
                            Authorized: Soch Wale Editorial Board
                          </span>
                          <button
                            onClick={() => setSelectedCertificate(cert)}
                            className="px-3 py-1.5 bg-[#0A0A0A] hover:bg-stone-800 text-white text-xs font-semibold rounded transition-colors"
                          >
                            View & Print
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'booklets' && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#161616]">
                  Available PDF Guides & Booklets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {purchasedBooklets.map((b) => (
                    <div
                      key={b.id}
                      className="border border-[#E5E1D9] rounded-xl p-4 flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-16 h-20 rounded bg-stone-900 overflow-hidden shrink-0">
                        <img src={b.coverImage} alt={b.titleEn} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-urdu text-sm font-bold text-stone-900 truncate text-right">
                          {b.titleUr}
                        </h4>
                        <p className="text-xs text-stone-500 truncate">{b.titleEn}</p>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">{b.pageCount} Pages · PDF</p>
                        <button
                          onClick={() => alert(`Starting download for ${b.titleEn}...`)}
                          className="mt-2 text-xs font-semibold text-[#967B43] hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#161616]">
                  Purchase History & Invoices
                </h3>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8 text-xs text-stone-500">
                    No orders recorded for this account.
                  </div>
                ) : (
                  <div className="divide-y divide-[#E5E1D9] border border-[#E5E1D9] rounded-xl overflow-hidden">
                    {userOrders.map((ord) => (
                      <div key={ord.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-mono text-stone-500 block">{ord.orderNumber}</span>
                          <span className="font-bold text-stone-900">{ord.productTitle}</span>
                          <span className="text-stone-400 block text-[11px] mt-0.5">{ord.purchaseDate} · via {ord.paymentProvider}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold font-mono text-sm block">PKR {ord.amountPkr.toLocaleString()}</span>
                          <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-[#E5E1D9] p-6 shadow-sm space-y-4 max-w-xl">
                <h3 className="text-lg font-serif font-bold text-[#161616]">
                  Account Settings
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Full Name</label>
                    <input type="text" defaultValue={currentUser.name} className="w-full border border-stone-300 rounded p-2 text-stone-800" />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Email Address</label>
                    <input type="email" defaultValue={currentUser.email} disabled className="w-full border border-stone-200 bg-stone-100 rounded p-2 text-stone-500" />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Registered Since</label>
                    <input type="text" defaultValue={currentUser.registeredDate} disabled className="w-full border border-stone-200 bg-stone-100 rounded p-2 text-stone-500 font-mono" />
                  </div>
                  <button
                    onClick={() => alert('Profile updated successfully.')}
                    className="px-4 py-2 bg-[#0A0A0A] text-white rounded font-semibold text-xs mt-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-8 border-[#FAF7F0] w-full max-w-3xl rounded-3xl p-8 sm:p-12 shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-black p-2"
            >
              ✕
            </button>

            <LogoSW size={64} className="mx-auto" />

            <div>
              <span className="text-xs uppercase font-serif tracking-widest text-[#B89A5A] font-bold block mb-1">
                Certificate of Completion · سوچ والے تعلیمی سند
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#161616]">
                SOCH WALE LEARNING ACADEMY
              </h2>
            </div>

            <p className="text-xs text-stone-500 max-w-md mx-auto">
              This document certifies that
            </p>

            <h3 className="text-2xl font-bold font-serif text-[#0A0A0A] border-b-2 border-[#B89A5A] inline-block px-8 pb-1">
              {currentUser.name}
            </h3>

            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              has successfully fulfilled all course requirements, assignments, and curriculum benchmarks for:
            </p>

            <h4 className="font-urdu text-2xl font-bold text-[#967B43]">
              {selectedCertificate.courseTitleUr}
            </h4>

            <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
              <div>
                <span className="block font-mono font-bold text-black">{selectedCertificate.certificateNumber}</span>
                <span className="text-[10px]">Verification ID</span>
              </div>
              <div>
                <span className="block font-medium text-black">{selectedCertificate.issueDate}</span>
                <span className="text-[10px]">Issue Date</span>
              </div>
              <div>
                <span className="block font-serif italic text-black">Ayesha Siddiqui & Dr. Tariq Mansoor</span>
                <span className="text-[10px]">Editorial & Clinical Advisors</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-stone-800 text-white font-semibold text-xs rounded-lg flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
