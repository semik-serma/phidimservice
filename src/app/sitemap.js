
export default function sitemap() {
  const baseUrl = "https://phidimservice.com.np";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }
  ];
}