/**
 * @component PricingSection
 * @type React Server Component
 * @description Two-card pricing layout with Free and Pro tiers.
 * @seo Pricing fully server-rendered.
 */
import { Check } from "lucide-react";
import { CTAButton } from "./CTAButton";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-16" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2
            id="pricing-heading"
            className="font-display font-bold text-(length:--font-heading-md) text-(--on-surface)"
          >
            Simple, transparent pricing
          </h2>
          <p className="font-body text-(length:--font-body-md) text-(--on-surface-variant) mt-4">
            Invest in your career. Pay once or stay as long as you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Tier */}
          <article className="p-8 bg-(--surface-container-high) rounded-md flex flex-col relative">
            <h3 className="font-display font-bold text-(length:--font-body-lg) text-(--on-surface)">
              Free
            </h3>
            <div className="mt-4 mb-8 flex items-end">
              <span className="font-display font-bold text-(length:--font-heading-sm) text-(--on-surface) leading-none">
                $0
              </span>
              <span className="font-body text-(length:--font-body-md) text-(--on-surface-variant) ml-2 pb-1">
                /mo
              </span>
            </div>

            <ul className="flex flex-col gap-4 font-body text-(length:--font-body-md) text-(--on-surface-variant) mb-12 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>3 AI Interviews per month</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Basic AI Feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Access to General Role Prep</span>
              </li>
            </ul>

            <CTAButton
              variant="secondary"
              className="w-full text-center mt-auto py-4 bg-transparent border border-(--outline-variant)/30 hover:bg-(--surface-container-highest)"
            >
              Current Plan
            </CTAButton>
          </article>

          {/* Pro Tier */}
          <article className="p-8 bg-(--surface-bright) rounded-md flex flex-col relative shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-(--outline-variant)/20 scale-100 md:scale-105 z-10">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-(--primary-container) text-(--surface-container-lowest) text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(106,242,222,0.3)]">
              RECOMMENDED
            </div>

            <h3 className="font-display font-bold text-(length:--font-body-lg) text-(--on-surface) text-gradient">
              Pro
            </h3>
            <div className="mt-4 mb-8 flex items-end">
              <span className="font-display font-bold text-(length:--font-heading-sm) text-(--on-surface) leading-none">
                $19
              </span>
              <span className="font-body text-(length:--font-body-md) text-(--on-surface-variant) ml-2 pb-1">
                /mo
              </span>
            </div>

            <ul className="flex flex-col gap-4 font-body text-(length:--font-body-md) text-(--on-surface) mb-12 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Unlimited AI Interviews</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Advanced Voice Analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Custom Job Description Mode</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Interview Recording Playback</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-(--primary) mt-0.5 shrink-0" size={20} />
                <span>Export Performance Reports</span>
              </li>
            </ul>

            <CTAButton
              variant="primary"
              className="w-full text-center mt-auto py-4"
            >
              Get Started Pro
            </CTAButton>
          </article>
        </div>
      </div>
    </section>
  );
};
