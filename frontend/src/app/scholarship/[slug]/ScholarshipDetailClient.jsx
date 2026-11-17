"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const scholarshipData = {
  ltse: {
    title: "LTSE 2025",
    fullName: "Lakshya Talent Search Examination",
    badge: "Flagship National Talent Hunt",
    gradient: "from-[#1a1a2e] via-red-900 to-[#C8102E]",
    tagline: "India's premier competitive scholarship test for Class 7th to 12th students preparing for IIT-JEE, NEET & Olympiads.",
    maxScholarship: "Up to 100% Fee Waiver",
    rewardPool: "₹5 Crore+ Pool, Laptops & Medals",
    examFee: "₹100",
    duration: "2 Hours",
    totalQuestions: "60 MCQs",
    markingScheme: "+4 for correct, -1 for incorrect (No negative for Class 7-8)",
    mode: "Offline Center & Proctored Online",
    examDates: "Sunday Slots (23rd Nov & 7th Dec 2025)",
    resultsDate: "Within 7 Days of Test Completion",

    eligibility: [
      "Students currently studying in Class 7th, 8th, 9th, 10th, 11th, and 12th (Science stream).",
      "Students who have passed Class 12th and are taking a repeater/dropper year for IIT-JEE or NEET.",
      "Open to students from all educational boards (CBSE, ICSE, State Boards, and International Baccalaureate).",
      "No minimum cut-off percentage required in prior school exams — every student is eligible to compete."
    ],

    registrationProcedure: [
      {
        step: "Step 1",
        title: "Online Form Submission",
        desc: "Fill in the candidate registration form with student details, contact information, and current class."
      },
      {
        step: "Step 2",
        title: "Select Preferred Slot & Mode",
        desc: "Choose between paper-based offline test at an authorized city center or AI-proctored online test from home."
      },
      {
        step: "Step 3",
        title: "Admit Card Download",
        desc: "Instant generation of your unique LTSE Roll Number and downloadable Admit Card / Hall Ticket with slot timing."
      },
      {
        step: "Step 4",
        title: "Test Day & Performance Report",
        desc: "Appear for the 120-minute test. Access your comprehensive 12-page skill diagnostic report and scholarship certificate."
      }
    ],

    pattern: [
      { subject: "Physics", questions: "15 MCQs", marks: "60 Marks", focus: "Conceptual mechanics, optics, electricity" },
      { subject: "Chemistry", questions: "15 MCQs", marks: "60 Marks", focus: "Physical & chemical changes, matter, reactions" },
      { subject: "Mathematics / Biology", questions: "15 MCQs", marks: "60 Marks", focus: "Grade-specific math or human/plant biology" },
      { subject: "Mental Ability (MAT)", questions: "15 MCQs", marks: "60 Marks", focus: "Logical reasoning, series, analytical puzzles" }
    ],

    scholarshipSlabs: [
      { rank: "Top 1 to 10 (National)", waiver: "100% Scholarship", cash: "₹25,000 Cash + Free Laptop", label: "National Super Achievers" },
      { rank: "Top 11 to 50", waiver: "90% Scholarship", cash: "₹10,000 Cash + Tablet", label: "State Meritorious Ranks" },
      { rank: "Top 51 to 200", waiver: "75% Scholarship", cash: "Merit Trophy & Smart Band", label: "Zonal Top Rankers" },
      { rank: "Top 201 to 500", waiver: "50% Scholarship", cash: "Certificate of Excellence", label: "Distinction Achievers" },
      { rank: "Top 501 to 2,000", waiver: "35% Scholarship", cash: "Participation Certificate", label: "Commendation Awardees" },
      { rank: "All Other Qualifiers (>40%)", waiver: "20% Scholarship", cash: "Official Assessment Report", label: "Qualifying Aspirants" }
    ],

    faqs: [
      {
        q: "What documents are required on the exam day?",
        a: "Offline candidates must bring a printed copy of the LTSE Admit Card, a school identity card / Aadhaar card, and HB black/blue ballpoint pens. Online candidates require an active webcam and stable internet connection."
      },
      {
        q: "Can I choose my nearest offline examination centre?",
        a: "Yes. During registration, you can choose your preferred city and examination venue from our list of accredited schools and Lakshya coaching branches across India."
      },
      {
        q: "How will the test score be used to calculate scholarship?",
        a: "The scholarship percentage is applied directly to the tuition fee component of your chosen classroom or hybrid program at any Lakshya branch for the upcoming academic session."
      },
      {
        q: "What is the syllabus tested in LTSE?",
        a: "The exam questions cover NCERT and CBSE concepts from the first term of your current school class, as well as fundamental concepts from your previous academic year, combined with standard mental aptitude tests."
      },
      {
        q: "Is there any negative marking in LTSE?",
        a: "For Class 7th and 8th students, there is no negative marking (+4 for correct, 0 for wrong). For Class 9th to 12th, +4 is awarded for each correct answer and -1 is deducted for incorrect answers."
      },
      {
        q: "When will the results be announced and how will I be informed?",
        a: "Results are declared within 7 days of the exam on the Lakshya portal. You will receive an SMS and WhatsApp notification with your score, All India Rank, and official scholarship authorization letter."
      }
    ]
  },

  fast: {
    title: "FAST 2025",
    fullName: "Foundation & Advanced Scholarship Test",
    badge: "Instant 24x7 Online Assessment",
    gradient: "from-[#1a1a2e] via-blue-950 to-indigo-900",
    tagline: "Instant online admission test you can take anytime from home with immediate scholarship confirmation on your Lakshya course.",
    maxScholarship: "Up to 75% Instant Concession",
    rewardPool: "Guaranteed Merit Discount + Free Counselling",
    examFee: "100% Free of Cost",
    duration: "60 Minutes (1 Hour)",
    totalQuestions: "30 MCQs",
    markingScheme: "+4 for correct, 0 for incorrect (Zero Negative Marking)",
    mode: "100% Online (Laptop, Tablet or Smartphone)",
    examDates: "Flexible (Available 24x7 Everyday)",
    resultsDate: "Instant (Within 10 Minutes of Submission)",

    eligibility: [
      "Students currently in Class 8th, 9th, 10th, 11th, and 12th.",
      "Class 12th pass students looking for immediate admission into JEE / NEET dropper batches.",
      "Aspirants looking for instant admission without waiting for formal term cycles.",
      "Open to students from any educational board and any state."
    ],

    registrationProcedure: [
      {
        step: "Step 1",
        title: "Fast Mobile Verification",
        desc: "Enter your mobile number, verify via OTP, and select your target program (IIT-JEE, NEET, or Foundation)."
      },
      {
        step: "Step 2",
        title: "Instant Test Activation",
        desc: "No waiting for dates — begin your 60-minute proctored online test immediately or schedule a convenient slot today."
      },
      {
        step: "Step 3",
        title: "Automated Evaluation",
        desc: "Submit your answers and get an instant AI-evaluated performance report detailing strengths and chapter gaps."
      },
      {
        step: "Step 4",
        title: "Redeem Scholarship Letter",
        desc: "Your guaranteed fee concession coupon is immediately activated and can be applied during course checkout."
      }
    ],

    pattern: [
      { subject: "Core Physics", questions: "10 MCQs", marks: "40 Marks", focus: "Applied concepts & daily scientific phenomena" },
      { subject: "Core Chemistry", questions: "10 MCQs", marks: "40 Marks", focus: "Reactions, periodic trends & basic concepts" },
      { subject: "Mathematics / Biology", questions: "10 MCQs", marks: "40 Marks", focus: "Algebra, geometry or life processes" }
    ],

    scholarshipSlabs: [
      { rank: "Score: 90% and above", waiver: "75% Scholarship", cash: "Instant Direct Admission Token", label: "Elite Achiever" },
      { rank: "Score: 80% to 89%", waiver: "50% Scholarship", cash: "Pre-loaded Study Kit", label: "High Distinction" },
      { rank: "Score: 70% to 79%", waiver: "35% Scholarship", cash: "Digital Mentorship Access", label: "Merit Ranker" },
      { rank: "Score: 50% to 69%", waiver: "25% Scholarship", cash: "Free Diagnostic Session", label: "Qualified Candidate" },
      { rank: "Score: Below 50%", waiver: "15% Scholarship", cash: "Free Subject Foundation Booster", label: "Special Encouragement" }
    ],

    faqs: [
      {
        q: "What devices can I use to take the FAST test?",
        a: "You can take FAST on any device equipped with a modern web browser: desktop PC, laptop, tablet, or smartphone with an active internet connection."
      },
      {
        q: "Is there any registration fee for FAST?",
        a: "No! FAST is 100% free of cost with zero registration charges."
      },
      {
        q: "Can I retake the test if my internet disconnects?",
        a: "Yes. In case of unexpected power failure or connectivity loss, your timer is paused for up to 10 minutes and you can resume right where you left off."
      },
      {
        q: "How long is my FAST scholarship valid?",
        a: "The scholarship discount letter generated by FAST is valid for 15 days from the date of the test to complete course enrollment."
      },
      {
        q: "Is there any negative marking in FAST?",
        a: "No. FAST has zero negative marking so that students can attempt all questions with confidence."
      },
      {
        q: "Can FAST scholarship be combined with early bird admission offers?",
        a: "Yes! FAST scholarships can be clubbed with our early bird fee concessions to give you maximum financial support."
      }
    ]
  }
};

export default function ScholarshipDetailClient({ slug }) {
  const exam = scholarshipData[slug];

  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentPhone: "",
    email: "",
    currentClass: "Class 10",
    targetCourse: "IIT-JEE",
    testMode: "Online"
  });

  if (!exam) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Scholarship Exam Not Found</h1>
          <p className="text-gray-500 mt-2 mb-6">The scholarship examination you requested does not exist.</p>
          <Link href="/scholarship" className="px-6 py-2.5 bg-[#C8102E] text-white font-semibold rounded-xl text-sm">
            View All Scholarship Exams
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentPhone) return;
    setFormSubmitted(true);
  };

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
              <Link href="/scholarship" className="text-gray-500 hover:text-[#C8102E] transition-colors font-medium">Scholarship</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#C8102E] font-semibold">{exam.title}</span>
            </nav>
            <Link
              href="/scholarship"
              className="text-xs font-semibold text-[#C8102E] hover:underline flex items-center gap-1"
            >
              <span>Other Exams</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Hero Header */}
        <section className={`bg-gradient-to-r ${exam.gradient} text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#F5C518] mb-4">
                <span>★</span> {exam.badge}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                {exam.title}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-white/90 mt-1">
                {exam.fullName}
              </p>
              <p className="mt-3 text-white/80 max-w-2xl text-sm sm:text-base leading-relaxed">
                {exam.tagline}
              </p>

              {/* Badges strip */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs font-bold text-[#F5C518]">
                  {exam.maxScholarship}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold text-white">
                  Mode: {exam.mode}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold text-white">
                  Fee: {exam.examFee}
                </span>
              </div>
            </div>

            {/* Quick Apply Card in Hero */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <p className="text-xs font-bold text-[#F5C518] uppercase tracking-widest">Next Exam Slot</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{exam.examDates}</p>
              <p className="text-xs text-white/70 mt-1">Result: {exam.resultsDate}</p>

              <a
                href="#register"
                className="mt-5 w-full block py-3.5 bg-[#F5C518] hover:bg-yellow-400 text-[#1a1a2e] font-black text-sm rounded-xl transition-all shadow-xl"
              >
                Register For Exam Now ↓
              </a>
            </div>
          </div>
        </section>

        {/* Quick Highlights Strip */}
        <section className="bg-white border-b border-gray-100 shadow-sm py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="border-r border-gray-100 px-3">
                <p className="text-2xl sm:text-3xl font-black text-[#C8102E]">{exam.duration}</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Test Duration</p>
              </div>
              <div className="border-r border-gray-100 px-3">
                <p className="text-2xl sm:text-3xl font-black text-[#1a1a2e]">{exam.totalQuestions}</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Question Count</p>
              </div>
              <div className="border-r border-gray-100 px-3">
                <p className="text-2xl sm:text-3xl font-black text-[#C8102E]">{exam.maxScholarship.split(" ")[2] || "100%"}</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Highest Waiver</p>
              </div>
              <div className="px-3">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">{exam.examFee}</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Registration Fee</p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-[#C8102E] font-bold text-xs uppercase tracking-widest">Candidate Requirements</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mt-1 mb-4">
                Eligibility Criteria
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Please verify the eligibility conditions below before filling out your scholarship application.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {exam.eligibility.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#f7f8fc] rounded-2xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Procedure of Registration */}
        <section className="bg-white py-14 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#C8102E] font-bold text-xs uppercase tracking-widest">Smooth Registration</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mt-1">
                Procedure of Registration
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
                Follow this simple workflow to register, receive your admit card, and participate in the scholarship test.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {exam.registrationProcedure.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#f7f8fc] rounded-2xl p-6 border border-gray-100 relative group hover:border-[#C8102E]/40 hover:shadow-lg transition-all"
                >
                  <span className="text-xs font-black px-2.5 py-1 bg-[#C8102E] text-white rounded-full uppercase tracking-wider inline-block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-[#1a1a2e] mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exam Pattern & Section Breakdown */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <span className="text-[#C8102E] font-bold text-xs uppercase tracking-widest">Question Breakdown</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mt-1">
              Exam Pattern & Structure
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl mx-auto">
              Marking Scheme: {exam.markingScheme}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {exam.pattern.map((p, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] font-black flex items-center justify-center mx-auto mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-extrabold text-[#1a1a2e] text-base">{p.subject}</h3>
                <p className="text-xs font-bold text-[#C8102E] mt-1">{p.questions} · {p.marks}</p>
                <p className="text-xs text-gray-500 mt-3 font-normal leading-relaxed">{p.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarship Slabs Matrix */}
        <section className="bg-white py-14 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#C8102E] font-bold text-xs uppercase tracking-widest">Transparent Merit Tiers</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mt-1">
                Scholarship Slabs & Awards
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Rewards and tuition fee waivers allocated strictly based on your test performance.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1a1a2e] text-white">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Rank / Score Band</th>
                    <th className="py-3.5 px-4 font-bold">Tuition Fee Waiver</th>
                    <th className="py-3.5 px-4 font-bold">Awards & Recognition</th>
                    <th className="py-3.5 px-4 font-bold hidden sm:table-cell">Tier Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {exam.scholarshipSlabs.map((s, idx) => (
                    <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-extrabold text-[#1a1a2e]">{s.rank}</td>
                      <td className="py-3.5 px-4 font-black text-[#C8102E]">{s.waiver}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">{s.cash}</td>
                      <td className="py-3.5 px-4 text-gray-400 font-semibold text-xs hidden sm:table-cell">{s.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interactive Quick Registration Form Section */}
        <section id="register" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#C8102E] p-6 sm:p-8 text-white text-center">
              <span className="text-[#F5C518] text-xs font-black uppercase tracking-widest">Instant Slot Booking</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                Register for {exam.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-md mx-auto">
                Fill the quick form below. You will receive immediate SMS confirmation with your roll number.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-[#1a1a2e]">Registration Successful!</h3>
                  <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-[#1a1a2e]">{formData.studentName}</span>. Your slot for <span className="font-bold text-[#C8102E]">{exam.title}</span> has been provisionally reserved. Our academic coordinator will contact <span className="font-bold text-[#1a1a2e]">{formData.parentPhone}</span> with your hall ticket details.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-[#1a1a2e] text-white text-xs font-bold rounded-xl"
                  >
                    Register Another Student
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Parent / Student Mobile *
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Current Class *
                      </label>
                      <select
                        name="currentClass"
                        value={formData.currentClass}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white"
                      >
                        <option>Class 7</option>
                        <option>Class 8</option>
                        <option>Class 9</option>
                        <option>Class 10</option>
                        <option>Class 11 (Science)</option>
                        <option>Class 12 (Science)</option>
                        <option>Class 12th Pass (Dropper)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Target Preparation *
                      </label>
                      <select
                        name="targetCourse"
                        value={formData.targetCourse}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white"
                      >
                        <option>IIT-JEE (Mains & Advanced)</option>
                        <option>NEET (UG Medical)</option>
                        <option>Foundation (Class 8–10 & Olympiads)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Preferred Test Mode *
                      </label>
                      <select
                        name="testMode"
                        value={formData.testMode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white"
                      >
                        <option>Proctored Online Test (From Home)</option>
                        <option>Offline Paper-Based Test (Nearest Center)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#C8102E] hover:bg-[#a50d25] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Complete Free Registration →
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2">
                       Your details are safe with us. 
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <span className="text-[#C8102E] font-bold text-xs uppercase tracking-widest">Clarifications</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] mt-1">
              Frequently Asked Questions for {exam.title}
            </h2>
          </div>

          <div className="space-y-3">
            {exam.faqs.map((faq, idx) => (
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
      </main>

      <Footer />
    </>
  );
}
