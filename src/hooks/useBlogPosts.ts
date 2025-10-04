import { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  content: string;
  date: string;
  slug: string;
  excerpt: string;
}

interface GitHubFile {
  name: string;
  download_url: string;
  sha: string;
}

export const useBlogPosts = (username: string, repo: string, branch: string, blogsPath: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the list of files in the blogs directory
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}/contents/${blogsPath}?ref=${branch}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const files: GitHubFile[] = await response.json();
        const markdownFiles = files.filter(file => file.name.endsWith('.md'));

        // Fetch content for each markdown file
        const blogPosts = await Promise.all(
          markdownFiles.map(async (file) => {
            const contentResponse = await fetch(file.download_url);
            const content = await contentResponse.text();
            
            // Parse frontmatter and content
            const { title, date, excerpt } = parseFrontmatter(content);
            const slug = file.name.replace('.md', '');

            return {
              title: title || slug,
              content,
              date: date || new Date().toISOString(),
              slug,
              excerpt: excerpt || content.substring(0, 200) + '...'
            };
          })
        );

        // Sort by date (newest first)
        blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(blogPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [username, repo, branch, blogsPath]);

  return { posts, loading, error };
};

// Simple frontmatter parser
const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { title: '', date: '', excerpt: '' };
  }

  const frontmatter = match[1];
  const lines = frontmatter.split('\n');
  const metadata: Record<string, string> = {};

  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      metadata[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '');
    }
  });

  return {
    title: metadata.title || '',
    date: metadata.date || '',
    excerpt: metadata.excerpt || ''
  };
};