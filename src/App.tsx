import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotificationToasts } from './components/NotificationToast';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesCatalogPage } from './pages/CoursesCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ArticleReaderPage } from './pages/ArticleReaderPage';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { BookletDetailPage } from './pages/BookletDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AskPage } from './pages/AskPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { LegalPage } from './pages/LegalPage';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  // Router dispatcher
  const renderCurrentRoute = () => {
    // Exact paths
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/courses') {
      return <CoursesCatalogPage />;
    }
    if (currentPath.startsWith('/courses/')) {
      const slug = currentPath.replace('/courses/', '');
      return <CourseDetailPage slug={slug} />;
    }
    if (currentPath === '/articles') {
      return (
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-serif font-bold text-[#161616]">Educational Articles Library</h1>
            <p className="font-urdu text-lg text-[#B89A5A] mt-1">مضامین کا مکمل ذخیرہ — سائنسی و خاندانی رہنمائی</p>
          </div>
          <HomePage />
        </div>
      );
    }
    if (currentPath.startsWith('/articles/')) {
      const slug = currentPath.replace('/articles/', '');
      return <ArticleReaderPage slug={slug} />;
    }
    if (currentPath === '/videos') {
      return (
        <div className="pt-8 bg-[#0A0A0A] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-serif font-bold text-white">Video Lectures Collection</h1>
            <p className="font-urdu text-lg text-[#B89A5A] mt-1">ویڈیو لیکچرز — تفصیلی اسباق اور سیشنز</p>
          </div>
          <HomePage />
        </div>
      );
    }
    if (currentPath.startsWith('/videos/')) {
      const id = currentPath.replace('/videos/', '');
      return <VideoPlayerPage id={id} />;
    }
    if (currentPath === '/booklets') {
      return (
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-serif font-bold text-[#161616]">Booklets & Downloadable Guides</h1>
            <p className="font-urdu text-lg text-[#B89A5A] mt-1">کتابچے اور گائیڈز — ڈیجیٹل پی ڈی ایف مطالعہ</p>
          </div>
          <HomePage />
        </div>
      );
    }
    if (currentPath.startsWith('/booklets/')) {
      const id = currentPath.replace('/booklets/', '');
      return <BookletDetailPage id={id} />;
    }
    if (currentPath.startsWith('/category/')) {
      const slug = currentPath.replace('/category/', '');
      return <CategoryPage slug={slug} />;
    }
    if (currentPath === '/ask') {
      return <AskPage />;
    }
    if (currentPath === '/dashboard') {
      return <StudentDashboardPage />;
    }
    if (currentPath === '/admin') {
      return <AdminPanelPage />;
    }
    if (currentPath === '/editorial-standards') {
      return <LegalPage type="editorial-standards" />;
    }
    if (currentPath === '/about') {
      return <LegalPage type="about" />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy-policy" />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" />;
    }
    if (currentPath === '/refund-policy') {
      return <LegalPage type="refund-policy" />;
    }
    if (currentPath === '/contact') {
      return <LegalPage type="contact" />;
    }

    // Default fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#161616]">
      {/* 1. Sticky Black Header */}
      <Header />

      {/* Dynamic View Router */}
      <div className="flex-1">
        {renderCurrentRoute()}
      </div>

      {/* 13. Official Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <SearchModal />
      <AuthModal />
      <CheckoutModal />
      <NotificationToasts />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
