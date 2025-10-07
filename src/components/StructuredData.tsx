interface ACPStructuredDataProps {
  type: 'website' | 'organization' | 'software' | 'collection' | 'itemList';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function StructuredData({ type, data }: ACPStructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ACP Market",
          "alternateName": "Agentic Commerce Protocol Market",
          "url": "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app",
          "description": "The premier directory for Agentic Commerce Protocol (ACP) servers and clients. Discover AI agent commerce tools, infrastructure, and automation solutions.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://github.com/fanfcorp/acp-market",
            "https://twitter.com/acpmarket"
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ACP Market",
          "url": "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app",
          "logo": "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/logo.png",
          "description": "The premier directory for Agentic Commerce Protocol (ACP) servers and clients",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@acpmarket.dev"
          },
          "sameAs": [
            "https://github.com/fanfcorp/acp-market",
            "https://twitter.com/acpmarket"
          ]
        };

      case 'software':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data.name,
          "description": data.description,
          "url": data.website || `https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/acp/${data.slug}`,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": data.tier === 'free' ? "0" : "49",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31"
          },
          "aggregateRating": data.stars > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "ratingCount": data.stars,
            "bestRating": "5",
            "worstRating": "1"
          } : undefined,
          "author": {
            "@type": "Organization",
            "name": data.submitterCompany || data.submitterName
          },
          "keywords": data.tags.join(", "),
          "softwareVersion": "1.0",
          "datePublished": data.createdAt,
          "dateModified": data.updatedAt,
          "programmingLanguage": "JavaScript",
          "runtimePlatform": "Node.js"
        };

      case 'collection':
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": data.name,
          "description": data.description,
          "url": `https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/categories/${data.slug}`,
          "mainEntity": {
            "@type": "ItemList",
            "name": `${data.name} ACP Servers`,
            "description": `Collection of Agentic Commerce Protocol servers in the ${data.name} category`,
            "numberOfItems": data.count
          }
        };

      case 'itemList':
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": data.name,
          "description": data.description,
          "url": data.url,
          "numberOfItems": data.items?.length || 0,
          "itemListElement": data.items?.map((item: any, index: number) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": item.name,
              "description": item.description,
              "url": item.website || `https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/acp/${item.slug}`,
              "applicationCategory": "DeveloperApplication"
            }
          })) || []
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
