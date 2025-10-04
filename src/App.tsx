import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Terminal, Code, Globe, Building, Users, 
  Brain, Database, Cpu, Download, Sun, Moon, BookText, Award, Briefcase, 
  Rocket, FileCode, Coffee
} from 'lucide-react';
import portfolioData from './data/portfolio.json';
import BlogSection from './components/BlogSection';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Tech stack icons mapping
  const getTechIcon = (tech: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Spring Boot': <Code className="w-4 h-4" />,
      'Spring Data JPA': <Database className="w-4 h-4" />,
      'Thymeleaf': <Globe className="w-4 h-4" />,
      'H2 Database': <Database className="w-4 h-4" />,
      'Python': <Code className="w-4 h-4" />,
      'PyTorch': <Brain className="w-4 h-4" />,
      'CNN': <Cpu className="w-4 h-4" />,
      'Federated Learning': <Users className="w-4 h-4" />,
      'Streamlit': <Globe className="w-4 h-4" />,
      'LangChain': <Brain className="w-4 h-4" />,
      'OpenAI': <Brain className="w-4 h-4" />,
      'FAISS': <Database className="w-4 h-4" />,
      'TensorFlow': <Brain className="w-4 h-4" />,
      'OpenCV': <Globe className="w-4 h-4" />
    };
    return iconMap[tech] || <Code className="w-4 h-4" />;
  };

  // Icon mapping for sections
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Code': <Code className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />,
      'Brain': <Brain className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />,
      'FileCode': <FileCode className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />,
      'Globe': <Globe className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />,
      'Database': <Database className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
    };
    return iconMap[iconName] || <Code className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 backdrop-blur-md bg-opacity-80 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            {portfolioData.personal.name.split(' ').map(name => name[0]).join('')}<span className="text-green-500">.</span>
          </motion.span>
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#skills" 
              className={`hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}
            >
              Skills
            </a>
            <a 
              href="#experience" 
              className={`hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}
            >
              Experience
            </a>
            <a 
              href="#projects" 
              className={`hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}
            >
              Projects
            </a>
            <a 
              href="#blog" 
              className={`hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}
            >
              Blog
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href={portfolioData.personal.resumePath} 
              download
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          <div className="flex flex-col gap-6 lg:w-2/3">
            <Terminal className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {portfolioData.personal.name}
              <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>.</span>
            </h1>
            <h2 className={`text-xl sm:text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {portfolioData.personal.title}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {portfolioData.personal.bio}
            </p>
            <div className="flex gap-4 mt-2">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href={portfolioData.personal.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:text-green-400' 
                    : 'bg-zinc-100 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href={portfolioData.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:text-green-400' 
                    : 'bg-zinc-100 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href={`mailto:${portfolioData.personal.email}`}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:text-green-400' 
                    : 'bg-zinc-100 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/3"
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-green-400/20' : 'bg-green-500/20'} rounded-3xl rotate-6`}></div>
              <img 
                src={portfolioData.personal.profileImage} 
                alt={portfolioData.personal.name}
                className="relative w-full h-full object-cover rounded-3xl shadow-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Skills Section */}
      <section id="skills" className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <BookText className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className="text-3xl font-bold">Technical Expertise</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.skills.map((skillCategory, index) => (
            <motion.div 
              key={skillCategory.category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {getIcon(skillCategory.icon)}
                <h4 className="text-xl font-semibold">{skillCategory.category}</h4>
              </div>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {skillCategory.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Briefcase className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className="text-3xl font-bold">Experience</h3>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="flex gap-6">
              <Building className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'} flex-shrink-0`} />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="text-xl font-semibold">{exp.company}</h4>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{exp.role}</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{exp.location}</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{exp.duration}</span>
                </div>
                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Rocket className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className="text-3xl font-bold">Featured Projects</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'} shadow-lg`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                  {getIcon(project.icon)}
                </span>
                <h4 className="text-xl font-semibold">{project.title}</h4>
              </div>
              <p className={`mb-6 ${
                isDarkMode 
                  ? 'text-gray-400 group-hover:text-green-400' 
                  : 'text-gray-600 group-hover:text-green-600'
              } transition-colors`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                      isDarkMode 
                        ? 'bg-zinc-800 group-hover:bg-green-400/10 group-hover:text-green-400' 
                        : 'bg-zinc-200 group-hover:bg-green-100 group-hover:text-green-600'
                    } transition-colors`}
                  >
                    <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                      {getTechIcon(tech)}
                    </span>
                    {tech}
                  </span>
                ))}
              </div>
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isDarkMode ? 'bg-black/50' : 'bg-white/50'
                } opacity-0 group-hover:opacity-100 transition-opacity`}
                title={`View ${project.title} on GitHub`}
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <div id="blog">
        <BlogSection isDarkMode={isDarkMode} githubConfig={portfolioData.github} />
      </div>

      {/* Volunteer Experience */}
      <section className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Award className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className="text-3xl font-bold">Volunteer Experience</h3>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {portfolioData.volunteer.map((vol, index) => (
            <div key={index} className="flex gap-6">
              <Users className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'} flex-shrink-0`} />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="text-xl font-semibold">{vol.organization}</h4>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{vol.role}</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{vol.location}</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{vol.duration}</span>
                </div>
                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {vol.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className={`container mx-auto px-4 py-20 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <Coffee className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <motion.a 
            href={`mailto:${portfolioData.personal.email}`}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-green-400 text-black hover:bg-green-300' 
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`container mx-auto px-4 py-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <p>© 2025 {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;