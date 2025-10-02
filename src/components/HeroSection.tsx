'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import alamin from '@/assets/alamin.jpg';

type Props = {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
};

const HeroSection = ({ isDarkMode, scrollToSection }: Props) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const lines = [
    "import React from 'react';",
    "import { NextPage } from 'next';",
    '',
    'const Home: NextPage = () => {',
    '  return (',
    '    <main>',
    "      <h1 className='text-4xl font-bold '>Hello, Next.js 👋</h1>",
    '    </main>',
    '  );',
    '};',
    '',
    'export default Home;',
  ];

  useEffect(() => {
    if (codeRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.code-line',
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
          },
        );
      }, codeRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side Code Effect */}
        <div
          ref={codeRef}
          className={`p-6 rounded-xl shadow-lg font-mono text-sm leading-relaxed border ${
            isDarkMode
              ? 'bg-slate-900 border-slate-700 text-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-800'
          }`}
        >
          {lines.map((line, idx) => (
            <p key={idx} className="code-line  text-wrap opacity-0">
              {line}
            </p>
          ))}

          <button
            onClick={() => scrollToSection('contact')}
            className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-white"
          >
            Contact Me
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <Image
            src={alamin}
            alt="Al-Amin"
            width={400}
            height={400}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
