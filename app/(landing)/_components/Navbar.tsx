import { MobileNavToggle } from "./MobileNavToggle";
import { CTAButton } from "./CTAButton";

/**
 * @component Navbar
 * @type React Server Component
 * @description Sticky header with logo, navigation links, and CTAs.
 * @seo Provides crawler-accessible standard <nav> links.
 */
export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-(--outline-variant)/15">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-(--primary) font-display font-extrabold text-(length:--font-heading-sm) flex items-center gap-2 tracking-tight"
          >
            Interview
            <span className="text-(--on-surface) font-medium">IQ</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-(length:--font-body-lg) text-(--on-surface-variant) uppercase tracking-wide">
          <a
            href="#features"
            className="hover:text-(--primary) transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-(--primary) transition-colors"
          >
            How It Works
          </a>
          {/* <a
            href="#pricing"
            className="hover:text-(--primary) transition-colors"
          >
            Pricing
          </a> */}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <CTAButton
            variant="tertiary"
            className="text-(--on-surface)"
            href="/login"
          >
            Sign In
          </CTAButton>
          <CTAButton variant="primary" href="/signup">
            Get Started
          </CTAButton>
        </div>

        {/* Mobile Toggle */}
        <MobileNavToggle />
      </div>
    </header>
  );
};
