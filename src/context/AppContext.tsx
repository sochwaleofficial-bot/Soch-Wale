import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  Course,
  Article,
  VideoLecture,
  Booklet,
  AnonymousQuestion,
  HeroSlide,
  Contributor,
  SiteSettings,
  User,
  Order,
  CategorySlug,
} from '../types';
import {
  initialCategories,
  initialCourses,
  initialArticles,
  initialVideoLectures,
  initialBooklets,
  initialAnonymousQuestions,
  initialHeroSlides,
  initialContributors,
  initialSiteSettings,
  initialDemoUsers,
  initialOrders,
} from '../data/initialData';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // State
  siteSettings: SiteSettings;
  categories: Category[];
  courses: Course[];
  articles: Article[];
  videoLectures: VideoLecture[];
  booklets: Booklet[];
  anonymousQuestions: AnonymousQuestion[];
  heroSlides: HeroSlide[];
  contributors: Contributor[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  notifications: NotificationToast[];

  // Navigation & Modals
  currentPath: string;
  navigate: (path: string) => void;
  authModalOpen: 'login' | 'signup' | 'forgot' | null;
  setAuthModalOpen: (modal: 'login' | 'signup' | 'forgot' | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  askModalOpen: boolean;
  setAskModalOpen: (open: boolean) => void;
  checkoutProduct: {
    type: 'course' | 'video' | 'booklet';
    id: string;
    title: string;
    titleUr: string;
    pricePkr: number;
  } | null;
  setCheckoutProduct: (
    product: {
      type: 'course' | 'video' | 'booklet';
      id: string;
      title: string;
      titleUr: string;
      pricePkr: number;
    } | null
  ) => void;

  // Actions
  notify: (type: 'success' | 'info' | 'error' | 'warning', title: string, message: string) => void;
  removeNotification: (id: string) => void;

  // Auth & User
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserStatus: (userId: string, newStatus: 'active' | 'suspended') => void;
  deleteUser: (userId: string) => void;

  // Learning & Interaction
  enrollCourse: (courseId: string) => boolean;
  completeLesson: (courseId: string, lessonId: string) => void;
  toggleBookmarkArticle: (articleId: string) => void;
  rateArticleHelpful: (articleId: string, isHelpful: boolean) => void;
  hasAccessToProduct: (productId: string, type: 'course' | 'video' | 'booklet') => boolean;

  // Anonymous Questions
  submitAnonymousQuestion: (data: {
    category: CategorySlug;
    questionText: string;
    ageRange?: string;
    emailOptional?: string;
  }) => Promise<boolean>;
  moderateQuestion: (questionId: string, status: 'approved' | 'rejected', answerUr?: string) => void;

  // CMS Content Management
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  saveCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  saveBooklet: (booklet: Booklet) => void;
  deleteBooklet: (id: string) => void;
  saveVideoLecture: (video: VideoLecture) => void;
  deleteVideoLecture: (id: string) => void;
  updateHeroSlide: (slide: HeroSlide) => void;

  // Orders
  processPurchase: (
    product: { type: 'course' | 'video' | 'booklet'; id: string; title: string; pricePkr: number },
    provider: 'Stripe' | 'WhatsApp / Manual Bank Transfer',
    reference?: string
  ) => Promise<boolean>;

  // Search helper
  searchContent: (query: string) => {
    courses: Course[];
    articles: Article[];
    videos: VideoLecture[];
    booklets: Booklet[];
    categories: Category[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state or use initial data
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sw_settings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [categories] = useState<Category[]>(initialCategories);

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('sw_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('sw_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [videoLectures, setVideoLectures] = useState<VideoLecture[]>(() => {
    const saved = localStorage.getItem('sw_videos');
    return saved ? JSON.parse(saved) : initialVideoLectures;
  });

  const [booklets, setBooklets] = useState<Booklet[]>(() => {
    const saved = localStorage.getItem('sw_booklets');
    if (!saved) return initialBooklets;
    const parsed: Booklet[] = JSON.parse(saved);
    if (!parsed.some((b) => b.id === 'book-nangi-baatein')) {
      return [initialBooklets[0], ...parsed];
    }
    return parsed;
  });

  const [anonymousQuestions, setAnonymousQuestions] = useState<AnonymousQuestion[]>(() => {
    const saved = localStorage.getItem('sw_questions');
    return saved ? JSON.parse(saved) : initialAnonymousQuestions;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('sw_slides');
    if (!saved) return initialHeroSlides;
    const parsed: HeroSlide[] = JSON.parse(saved);
    if (!parsed.some((s) => s.id === 'slide-nangi-baatein')) {
      return [initialHeroSlides[0], ...parsed];
    }
    return parsed;
  });

  const [contributors] = useState<Contributor[]>(initialContributors);

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sw_users');
    return saved ? JSON.parse(saved) : initialDemoUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sw_current_user');
    return saved ? JSON.parse(saved) : initialDemoUsers[0]; // Start with active session for smooth demo or allow switching
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sw_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // UI state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const [authModalOpen, setAuthModalOpen] = useState<'login' | 'signup' | 'forgot' | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<{
    type: 'course' | 'video' | 'booklet';
    id: string;
    title: string;
    titleUr: string;
    pricePkr: number;
  } | null>(null);

  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sw_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);
  useEffect(() => {
    localStorage.setItem('sw_courses', JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem('sw_articles', JSON.stringify(articles));
  }, [articles]);
  useEffect(() => {
    localStorage.setItem('sw_videos', JSON.stringify(videoLectures));
  }, [videoLectures]);
  useEffect(() => {
    localStorage.setItem('sw_booklets', JSON.stringify(booklets));
  }, [booklets]);
  useEffect(() => {
    localStorage.setItem('sw_questions', JSON.stringify(anonymousQuestions));
  }, [anonymousQuestions]);
  useEffect(() => {
    localStorage.setItem('sw_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);
  useEffect(() => {
    localStorage.setItem('sw_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('sw_orders', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sw_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sw_current_user');
    }
  }, [currentUser]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const notify = (type: 'success' | 'info' | 'error' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Auth handlers
  const login = async (email: string): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (foundUser) {
      if (foundUser.status === 'suspended') {
        notify('error', 'Account Suspended', 'Your account has been suspended by the administrator.');
        return false;
      }
      if (foundUser.status === 'pending') {
        notify('warning', 'Approval Pending', 'Your account is pending verification and administrator review.');
        return false;
      }
      setCurrentUser(foundUser);
      notify('success', 'Welcome Back', `Logged in successfully as ${foundUser.name}`);
      return true;
    }

    // Check if logging in with designated super admin email
    if (normalizedEmail === siteSettings.superAdminEmail.toLowerCase()) {
      const newAdmin: User = {
        id: 'admin-' + Date.now(),
        email: siteSettings.superAdminEmail,
        name: 'Super Administrator',
        role: 'super_admin',
        status: 'active',
        registeredDate: new Date().toLocaleDateString('en-GB'),
        enrolledCourseIds: courses.map((c) => c.id),
        courseProgress: {},
        purchasedProductIds: [],
        bookmarkedArticleIds: [],
        certificates: [],
      };
      setUsers((prev) => [...prev, newAdmin]);
      setCurrentUser(newAdmin);
      notify('success', 'Super Admin Initialized', 'Welcome Super Administrator (sochwale.official@gmail.com)');
      return true;
    }

    notify('error', 'Account Not Found', 'No account exists with this email. Please sign up first.');
    return false;
  };

  const signup = async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const isSuperAdminEmail = normalizedEmail === siteSettings.superAdminEmail.toLowerCase();
    const requiresApproval = siteSettings.registrationPolicy === 'require_admin_approval' && !isSuperAdminEmail;

    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: normalizedEmail,
      name: name.trim(),
      role: isSuperAdminEmail ? 'super_admin' : 'student',
      status: requiresApproval ? 'pending' : 'active',
      registeredDate: new Date().toLocaleDateString('en-GB'),
      enrolledCourseIds: ['course-free-intro'],
      courseProgress: {},
      purchasedProductIds: [],
      bookmarkedArticleIds: [],
      certificates: [],
    };

    setUsers((prev) => [...prev, newUser]);

    // Send Simulated Admin Notification
    if (requiresApproval) {
      notify(
        'info',
        'Account Registered (Pending Approval)',
        `Notification sent to ${siteSettings.superAdminEmail} for administrator approval.`
      );
      return {
        success: true,
        message:
          "You're creating an account on Soch Wale. Please check your email to verify your address. Administrator approval is pending.",
      };
    } else {
      setCurrentUser(newUser);
      notify('success', 'Account Created', `Welcome to Soch Wale, ${newUser.name}!`);
      return {
        success: true,
        message: 'Your account has been created successfully. Welcome to Soch Wale!',
      };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    notify('info', 'Logged Out', 'You have been safely signed out.');
  };

  const updateUserStatus = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    notify('success', 'User Updated', `User status updated to ${newStatus}.`);
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    notify('info', 'User Removed', 'User account was deleted.');
  };

  // Learning & Access Control
  const hasAccessToProduct = (productId: string, type: 'course' | 'video' | 'booklet'): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'super_admin') return true;

    if (type === 'course') {
      const course = courses.find((c) => c.id === productId || c.slug === productId);
      if (course?.isFree) return true;
      return (
        currentUser.enrolledCourseIds.includes(course?.id || '') ||
        currentUser.purchasedProductIds.includes(course?.id || '')
      );
    }
    if (type === 'video') {
      const vid = videoLectures.find((v) => v.id === productId);
      if (vid?.isFree) return true;
      return currentUser.purchasedProductIds.includes(productId);
    }
    if (type === 'booklet') {
      const b = booklets.find((item) => item.id === productId);
      if (b?.isFree) return true;
      return currentUser.purchasedProductIds.includes(productId);
    }
    return false;
  };

  const enrollCourse = (courseId: string): boolean => {
    if (!currentUser) {
      setAuthModalOpen('login');
      notify('info', 'Login Required', 'Please sign in or create an account to enroll in courses.');
      return false;
    }

    if (currentUser.enrolledCourseIds.includes(courseId)) {
      notify('info', 'Already Enrolled', 'You are already enrolled in this course.');
      return true;
    }

    const updatedUser = {
      ...currentUser,
      enrolledCourseIds: [...currentUser.enrolledCourseIds, courseId],
      courseProgress: {
        ...currentUser.courseProgress,
        [courseId]: { completedLessonIds: [], percentage: 0 },
      },
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    notify('success', 'Enrolled Successfully', 'You can now start learning this course.');
    return true;
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    const currentProgress = currentUser.courseProgress[courseId] || { completedLessonIds: [], percentage: 0 };
    if (currentProgress.completedLessonIds.includes(lessonId)) return;

    const course = courses.find((c) => c.id === courseId || c.slug === courseId);
    const totalLessons = course ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 1;
    const updatedCompleted = [...currentProgress.completedLessonIds, lessonId];
    const newPercentage = Math.min(100, Math.round((updatedCompleted.length / Math.max(1, totalLessons)) * 100));

    const updatedCertificates = [...currentUser.certificates];
    if (newPercentage === 100 && !updatedCertificates.some((c) => c.courseId === courseId)) {
      updatedCertificates.push({
        id: 'cert-' + Date.now(),
        courseId,
        courseTitleUr: course?.titleUr || 'Course Completion',
        issueDate: new Date().toLocaleDateString('en-GB'),
        certificateNumber: `SW-CERT-${Date.now().toString().slice(-6)}`,
      });
      notify('success', 'Course Completed!', 'Congratulations! Your certificate is now available on your dashboard.');
    }

    const updatedUser: User = {
      ...currentUser,
      courseProgress: {
        ...currentUser.courseProgress,
        [courseId]: {
          completedLessonIds: updatedCompleted,
          percentage: newPercentage,
        },
      },
      certificates: updatedCertificates,
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const toggleBookmarkArticle = (articleId: string) => {
    if (!currentUser) {
      setAuthModalOpen('login');
      notify('info', 'Sign in to Bookmark', 'Save your favorite articles to read later.');
      return;
    }
    const isBookmarked = currentUser.bookmarkedArticleIds.includes(articleId);
    const updatedBookmarks = isBookmarked
      ? currentUser.bookmarkedArticleIds.filter((id) => id !== articleId)
      : [...currentUser.bookmarkedArticleIds, articleId];

    const updatedUser = { ...currentUser, bookmarkedArticleIds: updatedBookmarks };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    notify('success', isBookmarked ? 'Bookmark Removed' : 'Article Saved', isBookmarked ? 'Removed from saved articles.' : 'Saved to your reading list.');
  };

  const rateArticleHelpful = (articleId: string, isHelpful: boolean) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          return {
            ...a,
            helpfulYesCount: isHelpful ? a.helpfulYesCount + 1 : a.helpfulYesCount,
            helpfulNoCount: !isHelpful ? a.helpfulNoCount + 1 : a.helpfulNoCount,
          };
        }
        return a;
      })
    );
    notify('success', 'Feedback Received', 'Thank you for helping us improve our educational content.');
  };

  // Anonymous Questions
  const submitAnonymousQuestion = async (data: {
    category: CategorySlug;
    questionText: string;
    ageRange?: string;
    emailOptional?: string;
  }): Promise<boolean> => {
    const newQ: AnonymousQuestion = {
      id: 'q-' + Date.now(),
      category: data.category,
      questionText: data.questionText.trim(),
      ageRange: data.ageRange,
      emailOptional: data.emailOptional,
      status: 'pending',
      submittedDate: new Date().toLocaleDateString('en-GB'),
    };
    setAnonymousQuestions((prev) => [newQ, ...prev]);
    notify('success', 'Question Received', 'Your question has been sent anonymously to our moderation panel.');
    return true;
  };

  const moderateQuestion = (questionId: string, status: 'approved' | 'rejected', answerUr?: string) => {
    setAnonymousQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            status,
            answerUr: answerUr || q.answerUr,
            answeredBy: answerUr ? (currentUser?.name || 'Soch Wale Editorial Board') : q.answeredBy,
            answeredDate: answerUr ? new Date().toLocaleDateString('en-GB') : q.answeredDate,
          };
        }
        return q;
      })
    );
    notify('success', 'Moderation Saved', `Question status updated to ${status}.`);
  };

  // CMS Content Management
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    notify('success', 'Settings Saved', 'Global site settings updated successfully.');
  };

  const saveCourse = (course: Course) => {
    setCourses((prev) => {
      const idx = prev.findIndex((c) => c.id === course.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = course;
        return updated;
      }
      return [course, ...prev];
    });
    notify('success', 'Course Saved', `Course "${course.titleEn}" saved successfully.`);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    notify('info', 'Course Deleted', 'The course was removed from the catalog.');
  };

  const saveArticle = (article: Article) => {
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === article.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = article;
        return updated;
      }
      return [article, ...prev];
    });
    notify('success', 'Article Saved', `Article "${article.titleEn}" saved.`);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    notify('info', 'Article Deleted', 'The article was removed.');
  };

  const saveBooklet = (booklet: Booklet) => {
    setBooklets((prev) => {
      const idx = prev.findIndex((b) => b.id === booklet.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = booklet;
        return updated;
      }
      return [booklet, ...prev];
    });
    notify('success', 'Booklet Saved', `Booklet "${booklet.titleEn}" saved.`);
  };

  const deleteBooklet = (id: string) => {
    setBooklets((prev) => prev.filter((b) => b.id !== id));
    notify('info', 'Booklet Deleted', 'The booklet was removed.');
  };

  const saveVideoLecture = (video: VideoLecture) => {
    setVideoLectures((prev) => {
      const idx = prev.findIndex((v) => v.id === video.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = video;
        return updated;
      }
      return [video, ...prev];
    });
    notify('success', 'Video Saved', `Video lecture "${video.titleEn}" saved.`);
  };

  const deleteVideoLecture = (id: string) => {
    setVideoLectures((prev) => prev.filter((v) => v.id !== id));
    notify('info', 'Video Deleted', 'The video lecture was removed.');
  };

  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === slide.id ? slide : s)));
    notify('success', 'Slide Updated', 'Homepage hero slide updated.');
  };

  // Orders & Purchases
  const processPurchase = async (
    product: { type: 'course' | 'video' | 'booklet'; id: string; title: string; pricePkr: number },
    provider: 'Stripe' | 'WhatsApp / Manual Bank Transfer',
    reference?: string
  ): Promise<boolean> => {
    if (!currentUser) {
      setAuthModalOpen('login');
      notify('info', 'Sign in Required', 'Please sign in to proceed with order verification.');
      return false;
    }

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: `SW-ORD-${Date.now().toString().slice(-6)}`,
      userEmail: currentUser.email,
      customerName: currentUser.name,
      productId: product.id,
      productType: product.type,
      productTitle: product.title,
      amountPkr: product.pricePkr,
      currency: 'PKR',
      paymentProvider: provider,
      transactionReference: reference || `REF-${Date.now().toString().slice(-4)}`,
      status: 'completed',
      purchaseDate: new Date().toLocaleDateString('en-GB'),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Grant access
    const updatedPurchases = [...currentUser.purchasedProductIds, product.id];
    let updatedEnrolled = [...currentUser.enrolledCourseIds];
    if (product.type === 'course' && !updatedEnrolled.includes(product.id)) {
      updatedEnrolled.push(product.id);
    }

    const updatedUser: User = {
      ...currentUser,
      purchasedProductIds: updatedPurchases,
      enrolledCourseIds: updatedEnrolled,
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    notify('success', 'Access Granted', `You now have full access to ${product.title}`);
    return true;
  };

  // Multi-lingual search: English, Urdu, and Roman Urdu mapping
  const searchContent = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { courses: [], articles: [], videos: [], booklets: [], categories: [] };
    }

    // Roman Urdu synonyms dictionary
    const romanUrduMap: Record<string, string[]> = {
      baloghat: ['بلوغت', 'puberty', 'adolescence', 'sex-education'],
      tarbiyat: ['تربیت', 'parenting', 'بچوں'],
      bachay: ['بچے', 'بچوں', 'parenting', 'children'],
      jazbaat: ['جذبات', 'emotional', 'intelligence'],
      rishtay: ['رشتے', 'relationships', 'marriage', 'تعلقات'],
      shadi: ['شادی', 'marriage', 'ازدواجی'],
      sehat: ['صحت', 'health', 'wellbeing'],
      gussa: ['غصہ', 'anger', 'emotional'],
    };

    const expandedTerms = [q];
    Object.entries(romanUrduMap).forEach(([roman, aliases]) => {
      if (q.includes(roman)) {
        expandedTerms.push(...aliases);
      }
    });

    const matches = (text: string = '') => {
      const lower = text.toLowerCase();
      return expandedTerms.some((term) => lower.includes(term));
    };

    return {
      courses: courses.filter(
        (c) =>
          matches(c.titleEn) ||
          matches(c.titleUr) ||
          matches(c.descriptionEn) ||
          matches(c.descriptionUr) ||
          matches(c.category)
      ),
      articles: articles.filter(
        (a) =>
          matches(a.titleEn) ||
          matches(a.titleUr) ||
          matches(a.excerptUr) ||
          matches(a.contentUr) ||
          matches(a.category) ||
          a.tags.some((t) => matches(t))
      ),
      videos: videoLectures.filter(
        (v) => matches(v.titleEn) || matches(v.titleUr) || matches(v.descriptionUr) || matches(v.category)
      ),
      booklets: booklets.filter(
        (b) =>
          matches(b.titleEn) ||
          matches(b.titleUr) ||
          matches(b.descriptionEn) ||
          matches(b.descriptionUr) ||
          matches(b.category)
      ),
      categories: categories.filter(
        (cat) => matches(cat.nameEn) || matches(cat.nameUr) || matches(cat.description) || matches(cat.slug)
      ),
    };
  };

  return (
    <AppContext.Provider
      value={{
        siteSettings,
        categories,
        courses,
        articles,
        videoLectures,
        booklets,
        anonymousQuestions,
        heroSlides,
        contributors,
        orders,
        users,
        currentUser,
        notifications,
        currentPath,
        navigate,
        authModalOpen,
        setAuthModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        askModalOpen,
        setAskModalOpen,
        checkoutProduct,
        setCheckoutProduct,
        notify,
        removeNotification,
        login,
        signup,
        logout,
        updateUserStatus,
        deleteUser,
        enrollCourse,
        completeLesson,
        toggleBookmarkArticle,
        rateArticleHelpful,
        hasAccessToProduct,
        submitAnonymousQuestion,
        moderateQuestion,
        updateSiteSettings,
        saveCourse,
        deleteCourse,
        saveArticle,
        deleteArticle,
        saveBooklet,
        deleteBooklet,
        saveVideoLecture,
        deleteVideoLecture,
        updateHeroSlide,
        processPurchase,
        searchContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
