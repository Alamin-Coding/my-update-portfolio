'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Code, Palette, Zap, ArrowRight, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';

type Props = {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
};

const HeroSection = ({ isDarkMode, scrollToSection }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const codeCardRef = useRef<HTMLDivElement>(null);
  const codeLineRefs = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const skills = ['UI/UX', 'React', 'Next.js', 'TypeScript', 'Figma', 'Framer'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Note: Import gsap in your project with: npm install gsap
    // This code assumes you have gsap installed
    // If you don't have gsap, you can use CSS animations instead
    
    const animateElements = async () => {
      try {
        // Dynamic import of gsap
        const gsap = (await import('gsap')).default;

        const ctx = gsap.context(() => {
          // Initial fade in for badge
          gsap.fromTo(
            badgeRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );

          // Staggered heading animation
          if (headingRef.current) {
            const headingLines = headingRef.current.querySelectorAll('.heading-line');
            gsap.fromTo(
              headingLines,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2,
              }
            );
          }

          // Description fade in
          gsap.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
          );

          // Skills tags animation
          if (skillsRef.current) {
            const skillTags = skillsRef.current.querySelectorAll('.skill-tag');
            gsap.fromTo(
              skillTags,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                delay: 0.8,
              }
            );
          }

          // Buttons animation
          if (buttonsRef.current) {
            const buttons = buttonsRef.current.querySelectorAll('button');
            gsap.fromTo(
              buttons,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 1.1,
              }
            );
          }

          // Social links animation
          if (socialRef.current) {
            const socialLinks = socialRef.current.querySelectorAll('a');
            gsap.fromTo(
              socialLinks,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                delay: 1.4,
              }
            );
          }

          // Code card entrance
          gsap.fromTo(
            codeCardRef.current,
            { opacity: 0, x: 50, rotateY: -15 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1,
              ease: 'power3.out',
              delay: 0.5,
            }
          );

          // Code lines typing effect
          codeLineRefs.current.forEach((line, index) => {
            if (line) {
              gsap.fromTo(
                line,
                { opacity: 0, x: -20 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.4,
                  ease: 'power2.out',
                  delay: 1 + index * 0.15,
                }
              );
            }
          });

          // Stats animation
          if (statsRef.current) {
            const statItems = statsRef.current.querySelectorAll('.stat-item');
            gsap.fromTo(
              statItems,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 2,
              }
            );
          }

          // Floating animation for orbs
          gsap.to('.floating-orb-1', {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          gsap.to('.floating-orb-2', {
            y: 20,
            x: -20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

        }, containerRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('GSAP not installed. Please run: npm install gsap');
      }
    };

    animateElements();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-950' : 'bg-gray-50'
      }`}
    >


      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20'
              : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
          }`}
        ></div>
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)'
              : 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.2) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div
        className={`floating-orb-1 absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl transition-colors duration-500 ${
          isDarkMode ? 'bg-blue-500/30' : 'bg-blue-400/40'
        }`}
      ></div>
      <div
        className={`floating-orb-2 absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
          isDarkMode ? 'bg-purple-500/30' : 'bg-purple-400/40'
        }`}
      ></div>

      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 hidden md:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm opacity-0"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span
                className={`text-xs sm:text-sm font-medium ${
                  isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                }`}
              >
                10 Years of Excellence
              </span>
            </div>

            {/* Main Heading with Gradient */}
            <div ref={headingRef} className="space-y-3 sm:space-y-4">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="heading-line block opacity-0">Crafting</span>
                <span className="heading-line block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text opacity-0">
                  Digital
                </span>
                <span className="heading-line block opacity-0">Experiences</span>
              </h1>

              <p
                ref={descriptionRef}
                className={`text-base sm:text-lg lg:text-xl ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                } max-w-lg mx-auto lg:mx-0 opacity-0`}
              >
                Senior Web Designer & Developer specializing in creating stunning,
                user-centric digital solutions that drive results.
              </p>
            </div>

            {/* Animated Skills Tags */}
            <div
              ref={skillsRef}
              className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
            >
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`skill-tag px-3 sm:px-4 py-2 rounded-lg text-sm ${
                    isDarkMode
                      ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border ${
                    isDarkMode ? 'border-slate-700' : 'border-gray-200'
                  } backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer opacity-0`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 opacity-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 ${
                  isDarkMode
                    ? 'border-slate-700 text-white hover:bg-slate-800'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                } transition-all duration-300 hover:scale-105 opacity-0`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Download CV
              </button>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex gap-4 justify-center lg:justify-start">
              {[
                { Icon: Github, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Mail, href: '#' },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-cyan-400'
                      : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-cyan-600'
                  } border ${
                    isDarkMode ? 'border-slate-700' : 'border-gray-200'
                  } transition-all duration-300 hover:scale-110 hover:shadow-lg opacity-0`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - 3D Card Effect */}
          <div
            ref={codeCardRef}
            className="relative order-first lg:order-last opacity-0"
            style={{ perspective: '1000px' }}
          >
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div
                className={`relative ${
                  isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'
                } backdrop-blur-xl rounded-2xl p-6 sm:p-8 border ${
                  isDarkMode ? 'border-slate-800' : 'border-gray-200'
                } transform transition-transform duration-500 hover:scale-[1.02]`}
              >
                {/* Code Window Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span
                    className={`ml-4 text-xs sm:text-sm ${
                      isDarkMode ? 'text-slate-500' : 'text-gray-500'
                    }`}
                  >
                    portfolio.tsx
                  </span>
                </div>

                {/* Animated Code */}
                <div className="space-y-2 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div
                    ref={(el) => {
                      if (el) codeLineRefs.current[0] = el;
                    }}
                    className="flex items-center gap-2 opacity-0"
                  >
                    <Code className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-purple-400">const</span>
                    <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                      designer
                    </span>
                    <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                      =
                    </span>
                    <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                      {'{'}
                    </span>
                  </div>

                  <div className="pl-4 sm:pl-6 space-y-2">
                    <div
                      ref={(el) => {
                        if (el) codeLineRefs.current[1] = el;
                      }}
                      className="opacity-0"
                    >
                      <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>
                        name:
                      </span>
                      <span className="text-green-400"> &quot;Al-Amin&quot;</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ,
                      </span>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) codeLineRefs.current[2] = el;
                      }}
                      className="opacity-0"
                    >
                      <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>
                        role:
                      </span>
                      <span className="text-green-400"> &quot;Senior Web Designer&quot;</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ,
                      </span>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) codeLineRefs.current[3] = el;
                      }}
                      className="opacity-0"
                    >
                      <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>
                        experience:
                      </span>
                      <span className="text-yellow-400"> 10</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ,
                      </span>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) codeLineRefs.current[4] = el;
                      }}
                      className="opacity-0"
                    >
                      <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>
                        skills:
                      </span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        {' '}
                        [
                      </span>
                      <span className="text-green-400">&quot;UI/UX&quot;</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ,
                      </span>
                      <span className="text-green-400"> &quot;React&quot;</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ,
                      </span>
                      <span className="text-green-400"> &quot;Next.js&quot;</span>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                        ]
                      </span>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      if (el) codeLineRefs.current[5] = el;
                    }}
                    className="opacity-0"
                  >
                    <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                      {'}'}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div
                  ref={statsRef}
                  className={`grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t ${
                    isDarkMode ? 'border-slate-800' : 'border-gray-200'
                  }`}
                >
                  {[
                    { icon: Code, label: 'Projects', value: '150+' },
                    { icon: Palette, label: 'Designs', value: '300+' },
                    { icon: Zap, label: 'Clients', value: '50+' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="stat-item text-center group cursor-pointer opacity-0"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                        {stat.value}
                      </div>
                      <div
                        className={`text-xs sm:text-sm ${
                          isDarkMode ? 'text-slate-500' : 'text-gray-500'
                        }`}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl hidden sm:block"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl hidden sm:block"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div
            className={`w-6 h-10 rounded-full border-2 ${
              isDarkMode ? 'border-slate-600' : 'border-gray-400'
            } flex justify-center p-2`}
          >
            <div
              className={`w-1 h-2 ${
                isDarkMode ? 'bg-slate-600' : 'bg-gray-400'
              } rounded-full animate-bounce`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;