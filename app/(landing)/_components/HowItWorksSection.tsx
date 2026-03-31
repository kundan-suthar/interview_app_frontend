/**
 * @component HowItWorksSection
 * @type React Server Component
 * @description 3-step process section with floating cards on dot-grid surface.
 * @seo Content fully server-rendered.
 */
import { FileText, Briefcase, Mic } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Upload Your Resume",
    description:
      "Our AI analyzes your experience to tailor questions specifically to your professional background.",
    icon: FileText,
    colorClass: "text-(--primary)",
  },
  {
    id: "02",
    title: "Pick Your Role",
    description:
      "Choose from 500+ job titles or paste a job description to simulate a specific target interview.",
    icon: Briefcase,
    colorClass: "text-(--primary-container)",
  },
  {
    id: "03",
    title: "Start Practicing",
    description:
      "Engage in a live voice or text session and receive detailed feedback immediately after.",
    icon: Mic,
    colorClass: "text-(--secondary)",
  },
];

const HowItWorksCard = ({ step }: { step: (typeof steps)[number] }) => (
  <article className="p-8 bg-(--surface-container-highest) rounded-md flex flex-col gap-4 relative isolate hover:ambient-glow transition-shadow duration-300">
    <div
      className={`w-12 h-12 bg-(--surface-container-lowest) border border-(--outline-variant)/20 rounded-full flex items-center justify-center mb-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${step.colorClass}`}
    >
      <step.icon size={20} />
    </div>

    <div>
      <span
        className={`text-(length:--font-body-md) uppercase font-bold tracking-wider mb-1 block ${step.colorClass}`}
      >
        Step {step.id}
      </span>
      <h3 className="text-(length:--font-body-lg) font-display text-(--on-surface) leading-tight mb-3">
        {step.title}
      </h3>
      <p className="font-body text-(length:--font-body-md) text-(--on-surface-variant) leading-relaxed">
        {step.description}
      </p>
    </div>
  </article>
);

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 relative"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-0 bg-(--surface-container) pointer-events-none -z-10 dot-grid"></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col gap-2 mb-12">
          <p className="text-(length:--font-heading-sm) text-(--on-surface) font-body tracking-widest uppercase">
            Land your dream job in 3 steps
          </p>
          <span className="inline-block w-24 h-[2px] bg-(--primary) font-weight-bold mr-3 align-middle"></span>
          <h2 id="how-it-works-heading" className="hidden">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <HowItWorksCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};
