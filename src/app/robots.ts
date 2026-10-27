import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://www.sultanfatih.k12.tr/sitemap.xml",
    host: "https://www.sultanfatih.k12.tr",
  };
}
