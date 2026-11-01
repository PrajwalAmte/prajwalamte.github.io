import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import {
  Github, Linkedin, Mail, Terminal, Code, Layers, Download, Sun, Moon, BookText,
  Award, Briefcase, Rocket, Coffee, FileText, Shield, Wallet, TrendingUp, Map,
  Gauge, Cpu, Activity, Brain, Database, Search, Dumbbell, LineChart, Building,
  Users, Menu, X, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import portfolioData from './data/portfolio.json';
import type {
  ExperienceEntry, Project, SkillCategory, VolunteerEntry,
} from './types/portfolio';
import BlogSection from './components/BlogSection';
import { useThemeMode } from './hooks/useThemeMode';

const skills = portfolioData.skills as SkillCategory[];
const experience = portfolioData.experience as ExperienceEntry[];
const projects = portfolioData.projects as Project[];
const volunteer = portfolioData.volunteer as VolunteerEntry[];

const iconMap: Record<string, LucideIcon> = {
  Code, Layers, Brain, Database, FileText, Shield, Wallet, TrendingUp, Map,
  Gauge, Cpu, Activity, Search, Dumbbell, LineChart,
};

const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#contact', label: 'Contact' },
];

const accent = 'text-accent';
const muted = 'text-muted';
const body = 'text-body';
const divider = 'border-rule';
const section = `container mx-auto px-4 py-20 border-t scroll-mt-16 ${divider}`;
const iconButton =
  'p-2 rounded-full bg-surface hover:bg-hover hover:text-accent transition-colors';
const outlineLink =
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border border-rule-strong hover:border-accent hover:text-accent transition-colors';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const SectionHeading = ({ icon: Icon, children }: { icon: LucideIcon; children: string }) => (
  <motion.div {...reveal} className="flex items-center gap-3 mb-12">
    <Icon className={`w-8 h-8 ${accent}`} aria-hidden="true" />
    <h2 className="text-3xl font-bold">{children}</h2>
  </motion.div>
);

const Chip = ({ children }: { children: string }) => (
  <span className="px-3 py-1 rounded-full text-sm bg-chip text-chip-ink">
    {children}
  </span>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = iconMap[project.icon] ?? Code;
  return (
    <motion.article
      {...reveal}
      className="flex flex-col rounded-xl p-6 bg-surface border border-rule hover:border-accent transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 flex-shrink-0 ${accent}`} aria-hidden="true" />
        <h3 className="text-xl font-semibold">{project.title}</h3>
      </div>
      <p className={`mb-6 max-w-[65ch] ${muted}`}>{project.description}</p>
      <ul className="flex flex-wrap gap-2 mb-6" aria-label="Technologies">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-fill text-on-fill hover:bg-fill-hover transition-colors"
            aria-label={`Open ${project.title} live site`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLink}
            aria-label={`View ${project.title} source on GitHub`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
};

function App() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { personal } = portfolioData;
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);
  const year = new Date().getFullYear();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-ink transition-colors duration-300">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-fill focus:text-on-fill"
        >
          Skip to content
        </a>

        <nav
          aria-label="Primary"
          className={`fixed w-full z-50 bg-bg border-b ${divider}`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#top" className="text-xl font-bold" aria-label={`${personal.name}, back to top`}>
              {personal.name.split(' ').map((part) => part[0]).join('')}
              <span className="text-accent">.</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-hover transition-colors"
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href={personal.resumePath}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-fill text-on-fill hover:bg-fill-hover transition-colors"
                aria-label="Download resume"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Resume</span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="md:hidden p-2 rounded-full hover:bg-hover transition-colors"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div id="mobile-menu" className={`md:hidden border-t ${divider}`}>
              <div className="container mx-auto px-4 py-2 flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main id="main">
          <header id="top" className="container mx-auto px-4 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="flex flex-col gap-6 lg:w-2/3">
                <Terminal className={`w-12 h-12 ${accent}`} aria-hidden="true" />
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {personal.name}
                  <span className={accent}>.</span>
                </h1>
                <p className={`text-xl sm:text-2xl ${muted}`}>{personal.title}</p>
                <p className={`text-lg max-w-[65ch] ${body}`}>{personal.bio}</p>
                <div className="flex gap-4 mt-2">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconButton}
                    aria-label="GitHub profile"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconButton}
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href={`mailto:${personal.email}`} className={iconButton} aria-label="Send an email">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:w-1/3"
              >
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute inset-0 bg-wash-strong rounded-3xl rotate-6" />
                  <img
                    src={personal.profileImage}
                    alt={`Portrait of ${personal.name}`}
                    width={640}
                    height={629}
                    className="relative w-full h-full object-cover rounded-3xl shadow-xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </header>

          <section id="skills" className={section}>
            <SectionHeading icon={BookText}>Technical Expertise</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((category, index) => {
                const Icon = iconMap[category.icon] ?? Code;
                return (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg bg-surface border border-rule"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className={`w-6 h-6 ${accent}`} aria-hidden="true" />
                      <h3 className="text-xl font-semibold">{category.category}</h3>
                    </div>
                    <dl className="space-y-4">
                      {category.groups.map((group) => (
                        <div key={group.label} className="sm:flex sm:gap-4">
                          <dt className={`sm:w-32 flex-shrink-0 mb-2 sm:mb-0 sm:pt-1 text-sm ${muted}`}>
                            {group.label}
                          </dt>
                          <dd>
                            <ul className="flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <li key={item}>
                                  <Chip>{item}</Chip>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section id="experience" className={section}>
            <SectionHeading icon={Briefcase}>Experience</SectionHeading>
            <div className="space-y-12">
              {experience.map((entry) => (
                <motion.div key={entry.company} {...reveal} className="flex gap-6">
                  <Building className={`hidden sm:block w-12 h-12 flex-shrink-0 ${accent}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4">
                      <h3 className="text-xl font-semibold">{entry.company}</h3>
                      <span className="text-faint">{entry.location}</span>
                    </div>
                    <div className="mt-6 space-y-8">
                      {entry.roles.map((role) => (
                        <div key={role.role}>
                          <div className="flex flex-wrap items-baseline gap-x-4">
                            <h4 className={`text-lg font-semibold ${muted}`}>{role.role}</h4>
                            <span className="text-faint">{role.duration}</span>
                          </div>
                          <ul className={`mt-3 space-y-2 list-disc pl-5 ${body}`}>
                            {role.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className={section}>
            <SectionHeading icon={Rocket}>Featured Projects</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            <h3 className="text-2xl font-bold mt-16 mb-8">More projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {more.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          <div id="blog" className="scroll-mt-16">
            <BlogSection />
          </div>

          <section id="volunteer" className={section}>
            <SectionHeading icon={Award}>Volunteer Experience</SectionHeading>
            <div className="space-y-12">
              {volunteer.map((entry) => (
                <motion.div key={entry.organization} {...reveal} className="flex gap-6">
                  <Users className={`hidden sm:block w-12 h-12 flex-shrink-0 ${accent}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4">
                      <h3 className="text-xl font-semibold">{entry.organization}</h3>
                      <span className="text-faint">{entry.location}</span>
                    </div>
                    <div className="mt-6 space-y-8">
                      {entry.roles.map((role) => (
                        <div key={`${role.role}-${role.duration}`}>
                          <div className="flex flex-wrap items-baseline gap-x-4">
                            <h4 className={`text-lg font-semibold ${muted}`}>{role.role}</h4>
                            <span className="text-faint">{role.duration}</span>
                          </div>
                          <p className={`mt-3 max-w-[70ch] ${body}`}>{role.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className={section}>
            <motion.div {...reveal} className="max-w-xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Coffee className={`w-12 h-12 ${accent}`} aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Let’s Connect</h2>
              <p className={`mb-8 max-w-[65ch] mx-auto ${muted}`}>
                I’m always interested in hearing about new projects and opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-fill text-on-fill hover:bg-fill-hover transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Get in Touch
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlineLink} px-6 py-3 text-base`}
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlineLink} px-6 py-3 text-base`}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className={`container mx-auto px-4 py-8 text-center border-t ${muted} ${divider}`}>
          <p>© {year} {personal.name}</p>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
