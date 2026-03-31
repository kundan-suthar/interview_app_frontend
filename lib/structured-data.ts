export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AntiGravity",
    "url": "https://antigravity.com",
    "description": "Practice interviews with AI. Land the job you want.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://antigravity.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AntiGravity",
    "url": "https://antigravity.com",
    "logo": "https://antigravity.com/logo.png",
    "sameAs": [
      "https://twitter.com/antigravity",
      "https://linkedin.com/company/antigravity"
    ]
  };
}

export function getProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AntiGravity Interview App",
    "description": "AI-powered interview simulation and preparation tool.",
    "brand": {
      "@type": "Brand",
      "name": "AntiGravity"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "19.00",
      "availability": "https://schema.org/InStock"
    }
  };
}
