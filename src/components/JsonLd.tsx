/**
 * JSON-LD Structured Data components for Revive
 * Improves SEO via rich snippets and better indexing
 */

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Revive",
    url: "https://revive-hq.com",
    logo: "https://revive-hq.com/icon.svg",
    description:
      "Revive helps SaaS companies recover failed payments and win back churned subscribers with AI-powered smart retries and high-converting dunning emails.",
    sameAs: ["https://twitter.com/revivehq"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://revive-hq.com/docs",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Revive",
    url: "https://revive-hq.com",
    description:
      "Recover failed payments and win back canceled subscribers with AI-powered dunning.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://revive-hq.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Revive",
    url: "https://revive-hq.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Revive recovers failed payments and wins back canceled SaaS subscribers. AI-powered smart retries analyze decline codes for optimal retry timing. High-converting dunning emails with one-click card updates. Win-back campaigns at 7, 14, and 30 days. Supports Stripe, Lemon Squeezy, Gumroad, Paddle, and Polar.sh.",
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "49",
        priceCurrency: "USD",
        billingDuration: "P1M",
        unitText: "month",
      },
    },
    featureList: [
      "AI-powered smart payment retries",
      "High-converting dunning emails",
      "One-click card update links",
      "Win-back campaigns for canceled subscribers",
      "Stripe integration",
      "Lemon Squeezy integration",
      "Gumroad integration",
      "Paddle integration",
      "Polar.sh integration",
      "Real-time revenue recovery dashboard",
      "No revenue share — flat $49/month",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    screenshot: "https://revive-hq.com/opengraph-image",
    softwareVersion: "1.0",
    creator: {
      "@type": "Organization",
      name: "Revive",
      url: "https://revive-hq.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
