import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const shorten = (text: string, max = 170) =>
  text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;

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

  const accentText = 'text-accent';
  const softText = 'text-muted';
  const borderClass = 'border-rule';
  const buttonClass = 'bg-wash text-accent hover:bg-wash-strong';
  const primaryButton = 'bg-fill text-on-fill hover:bg-fill-hover';

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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group rounded-lg transition-colors bg-surface hover:bg-hover`}
            >
              <div className="p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                <span className={`text-sm ${softText}`}>{formatDate(post.date)}</span>
                <span className={`text-sm ${softText}`}>{post.readingTimeMinutes} min read</span>
              </div>

              <h3 className={`text-xl font-semibold mb-3 ${accentText}`}>
                {post.title}
              </h3>

              <p className={`${softText} text-sm mb-4`}>
                {shorten(post.excerpt)}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className={`px-2 py-1 rounded text-xs bg-chip text-chip-ink`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 mt-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${buttonClass}`}
                >
                  Read Post
                </Link>
                {post.externalUrl && (
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${buttonClass}`}
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
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${primaryButton}`}
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
