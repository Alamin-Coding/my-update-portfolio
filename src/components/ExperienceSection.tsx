'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, ChevronRight, TrendingUp } from 'lucide-react';

type Props = {
  isDarkMode: boolean;
};

type Experience = {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  skills: string[];
  icon: string;
  color: string;
};

const ExperienceSection = ({ isDarkMode }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const experiences = useMemo<Experience[]>(() => [
    {
      id: 1,
      company: 'Tech Innovators Inc.',
      position: 'Senior Web Designer & Developer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Leading the design and development of cutting-edge web applications for Fortune 500 clients. Managing a team of 5 designers and developers.',
      achievements: [
        'Increased user engagement by 150% through redesign of main product',
        'Led successful migration to Next.js, improving performance by 60%',
        'Mentored 10+ junior developers and designers',
        'Won "Best UI/UX Design" award at Tech Summit 2023',
      ],
      skills: ['Next.js', 'TypeScript', 'Figma', 'Team Leadership', 'Agile'],
      icon: '🚀',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      company: 'Creative Digital Studio',
      position: 'Lead UI/UX Designer',
      location: 'New York, NY',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      description: 'Designed and developed user-centric digital experiences for startups and established brands. Collaborated with cross-functional teams to deliver exceptional products.',
      achievements: [
        'Designed 30+ successful web and mobile applications',
        'Established design system used across 15+ projects',
        'Reduced development time by 40% through component library',
        'Achieved 95% client satisfaction rate',
      ],
      skills: ['React', 'Vue.js', 'Adobe XD', 'Prototyping', 'User Research'],
      icon: '🎨',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 3,
      company: 'Web Solutions Agency',
      position: 'Front-End Developer',
      location: 'Austin, TX',
      startDate: 'Jun 2016',
      endDate: 'Feb 2018',
      description: 'Developed responsive websites and web applications using modern technologies. Focused on performance optimization and accessibility.',
      achievements: [
        'Built 50+ responsive websites with 99% uptime',
        'Improved page load speed by 70% on average',
        'Implemented accessibility standards (WCAG 2.1 AA)',
        'Trained team members on best coding practices',
      ],
      skills: ['JavaScript', 'HTML/CSS', 'WordPress', 'Git', 'Performance'],
      icon: '💻',
      color: 'from-green-500 to-teal-600',
    },
    {
      id: 4,
      company: 'Design Startup',
      position: 'Junior Designer',
      location: 'Los Angeles, CA',
      startDate: 'Aug 2014',
      endDate: 'May 2016',
      description: 'Started my professional journey creating visual designs and learning web development fundamentals. Contributed to various client projects.',
      achievements: [
        'Assisted in designing 20+ client projects',
        'Learned modern web technologies and frameworks',
        'Contributed to company design guidelines',
        'Received "Rising Star" recognition',
      ],
      skills: ['Photoshop', 'Illustrator', 'HTML', 'CSS', 'jQuery'],
      icon: '🌟',
      color: 'from-orange-500 to-red-600',
    },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
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
            }
          );

          // Timeline line animation
          gsap.fromTo(
            '.timeline-line',
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%',
              },
            }
          );

          // Experience cards animation
          experiences.forEach((_, index) => {
            gsap.fromTo(
              `.experience-card-${index}`,
              { 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                scale: 0.8
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                  trigger: `.experience-card-${index}`,
                  start: 'top 75%',
                },
              }
            );

            // Animate achievements
            gsap.fromTo(
              `.achievement-${index}`,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: `.experience-card-${index}`,
                  start: 'top 70%',
                },
              }
            );

            // Animate skills
            gsap.fromTo(
              `.skill-${index}`,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: `.experience-card-${index}`,
                  start: 'top 70%',
                },
              }
            );
          });

          // Stats counter animation
          gsap.fromTo(
            '.stat-number',
            { innerText: 0 },
            {
              innerText: (i: number, el: Element) => el.getAttribute('data-value'),
              duration: 2,
              ease: 'power1.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: '.stats-container',
                start: 'top 80%',
              },
              onUpdate: function() {
                this.targets().forEach((target: HTMLElement) => {
                  const val = Math.ceil(Number(target.innerText));
                  target.innerText = val.toString();
                });
              }
            }
          );

        }, sectionRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('GSAP not installed. Please run: npm install gsap');
      }
    };

    animateElements();
  }, [isVisible, experiences]);

  return (
    <section
      id="experience"
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
      <div className={`absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
      <div className={`absolute bottom-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'}`}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Professional{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Experience
            </span>
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            10+ years of crafting exceptional digital experiences across leading companies
          </p>
        </div>

        {/* Stats Section */}
        <div className={`stats-container grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {[
            { label: 'Years Experience', value: '10', icon: '📅' },
            { label: 'Projects Completed', value: '150', icon: '🎯' },
            { label: 'Happy Clients', value: '50', icon: '😊' },
            { label: 'Awards Won', value: '12', icon: '🏆' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl ${
                isDarkMode ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-gray-200'
              } backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">
                <span className="stat-number" data-value={stat.value}>0</span>
                {stat.label === 'Projects Completed' && '+'}
                {stat.label === 'Happy Clients' && '+'}
                {stat.label === 'Awards Won' && '+'}
                {stat.label === 'Years Experience' && '+'}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block">
            <div className={`timeline-line w-full h-full origin-top ${isDarkMode ? 'bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600' : 'bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-500'}`}></div>
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card-${index} relative`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Desktop Layout */}
                <div className={`hidden lg:grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'direction-reverse'}`}>
                  {/* Content Side */}
                  <div className={`${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12 col-start-2'}`}>
                    <div
                      className={`inline-block p-8 rounded-2xl ${
                        isDarkMode ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-gray-200'
                      } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                    >
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative">
                        {/* Company Info */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">{exp.icon}</span>
                          <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {exp.company}
                            </h3>
                            <p className={`text-lg font-semibold bg-gradient-to-r ${exp.color} text-transparent bg-clip-text`}>
                              {exp.position}
                            </p>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className={`flex flex-wrap gap-4 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <span className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            <Calendar className="w-4 h-4" />
                            {exp.startDate} - {exp.endDate}
                          </span>
                          <span className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Description */}
                        <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h4 className={`flex items-center gap-2 font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                            <Award className="w-5 h-5" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className={`achievement-${index} flex items-start gap-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} ${index % 2 === 0 ? 'justify-end text-right' : 'justify-start text-left'}`}
                              >
                                <ChevronRight className={`w-5 h-5 text-cyan-400 flex-shrink-0 ${index % 2 === 0 ? 'order-last' : ''}`} />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className={`skill-${index} text-xs px-3 py-1 rounded-full ${
                                isDarkMode
                                  ? 'bg-slate-800/50 text-slate-300'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? '' : 'col-start-1'}`}>
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg transition-all duration-300 ${activeIndex === index ? 'scale-125' : 'scale-100'}`}>
                      <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'} flex items-center justify-center`}>
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>
                      {/* Pulse Effect */}
                      {activeIndex === index && (
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.color} animate-ping opacity-20`}></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div
                    className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-gray-200'
                    } backdrop-blur-sm shadow-xl`}
                  >
                    {/* Company Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{exp.icon}</span>
                      <div>
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {exp.company}
                        </h3>
                        <p className={`text-base font-semibold bg-gradient-to-r ${exp.color} text-transparent bg-clip-text`}>
                          {exp.position}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-2 mb-4">
                      <span className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`mb-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className={`flex items-center gap-2 font-semibold mb-3 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Award className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className={`achievement-${index} flex items-start gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
                          >
                            <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`skill-${index} text-xs px-3 py-1 rounded-full ${
                            isDarkMode
                              ? 'bg-slate-800/50 text-slate-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="text-center mt-16">
          <button
            className={`group px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Download Full Resume
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;