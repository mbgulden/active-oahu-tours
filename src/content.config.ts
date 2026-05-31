import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const toursCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['kayak', 'ebike', 'snorkel', 'hike', 'surf']),
    duration: z.string(),
    price: z.number(),
    priceLabel: z.string().optional(),
    difficulty: z.enum(['easy', 'moderate', 'challenging']),
    location: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
    minGuests: z.number().default(1),
    maxGuests: z.number().default(12),
    highlights: z.array(z.string()).default([]),
    includes: z.array(z.string()).default([]),
    whatToBring: z.array(z.string()).default([]),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  }),
});

const guidesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['kayaking', 'snorkeling', 'ebike', 'hiking', 'local-tips', 'wildlife', 'planning']),
    excerpt: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    author: z.string().default('Active Oahu Tours'),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    featured: z.boolean().default(false),
    readTime: z.string(),
    tags: z.array(z.string()).default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().default(''),
    pageType: z.string().default('blog'),
    oldUrl: z.string().default(''),
    newUrl: z.string().default(''),
    publishedDate: z.coerce.date().default(() => new Date()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { tours: toursCollection, guides: guidesCollection, blog: blogCollection };
