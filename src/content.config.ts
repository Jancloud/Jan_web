import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    isFeatured: z.boolean().default(false)
  })
});

export const collections = {
  projects
};