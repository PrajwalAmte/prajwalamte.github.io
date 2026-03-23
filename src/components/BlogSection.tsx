import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

interface BlogSectionProps {
  isDarkMode: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
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

  const accentClasses = isDarkMode
    ? {
        text: 'text-green-400',
        softText: 'text-gray-400',
        card: 'bg-zinc-900 hover:bg-zinc-800',
        button: 'bg-green-400/10 text-green-400 hover:bg-green-400/20',
        primaryButton: 'bg-green-400 text-black hover:bg-green-300',
      }
    : {
        text: 'text-green-600',
        softText: 'text-gray-600',
        card: 'bg-zinc-50 hover:bg-zinc-100',
        button: 'bg-green-600/10 text-green-600 hover:bg-green-600/20',
        primaryButton: 'bg-green-600 text-white hover:bg-green-500',
      };

  const borderClass = isDarkMode ? 'border-zinc-800' : 'border-zinc-200';
  return (
    <section className={`container mx-auto px-4 py-20 border-t ${borderClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3">
          <BookOpen className={`w-8 h-8 ${accentClasses.text}`} />
          <h3 className="text-3xl font-bold">Latest Blog Posts</h3>
        </div>
      </motion.div>

      {blogPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-12 border rounded-lg ${borderClass}`}
        >
          <BookOpen className={`w-16 h-16 mx-auto mb-4 ${accentClasses.softText}`} />
          <div>
            <h4 className="text-xl font-semibold mb-2">No blog posts found</h4>
            <p className={accentClasses.softText}>
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
              whileHover={{ scale: 1.02 }}
              className={`group rounded-lg p-6 transition-all duration-300 ${accentClasses.card}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className={`w-4 h-4 ${accentClasses.text}`} />
                <span className={`text-sm ${accentClasses.softText}`}>
                  {formatDate(post.date)}
                </span>
                <span className={`text-sm ${accentClasses.softText}`}>•</span>
                <span className={`text-sm ${accentClasses.softText} inline-flex items-center gap-1`}>
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTimeMinutes} min
                </span>
              </div>

              <h4 className={`text-xl font-semibold mb-3 ${accentClasses.text}`}>
                {post.title}
              </h4>

              <p className={`${accentClasses.softText} text-sm mb-4 line-clamp-3`}>
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-zinc-800 text-gray-300' : 'bg-zinc-200 text-gray-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center mt-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${accentClasses.button}`}
                >
                  Read Post
                </Link>
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
            onClick={() => setShowAllPosts(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${accentClasses.primaryButton}`}
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
