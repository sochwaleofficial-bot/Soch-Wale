export type CategorySlug =
  | 'sex-education'
  | 'parenting'
  | 'emotional-intelligence'
  | 'relationships'
  | 'marriage'
  | 'adolescence'
  | 'health-wellbeing'
  | 'personal-development'
  | 'miscellaneous';

export interface Category {
  id: string;
  slug: CategorySlug;
  nameEn: string;
  nameUr: string;
  description: string;
  icon: string;
  contentCount: {
    articles: number;
    courses: number;
    videos: number;
    booklets: number;
  };
}

export interface Lesson {
  id: string;
  titleEn: string;
  titleUr: string;
  type: 'article' | 'video' | 'booklet';
  duration?: string;
  isFreePreview: boolean;
  contentUr?: string;
  videoUrl?: string;
}

export interface CourseModule {
  id: string;
  titleEn: string;
  titleUr: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  category: CategorySlug;
  thumbnail: string;
  pricePkr: number;
  isFree: boolean;
  duration: string;
  learnerCount: number;
  rating?: number;
  ratingCount?: number;
  modules: CourseModule[];
  articleCount: number;
  videoCount: number;
  bookletCount: number;
  learningObjectives: string[];
  intendedAudience: string[];
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  faqs: { question: string; answer: string }[];
  isFeatured?: boolean;
  status: 'published' | 'draft';
}

export interface Article {
  id: string;
  slug: string;
  titleEn: string;
  titleUr: string;
  excerptUr: string;
  contentUr: string;
  featuredImage: string;
  category: CategorySlug;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  reviewer?: {
    name: string;
    role: string;
    verified: boolean;
  };
  readingTimeMin: number;
  publishedDate: string;
  lastReviewedDate?: string;
  tags: string[];
  isFeatured?: boolean;
  helpfulYesCount: number;
  helpfulNoCount: number;
  isFree: boolean;
}

export interface VideoLecture {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionUr: string;
  category: CategorySlug;
  duration: string;
  thumbnail: string;
  isFree: boolean;
  pricePkr: number;
  videoUrl: string;
  viewsCount?: number;
}

export interface Booklet {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  category: CategorySlug;
  coverImage: string;
  pageCount: number;
  chapterCount: number;
  format: 'PDF Guide' | 'eBook';
  isFree: boolean;
  pricePkr: number;
  downloadUrl?: string;
  chapters: { number: number; titleUr: string; pages: string }[];
}

export interface AnonymousQuestion {
  id: string;
  category: CategorySlug;
  questionText: string;
  ageRange?: string;
  emailOptional?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  answerUr?: string;
  answeredBy?: string;
  answeredDate?: string;
}

export interface HeroSlide {
  id: string;
  category: string;
  categorySlug: CategorySlug;
  titleUr: string;
  supportingTextEn: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
  isCustomBanner?: boolean;
}

export interface Contributor {
  id: string;
  name: string;
  nameUr: string;
  role: string;
  avatar: string;
  bio: string;
  verifiedQualifications: string[];
  isDemonstration: boolean;
  areasOfExpertise: string[];
  articlesCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'student';
  status: 'active' | 'pending' | 'suspended';
  registeredDate: string;
  enrolledCourseIds: string[];
  courseProgress: Record<string, { completedLessonIds: string[]; percentage: number }>;
  purchasedProductIds: string[];
  bookmarkedArticleIds: string[];
  certificates: {
    id: string;
    courseId: string;
    courseTitleUr: string;
    issueDate: string;
    certificateNumber: string;
  }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userEmail: string;
  customerName: string;
  productId: string;
  productType: 'course' | 'video' | 'booklet';
  productTitle: string;
  amountPkr: number;
  currency: 'PKR';
  paymentProvider: 'Stripe' | 'WhatsApp / Manual Bank Transfer';
  transactionReference: string;
  status: 'completed' | 'pending_verification' | 'refunded' | 'failed';
  purchaseDate: string;
}

export interface SiteSettings {
  brandName: string;
  brandNameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  whatsAppNumber: string;
  whatsAppLink: string;
  superAdminEmail: string;
  registrationPolicy: 'auto_approve' | 'require_admin_approval';
  stripeConfig: {
    mode: 'test' | 'live';
    publishableKey: string;
    secretKeyConfigured: boolean;
    webhookSecretConfigured: boolean;
  };
}
