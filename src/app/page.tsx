'use client';
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Laptop,
  Database,
  Layers,
  Moon,
  Sun,
  Facebook,
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';

import type {Award,FAQ,FormData,FormErrors,Project,Skill,TouchedFields} from "@/types/typeInterface"
import PortfolioSection from '@/components/PortfolioSection';

type SectionId = 'home' | 'about' | 'projects' | 'contact';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      const sections: SectionId[] = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section: SectionId) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateField = (name: keyof FormData, value: string): string => {
    let error = '';

    if (name === 'name') {
      if (!value) {
        error = 'Name is required';
      } else if (value.length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address';
      }
    } else if (name === 'message') {
      if (!value) {
        error = 'Message is required';
      } else if (value.length < 10) {
        error = 'Message must be at least 10 characters';
      }
    }

    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };
      updated[name] = value;
      return updated;
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => {
        const updated = { ...prev };
        updated[name] = error;
        return updated;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;
    setTouched((prev) => {
      const updated = { ...prev };
      updated[name] = true;
      return updated;
    });
    const error = validateField(name, value);
    setFormErrors((prev) => {
      const updated = { ...prev };
      updated[name] = error;
      return updated;
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const errors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setFormErrors(errors);
    setTouched({ name: true, email: true, message: true });

    if (!errors.name && !errors.email && !errors.message) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully! (Demo - not actually sent)');

      setFormData({ name: '', email: '', message: '' });
      setFormErrors({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    }
  };

  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description:
        'Full-stack MERN application with Redux state management, JWT authentication, and Stripe payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
      link: '#',
    },
    {
      title: 'Real-Time Chat Application',
      description:
        'WebSocket-based chat app with Socket.io, featuring private messaging, group chats, and file sharing.',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop',
      link: '#',
    },
    {
      title: 'Task Management Dashboard',
      description:
        'Kanban-style project management tool with drag-and-drop functionality and real-time collaboration.',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      link: '#',
    },
    {
      title: 'Social Media Analytics',
      description:
        'Data visualization dashboard for social media metrics using Chart.js and React Query.',
      tech: ['React', 'Chart.js', 'Express', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      link: '#',
    },
  ];

  const skills: Skill[] = [
    {
      icon: React.createElement(Code, { size: 32 }),
      title: 'Frontend Development',
      description: 'React.js, Next.js, TypeScript, Tailwind CSS',
    },
    {
      icon: React.createElement(Laptop, { size: 32 }),
      title: 'State Management',
      description: 'Redux, Zustand, React Query, Context API',
    },
    {
      icon: React.createElement(Database, { size: 32 }),
      title: 'Backend & Database',
      description: 'Node.js, Express, MongoDB, PostgreSQL',
    },
    {
      icon: React.createElement(Layers, { size: 32 }),
      title: 'Tools & Deployment',
      description: 'Git, Docker, Vercel, AWS, CI/CD',
    },
  ];

  const awards: Award[] = [
    { number: '1', text: 'Hackerrank - JavaScript Gold Badge' },
    { number: '2', text: 'GitHub - Arctic Code Vault Contributor' },
    { number: '3', text: 'Dev.to - Top 7 React Developer 2024' },
    { number: '4', text: 'freeCodeCamp - Full Stack Certification' },
  ];

  const faqs: FAQ[] = [
    {
      q: "What's your development approach?",
      a: 'I follow agile methodologies with a focus on clean code, component reusability, and user-centric design. I prioritize performance optimization and accessibility.',
    },
    {
      q: 'Project delivery time estimate?',
      a: 'Timelines vary based on project complexity. A typical landing page takes 1-2 weeks, while full-stack applications may take 4-8 weeks. I provide detailed timelines after requirement analysis.',
    },
    {
      q: 'What services do you offer?',
      a: 'I specialize in full-stack MERN development, focusing on React.js frontend development, RESTful API design, database architecture, and modern web application deployment.',
    },
    {
      q: 'Do you provide maintenance?',
      a: 'Yes! I offer ongoing maintenance packages including bug fixes, feature updates, performance monitoring, and technical support for all projects.',
    },
    {
      q: "What's your tech stack?",
      a: 'Primary: React.js, Next.js, Node.js, Express, MongoDB. Secondary: TypeScript, Tailwind CSS, Redux, PostgreSQL, AWS, Docker.',
    },
  ];

  const scrollToSection = (sectionId: SectionId): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={
        isDarkMode
          ? 'bg-slate-950 text-white min-h-screen font-sans transition-colors duration-300'
          : 'bg-gray-50 text-gray-900 min-h-screen font-sans transition-colors duration-300'
      }
    >
      <nav
        className={
          isDarkMode
            ? 'fixed top-0 w-full bg-slate-950/80 border-slate-800 backdrop-blur-lg z-50 border-b transition-colors duration-300'
            : 'fixed top-0 w-full bg-white/80 border-gray-200 backdrop-blur-lg z-50 border-b transition-colors duration-300'
        }
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Al@min
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {(['home', 'about', 'projects', 'contact'] as SectionId[]).map((item: SectionId) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={
                  activeSection === item
                    ? 'capitalize transition-colors text-cyan-400'
                    : isDarkMode
                      ? 'capitalize transition-colors text-slate-300 hover:text-cyan-400'
                      : 'capitalize transition-colors text-gray-600 hover:text-cyan-500'
                }
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={
                isDarkMode
                  ? 'p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700'
                  : 'p-2 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300'
              }
              aria-label="Toggle theme"
            >
              {isDarkMode
                ? React.createElement(Sun, { size: 20, className: 'text-yellow-400' })
                : React.createElement(Moon, { size: 20, className: 'text-slate-700' })}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={
                isDarkMode
                  ? 'p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700'
                  : 'p-2 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300'
              }
              aria-label="Toggle theme"
            >
              {isDarkMode
                ? React.createElement(Sun, { size: 20, className: 'text-yellow-400' })
                : React.createElement(Moon, { size: 20, className: 'text-slate-700' })}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen
                ? React.createElement(X, { size: 24 })
                : React.createElement(Menu, { size: 24 })}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={
              isDarkMode
                ? 'md:hidden bg-slate-900 border-slate-800 border-t transition-colors duration-300'
                : 'md:hidden bg-gray-100 border-gray-200 border-t transition-colors duration-300'
            }
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {(['home', 'about', 'projects', 'contact'] as SectionId[]).map((item: SectionId) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={
                    isDarkMode
                      ? 'capitalize text-left transition-colors text-slate-300 hover:text-cyan-400'
                      : 'capitalize text-left transition-colors text-gray-600 hover:text-cyan-500'
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <HeroSection isDarkMode={isDarkMode} scrollToSection={() => scrollToSection('contact')} />

      <section
        id="about"
        className={
          isDarkMode
            ? 'py-32 px-6 bg-slate-900/50 transition-colors duration-300'
            : 'py-32 px-6 bg-gray-100 transition-colors duration-300'
        }
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Behind every great app is an <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                even greater developer
              </span>
            </h2>
            <p
              className={
                isDarkMode
                  ? 'text-lg max-w-3xl mx-auto text-slate-400'
                  : 'text-lg max-w-3xl mx-auto text-gray-600'
              }
            >
              I specialize in building full-stack web applications with modern technologies,
              creating intuitive interfaces and robust backend solutions that drive results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {awards.map((award: Award, idx: number) => (
              <div
                key={idx}
                className={
                  isDarkMode
                    ? 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 border rounded-2xl p-6 transition-all duration-300'
                    : 'bg-white border-gray-200 hover:border-cyan-500 border rounded-2xl p-6 transition-all duration-300'
                }
              >
                <div className="text-4xl font-bold text-cyan-400 mb-3">{award.number}</div>
                <p
                  className={
                    isDarkMode
                      ? 'text-sm leading-relaxed text-slate-300'
                      : 'text-sm leading-relaxed text-gray-600'
                  }
                >
                  {award.text}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill: Skill, idx: number) => (
              <div
                key={idx}
                className={
                  isDarkMode
                    ? 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:border-cyan-500/50 border rounded-2xl p-8 transition-all duration-300 group'
                    : 'bg-white border-gray-200 hover:border-cyan-500 border rounded-2xl p-8 transition-all duration-300 group'
                }
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                <p className={isDarkMode ? 'text-sm text-slate-400' : 'text-sm text-gray-600'}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-32">
            <h3 className="text-4xl font-bold mb-12 text-center">
              What&#39;s the development <span className="text-cyan-400">process like?</span>
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq: FAQ, idx: number) => (
                <div
                  key={idx}
                  className={
                    isDarkMode
                      ? 'bg-slate-800/30 border-slate-700 border rounded-xl overflow-hidden transition-colors duration-300'
                      : 'bg-white border-gray-200 border rounded-xl overflow-hidden transition-colors duration-300'
                  }
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className={
                      isDarkMode
                        ? 'w-full text-left p-6 flex justify-between items-center hover:bg-slate-800/50 transition-colors'
                        : 'w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors'
                    }
                  >
                    <span className="text-lg font-semibold">{faq.q}</span>
                    <span
                      className={
                        openFaq === idx
                          ? 'text-2xl transition-transform duration-300 rotate-45'
                          : 'text-2xl transition-transform duration-300'
                      }
                    >
                      +
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div
                      className={
                        isDarkMode ? 'px-6 pb-6 text-slate-400' : 'px-6 pb-6 text-gray-600'
                      }
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                Ask me directly
              </button>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection isDarkMode={isDarkMode} />

      <section
        id="contact"
        className={
          isDarkMode
            ? 'py-32 px-6 bg-slate-900/50 transition-colors duration-300'
            : 'py-32 px-6 bg-gray-100 transition-colors duration-300'
        }
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let&#39;s Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className={isDarkMode ? 'text-lg text-slate-400' : 'text-lg text-gray-600'}>
              Have a project in mind? Let&#39;s discuss how I can help bring your ideas to life
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={
                  isDarkMode
                    ? 'w-full bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors'
                    : 'w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors'
                }
              />
              {touched.name && formErrors.name && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.name}</span>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={
                  isDarkMode
                    ? 'w-full bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors'
                    : 'w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors'
                }
              />
              {touched.email && formErrors.email && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.email}</span>
              )}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={6}
                className={
                  isDarkMode
                    ? 'w-full bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors resize-none'
                    : 'w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 border rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors resize-none'
                }
              ></textarea>
              {touched.message && formErrors.message && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.message}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] text-white"
            >
              Send Message
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://www.facebook.com/md.al.amin.372196"
              target="_blank"
              className={
                isDarkMode
                  ? 'w-12 h-12 bg-slate-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
                  : 'w-12 h-12 bg-gray-200 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
              }
            >
              {React.createElement(Facebook, { size: 20 })}
            </a>
            <a
              href="https://github.com/Alamin-Coding"
              target="_blank"
              className={
                isDarkMode
                  ? 'w-12 h-12 bg-slate-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
                  : 'w-12 h-12 bg-gray-200 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
              }
            >
              {React.createElement(Github, { size: 20 })}
            </a>
            <a
              href="https://www.linkedin.com/in/al-amin-coder"
              target="_blank"
              className={
                isDarkMode
                  ? 'w-12 h-12 bg-slate-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
                  : 'w-12 h-12 bg-gray-200 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
              }
            >
              {React.createElement(Linkedin, { size: 20 })}
            </a>
            <a
              href="mailto:md.alamin.coding@gmail.com"
              className={
                isDarkMode
                  ? 'w-12 h-12 bg-slate-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
                  : 'w-12 h-12 bg-gray-200 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors'
              }
            >
              {React.createElement(Mail, { size: 20 })}
            </a>
          </div>
        </div>
      </section>

      <footer
        className={
          isDarkMode
            ? 'py-8 px-6 border-slate-800 border-t transition-colors duration-300'
            : 'py-8 px-6 border-gray-200 border-t transition-colors duration-300'
        }
      >
        <div
          className={
            isDarkMode
              ? 'max-w-7xl mx-auto text-center text-slate-500'
              : 'max-w-7xl mx-auto text-center text-gray-500'
          }
        >
          <p>&copy; {new Date().getFullYear()} Full Stack Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
