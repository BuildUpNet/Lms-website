"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const resultsCategories = [
  {
    title: "IIT-JEE Results",
    slug: "iit-jee",
    badge: "Engineering",
    color: "from-red-600 to-red-800",
    textColor: "text-red-700",
    bgBadge: "bg-red-100",
    stats: "1,000+ Selections",
    description: "Consistent Top Ranks in JEE Advanced & Mains year after year.",
    highlights: ["AIR 243 JEE Advanced", "AIR 512 JEE Mains", "99.8+ Percentile Achievers"]
  },
  {
    title: "NEET (UG) Results",
    slug: "neet",
    badge: "Medical",
    color: "from-emerald-600 to-green-800",
    textColor: "text-green-700",
    bgBadge: "bg-green-100",
    stats: "2,500+ Qualifiers",
    description: "Top ranks secured in AIIMS, GMCs and prestigious medical colleges.",
    highlights: ["AIR 115 NEET (UG)", "715/720 Highest Score", "95% Qualification Rate"]
  },
  {
    title: "Class 9-10 (Foundation)",
    slug: "class-9-10",
    badge: "Foundation",
    color: "from-blue-600 to-indigo-800",
    textColor: "text-blue-700",
    bgBadge: "bg-blue-100",
    stats: "98.8% Board Toppers",
    description: "Exceptional foundation results in CBSE/ICSE boards & NTSE/Olympiad exams.",
    highlights: ["100% in Math & Science", "NTSE Scholars", "Olympiad Gold Medalists"]
  }
];

export default function ResultsMainPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8fc]">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-[#C8102E] transition-colors font-medium">Home</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#C8102E] font-semibold">Results</span>
            </nav>
            <p className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide uppercase">
              Lakshya Hall of Fame
            </p>
          </div>
        </section>

        {/* Hero Section */}
        <section className="pt-12 pb-8 text-center max-w-4xl mx-auto px-4">
          <p className="text-[#C8102E] font-bold text-sm uppercase tracking-widest mb-2">Proven Track Record</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1a1a2e] section-title-underline">
            Our Hall of Fame & Results
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Choose a stream below to explore the detailed results, rank holders, and inspirational success stories.
          </p>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-3 gap-8">
            {resultsCategories.map((cat) => (
              <div
                key={cat.slug}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Top Banner */}
                <div className={`h-40 bg-gradient-to-br ${cat.color} p-6 flex flex-col justify-between text-white relative`}>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs uppercase tracking-wider font-extrabold px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                      {cat.badge}
                    </span>
                    <span className="text-xs font-semibold bg-black/30 px-3 py-1 rounded-full">
                      {cat.stats}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black z-10">{cat.title}</h2>
                  <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-5 leading-relaxed">{cat.description}</p>
                    <div className="space-y-2.5 mb-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Highlights</p>
                      {cat.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                          <svg className="w-4 h-4 text-[#C8102E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/results/${cat.slug}`}
                    className="w-full text-center py-3 bg-[#1a1a2e] hover:bg-[#C8102E] text-white font-bold text-sm rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>View Detailed Results</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="py-16 bg-[#1a1a2e] text-white mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-3">Want to be in our next Hall of Fame?</h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto mb-8">
              Join thousands of successful aspirants. Begin your journey with Lakshya's top-notch mentorship today.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-[#F5C518] hover:bg-yellow-400 text-[#1a1a2e] font-extrabold rounded-full transition-all shadow-lg text-sm"
            >
              Get Free Counselling
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
