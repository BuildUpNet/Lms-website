import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const instant = false;

export function generateStaticParams() {
  return [
    { slug: "iit-jee" },
    { slug: "neet" },
    { slug: "class-9-10" },
  ];
}

const resultsData = {
  "iit-jee": {
    title: "IIT-JEE (Mains & Advanced) Results",
    badge: "Engineering Stream",
    subtitle: "Remarkable achievements by Lakshya students in IIT-JEE Advanced and JEE Mains.",
    bannerGradient: "from-red-600 to-red-900",
    resultBanner: "/images/result-banner-jee.png",
    resultBannerAspect: "aspect-[2.88/1]",
    stats: [
      { label: "IIT Selections", val: "1,000+" },
      { label: "99+ Percentile", val: "185+" },
      { label: "NIT/IIIT Admissions", val: "2,200+" },
      { label: "Best All India Rank", val: "AIR 243" },
    ],
    toppers: [
      {
        name: "Kartikay Ahuja",
        rank: "AIR 3675",
        rankLabel: "JEE ADVANCED",
        score: "99.41%ile",
        scoreLabel: "JEE MAIN",
        college: "IIT Roorkee",
        image: "/images/student.png"
      },
      {
        name: "Arjun Mehta",
        rank: "AIR 243",
        rankLabel: "JEE ADVANCED",
        score: "99.98%ile",
        scoreLabel: "JEE MAIN",
        college: "IIT Delhi (CSE)",
        image: "/images/student.png"
      },
      {
        name: "Rahul Singh",
        rank: "AIR 512",
        rankLabel: "JEE MAIN",
        score: "99.94%ile",
        scoreLabel: "JEE ADVANCED",
        college: "IIT Bombay (ECE)",
        image: "/images/student.png"
      },
      {
        name: "Divyansh Bansal",
        rank: "AIR 890",
        rankLabel: "JEE ADVANCED",
        score: "99.85%ile",
        scoreLabel: "JEE MAIN",
        college: "IIT Kanpur",
        image: "/images/student.png"
      },
      {
        name: "Kavya Sharma",
        rank: "AIR 1240",
        rankLabel: "JEE ADVANCED",
        score: "99.72%ile",
        scoreLabel: "JEE MAIN",
        college: "IIT Roorkee",
        image: "/images/student.png"
      },
      {
        name: "Aditya Nair",
        rank: "AIR 1560",
        rankLabel: "JEE MAIN",
        score: "99.81%ile",
        scoreLabel: "JEE ADVANCED",
        college: "NIT Trichy",
        image: "/images/student.png"
      },
    ],
    features: [
      "Rigorous problem-solving batches focusing on multi-concept JEE Advanced problems",
      "All-India Test Series (AITS) identical to modern NTA and IIT testing interfaces",
      "Special rank booster crash courses and individual doubt mentoring sessions"
    ]
  },
  "neet": {
    title: "NEET (UG) Medical Results",
    badge: "Medical Stream",
    subtitle: "Outstanding scores in NEET-UG with admissions in AIIMS, GMCs and leading medical universities.",
    bannerGradient: "from-emerald-600 to-teal-900",
    resultBanner: "/images/result-banner-neet.png",
    resultBannerAspect: "aspect-[2.18/1]",
    stats: [
      { label: "NEET Qualifiers", val: "2,500+" },
      { label: "Scores Above 650+", val: "210+" },
      { label: "Government Medical Seats", val: "850+" },
      { label: "Top National Rank", val: "AIR 115" },
    ],
    toppers: [
      {
        name: "Sneha Patel",
        rank: "AIR 115",
        rankLabel: "NEET (UG)",
        score: "715/720",
        scoreLabel: "NEET SCORE",
        college: "AIIMS New Delhi",
        image: "/images/student.png"
      },
      {
        name: "Rohan Malhotra",
        rank: "AIR 340",
        rankLabel: "NEET (UG)",
        score: "705/720",
        scoreLabel: "NEET SCORE",
        college: "MAMC New Delhi",
        image: "/images/student.png"
      },
      {
        name: "Ananya Gupta",
        rank: "AIR 620",
        rankLabel: "NEET (UG)",
        score: "698/720",
        scoreLabel: "NEET SCORE",
        college: "VMMC Safdarjung",
        image: "/images/student.png"
      },
      {
        name: "Tanmay Deshmukh",
        rank: "AIR 940",
        rankLabel: "NEET (UG)",
        score: "691/720",
        scoreLabel: "NEET SCORE",
        college: "KGMU Lucknow",
        image: "/images/student.png"
      },
      {
        name: "Pooja Choudhary",
        rank: "AIR 1410",
        rankLabel: "NEET (UG)",
        score: "682/720",
        scoreLabel: "NEET SCORE",
        college: "GMC Chandigarh",
        image: "/images/student.png"
      },
      {
        name: "Varun Verma",
        rank: "AIR 1820",
        rankLabel: "NEET (UG)",
        score: "677/720",
        scoreLabel: "NEET SCORE",
        college: "SMS Jaipur",
        image: "/images/student.png"
      },
    ],
    features: [
      "Line-by-line NCERT Biology mastery programs with daily diagram tests",
      "Extensive high-yield question banks for Physics & Chemistry with zero formula rote",
      "Special test analysis sessions identifying negative-marking patterns and accuracy trends"
    ]
  },
  "class-9-10": {
    title: "Class 9th & 10th (Foundation & Boards)",
    badge: "Foundation Stream",
    subtitle: "Setting benchmark results in CBSE/ICSE Board examinations, Olympiads, and NTSE.",
    bannerGradient: "from-blue-600 to-indigo-950",
    resultBanner: "/images/result-banner-foundation.png",
    resultBannerAspect: "aspect-[2.88/1]",
    stats: [
      { label: "Above 95% in Boards", val: "420+" },
      { label: "Perfect 100/100 Scores", val: "135+" },
      { label: "Olympiad Qualifiers", val: "310+" },
      { label: "NTSE Scholars", val: "68+" },
    ],
    toppers: [
      {
        name: "Ishaan Grover",
        rank: "99.2%",
        rankLabel: "CBSE BOARD",
        score: "100/100",
        scoreLabel: "MATH & SCIENCE",
        college: "State Topper",
        image: "/images/student.png"
      },
      {
        name: "Riya Sen",
        rank: "98.8%",
        rankLabel: "ICSE BOARD",
        score: "494/500",
        scoreLabel: "TOTAL MARKS",
        college: "State Merit Rank 3",
        image: "/images/student.png"
      },
      {
        name: "Harshvardhan Rao",
        rank: "98.4%",
        rankLabel: "CBSE BOARD",
        score: "SCHOLAR",
        scoreLabel: "NTSE STAGE 2",
        college: "District Topper",
        image: "/images/student.png"
      },
      {
        name: "Bhavya Trivedi",
        rank: "AIR 8",
        rankLabel: "OLYMPIAD",
        score: "GOLD MEDAL",
        scoreLabel: "SCIENCE OLYMPIAD",
        college: "International Merit",
        image: "/images/student.png"
      },
      {
        name: "Simran Kaur",
        rank: "98.0%",
        rankLabel: "ANNUAL FINALS",
        score: "100/100",
        scoreLabel: "MATHEMATICS",
        college: "Perfect Score Awardee",
        image: "/images/student.png"
      },
      {
        name: "Aarav Kapoor",
        rank: "97.8%",
        rankLabel: "CBSE BOARD",
        score: "489/500",
        scoreLabel: "TOTAL MARKS",
        college: "Delhi Public School",
        image: "/images/student.png"
      },
    ],
    features: [
      "Conceptual learning bridge bridging CBSE school curriculum with IIT/NEET aptitude",
      "Regular descriptive practice tests with dedicated model answer sheet analysis",
      "Special Olympiad & NTSE grooming modules with mental ability workshops"
    ]
  }
};

async function CategoryResultContent({ params }) {
  const { slug } = await params;
  const data = resultsData[slug];

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Result Category Not Found</h1>
          <p className="text-gray-500 mt-2 mb-6">The result section you are looking for does not exist.</p>
          <Link href="/results" className="px-6 py-2.5 bg-[#C8102E] text-white font-semibold rounded-xl text-sm">
            Back to All Results
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8fc]">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-[#C8102E] transition-colors font-medium">Home</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/results" className="text-gray-500 hover:text-[#C8102E] transition-colors font-medium">Results</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#C8102E] font-semibold">{data.badge}</span>
            </nav>
          </div>
        </section>

        {/* Course results banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <p className="text-[#C8102E] font-bold text-xs uppercase tracking-widest mb-1">Our Achievers</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e]">Top Rankers & Scorecards</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Proud students who turned hard work into remarkable ranks with Lakshya's faculty guidance.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className={`relative ${data.resultBannerAspect}`}>
                <Image
                  src={data.resultBanner}
                  alt={`${data.badge} student results`}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </figure>
          </div>
        </section>

        {/* Why this preparation works */}
        <section className="bg-white py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-6 text-center">
              Key Methodology Behind These Results
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              {data.features.map((feat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#f7f8fc] border border-gray-100">
                  <div className="w-8 h-8 rounded-xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center font-bold text-sm mb-3">
                    0{i + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 text-center bg-[#1a1a2e] text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl font-black">Ready to Start Your Success Story?</h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 mb-6">
              Connect with our expert subject counsellors to choose your batch and start prep today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-full text-xs sm:text-sm transition-all"
              >
                Enroll For This Course
              </Link>
              <Link
                href="/results"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-xs sm:text-sm transition-all"
              >
                View All Results
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function CategoryResultPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryResultContent params={params} />
    </Suspense>
  );
}
