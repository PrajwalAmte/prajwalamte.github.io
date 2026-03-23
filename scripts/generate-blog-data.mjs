import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const currentFile = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(currentFile), '..');
const blogsDir = path.join(rootDir, 'blogs');
const outputDir = path.join(rootDir, 'src', 'data', 'generated');
const outputFile = path.join(outputDir, 'blog-posts.json');
const markdownExtensions = new Set(['.md', '.mdx']);

const markdownProcessor = remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const toTitle = (fileName) => {
  const stem = fileName.replace(/\.(md|mdx)$/i, '').replace(/[-_]+/g, ' ');
  return stem
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const cleanMarkdownText = (value) =>
  value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/#+$/g, '')
    .trim();

const titleFromHeading = (content) => {
  const headingMatch = content.match(/^\s{0,3}#\s+(.+)$/m);
  if (!headingMatch) {
    return '';
  }
  return cleanMarkdownText(headingMatch[1]);
};

const plainTextFromMarkdown = (content) =>
  content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, ' ')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const toIsoDate = (value, fallback) => {
  if (typeof value === 'string' || value instanceof Date) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  return fallback.toISOString();
};

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

const renderMarkdown = async (content) => {
  try {
    return String(await markdownProcessor.process(content));
  } catch {
    const paragraphs = content
      .split(/\n{2,}/)
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => `<p>${escapeHtml(segment).replace(/\n/g, '<br/>')}</p>`);
    return paragraphs.join('\n');
  }
};

const collectPosts = async () => {
  let entries = [];
  try {
    entries = await fs.readdir(blogsDir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const markdownFiles = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => markdownExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const sourcePath = path.join(blogsDir, fileName);
      const sourceContent = await fs.readFile(sourcePath, 'utf8');
      const parsed = matter(sourceContent);
      const fileStats = await fs.stat(sourcePath);

      const slugFromFile = slugify(fileName.replace(/\.(md|mdx)$/i, ''));
      const slug = typeof parsed.data.slug === 'string' && parsed.data.slug.trim()
        ? slugify(parsed.data.slug)
        : slugFromFile;
      const headingTitle = titleFromHeading(parsed.content);
      const title = typeof parsed.data.title === 'string' && parsed.data.title.trim()
        ? parsed.data.title.trim()
        : headingTitle || toTitle(fileName);

      const date = toIsoDate(parsed.data.date, fileStats.mtime);
      const plainText = plainTextFromMarkdown(parsed.content);
      const excerpt = typeof parsed.data.excerpt === 'string' && parsed.data.excerpt.trim()
        ? parsed.data.excerpt.trim()
        : plainText.length > 220
          ? `${plainText.slice(0, 217).trim()}...`
          : plainText;
      const readingTimeMinutes = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 220));
      const html = await renderMarkdown(parsed.content);
      const tags = normalizeTags(parsed.data.tags);

      return {
        slug,
        title,
        excerpt,
        date,
        tags,
        readingTimeMinutes,
        html,
        sourcePath: `blogs/${fileName}`,
      };
    })
  );

  return posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
};

const posts = await collectPosts();
await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputFile, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');
console.log(`Generated ${posts.length} blog post(s) at ${path.relative(rootDir, outputFile)}`);
