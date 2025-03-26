import { defineCollection, z, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // description: z.string(),
      image: image(),
      date: z.date(),
      // isDraft: z.boolean().optional(),
    }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hero' }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/portfolios' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.string(),
      role: z.string(),
      website: z.string(),
      featuredImage: image(),
      //images: z.array(image()).optional(),
    }),
});

const service = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      // pubDate: z.date(),
      // isDraft: z.boolean().optional(),
    }),
});

const testimonial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  hero,
  service,
  testimonial,
  blog,
  portfolio,
};
