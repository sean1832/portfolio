import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://zekezhang.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://zekezhang.com/shara-clarke",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://zekezhang.com/modular",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://zekezhang.com/zeke-zhang/synthetic-dunescapes",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://zekezhang.com/zeke-zhang/jakarta-rising",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://zekezhang.com/zeke-zhang/terra-form",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://zekezhang.com/zeke-zhang/mongrel-assembly",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
