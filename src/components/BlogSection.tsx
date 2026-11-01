import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogSection: React.FC = () => {
  const [showAllPosts, setShowAllPosts] = React.useState(false);
  const visiblePosts = showAllPosts ? blogPosts : blogPosts.slice(0, 6);

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

  const accentText = 'text-green-600 dark:text-green-400';
  const softText = 'text-gray-600 dark:text-gray-400';
  const borderClass = 'border-zinc-200 dark:border-zinc-800';
  const buttonClass = 'bg-green-600/10 text-green-700 hover:bg-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20';
  const primaryButton = 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-400 dark:text-black dark:hover:bg-green-300';

  return (
    <section aria-labelledby="blog-heading" className={`container mx-auto px-4 py-20 border-t ${borderClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3">
          <BookOpen className={`w-8 h-8 ${accentText}`} />
          <h2 id="blog-heading" className="text-3xl font-bold">Latest Blog Posts</h2>
        </div>
      </motion.div>

      {blogPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-12 border rounded-lg ${borderClass}`}
        >
          <BookOpen className={`w-16 h-16 mx-auto mb-4 ${softText}`} />
          <div>
            <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
            <p className={softText}>
              Add files under `blogs/` with .md or .mdx extensions to publish posts.
            </p>
          </div>
        </motion.div>
      )}

      {blogPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group rounded-lg transition-colors bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800`}
            >
              <div className="p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                <Calendar className={`w-4 h-4 ${accentText}`} />
                <span className={`text-sm ${softText}`}>
                  {formatDate(post.date)}
                </span>
                <span className={`text-sm ${softText} inline-flex items-center gap-1`}>
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTimeMinutes} min
                </span>
              </div>

              <h3 className={`text-xl font-semibold mb-3 ${accentText}`}>
                {post.title}
              </h3>

              <p className={`${softText} text-sm mb-4 line-clamp-3`}>
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className={`px-2 py-1 rounded text-xs bg-zinc-200 text-gray-700 dark:bg-zinc-800 dark:text-gray-300`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 mt-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${buttonClass}`}
                >
                  Read Post
                </Link>
                {post.externalUrl && (
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${buttonClass}`}
                  >
                    Medium <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {blogPosts.length > 6 && !showAllPosts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button
            type="button"
            onClick={() => setShowAllPosts(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${primaryButton}`}
          >
            <BookOpen className="w-4 h-4" />
            Show All Posts ({blogPosts.length})
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default BlogSection;
