import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/database';
import Blog from '@/models/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://apexhorizon.dev';

  // Base pages sitemap configuration
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/apexmanagement`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Fetch dynamic blog routes
  try {
    await connectToDatabase();
    const publishedBlogs = await Blog.find({ published: true })
      .select('slug updatedAt')
      .lean();

    const blogRoutes: MetadataRoute.Sitemap = publishedBlogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap dynamic routes:', error);
    return staticRoutes;
  }
}
