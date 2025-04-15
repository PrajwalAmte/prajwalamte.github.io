import React, { useState } from "react";
import profilePic from './Assets/Profile.jpeg';
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  Globe,
  Users,
  Brain,
  Database,
  Cpu,
  Download,
  Sun,
  Moon,
  BookText,
  Award,
  Briefcase,
  Rocket,
  FileCode,
  Coffee,
} from "lucide-react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 backdrop-blur-md bg-opacity-80 border-b ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            PA<span className="text-green-500">.</span>
          </motion.span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <a
              href="src/Assets/prajwalamte@gmail.com.pdf"
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
            <Terminal
              className={`w-12 h-12 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Prajwal P Amte
              <span
                className={`${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                .
              </span>
            </h1>
            <h2
              className={`text-xl sm:text-2xl ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Full Stack Engineer Intern @ Fidelity Investments
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I enjoy building scalable backend systems and developing
              data-driven intelligent applications. A tech enthusiast at heart,
              always eager to learn and adapt to new technologies.
            </p>
            <div className="flex gap-4 mt-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/PrajwalAmte"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 hover:text-green-400"
                    : "bg-zinc-100 hover:bg-green-100 hover:text-green-600"
                }`}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/prajwal-amte/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 hover:text-green-400"
                    : "bg-zinc-100 hover:bg-green-100 hover:text-green-600"
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:prajwalamte@gmail.com"
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 hover:text-green-400"
                    : "bg-zinc-100 hover:bg-green-100 hover:text-green-600"
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
              <div
                className={`absolute inset-0 ${
                  isDarkMode ? "bg-green-400/20" : "bg-green-500/20"
                } rounded-3xl rotate-6`}
              ></div>
              <img
                src={profilePic}
                alt="Prajwal P Amte"
                className="relative w-full h-full object-cover rounded-3xl shadow-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Skills Section */}
      <section
        className={`container mx-auto px-4 py-20 border-t ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <BookText
            className={`w-8 h-8 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3 className="text-3xl font-bold">Technical Expertise</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-zinc-900" : "bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code
                className={`w-6 h-6 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <h4 className="text-xl font-semibold">Programming & Tools</h4>
            </div>
            <ul
              className={`space-y-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>
                Languages: Java, Python, JavaScript/TypeScript, C/C++, Rust
              </li>
              <li>IDEs: VS Code, IntelliJ IDEA</li>
              <li>Platforms: Streamlit, Heroku</li>
              <li>Project Management: Jira, Trello</li>
              <li>Version Control & CI/CD: Git, Jenkins, GitHub Actions</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-zinc-900" : "bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain
                className={`w-6 h-6 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <h4 className="text-xl font-semibold">
                Frameworks & Infrastructure
              </h4>
            </div>
            <ul
              className={`space-y-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>
                Frontend: React, AngularJS | Backend: Spring Boot, Node.js
              </li>
              <li>AI/ML: TensorFlow, LangChain, PyTorch</li>
              <li>Testing: JUnit, Mockito, Insomnia, Postman</li>
              <li>Databases: PostgreSQL, MongoDB, MySQL</li>
              <li>Cloud & Containerization: AWS (Lambda, S3, EC2), Docker</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        className={`container mx-auto px-4 py-20 border-t ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Briefcase
            className={`w-8 h-8 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3 className="text-3xl font-bold">Experience</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="flex gap-6">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h4 className="text-xl font-semibold">Fidelity Investments</h4>
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Intern
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  Bengaluru, India
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  January 2025 - Present
                </span>
              </div>
               
              <p
                className={`mt-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Currently working in the Cybersecurity domain, contributing to
                secure backend service development using Spring Boot.
                Collaborating on full-stack features with AngularJS and managing
                data using MySQL. Gaining practical exposure to secure software
                engineering practices and enterprise-level deployment workflows.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h4 className="text-xl font-semibold">Research Internship</h4>
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Intern
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  Remote
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  October 2024 - December 2024
                </span>
              </div>
              <p
                className={`mt-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Conducted research on Network Intrusion Detection Systems
                (NIDS), exploring anomaly detection techniques and attack
                classification. Worked on building machine learning models to
                enhance detection accuracy using real-world network traffic
                datasets.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h4 className="text-xl font-semibold">Fidelity Investments</h4>
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Summer Intern
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  Bengaluru, India
                </span>
                <span
                  className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                >
                  June 2024 - August 2024
                </span>
              </div>
              <p
                className={`mt-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Contributed to writing test cases using JUnit and Mockito and
                assisted in developing a serverless application with AWS Lambda
                and Java. Gained experience in software testing and cloud
                computing.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        className={`container mx-auto px-4 py-20 border-t ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Rocket
            className={`w-8 h-8 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3 className="text-3xl font-bold">Featured Projects</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "TaskHive - Task Manager",
              description:
                "A comprehensive task management system built with Spring Boot and Spring Data JPA. Features include task creation with detailed attributes, status tracking, due date management, and user-specific task lists. The application implements RESTful APIs and uses H2 Database for data persistence, with a responsive Thymeleaf-based UI for seamless user interaction.",
              tech: [
                { name: "Spring Boot", icon: <Code className="w-4 h-4" /> },
                {
                  name: "Spring Data JPA",
                  icon: <Database className="w-4 h-4" />,
                },
                { name: "Thymeleaf", icon: <Globe className="w-4 h-4" /> },
                { name: "H2 Database", icon: <Database className="w-4 h-4" /> },
              ],
              icon: <FileCode className="w-6 h-6" />,
              github: "https://github.com/PrajwalAmte/TaskHive",
              githubDescription: "Spring Boot Task Management Application",
            },
            {
              title: "Federated Learning for ECG",
              description:
                "An innovative healthcare solution implementing federated learning for ECG signal classification using the MIT-BIH dataset. The system enables multiple hospitals to collaboratively train a shared model while keeping patient data private. Features include data preprocessing, CNN model architecture, federated training simulation, and comprehensive model evaluation, achieving high accuracy in arrhythmia detection.",
              tech: [
                { name: "Python", icon: <Code className="w-4 h-4" /> },
                { name: "PyTorch", icon: <Brain className="w-4 h-4" /> },
                { name: "CNN", icon: <Cpu className="w-4 h-4" /> },
                {
                  name: "Federated Learning",
                  icon: <Users className="w-4 h-4" />,
                },
              ],
              icon: <Brain className="w-6 h-6" />,
              github: "https://github.com/PrajwalAmte/Federated_Learning",
              githubDescription: "Federated Learning for ECG Classification",
            },
            {
              title: "News Analyzer",
              description:
                "A sophisticated web application leveraging LangChain and OpenAI to process and analyze multiple news articles simultaneously. The system features URL-based article extraction, natural language processing for content analysis, and an intelligent query system with source citations. Implements FAISS for efficient vector storage and retrieval, enabling fast and accurate responses to user queries about news content.",
              tech: [
                { name: "Python", icon: <Code className="w-4 h-4" /> },
                { name: "Streamlit", icon: <Globe className="w-4 h-4" /> },
                { name: "LangChain", icon: <Brain className="w-4 h-4" /> },
                { name: "OpenAI", icon: <Brain className="w-4 h-4" /> },
                { name: "FAISS", icon: <Database className="w-4 h-4" /> },
              ],
              icon: <Globe className="w-6 h-6" />,
              github: "https://github.com/PrajwalAmte/News_Analyser",
              githubDescription: "AI-powered News Analysis Tool",
            },
            {
              title: "Sign Language Recognition",
              description:
                "An advanced real-time ASL gesture recognition system utilizing deep learning for accurate sign language interpretation. The project encompasses comprehensive model training on ASL datasets, real-time video processing for gesture capture, and immediate speech conversion of recognized signs. Features include custom CNN architecture, optimized video frame processing, and a user-friendly interface for seamless communication.",
              tech: [
                { name: "Python", icon: <Code className="w-4 h-4" /> },
                { name: "TensorFlow", icon: <Brain className="w-4 h-4" /> },
                { name: "OpenCV", icon: <Globe className="w-4 h-4" /> },
                { name: "CNN", icon: <Cpu className="w-4 h-4" /> },
              ],
              icon: <Database className="w-6 h-6" />,
              github:
                "https://github.com/PrajwalAmte/Sign_Language_Recognition",
              githubDescription: "ASL Recognition with Deep Learning",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-xl p-6 ${
                isDarkMode ? "bg-zinc-900" : "bg-zinc-50"
              } shadow-lg`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={isDarkMode ? "text-green-400" : "text-green-600"}
                >
                  {project.icon}
                </span>
                <h4 className="text-xl font-semibold">{project.title}</h4>
              </div>
              <p
                className={`mb-6 ${
                  isDarkMode
                    ? "text-gray-400 group-hover:text-green-400"
                    : "text-gray-600 group-hover:text-green-600"
                } transition-colors`}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                      isDarkMode
                        ? "bg-zinc-800 group-hover:bg-green-400/10 group-hover:text-green-400"
                        : "bg-zinc-200 group-hover:bg-green-100 group-hover:text-green-600"
                    } transition-colors`}
                  >
                    <span
                      className={
                        isDarkMode ? "text-green-400" : "text-green-600"
                      }
                    >
                      {tech.icon}
                    </span>
                    {tech.name}
                  </span>
                ))}
              </div>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isDarkMode ? "bg-black/50" : "bg-white/50"
                } opacity-0 group-hover:opacity-100 transition-opacity`}
                title={project.githubDescription}
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteer Experience */}
      <section
        className={`container mx-auto px-4 py-20 border-t ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Award
            className={`w-8 h-8 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3 className="text-3xl font-bold">Volunteer Experience</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="flex gap-6">
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="text-xl font-semibold">
                    IEEE Young Professional Bangalore
                  </h4>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Student Representative
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    Bangalore, India
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    2024 - Present
                  </span>
                </div>
                <p
                  className={`mt-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Help to connect with students and Student branches, organizing
                  impactful events to bridge the gap between academia and
                  industry. Foster collaboration and knowledge sharing within
                  the IEEE community.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="text-xl font-semibold">
                    IEEE Mysore Subsection
                  </h4>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Student Representative
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    Mysuru, India
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    January 2024 - January 2025
                  </span>
                </div>
                <p
                  className={`mt-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Facilitated collaboration and membership growth among student
                  branches through meetups and initiatives. Revived dormant
                  branches and organized subsection-wide events, fostering
                  communication and leadership.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="text-xl font-semibold">
                    NIE IEEE Student Branch
                  </h4>
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Treasurer
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    Mysuru, India
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-500" : "text-gray-500"}
                  >
                    November 2023 - December 2024
                  </span>
                </div>
                <p
                  className={`mt-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Managed finances and supported 90+ events, enhancing
                  operations and member engagement. Strengthened branch
                  visibility and streamlined resource allocation effectively.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        className={`container mx-auto px-4 py-20 border-t ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <Coffee
              className={`w-12 h-12 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
          </div>
          <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
          <p
            className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            I'm always interested in hearing about new projects and
            opportunities.
          </p>
          <motion.a
            href="mailto:prajwalamte@gmail.com"
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-green-400 text-black hover:bg-green-300"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`container mx-auto px-4 py-8 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}
      >
        <p>© 2025 Prajwal P Amte. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
