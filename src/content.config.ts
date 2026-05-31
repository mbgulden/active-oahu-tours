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

export const collections = { tours: toursCollection };
