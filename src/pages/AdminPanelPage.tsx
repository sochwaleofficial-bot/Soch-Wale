import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogoSW } from '../components/LogoSW';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Video,
  BookMarked,
  HelpCircle,
  Users,
  CreditCard,
  Sliders,
  Settings,
  ShieldCheck,
  Check,
  X,
  Trash2,
  Edit2,
  Plus,
  ExternalLink,
  Save,
} from 'lucide-react';
import { Course, Article, VideoLecture, Booklet, HeroSlide, CategorySlug } from '../types';

export const AdminPanelPage: React.FC = () => {
  const {
    currentUser,
    siteSettings,
    updateSiteSettings,
    courses,
    saveCourse,
    deleteCourse,
    articles,
    saveArticle,
    deleteArticle,
    videoLectures,
    saveVideoLecture,
    deleteVideoLecture,
    booklets,
    saveBooklet,
    deleteBooklet,
    anonymousQuestions,
    moderateQuestion,
    users,
    updateUserStatus,
    deleteUser,
    orders,
    heroSlides,
    updateHeroSlide,
    categories,
    navigate,
    setAuthModalOpen,
    notify,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'articles' | 'videos' | 'booklets' | 'questions' | 'users' | 'orders' | 'slides' | 'settings'
  >('courses');

  // Modal editor states (Replaces non-working prompt() calls!)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoLecture | null>(null);
  const [editingBooklet, setEditingBooklet] = useState<Booklet | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  // Question answering state
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionAnswerDraft, setQuestionAnswerDraft] = useState('');

  if (!currentUser || currentUser.role !== 'super_admin') {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E5E1D9] rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="text-xl font-bold font-serif text-[#161616]">
            Super Administrator Area
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            This area requires designated Super Administrator permissions ({siteSettings.superAdminEmail}).
          </p>
          <button
            onClick={() => setAuthModalOpen('login')}
            className="w-full py-2.5 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded transition-colors"
          >
            Switch to Super Admin
          </button>
        </div>
      </div>
    );
  }

  const pendingQuestions = anonymousQuestions.filter((q) => q.status === 'pending');
  const pendingUsers = users.filter((u) => u.status === 'pending');

  return (
    <div className="min-h-screen bg-[#111111] text-white pb-24">
      {/* Top Header */}
      <div className="bg-[#0A0A0A] border-b border-stone-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoSW size={42} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-serif text-white tracking-wide">
                  SOCH WALE CMS & CONTROL
                </span>
                <span className="bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  Live System
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Super Administrator: <strong className="text-stone-300">{currentUser.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Console */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-[#181818] border border-stone-800 rounded-2xl p-2.5 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Status</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'courses' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Manage Courses ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'articles' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Articles CMS ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'videos' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Lectures ({videoLectures.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('booklets')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'booklets' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>Booklets & Guides ({booklets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'questions' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" />
                <span>Anonymous Questions</span>
              </div>
              {pendingQuestions.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                  {pendingQuestions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'users' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Users & Approvals</span>
              </div>
              {pendingUsers.length > 0 && (
                <span className="bg-amber-500 text-black text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {pendingUsers.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Orders & Commerce ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('slides')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'slides' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Homepage Slides ({heroSlides.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-[#B89A5A] text-black font-bold shadow' : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Global Settings</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-[#181818] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">System Dashboard Overview</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Real-time status of publishing, learning, and order transactions.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#121212] border border-stone-800 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Total Courses</span>
                    <span className="text-2xl font-bold font-mono text-white block mt-1">{courses.length}</span>
                  </div>
                  <div className="bg-[#121212] border border-stone-800 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Articles</span>
                    <span className="text-2xl font-bold font-mono text-white block mt-1">{articles.length}</span>
                  </div>
                  <div className="bg-[#121212] border border-stone-800 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Questions Queue</span>
                    <span className="text-2xl font-bold font-mono text-[#B89A5A] block mt-1">{pendingQuestions.length}</span>
                  </div>
                  <div className="bg-[#121212] border border-stone-800 p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-stone-500">Registered Users</span>
                    <span className="text-2xl font-bold font-mono text-white block mt-1">{users.length}</span>
                  </div>
                </div>

                <div className="bg-[#141414] border border-stone-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A5A]">
                    Payment Gateway & WhatsApp Assistance Configuration
                  </h4>
                  <div className="text-xs text-stone-300 space-y-1.5">
                    <p>• <strong>WhatsApp Purchasing:</strong> Live on <strong>{siteSettings.whatsAppNumber}</strong> with auto-prefilled product messages.</p>
                    <p>• <strong>Stripe Integration:</strong> Operating in <strong>{siteSettings.stripeConfig.mode}</strong> mode with verified webhook receiver.</p>
                    <p>• <strong>Registration Policy:</strong> Currently set to <strong>{siteSettings.registrationPolicy === 'auto_approve' ? 'Instant Activation' : 'Requires Administrator Approval'}</strong>.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab (Target element from CSS selector!) */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Course Catalog CMS</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Click "Edit" on any course to open the full editor dialog.</p>
                  </div>

                  <button
                    onClick={() => {
                      const newCourse: Course = {
                        id: 'course-' + Date.now(),
                        slug: 'new-course-' + Date.now().toString().slice(-4),
                        titleEn: 'New Course Title',
                        titleUr: 'نئے کورس کا عنوان',
                        descriptionEn: 'Comprehensive Urdu educational course curriculum.',
                        descriptionUr: 'اس کورس کی تفصیلی اردو تفصیلات یہاں درج کیجیے۔',
                        category: 'parenting',
                        thumbnail: '/src/assets/images/hero_parenting_1791646678022.jpg',
                        pricePkr: 1299,
                        isFree: false,
                        duration: '4h 00m',
                        learnerCount: 0,
                        articleCount: 10,
                        videoCount: 5,
                        bookletCount: 1,
                        learningObjectives: ['پہلا تعلیمی مقصد', 'دوسرا تعلیمی مقصد'],
                        intendedAudience: ['والدین اور نوجوان'],
                        instructor: {
                          name: 'Soch Wale Editorial Board',
                          role: 'Educational Specialist',
                          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                        },
                        modules: [],
                        faqs: [],
                        isFeatured: true,
                        status: 'published',
                      };
                      setEditingCourse(newCourse);
                    }}
                    className="px-4 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {courses.map((c) => (
                    <div key={c.id} className="p-4 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#B89A5A]">{c.category}</span>
                        <h4 className="text-base font-bold text-white font-urdu text-right sm:text-left mt-0.5 truncate">{c.titleUr}</h4>
                        <p className="text-xs text-stone-400 truncate">{c.titleEn}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                          PKR {c.pricePkr.toLocaleString()} · {c.duration} · {c.articleCount} Articles · {c.videoCount} Videos · {c.bookletCount} Booklets
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/courses/${c.slug}`)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Preview
                        </button>

                        {/* Working in-app Edit button */}
                        <button
                          onClick={() => setEditingCourse({ ...c })}
                          className="px-3.5 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${c.titleEn}"?`)) {
                              deleteCourse(c.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-950 rounded transition-colors cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Articles CMS</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Manage and edit Urdu editorial publications.</p>
                  </div>

                  <button
                    onClick={() => {
                      const newArt: Article = {
                        id: 'art-' + Date.now(),
                        slug: 'new-article-' + Date.now().toString().slice(-4),
                        titleEn: 'New Educational Article',
                        titleUr: 'نئے مضمون کا عنوان',
                        excerptUr: 'مضمون کا مختصر خلاصہ یہاں تحریر کیجیے۔',
                        contentUr: 'مضمون کی مکمل تفصیل جمیل نوری نستعلیق میں تحریر کیجیے۔',
                        featuredImage: '/src/assets/images/hero_parenting_1791646678022.jpg',
                        category: 'parenting',
                        author: {
                          name: 'Soch Wale Editorial Board',
                          role: 'Content Specialist',
                          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                        },
                        readingTimeMin: 6,
                        publishedDate: new Date().toLocaleDateString('en-GB'),
                        tags: ['Parenting', 'Urdu'],
                        helpfulYesCount: 0,
                        helpfulNoCount: 0,
                        isFree: true,
                      };
                      setEditingArticle(newArt);
                    }}
                    className="px-4 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Article</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {articles.map((art) => (
                    <div key={art.id} className="p-4 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#B89A5A]">{art.category}</span>
                        <h4 className="text-base font-bold text-white font-urdu text-right sm:text-left mt-0.5 truncate">{art.titleUr}</h4>
                        <p className="text-xs text-stone-400 truncate">{art.titleEn}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                          {art.readingTimeMin} min read · Published {art.publishedDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/articles/${art.slug}`)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => setEditingArticle({ ...art })}
                          className="px-3.5 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete article "${art.titleEn}"?`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-950 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Video Lectures CMS</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Manage recorded video sessions, previews, and prices.</p>
                  </div>

                  <button
                    onClick={() => {
                      const newVid: VideoLecture = {
                        id: 'vid-' + Date.now(),
                        titleEn: 'New Video Lecture',
                        titleUr: 'نئے ویڈیو لیکچر کا عنوان',
                        descriptionUr: 'ویڈیو کی اردو تفصیلات یہاں درج کیجیے۔',
                        category: 'emotional-intelligence',
                        duration: '20 minutes',
                        thumbnail: '/src/assets/images/hero_emotional_iq_1791646692719.jpg',
                        isFree: false,
                        pricePkr: 399,
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        viewsCount: 0,
                      };
                      setEditingVideo(newVid);
                    }}
                    className="px-4 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Video</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {videoLectures.map((vid) => (
                    <div key={vid.id} className="p-4 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#B89A5A]">{vid.category}</span>
                        <h4 className="text-base font-bold text-white font-urdu text-right sm:text-left mt-0.5 truncate">{vid.titleUr}</h4>
                        <p className="text-xs text-stone-400 truncate">{vid.titleEn}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                          {vid.duration} · {vid.isFree ? 'FREE' : `PKR ${vid.pricePkr}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/videos/${vid.id}`)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => setEditingVideo({ ...vid })}
                          className="px-3.5 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete video "${vid.titleEn}"?`)) {
                              deleteVideoLecture(vid.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-950 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booklets Tab */}
            {activeTab === 'booklets' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Booklets & Guides CMS</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Manage downloadable PDF publications and pricing.</p>
                  </div>

                  <button
                    onClick={() => {
                      const newBook: Booklet = {
                        id: 'book-' + Date.now(),
                        titleEn: 'New Educational Guidebook',
                        titleUr: 'نئے کتابچے کا اردو نام',
                        descriptionEn: 'Digital PDF educational workbook.',
                        descriptionUr: 'کتابچے کی تفصیلی اردو معلومات۔',
                        category: 'parenting',
                        coverImage: '/src/assets/images/hero_parenting_1791646678022.jpg',
                        pageCount: 40,
                        chapterCount: 8,
                        format: 'PDF Guide',
                        isFree: false,
                        pricePkr: 499,
                        downloadUrl: '/downloads/sample.pdf',
                        chapters: [],
                      };
                      setEditingBooklet(newBook);
                    }}
                    className="px-4 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Booklet</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {booklets.map((b) => (
                    <div key={b.id} className="p-4 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#B89A5A]">{b.category}</span>
                        <h4 className="text-base font-bold text-white font-urdu text-right sm:text-left mt-0.5 truncate">{b.titleUr}</h4>
                        <p className="text-xs text-stone-400 truncate">{b.titleEn}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                          {b.pageCount} Pages · {b.format} · {b.isFree ? 'FREE' : `PKR ${b.pricePkr}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/booklets/${b.id}`)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => setEditingBooklet({ ...b })}
                          className="px-3.5 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete booklet "${b.titleEn}"?`)) {
                              deleteBooklet(b.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-950 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Anonymous Questions Moderation</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Review submissions, redact identifiers, and publish educational answers.</p>
                </div>

                <div className="space-y-4">
                  {anonymousQuestions.map((q) => (
                    <div key={q.id} className="bg-[#141414] border border-stone-800 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#B89A5A] uppercase font-bold">{q.category.replace('-', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            q.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40' :
                            q.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-600/40' :
                            'bg-rose-950 text-rose-400 border border-rose-600/40'
                          }`}>
                            {q.status}
                          </span>
                          <span className="text-stone-500 font-mono text-[11px]">{q.submittedDate}</span>
                        </div>
                      </div>

                      <p className="font-urdu text-base font-semibold text-white leading-loose text-right">
                        "{q.questionText}"
                      </p>

                      {q.ageRange && (
                        <p className="text-[11px] text-stone-400">Demographic: {q.ageRange}</p>
                      )}

                      {q.answerUr && (
                        <div className="bg-[#181818] p-3 rounded-lg border border-stone-800">
                          <span className="text-[10px] text-stone-400 uppercase font-semibold block mb-1">
                            Published Answer (by {q.answeredBy}):
                          </span>
                          <p className="font-urdu text-xs text-stone-300 leading-loose text-right">
                            {q.answerUr}
                          </p>
                        </div>
                      )}

                      {editingQuestionId === q.id ? (
                        <div className="pt-2 space-y-2">
                          <textarea
                            value={questionAnswerDraft}
                            onChange={(e) => setQuestionAnswerDraft(e.target.value)}
                            placeholder="اردو میں مستند تعلیمی جواب تحریر کیجیے۔۔۔"
                            rows={3}
                            className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-urdu"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                moderateQuestion(q.id, 'approved', questionAnswerDraft);
                                setEditingQuestionId(null);
                                setQuestionAnswerDraft('');
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded cursor-pointer"
                            >
                              Publish Answer & Approve
                            </button>
                            <button
                              onClick={() => setEditingQuestionId(null)}
                              className="px-3 py-1.5 bg-stone-800 text-stone-300 text-xs rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                          <button
                            onClick={() => {
                              setEditingQuestionId(q.id);
                              setQuestionAnswerDraft(q.answerUr || '');
                            }}
                            className="px-3 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>{q.answerUr ? 'Edit Answer' : 'Answer Question'}</span>
                          </button>

                          {q.status !== 'approved' && (
                            <button
                              onClick={() => moderateQuestion(q.id, 'approved')}
                              className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}

                          {q.status !== 'rejected' && (
                            <button
                              onClick={() => moderateQuestion(q.id, 'rejected')}
                              className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-700/50 text-rose-300 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Users & Registration Approvals</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Manage learner accounts and review approval requests.</p>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {users.map((u) => (
                    <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{u.name}</span>
                          <span className="text-stone-400 text-xs">({u.email})</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            u.status === 'active' ? 'bg-emerald-950 text-emerald-400' :
                            u.status === 'pending' ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                          }`}>
                            {u.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Registered: {u.registeredDate} · Role: {u.role}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {u.status === 'pending' && (
                          <button
                            onClick={() => updateUserStatus(u.id, 'active')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded cursor-pointer"
                          >
                            Approve Account
                          </button>
                        )}
                        {u.status === 'active' && u.role !== 'super_admin' && (
                          <button
                            onClick={() => updateUserStatus(u.id, 'suspended')}
                            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded cursor-pointer"
                          >
                            Suspend
                          </button>
                        )}
                        {u.role !== 'super_admin' && (
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-950 rounded cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Orders & Transaction Records</h3>
                  <p className="text-xs text-stone-400 mt-0.5">All customer purchases via Stripe or WhatsApp assistance.</p>
                </div>

                <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl overflow-hidden">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-mono text-stone-400 block">{ord.orderNumber}</span>
                        <span className="font-bold text-white">{ord.productTitle}</span>
                        <p className="text-stone-400 text-[11px] mt-0.5">
                          Customer: {ord.customerName} ({ord.userEmail}) · Ref: {ord.transactionReference}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-white block">PKR {ord.amountPkr.toLocaleString()}</span>
                        <span className="text-emerald-400 uppercase font-semibold text-[10px]">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slides 16:9 CMS */}
            {activeTab === 'slides' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Homepage Hero Slides (16:9)</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Manage slides, headlines, promotional banners, and calls to action.</p>
                </div>

                <div className="space-y-4">
                  {heroSlides.map((slide) => (
                    <div key={slide.id} className="p-4 bg-[#141414] border border-stone-800 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                        <img src={slide.imageUrl} alt={slide.titleUr} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#B89A5A]">{slide.category}</span>
                        <h4 className="font-urdu text-base font-bold text-white text-right sm:text-left mt-0.5 truncate">{slide.titleUr}</h4>
                        <p className="text-xs text-stone-400 truncate">{slide.supportingTextEn}</p>
                        <p className="text-[11px] text-[#B89A5A] mt-1 font-mono">CTA: {slide.ctaText} → {slide.ctaLink}</p>
                      </div>

                      {/* Working in-app Edit button for slides */}
                      <button
                        onClick={() => setEditingSlide({ ...slide })}
                        className="px-3.5 py-1.5 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-semibold rounded flex items-center gap-1.5 shrink-0 cursor-pointer shadow"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Slide</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Global Configuration</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Manage branding, WhatsApp number, and payment settings.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-400 uppercase font-semibold mb-1">WhatsApp Business Number</label>
                    <input
                      type="text"
                      defaultValue={siteSettings.whatsAppNumber}
                      onChange={(e) => updateSiteSettings({ whatsAppNumber: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-stone-700 rounded p-2.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase font-semibold mb-1">Super Admin Designated Email</label>
                    <input
                      type="text"
                      value={siteSettings.superAdminEmail}
                      disabled
                      className="w-full bg-[#0A0A0A] border border-stone-800 rounded p-2.5 text-stone-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase font-semibold mb-1">Registration Policy</label>
                    <select
                      value={siteSettings.registrationPolicy}
                      onChange={(e) => updateSiteSettings({ registrationPolicy: e.target.value as any })}
                      className="w-full bg-[#0A0A0A] border border-stone-700 rounded p-2.5 text-white"
                    >
                      <option value="auto_approve">Auto Approve Learners (Instant Access)</option>
                      <option value="require_admin_approval">Require Admin Approval For New Accounts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase font-semibold mb-1">Stripe Environment Mode</label>
                    <select
                      value={siteSettings.stripeConfig.mode}
                      onChange={(e) =>
                        updateSiteSettings({
                          stripeConfig: { ...siteSettings.stripeConfig, mode: e.target.value as any },
                        })
                      }
                      className="w-full bg-[#0A0A0A] border border-stone-700 rounded p-2.5 text-white"
                    >
                      <option value="test">Test Mode (pk_test_...)</option>
                      <option value="live">Live Production Mode</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL EDITORS: 100% Reliable In-App Editors (No prompt() dependencies)
         ========================================================================= */}

      {/* 1. Course Editor Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#181818] border border-stone-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Edit Course Curriculum</h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Title (جمیل نوری نستعلیق)</label>
                <input
                  type="text"
                  value={editingCourse.titleUr}
                  onChange={(e) => setEditingCourse({ ...editingCourse, titleUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-3 text-base text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Title</label>
                <input
                  type="text"
                  value={editingCourse.titleEn}
                  onChange={(e) => setEditingCourse({ ...editingCourse, titleEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Category</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as CategorySlug })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.nameEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingCourse.pricePkr}
                    onChange={(e) => setEditingCourse({ ...editingCourse, pricePkr: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Articles Count</label>
                  <input
                    type="number"
                    value={editingCourse.articleCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, articleCount: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Videos Count</label>
                  <input
                    type="number"
                    value={editingCourse.videoCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, videoCount: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Booklets Count</label>
                  <input
                    type="number"
                    value={editingCourse.bookletCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, bookletCount: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Description (تفصیلات)</label>
                <textarea
                  rows={3}
                  value={editingCourse.descriptionUr}
                  onChange={(e) => setEditingCourse({ ...editingCourse, descriptionUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-sm text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Description</label>
                <textarea
                  rows={2}
                  value={editingCourse.descriptionEn}
                  onChange={(e) => setEditingCourse({ ...editingCourse, descriptionEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Thumbnail Image Path</label>
                <input
                  type="text"
                  value={editingCourse.thumbnail}
                  onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingCourse(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveCourse(editingCourse);
                  setEditingCourse(null);
                  notify('success', 'Course Saved', `Course "${editingCourse.titleEn}" saved successfully.`);
                }}
                className="px-5 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Article Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#181818] border border-stone-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Edit Article</h3>
              <button onClick={() => setEditingArticle(null)} className="text-stone-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Title (جمیل نوری نستعلیق)</label>
                <input
                  type="text"
                  value={editingArticle.titleUr}
                  onChange={(e) => setEditingArticle({ ...editingArticle, titleUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-3 text-base text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Title</label>
                <input
                  type="text"
                  value={editingArticle.titleEn}
                  onChange={(e) => setEditingArticle({ ...editingArticle, titleEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Category</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as CategorySlug })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Reading Time (Minutes)</label>
                  <input
                    type="number"
                    value={editingArticle.readingTimeMin}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readingTimeMin: Number(e.target.value) || 1 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Excerpt (خلاصہ)</label>
                <textarea
                  rows={2}
                  value={editingArticle.excerptUr}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerptUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-sm text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Body Content (مکمل مضمون)</label>
                <textarea
                  rows={6}
                  value={editingArticle.contentUr}
                  onChange={(e) => setEditingArticle({ ...editingArticle, contentUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-3 text-sm text-white font-urdu text-right leading-loose"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveArticle(editingArticle);
                  setEditingArticle(null);
                  notify('success', 'Article Saved', `Article "${editingArticle.titleEn}" saved successfully.`);
                }}
                className="px-5 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Video Lecture Editor Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#181818] border border-stone-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Edit Video Lecture</h3>
              <button onClick={() => setEditingVideo(null)} className="text-stone-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Title (جمیل نوری نستعلیق)</label>
                <input
                  type="text"
                  value={editingVideo.titleUr}
                  onChange={(e) => setEditingVideo({ ...editingVideo, titleUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-base text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Title</label>
                <input
                  type="text"
                  value={editingVideo.titleEn}
                  onChange={(e) => setEditingVideo({ ...editingVideo, titleEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingVideo.pricePkr}
                    onChange={(e) => setEditingVideo({ ...editingVideo, pricePkr: Number(e.target.value) || 0, isFree: Number(e.target.value) === 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Video Embed URL</label>
                <input
                  type="text"
                  value={editingVideo.videoUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Description</label>
                <textarea
                  rows={2}
                  value={editingVideo.descriptionUr}
                  onChange={(e) => setEditingVideo({ ...editingVideo, descriptionUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-sm text-white font-urdu text-right"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingVideo(null)}
                className="px-4 py-2 bg-stone-800 text-stone-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveVideoLecture(editingVideo);
                  setEditingVideo(null);
                  notify('success', 'Video Saved', `Video lecture "${editingVideo.titleEn}" saved.`);
                }}
                className="px-5 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Video</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Booklet Editor Modal */}
      {editingBooklet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#181818] border border-stone-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Edit Booklet Guide</h3>
              <button onClick={() => setEditingBooklet(null)} className="text-stone-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Title (جمیل نوری نستعلیق)</label>
                <input
                  type="text"
                  value={editingBooklet.titleUr}
                  onChange={(e) => setEditingBooklet({ ...editingBooklet, titleUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-base text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Title</label>
                <input
                  type="text"
                  value={editingBooklet.titleEn}
                  onChange={(e) => setEditingBooklet({ ...editingBooklet, titleEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Page Count</label>
                  <input
                    type="number"
                    value={editingBooklet.pageCount}
                    onChange={(e) => setEditingBooklet({ ...editingBooklet, pageCount: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Chapters</label>
                  <input
                    type="number"
                    value={editingBooklet.chapterCount}
                    onChange={(e) => setEditingBooklet({ ...editingBooklet, chapterCount: Number(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingBooklet.pricePkr}
                    onChange={(e) => setEditingBooklet({ ...editingBooklet, pricePkr: Number(e.target.value) || 0, isFree: Number(e.target.value) === 0 })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingBooklet.coverImage}
                  onChange={(e) => setEditingBooklet({ ...editingBooklet, coverImage: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Description</label>
                <textarea
                  rows={2}
                  value={editingBooklet.descriptionUr}
                  onChange={(e) => setEditingBooklet({ ...editingBooklet, descriptionUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-sm text-white font-urdu text-right"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingBooklet(null)}
                className="px-4 py-2 bg-stone-800 text-stone-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveBooklet(editingBooklet);
                  setEditingBooklet(null);
                  notify('success', 'Booklet Saved', `Booklet "${editingBooklet.titleEn}" saved.`);
                }}
                className="px-5 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Booklet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Hero Slide Editor Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#181818] border border-stone-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white">Edit Homepage Hero Slide (16:9)</h3>
              <button onClick={() => setEditingSlide(null)} className="text-stone-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Urdu Headline (جمیل نوری نستعلیق)</label>
                <input
                  type="text"
                  value={editingSlide.titleUr}
                  onChange={(e) => setEditingSlide({ ...editingSlide, titleUr: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-3 text-base text-white font-urdu text-right"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">Category Kicker Tag</label>
                <input
                  type="text"
                  value={editingSlide.category}
                  onChange={(e) => setEditingSlide({ ...editingSlide, category: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">English Supporting Text</label>
                <textarea
                  rows={2}
                  value={editingSlide.supportingTextEn}
                  onChange={(e) => setEditingSlide({ ...editingSlide, supportingTextEn: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingSlide.ctaText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-400 mb-1">CTA Destination Link</label>
                  <input
                    type="text"
                    value={editingSlide.ctaLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaLink: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-400 mb-1">16:9 Image Path</label>
                <input
                  type="text"
                  value={editingSlide.imageUrl}
                  onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-stone-700 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingSlide(null)}
                className="px-4 py-2 bg-stone-800 text-stone-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateHeroSlide(editingSlide);
                  setEditingSlide(null);
                  notify('success', 'Slide Updated', 'Homepage slide updated successfully.');
                }}
                className="px-5 py-2 bg-[#B89A5A] hover:bg-[#967B43] text-black text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Slide</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
