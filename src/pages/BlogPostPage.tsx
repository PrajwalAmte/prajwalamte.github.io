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

  const sourceUrl = `https://github.com/${portfolioData.github.username}/${portfolioData.github.repo}/blob/${portfolioData.github.branch}/${post.sourcePath}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <nav className={`sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/#blog"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-green-400/10 text-green-400 hover:bg-green-400/20' : 'bg-green-600/10 text-green-600 hover:bg-green-600/20'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
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
          className={`rounded-xl p-6 md:p-8 ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}
        >
          <div className={`mb-4 flex flex-wrap items-center gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTimeMinutes} min read
            </span>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-600'}`}
            >
              <ExternalLink className="w-4 h-4" />
              Source
            </a>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-zinc-800 text-gray-300' : 'bg-zinc-200 text-gray-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article
            className={`blog-content ${isDarkMode ? 'blog-content-dark' : 'blog-content-light'}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.html) }}
          />
        </motion.article>
      </main>
    </div>
  );
};

export default BlogPostPage;
