import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { PopularArticles } from '../components/PopularArticles';
import { VideoLecturesSection } from '../components/VideoLecturesSection';
import { BookletsSection } from '../components/BookletsSection';
import { PopularCourses } from '../components/PopularCourses';
import { ExploreCategories } from '../components/ExploreCategories';
import { AskSochWaleSection } from '../components/AskSochWaleSection';
import { LatestFromSochWale } from '../components/LatestFromSochWale';
import { ContributorsSection } from '../components/ContributorsSection';
import { NewsletterSection } from '../components/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 2. Hero Slider (Four 16:9 editorial slides) */}
      <HeroSlider />

      {/* 3. Featured Courses */}
      <FeaturedCourses />

      {/* 4. Popular Articles */}
      <PopularArticles />

      {/* 5. Video Lectures */}
      <VideoLecturesSection />

      {/* 6. Booklets & Guides */}
      <BookletsSection />

      {/* 7. Popular Courses */}
      <PopularCourses />

      {/* 8. Explore Categories */}
      <ExploreCategories />

      {/* 9. Ask Soch Wale (Anonymous Questions) */}
      <AskSochWaleSection />

      {/* 10. Latest From Soch Wale (Mixed format feed) */}
      <LatestFromSochWale />

      {/* 11. Our Contributors */}
      <ContributorsSection />

      {/* 12. Newsletter */}
      <NewsletterSection />
    </main>
  );
};
