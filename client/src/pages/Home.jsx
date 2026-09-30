import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureGrid } from '../components/FeatureGrid';
import { MainProductSection } from '../components/MainProductSection';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { ProductBenefits } from '../components/ProductBenefits';
import { ComparisonTable } from '../components/ComparisonTable';
import { StatsSection } from '../components/StatsSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';

export const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeatureGrid />
      <MainProductSection />
      <TestimonialSlider />
      <ProductBenefits />
      <ComparisonTable />
      <StatsSection />
      <FAQAccordion />
      <CTASection />
    </div>
  );
};
