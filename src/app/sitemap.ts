import type { MetadataRoute } from "next";

const BASE = "https://www.sultanfatih.k12.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/on-kayit", priority: 0.95, changeFrequency: "monthly" },
    { path: "/kayit-burslar", priority: 0.9, changeFrequency: "monthly" },
    { path: "/kademeler", priority: 0.85, changeFrequency: "monthly" },
    { path: "/kampusler", priority: 0.85, changeFrequency: "monthly" },
    { path: "/kurumsal", priority: 0.7, changeFrequency: "monthly" },
    { path: "/iletisim", priority: 0.8, changeFrequency: "monthly" },
  ];
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
