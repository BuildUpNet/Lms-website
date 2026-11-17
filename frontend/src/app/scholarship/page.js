"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const scholarshipExams = [
  {
    slug: "ltse",
    title: "LTSE 2025",
    fullName: "Lakshya Talent Search Examination",
    badge: "Flagship National Exam",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    gradient: "from-amber-600 via-orange-600 to-red-700",
    audience: "Class 7th to 12th & 12th Pass",
    mode: "Offline Centers & Online Proctored",
    fee: "Free / ₹100",
    maxScholarship: "Up to 100% Fee Waiver",
    rewards: "₹5 Crore+ Pool, Laptops, Medals & National Ranking",
    examDates: "Upcoming Sunday Slots (Nov & Dec 2025)",
    description:
      "India's premier competitive scholarship test assessing analytical acumen, core science concepts, and mathematical aptitude for IIT-JEE, NEET, and Olympiad aspirants.",
    highlights: [
      "Up to 100% Tuition Fee Waiver for classroom batches",
      "Cash rewards & merit certificates for national toppers",
      "Comprehensive 12-page diagnostic performance report",
      "All India Rank (AIR) benchmarking against 50,000+ peers"
    ]
  },
  {
    slug: "fast",
    title: "FAST 2025",
    fullName: "Foundation & Advanced Scholarship Test",
    badge: "Instant Online Test",
    badgeColor: "bg-red-100 text-[#C8102E] border-red-200",
    gradient: "from-[#1a1a2e] via-[#C8102E] to-red-800",
    audience: "Class 8th to 12th & Droppers",
    mode: "100% Online (Take Anytime 24x7)",
    fee: "100% Free",
    maxScholarship: "Up to 75% Instant Concession",
    rewards: "Immediate Scholarship Letter & Admission Voucher",
    examDates: "Daily Flexible Slots (Choose Your Time)",
    description:
      "A fast, 60-minute online assessment that you can take from home anytime. Receive instant evaluation, diagnostic feedback, and guaranteed fee concessions on Lakshya courses.",
    highlights: [
      "Instant test result & scholarship letter within 15 minutes",
      "Flexible slot booking from the comfort of your home",
      "Customized questions tailored to your current school syllabus",
      "Direct admission eligibility without waiting for cycle results"
    ]
  }
];

const generalFaqs = [
  {
    q: "Who is eligible to participate in Lakshya Scholarship Exams?",
    a: "Students currently studying in Classes 7th, 8th, 9th, 10th, 11th, and 12th (as well as 12th passed students preparing for IIT-JEE or NEET) from any recognized board (CBSE, ICSE, State Boards) are eligible."
  },
  {
    q: "How is the scholarship percentage determined?",
    a: "Scholarships are merit-based and granted strictly based on your test score and All India percentile. Top rankers receive up to 100% tuition fee waivers, while other qualifying tiers receive 25% to 90% fee concessions."
  },
  {
    q: "Can I appear for both LTSE and FAST exams?",
    a: "Yes! You can take the instant FAST online assessment to secure an immediate admission discount, and also appear for the national LTSE test to compete for higher cash awards and 100% scholarships."
  },
  {
    q: "What is the syllabus for the scholarship tests?",
    a: "The syllabus is strictly mapped to NCERT and standard school curriculum of your current and previous academic year, with an additional section on Mental Ability (logical reasoning and aptitude)."
  },
  {
    q: "Is there any negative marking in the test?",
    a: "For Class 7th and 8th, there is zero negative marking. For Classes 9th to 12th (IIT/NEET tracks), each correct answer awards +4 marks and incorrect answers deduct -1 mark to mirror competitive exam conditions."
  },
  {
    q: "How will I receive my scholarship certificate and admission offer?",
    a: "For FAST, the scholarship letter is generated instantly on your student dashboard. For LTSE, results and official scorecards are declared within 5–7 days of test completion via SMS and online login."
  }
];

export default function ScholarshipMainPage() {
  const [openFaq, setOpenFaq] = useState(null);

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
              <span className="text-[#C8102E] font-semibold">Scholarship</span>
            </nav>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline-block">
              Lakshya Talent Hunt 2025–26
            </span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#C8102E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#F5C518]/10 blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-extrabold text-[#F5C518] uppercase tracking-wider mb-6">
              <span>★</span> ₹5 Crore+ Scholarship Pool & Awards
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Unlock Your Potential with<br />
              <span className="text-[#F5C518]">Lakshya Scholarship Exams</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-gray-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Quality education should be accessible to every deserving mind. Take our national talent assessment tests, earn up to 100% tuition scholarship, and start your IIT-JEE, NEET, or Foundation journey with India's best mentors.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <p className="text-2xl sm:text-3xl font-black text-[#F5C518]">100%</p>
                <p className="text-xs text-white/80 font-semibold mt-1">Max Fee Waiver</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <p className="text-2xl sm:text-3xl font-black text-white">50,000+</p>
                <p className="text-xs text-white/80 font-semibold mt-1">Students Assessed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <p className="text-2xl sm:text-3xl font-black text-[#F5C518]">2 Tests</p>
                <p className="text-xs text-white/80 font-semibold mt-1">Online & Offline</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <p className="text-2xl sm:text-3xl font-black text-white">Class 7–12</p>
                <p className="text-xs text-white/80 font-semibold mt-1">All Streams</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2 Featured Scholarship Exams Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-[#C8102E] font-bold text-xs uppercase tracking-widest mb-2">Choose Your Assessment</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e]">
              Our Scholarship Examinations
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
              Select the scholarship examination that best aligns with your timeline, study mode, and target preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {scholarshipExams.map((exam) => (
              <div
                key={exam.slug}
                className="bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header Card Banner */}
                  <div className={`p-6 sm:p-8 bg-gradient-to-r ${exam.gradient} text-white relative`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-[#F5C518] uppercase tracking-wider">
                        {exam.badge}
                      </span>
                      <span className="text-xs font-bold text-white/80 bg-black/25 px-3 py-1 rounded-full">
                        {exam.mode.includes("Online") && exam.mode.includes("Offline") ? "Hybrid" : "Online 24x7"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black">{exam.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">{exam.fullName}</p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-white/70 uppercase tracking-wider font-bold">Reward Pool</p>
                        <p className="text-base sm:text-lg font-black text-[#F5C518]">{exam.maxScholarship}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-white/70 uppercase tracking-wider font-bold">Registration Fee</p>
                        <p className="text-sm sm:text-base font-bold text-white">{exam.fee}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {exam.description}
                    </p>

                    {/* Key Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#f7f8fc] p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 font-bold uppercase block text-[10px]">Eligibility</span>
                        <span className="font-bold text-[#1a1a2e] text-xs mt-0.5 block">{exam.audience}</span>
                      </div>
                      <div className="bg-[#f7f8fc] p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 font-bold uppercase block text-[10px]">Exam Dates</span>
                        <span className="font-bold text-[#1a1a2e] text-xs mt-0.5 block">{exam.examDates}</span>
                      </div>
                    </div>

                    {/* Highlights Checklist */}
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Exam Highlights</p>
                      {exam.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    href={`/scholarship/${exam.slug}`}
                    className="w-full py-3.5 px-4 bg-[#1a1a2e] group-hover:bg-[#C8102E] text-white font-black text-sm rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>View Exam Pattern & Register</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Registration Process */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#C8102E] font-bold text-xs uppercase tracking-widest mb-1">Simple & Fast</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e]">
                How to Participate in 4 Easy Steps
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Register Online",
                  desc: "Fill in your student details, choose your current grade (Class 7–12), and select your desired stream (JEE / NEET / Foundation)."
                },
                {
                  step: "02",
                  title: "Select Slot & Mode",
                  desc: "Choose between proctored online test from home or paper-based test at any of our accredited city examination centres."
                },
                {
                  step: "03",
                  title: "Appear for Exam",
                  desc: "Take the 60 or 120-minute multiple-choice assessment based on Science, Math, and Mental Ability topics."
                },
                {
                  step: "04",
                  title: "Claim Scholarship",
                  desc: "Receive your All India diagnostic score report and redeem your fee waiver coupon during Lakshya course enrollment."
                }
              ].map((s, idx) => (
                <div key={idx} className="bg-[#f7f8fc] rounded-2xl p-6 border border-gray-100 relative group hover:border-[#C8102E]/30 transition-colors">
                  <span className="text-3xl font-black text-[#C8102E]/20 group-hover:text-[#C8102E] transition-colors">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-[#1a1a2e] mt-2 mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General Scholarship FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="text-[#C8102E] font-bold text-xs uppercase tracking-widest mb-1">Have Questions?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {generalFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1a1a2e] hover:text-[#C8102E] transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-[#C8102E]" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-14 text-center bg-[#1a1a2e] text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-black">Don't Miss Out on India's Biggest Scholarship!</h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 mb-6 max-w-xl mx-auto">
              Seats at test centers and online testing slots fill up quickly. Register your slot today and take the first step towards academic greatness.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/scholarship/ltse"
                className="px-6 py-3 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-lg"
              >
                Register for LTSE (Up to 100%)
              </Link>
              <Link
                href="/scholarship/fast"
                className="px-6 py-3 bg-[#F5C518] hover:bg-yellow-400 text-[#1a1a2e] font-extrabold rounded-full text-xs sm:text-sm transition-all shadow-lg"
              >
                Take FAST Instant Test
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}