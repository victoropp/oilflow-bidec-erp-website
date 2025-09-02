import { createClient, Entry } from 'contentful';
import type { ContentfulEntry } from '@/types/global';

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Content type interfaces
export interface BlogPostContent {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text field
  featuredImage: any;
  author: any;
  publishedDate: string;
  tags: string[];
  category: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface CaseStudyContent {
  title: string;
  slug: string;
  excerpt: string;
  company: string;
  industry: string;
  challenge: string;
  solution: any; // Rich text field
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  featuredImage: any;
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  publishedDate: string;
  tags: string[];
}

export interface FeatureContent {
  title: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  benefits: string[];
  useCases: any; // Rich text field
  technicalSpecs?: any; // Rich text field
  screenshots?: any[];
  order: number;
}

// Content fetching functions
export async function getBlogPosts(limit?: number): Promise<ContentfulEntry<BlogPostContent>[]> {
  try {
    const response = await contentfulClient.getEntries<BlogPostContent>({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
      limit: limit || 50,
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<ContentfulEntry<BlogPostContent> | null> {
  try {
    const response = await contentfulClient.getEntries<BlogPostContent>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getCaseStudies(limit?: number): Promise<ContentfulEntry<CaseStudyContent>[]> {
  try {
    const response = await contentfulClient.getEntries<CaseStudyContent>({
      content_type: 'caseStudy',
      order: '-fields.publishedDate',
      limit: limit || 20,
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getCaseStudy(slug: string): Promise<ContentfulEntry<CaseStudyContent> | null> {
  try {
    const response = await contentfulClient.getEntries<CaseStudyContent>({
      content_type: 'caseStudy',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function getFeatures(category?: string): Promise<ContentfulEntry<FeatureContent>[]> {
  try {
    const query: any = {
      content_type: 'feature',
      order: 'fields.order',
    };
    
    if (category) {
      query['fields.category'] = category;
    }
    
    const response = await contentfulClient.getEntries<FeatureContent>(query);
    return response.items;
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}

// Helper functions
export function getImageUrl(asset: any, width?: number, height?: number, quality: number = 80): string {
  if (!asset?.fields?.file?.url) return '';
  
  let url = asset.fields.file.url;
  if (url.startsWith('//')) {
    url = `https:${url}`;
  }
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', 'webp');
  
  return `${url}?${params.toString()}`;
}

export function getAssetDimensions(asset: any): { width: number; height: number } | null {
  if (!asset?.fields?.file?.details?.image) return null;
  
  return {
    width: asset.fields.file.details.image.width,
    height: asset.fields.file.details.image.height,
  };
}

// Cache configuration for better performance
export const CACHE_TAGS = {
  BLOG_POSTS: 'blog-posts',
  CASE_STUDIES: 'case-studies', 
  FEATURES: 'features',
  GLOBAL: 'global-content',
} as const;

// Revalidation intervals (in seconds)
export const REVALIDATION_TIME = {
  STATIC_CONTENT: 60 * 60 * 24, // 24 hours
  DYNAMIC_CONTENT: 60 * 60, // 1 hour
  REAL_TIME: 60, // 1 minute
} as const;