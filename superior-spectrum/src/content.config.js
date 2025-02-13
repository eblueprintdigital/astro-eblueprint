import { defineCollection, z, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

const hero = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hero' }),
});

const service = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      // pubDate: z.date(),
      // isDraft: z.boolean().optional(),
    }),
});

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

const testimonial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  hero,
  service,
  testimonial,
  blog,
};
