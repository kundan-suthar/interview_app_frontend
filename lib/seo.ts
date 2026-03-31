import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://antigravity.com';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function constructMetadata({
  title = "Practice interviews with AI. Land the job you want.",
  description = "InterviewIQ simulates real interview scenarios using AI — giving you instant feedback, industry-specific questions, and the confidence to perform.",
  image = "/og-image.png",
  url = siteUrl,
}: SEOProps = {}): Metadata {
  return {
    title: {
      default: `AntiGravity | ${title}`,
      template: `%s | AntiGravity`
    },
    description,
    openGraph: {
      title: `AntiGravity | ${title}`,
      description,
      url,
      siteName: "AntiGravity",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AntiGravity | ${title}`,
      description,
      images: [image],
      creator: "@antigravity",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    }
  };
}
