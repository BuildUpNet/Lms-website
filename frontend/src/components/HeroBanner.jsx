/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const slides = [
  { src: "/images/banner1.png", alt: "Lakshya IIT-JEE Coaching Banner" },
  { src: "/images/banner2.png", alt: "Lakshya NEET Coaching Banner" },
  { src: "/images/banner3.png", alt: "Lakshya Foundation Program Banner" },
];

const track = [...slides, slides[0]];

const INTERVAL = 3500; 

const courseIcons = [
  { label: "IIT-JEE Mains",   desc: "Class XI & XII",    href: "/courses", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "IIT-JEE Advanced", desc: "Top Engineering",   href: "/courses", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { label: "NEET (UG)",        desc: "Medical Entrance",  href: "/courses", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Foundation",       desc: "Class VIII – X",    href: "/courses", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
].map(({ icon }) => icon);

const courses = [
  "Topic-wise Tests",
  "Regular Homework",
  "Topic-wise Videos",
  "Subjective Tests",
  "Important Questions",
  "Mock Tests",
  "Career Guidance",
  "Live Classes",
  "Doubt Solving",
].map((label, index) => ({
  label,
  href: "/courses",
  icon: courseIcons[index % courseIcons.length],
}));

export default function HeroBanner() {
  const [index, setIndex]       = useState(0);
  const [animated, setAnimated] = useState(true);
  const timerRef                = useRef(null);

  const current = index >= slides.length ? 0 : index;

  // Auto-play
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i >= slides.length ? slides.length : i + 1));
    }, INTERVAL);
  }, []);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleTransitionEnd = useCallback(() => {
    if (index === slides.length) {
      clearInterval(timerRef.current); 
      setAnimated(false);             
      setIndex(0);                     
    }
  }, [index]);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimated(true);
          startTimer(); 
        })
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated, startTimer]);

  // ── Manual navigation
  const goTo = useCallback((realIdx) => {
    setAnimated(true);
    setIndex(realIdx);
    startTimer();
  }, [startTimer]);

  const next = useCallback(() => {
    setAnimated(true);
    setIndex((i) => i + 1);
    startTimer();
  }, [startTimer]);

  const prev = useCallback(() => {
    setAnimated(true);
    setIndex((i) => (i <= 0 ? slides.length - 1 : i - 1));
    startTimer();
  }, [startTimer]);

  return (
    <section className="relative w-full bg-white" aria-label="Hero banner">

      <div className="relative w-full" style={{ aspectRatio: "16/5", minHeight: "200px" }}>

        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-[1]" />

          {/* Flex track */}
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animated ? "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {track.map((slide, i) => (
              <div key={i} className="flex-shrink-0 w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>


        {/* Prev button */}
        <button onClick={prev} aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105">
          <svg className="w-5 h-5 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button onClick={next} aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105">
          <svg className="w-5 h-5 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-[#C8102E]" : "w-2.5 h-2.5 bg-white/60 hover:bg-white"}`} />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-4 right-4 z-10 bg-black/40 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {current + 1} / {slides.length}
        </div>

      </div>

      <div className="hero-course-ticker" role="region" aria-label="Course categories">
        <div className="hero-course-ticker-viewport">
          <div className="hero-course-ticker-track">
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate" : "original"}
                className="hero-course-ticker-group"
                aria-hidden={isDuplicate || undefined}
              >
                {courses.map(({ label, href, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hero-course-ticker-item"
                    tabIndex={isDuplicate ? -1 : undefined}
                  >
                    <svg className="hero-course-ticker-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    <span className="hero-course-ticker-label">{label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
