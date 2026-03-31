/**
 * @component CTAButton
 * @type Client Component
 * @description Button with primary gradient hover animations.
 * @seo Does not render primary text content
 */
"use client";

import React, { ButtonHTMLAttributes } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  href?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 font-semibold transition-all duration-300 ease-out shadow-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] text-[var(--font-body)]  text-(length:--font-body-lg)";

  const variants = {
    primary:
      "bg-primary-gradient text-[var(--surface-container-lowest)] rounded-[var(--radius-md)] hover:scale-105 hover:shadow-[0_0_20px_rgba(106,242,222,0.4)]",
    secondary:
      "bg-[var(--surface-container-highest)] text-[var(--primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface-bright)]",
    tertiary:
      "text-[var(--on-surface)] bg-transparent rounded-full hover:bg-[var(--surface-container-low)] px-4",
  };

  const Component = href ? "a" : "button";
  const additionalProps = href ? { href } : {};

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...additionalProps}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};
