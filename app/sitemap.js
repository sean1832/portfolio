import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://zekezhang.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
