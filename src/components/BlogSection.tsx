import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

interface BlogSectionProps {
  isDarkMode: boolean;
  githubConfig: {
    username: string;
    repo: string;
    branch: string;
    blogsPath: string;
  };
}

const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode, githubConfig }) => {
  const { posts, loading, error } = useBlogPosts(
    githubConfig.username,
    githubConfig.repo,
    githubConfig.branch,
    githubConfig.blogsPath
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        <BookOpen className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className="text-3xl font-bold">Latest Blog Posts</h3>
      </motion.div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-green-400' : 'border-green-600'}`}></div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-6 rounded-lg ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}
        >
          <AlertCircle className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
          <div>
            <h4 className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              Unable to load blog posts
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-500'}`}>
              {error}. Make sure your GitHub repository and blog posts are set up correctly.
            </p>
          </div>
        </motion.div>
      )}

      {!loading && !error && posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <h4 className="text-xl font-semibold mb-2">No blog posts found</h4>
          <p>Create some markdown files in your GitHub repository to get started!</p>
        </motion.div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group rounded-lg p-6 ${isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-50 hover:bg-zinc-100'} transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatDate(post.date)}
                </span>
              </div>
              
              <h4 className={`text-xl font-semibold mb-3 group-hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}>
                {post.title}
              </h4>
              
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  Read more
                </span>
                <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {!loading && !error && posts.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${githubConfig.username}/${githubConfig.repo}/tree/${githubConfig.branch}/${githubConfig.blogsPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-green-400 text-black hover:bg-green-300' 
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            View All Posts
          </a>
        </motion.div>
      )}
    </section>
  );
};

export default BlogSection;