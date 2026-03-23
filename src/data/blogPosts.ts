import rawPosts from './generated/blog-posts.json';
import type { BlogPost } from '../types/blog';

export const blogPosts = rawPosts as BlogPost[];

export const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug) ?? null;
};
