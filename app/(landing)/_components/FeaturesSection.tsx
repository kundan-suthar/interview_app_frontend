/**
 * @component FeaturesSection
 * @type React Server Component
 * @description 2x3 grid of feature cards.
 * @seo Features fully server-rendered.
 */
import {
  MessageSquare,
  Zap,
  Target,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Questions",
      description:
        "Questions that adapt in real-time based on your previous answers, mimicking a real human flow.",
      icon: <MessageSquare size={24} />,
    },
    {
      title: "Real-Time Feedback",
      description:
        "Instant analysis of your tone, pacing, and content quality with actionable improvement tips.",
      icon: <Zap size={24} />,
    },
    {
      title: "Role-Specific Scenarios",
      description:
        "From a FAANG engineered to front-team managers, we cover industry-standard technical rounds.",
      icon: <Target size={24} />,
    },
    {
      title: "Behavioral & Technical",
      description:
        "Switch between soft-skill STAR method practice and deep-dive technical architecture rounds.",
      icon: <Users size={24} />,
    },
    {
      title: "Progress Tracking",
      description:
        "Watch your confidence score grow over time with detailed performance history charts.",
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Resume-Aware Interviews",
      description:
        "Our AI grills you on your specific project details just like a real hiring manager would.",
      icon: <FileText size={24} />,
    },
  ];

  return (
    <section
      id="features"
      className="py-16 bg-(--surface-dim)"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center">
          <h2
            id="features-heading"
            className="font-display font-bold text-(length:--font-heading-md) text-(--on-surface) mb-4"
          >
            Everything you need to prepare
          </h2>
          <p className="font-body text-(length:--font-body-lg) text-(--on-surface-variant)">
            Designed by recruitment experts and powered by state-of-the-art
            language models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <article
              key={idx}
              className="p-8 bg-(--surface-container-highest) rounded-md flex flex-col gap-4 border border-(--outline-variant)/10 hover:ambient-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-(--surface-container-lowest) rounded-full flex items-center justify-center text-(--primary) mb-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-(length:--font-body-lg) text-(--on-surface)">
                {feature.title}
              </h3>
              <p className="font-body text-(length:--font-body-md) text-(--on-surface-variant) leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
