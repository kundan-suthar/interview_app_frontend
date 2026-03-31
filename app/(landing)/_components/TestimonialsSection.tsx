/**
 * @component TestimonialsSection
 * @type React Server Component
 * @description 3-column card grid with user testimonials.
 * @seo User reviews fully server-rendered.
 */
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya S.",
      role: "Software Engineer",
      initials: "PS",
      content: "InterviewIQ was the only reason I stayed calm during my Google onsite. The AI predicted 3 of the behavioral questions perfectly.",
    },
    {
      name: "Marcus D.",
      role: "Product Manager",
      initials: "MD",
      content: "The feedback on my pacing was a game changer. I didn't realize I was rushing until I saw the AI analysis report.",
    },
    {
      name: "Jessica L.",
      role: "Data Analyst",
      initials: "JL",
      content: "The technical rounds for SQL and Python were surprisingly tough — just like the real thing. Highly recommended for any tech role.",
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-[var(--spacing-16)] relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-[var(--surface-container-lowest)] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-[var(--spacing-8)] lg:px-[var(--spacing-16)]">
        
        <div className="text-center mb-[var(--spacing-12)]">
          <h2 
            id="testimonials-heading" 
            className="font-display font-bold text-[var(--headline-lg)] text-[var(--on-surface)]"
          >
            What our users say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <article 
              key={idx}
              className="p-8 bg-[var(--surface-container)] rounded-[var(--radius-md)] flex flex-col gap-6 relative isolate shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-[var(--outline-variant)]/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--surface-container-highest)] flex items-center justify-center font-bold text-[var(--primary)] text-[var(--label-md)] border border-[var(--outline-variant)]/20 shadow-inner">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[length:var(--body-lg)] text-[var(--on-surface)]">
                    {testimonial.name}
                  </h3>
                  <p className="font-body text-[var(--label-md)] text-[var(--on-surface-variant)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 text-[var(--primary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="font-body text-[length:var(--body-lg)] text-[var(--on-surface-variant)] italic flex-grow">
                &quot;{testimonial.content}&quot;
              </p>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
};
