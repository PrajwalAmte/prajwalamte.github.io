import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ExternalLink, Moon, Sun } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import portfolioData from '../data/portfolio.json';
import { getBlogPostBySlug } from '../data/blogPosts';
import { useThemeMode } from '../hooks/useThemeMode';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  useEffect(() => {
    if (!post) {
      return undefined;
    }
    const previousTitle = document.title;
    document.title = `${post.title} | ${portfolioData.personal.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    const parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime())) {
      return dateString;
    }
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sourceUrl = post.sourcePath
    ? `https://github.com/${portfolioData.github.username}/${portfolioData.github.repo}/blob/${portfolioData.github.branch}/${post.sourcePath}`
    : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-bg text-ink`}>
      <nav className={`sticky top-0 z-50 border-b bg-bg border-rule`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/#blog"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-wash text-accent hover:bg-wash-strong`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors hover:bg-hover`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 md:p-8 bg-surface`}
        >
          <div className={`mb-4 flex flex-wrap items-center gap-4 text-sm text-muted`}>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTimeMinutes} min read
            </span>
            {!post.externalUrl && sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-accent hover:underline`}
              >
                <ExternalLink className="w-4 h-4" />
                Source
              </a>
            )}
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-6 text-accent`}>
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded text-xs bg-chip text-chip-ink`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className={`blog-content`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.html) }}
          />

          {post.externalUrl && (
            <div className={`mt-10 pt-8 border-t border-rule`}>
              <p className={`text-sm mb-4 text-muted`}>
                This is an abridged version. Read the full article on Medium.
              </p>
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors bg-fill text-on-fill hover:bg-fill-hover`}
              >
                Read full article on Medium
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </motion.article>
      </main>
    </div>
  );
};

export default BlogPostPage;
