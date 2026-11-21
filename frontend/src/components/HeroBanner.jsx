"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { heroBannerAPI } from "@/services/api";

const INTERVAL = 10000;
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/api\/?$/, "");

function orderBannersForDisplay(banners) {
  const uploadedOrder = [...banners].sort((a, b) => Number(a.id) - Number(b.id));
  const positions = Array(uploadedOrder.length).fill(null);
  const automatic = [];

  uploadedOrder.forEach((banner) => {
    const displayOrder = Number(banner.display_order) || 0;
    if (displayOrder === 0) {
      automatic.push(banner);
      return;
    }

    let position = Math.min(displayOrder - 1, positions.length - 1);
    while (position < positions.length && positions[position]) position += 1;
    if (position === positions.length) position = positions.lastIndexOf(null);
    if (position >= 0) positions[position] = banner;
  });

  let automaticIndex = 0;
  for (let position = 0; position < positions.length; position += 1) {
    if (!positions[position]) positions[position] = automatic[automaticIndex++];
  }
  return positions.filter(Boolean);
}

const courseIcons = [
  { label: "IIT-JEE Mains",   desc: "Class XI & XII",    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "IIT-JEE Advanced", desc: "Top Engineering",   icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { label: "NEET (UG)",        desc: "Medical Entrance",  icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Foundation",       desc: "Class VIII – X",    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
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
  icon: courseIcons[index % courseIcons.length],
}));

export default function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchHeroBanners = async () => {
      try {
        const response = await heroBannerAPI.getActive();
        if (!response.success || !Array.isArray(response.data)) {
          throw new Error(response.message || "Invalid hero banner response");
        }

        const banners = orderBannersForDisplay(response.data)
          .map((image) => ({
            src: /^https?:\/\//i.test(image.image_url)
              ? image.image_url
              : `${API_BASE}${image.image_url}`,
            alt: image.title || "Lakshya banner",
          }));

        if (active) {
          setSlides(banners);
          setIndex(0);
        }
      } catch (error) {
        console.error("Failed to load hero banners:", error);
      }
    };

    fetchHeroBanners();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides.length > 0 ? index % slides.length : 0;
  const next = () => setIndex((currentIndex) => (currentIndex + 1) % slides.length);
  const prev = () => setIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full bg-white" aria-label="Hero banner">

      <div
        className={`relative w-full ${slides.length === 0 ? "hidden" : ""}`}
        style={{ aspectRatio: "16/5", minHeight: "200px" }}
      >

        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-[1]" />

          {slides.map((slide, slideIndex) => (
            <img
              key={`${slide.src}-${slideIndex}`}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={slideIndex !== current}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${slideIndex === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>


        {/* Prev button */}
        {slides.length > 1 && (
          <button onClick={prev} aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105">
            <svg className="w-5 h-5 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {slides.length > 1 && (
          <button onClick={next} aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105">
            <svg className="w-5 h-5 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, slideIndex) => (
              <button key={slideIndex} onClick={() => setIndex(slideIndex)} aria-label={`Go to slide ${slideIndex + 1}`}
                className={`rounded-full transition-all duration-300 ${slideIndex === current ? "w-6 h-2.5 bg-[#C8102E]" : "w-2.5 h-2.5 bg-white/60 hover:bg-white"}`} />
            ))}
          </div>
        )}

      </div>

      <div className="bg-gray-50 px-4 py-5 sm:px-6" role="region" aria-label="Course categories">
        <div className="mx-auto max-w-7xl overflow-x-auto pb-1">
          <div className="grid min-w-[1080px] grid-cols-9 gap-2.5">
            {courses.map(({ label, icon }) => (
              <div
                key={label}
                className="flex min-h-16 items-center gap-2 rounded-xl border border-gray-100 bg-white px-2.5 py-2.5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#C8102E] shadow-sm ring-1 ring-gray-100">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </span>
                <span className="text-xs font-bold leading-snug text-[#1a1a2e]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
