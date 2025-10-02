'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Filter, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  isDarkMode: boolean;
};

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
};

const PortfolioSection = ({ isDarkMode }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = ['All', 'Web Design', 'UI/UX', 'Mobile App', 'Branding'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Design',
      description:
        'A modern e-commerce platform with seamless shopping experience, built with Next.js and Stripe integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Banking Dashboard',
      category: 'UI/UX',
      description:
        'Intuitive banking dashboard with real-time analytics and transaction management features.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'Chart.js', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      category: 'Mobile App',
      description:
        'Mobile-first fitness app with workout tracking, nutrition planning, and social features.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      tags: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-green-500 to-teal-600',
    },
    {
      id: 4,
      title: 'Brand Identity System',
      category: 'Branding',
      description:
        'Complete brand identity system with logo design, color palette, and brand guidelines.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      tags: ['Figma', 'Illustrator', 'Photoshop'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 5,
      title: 'Real Estate Portal',
      category: 'Web Design',
      description:
        'Comprehensive real estate portal with property listings, virtual tours, and mortgage calculator.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 6,
      title: 'Travel Booking Platform',
      category: 'UI/UX',
      description:
        'User-friendly travel booking platform with flight search, hotel reservations, and itinerary planning.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
      tags: ['React', 'Framer Motion', 'API Integration'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateElements = async () => {
      try {
        const gsap = (await import('gsap')).default;
        const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          // Title animation
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 80%',
              },
            },
          );

          // Filter buttons animation
          if (filterRef.current) {
            const buttons = filterRef.current.querySelectorAll('.filter-btn');
            gsap.fromTo(
              buttons,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: filterRef.current,
                  start: 'top 80%',
                },
              },
            );
          }

          // Project cards animation
          if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.project-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                  trigger: gridRef.current,
                  start: 'top 80%',
                },
              },
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('GSAP not installed. Please run: npm install gsap');
      }
    };

    animateElements();
  }, [isVisible, selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-950' : 'bg-gray-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 2px 2px, rgb(148 163 184 / 0.1) 1px, transparent 0)'
              : 'radial-gradient(circle at 2px 2px, rgb(148 163 184 / 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div
        className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-cyan-500' : 'bg-cyan-400'}`}
      ></div>
      <div
        className={`absolute bottom-40 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'}`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Projects
            </span>
          </h2>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
          >
            Explore my recent work showcasing creative solutions and innovative designs
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                  : isDarkMode
                    ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Card Wrapper */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Gradient Border Effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur`}
                ></div>

                {/* Card Content */}
                <div
                  className={`relative ${
                    isDarkMode ? 'bg-slate-900' : 'bg-white'
                  } rounded-2xl overflow-hidden border ${
                    isDarkMode ? 'border-slate-800' : 'border-gray-200'
                  } transform transition-transform duration-500 group-hover:scale-[0.98]`}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-4">
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={project.githubUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          isDarkMode ? 'bg-slate-800 text-cyan-400' : 'bg-gray-100 text-cyan-600'
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm mb-4 line-clamp-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-600'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full ${
                            isDarkMode
                              ? 'bg-slate-800/50 text-slate-400'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button
            className={`group px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
            } shadow-lg hover:shadow-xl`}
          >
            <Link href={'/portfolio'} className="flex items-center gap-2">
              View All Projects
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${
              isDarkMode ? 'bg-slate-900' : 'bg-white'
            } border ${isDarkMode ? 'border-slate-800' : 'border-gray-200'} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-lg transition-all duration-300 hover:scale-110`}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-96 overflow-hidden rounded-t-2xl">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${selectedProject.color} opacity-20`}
              ></div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`text-sm font-semibold px-4 py-2 rounded-full ${
                    isDarkMode ? 'bg-slate-800 text-cyan-400' : 'bg-gray-100 text-cyan-600'
                  }`}
                >
                  {selectedProject.category}
                </span>
              </div>

              <h3
                className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {selectedProject.title}
              </h3>

              <p className={`text-lg mb-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {selectedProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-sm px-4 py-2 rounded-full ${
                      isDarkMode ? 'bg-slate-800/50 text-slate-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={selectedProject.liveUrl}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r ${selectedProject.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Preview
                </a>
                <a
                  href={selectedProject.githubUrl}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
                  } transition-all duration-300 hover:scale-105`}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
