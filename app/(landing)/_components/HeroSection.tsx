/**
 * @component HeroSection
 * @type React Server Component
 * @description Above-the-fold hero with H1, CTAs, social proof, and AI panel visual.
 * @seo H1 tag present, content fully server-rendered, no "use client"
 */
import Image from "next/image";
import { CTAButton } from "./CTAButton";

export const HeroSection = () => {
  return (
    <section
      className="relative pt-16 pb-12 lg:pt-32 lg:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content (60%) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-8 z-20">
          <h1
            id="hero-heading"
            className="font-display font-extrabold text-(length:--font-heading-lg) leading-[1.1] tracking-[-0.02em] text-(--on-surface) max-w-2xl"
          >
            Practice interviews with AI.
            {/* <br className="hidden md:block" /> */}
            <span className="text-(--primary)"> Land the job you want.</span>
          </h1>

          <p className="font-body text-(length:--font-body-lg) text-(--on-surface-variant) max-w-xl leading-relaxed">
            InterviewIQ simulates real interview scenarios using AI — giving you
            instant feedback, industry-specific questions, and the confidence to
            perform under pressure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <CTAButton
              variant="primary"
              className="py-4 px-8 text-lg"
              href="/dashboard"
            >
              Start for Free
            </CTAButton>
            <CTAButton
              variant="secondary"
              className="border border-(--outline-variant)/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)] py-4 px-8 text-lg"
              href="#how-it-works"
            >
              See How It Works
            </CTAButton>
          </div>

          {/* Social Proof */}
          {/* <div className="flex items-center gap-4 mt-8 pt-6 border-t border-(--outline-variant)/15">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-(--surface-container-highest) border-2 border-(--surface) relative overflow-hidden flex items-center justify-center text-(--label-md) text-(--primary)">
                G
              </div>
              <div className="w-8 h-8 rounded-full bg-(--surface-container-high) border-2 border-(--surface) relative overflow-hidden flex items-center justify-center text-(--label-md) text-(--secondary)">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-(--surface-bright) border-2 border-(--surface) relative overflow-hidden flex items-center justify-center text-(--label-md) text-(--primary-container)">
                M
              </div>
            </div>
            <p className="text-(length:--body-md) text-(--on-surface-variant)">
              Trusted by 12,000+ job seekers at{" "}
              <span className="text-(--on-surface)">
                Google, Amazon, and Meta
              </span>
            </p>
          </div> */}
        </div>

        {/* Right Content (40%) - AI Panel Visual */}
        <div className="col-span-1 lg:col-span-5 relative w-full h-[300px] lg:h-[450px] lg:ml-8">
          <div className="absolute inset-0 bg-[#38fbf7] opacity-5 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

          {/* Glassmorphism Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[120%] h-[280px] lg:h-[380px] bg-(--surface-container)/60 backdrop-blur-xl border border-(--outline-variant)/20 rounded-2xl shadow-[0_0_80px_rgba(10,20,40,0.8)] overflow-hidden flex flex-col">
            {/* Window Header */}
            <div className="h-10 border-b border-(--outline-variant)/15 flex items-center px-4 gap-2 bg-(--surface-container-lowest)/50">
              <div className="w-2.5 h-2.5 rounded-full bg-(--outline-variant)/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-(--outline-variant)/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-(--outline-variant)/40"></div>
              <span className="ml-4 text-[10px] uppercase font-bold tracking-widest text-(--on-surface-variant)/70">
                Live Analysis
              </span>
            </div>

            {/* Waveform Visualization area */}
            <div className="flex-1 p-6 flex flex-col justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyM0MjQ4NTgnIGZpbGwtb3BhY2l0eT0nMC4wNScvPjwvc3ZnPg==')]">
              {/* Simulated Waveform (CSS) */}
              <div className="flex items-center justify-center gap-[2px] h-[100px] w-full mt-4">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-(--primary)/80 rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]"
                    style={{
                      height: `${Math.max(10, Math.sin(i * 0.4) * 50 + Math.random() * 40)}px`,
                      animationDelay: `${i * 0.05}s`,
                      opacity: Math.max(0.2, Math.sin(i * 0.2)),
                    }}
                  ></div>
                ))}
              </div>

              <div className="mt-auto text-center">
                <p className="text-(--secondary) font-mono text-sm shadow-[0_0_10px_rgba(56,251,247,0.3)]">
                  &quot;Tell me about a time you...&quot;
                </p>
                <div className="h-1 w-full max-w-[200px] bg-(--surface-container-high) rounded-full mx-auto mt-4 overflow-hidden">
                  <div className="h-full bg-(--primary) w-[65%] shadow-[0_0_10px_var(--primary)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-(--surface-container-low) rounded-bl-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-(--primary) opacity-[0.02] blur-[150px] -z-10 rounded-full"></div>
    </section>
  );
};
