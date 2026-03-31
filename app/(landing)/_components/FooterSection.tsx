/**
 * @component FooterSection
 * @type React Server Component
 * @description Standard footer with logo, three columns of links array, copyright.
 * @seo Provides crawler-accessible standard <nav> links.
 */

export const FooterSection = () => {
  return (
    <footer className="bg-(--surface-container-low) pt-16 pb-8 border-t border-(--outline-variant)/10">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <a
              href="/"
              className="text-(--primary) font-display font-extrabold text-(length:--font-heading-sm) flex items-center gap-2 tracking-tight"
            >
              Interview
              <span className="text-(--on-surface) font-medium">IQ</span>
            </a>
            <p className="font-body text-(length:--font-body-md) text-(--on-surface-variant) max-w-xs mt-2">
              AI-driven interview prep designed to help you crush your next job
              interview.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 text-(length:--font-body-md)">
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-(--on-surface) uppercase tracking-wider mb-2">
                Product
              </h3>
              <a
                href="#features"
                className="font-body text-(--on-surface-variant) hover:text-(--primary) transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="font-body text-(--on-surface-variant) hover:text-(--primary) transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="font-body text-(--on-surface-variant) hover:text-(--primary) transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-(--on-surface) uppercase tracking-wider mb-2">
                Company
              </h3>
              <a
                href="#about"
                className="font-body text-(--on-surface-variant) hover:text-(--primary) transition-colors"
              >
                Twitter
              </a>
              <a
                href="#contact"
                className="font-body text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#careers"
                className="font-body text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"
              >
                Contact Us
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-[var(--on-surface)] uppercase tracking-wider mb-2">
                Legal
              </h3>
              <a
                href="/privacy"
                className="font-body text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="font-body text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--outline-variant)]/15 text-[var(--label-md)] text-[var(--on-surface-variant)]">
          <p>© {new Date().getFullYear()} InterviewIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
