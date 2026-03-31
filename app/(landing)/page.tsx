import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import {
  getWebsiteSchema,
  getOrganizationSchema,
  getProductSchema,
} from "@/lib/structured-data";

// Components
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/HeroSection";
import { HowItWorksSection } from "./_components/HowItWorksSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { PricingSection } from "./_components/PricingSection";
import { FooterSection } from "./_components/FooterSection";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata();
}

/**
 * @component LandingPage
 * @type React Server Component
 * @description Entry router component for landing page.
 * @seo Full SSR, SEO-optimized, injects JSON-LD script.
 */
export default function LandingPage() {
  const websiteSchema = getWebsiteSchema();
  const organizationSchema = getOrganizationSchema();
  const productSchema = getProductSchema();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, organizationSchema, productSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen relative overflow-hidden">
        <Navbar />

        <main className="flex-grow flex flex-col w-full relative z-10">
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          {/* <TestimonialsSection /> */}
          {/* <PricingSection /> */}
        </main>

        <FooterSection />
      </div>
    </>
  );
}
