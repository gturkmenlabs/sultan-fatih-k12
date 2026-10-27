import type { MetadataRoute } from "next";

const BASE = "https://www.sultanfatih.k12.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/on-kayit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
