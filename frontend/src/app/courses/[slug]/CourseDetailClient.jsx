"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fallbackCourses } from "@/data/publicCourses";
import { courseAPI } from "@/services/api";

function getCourseType(name = "") {
  const normalizedName = name.toLowerCase();
  if (normalizedName.includes("foundation")) {
    return {
      label: "Foundation",
      summary: "Build strong academic fundamentals and develop the confidence to take on what comes next.",
      subjects: ["Mathematics", "Science", "Problem solving"],
      heroLead: "Build the fundamentals that make every next topic easier.",
      heroExplanation: "Strong foundations grow when students connect school concepts, practice reasoning, and revisit ideas that need more attention.",
      panelTitle: "A confident start begins with strong basics.",
      panelDescription: "Strengthen core understanding in Mathematics and Science while developing the habit of asking, exploring, and practicing.",
      outcomes: ["Concept clarity", "Reasoning skills", "Study confidence"],
      nextStepTitle: "Help your fundamentals grow with your goals.",
      nextStepDescription: "Tell us what you are working toward and which topics feel challenging. Our team can explain how this program fits with your school learning and next academic steps.",
    };
  }
  if (normalizedName.includes("neet")) {
    return {
      label: "Medical entrance",
      summary: "Prepare for the NEET journey with a clear study structure and focused subject practice.",
      subjects: ["Physics", "Chemistry", "Biology"],
      heroLead: "Prepare across Biology, Physics, and Chemistry with purpose.",
      heroExplanation: "NEET preparation combines detailed subject knowledge with the ability to recall, interpret, and apply concepts. Clear revision goals and review of practice can keep preparation focused.",
      panelTitle: "Make every subject part of one balanced plan.",
      panelDescription: "Move between core concepts, active recall, and question practice, then use mistakes to decide what to revisit.",
      outcomes: ["Subject-wise revision", "Concept application", "Practice review"],
      nextStepTitle: "A focused plan for your NEET preparation.",
      nextStepDescription: "Discuss subject coverage, course duration, and your current preparation goals with our team. Get clarity on the program and plan your next steps.",
    };
  }
  if (normalizedName.includes("jee")) {
    return {
      label: "Engineering entrance",
      summary: "Strengthen core concepts and build the problem-solving skills needed for JEE preparation.",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      heroLead: "Turn strong concepts into confident problem-solving.",
      heroExplanation: "JEE questions often ask students to connect ideas and reason through multiple steps. Build the habit of understanding a concept, choosing an approach, and learning from each practice attempt.",
      panelTitle: "Build understanding that carries into problem solving.",
      panelDescription: "Strengthen core ideas, apply them to unfamiliar questions, and review your approach to find what to improve next.",
      outcomes: ["Concept connections", "Multi-step reasoning", "Mistake review"],
      nextStepTitle: "Make your JEE preparation more intentional.",
      nextStepDescription: "Talk through the subjects you want to strengthen and the challenges you are facing. Our team can explain the course structure, duration, and how to get started.",
    };
  }
  return {
    label: "Academic program",
    summary: "A structured learning program designed to help you make steady progress toward your goals.",
    subjects: ["Concept learning", "Guided practice", "Progress review"],
    heroLead: "Build a steady learning routine around your goals.",
    heroExplanation: "Make progress by understanding key concepts, applying them through practice, and reviewing the topics that need another look.",
    panelTitle: "Keep learning purposeful and manageable.",
    panelDescription: "Clarify what you are working toward, break it into achievable steps, and build confidence through regular practice.",
    outcomes: ["Clear learning goals", "Guided practice", "Progress awareness"],
    nextStepTitle: "Find the right next step for your studies.",
    nextStepDescription: "Share your goals and questions with our team. They can walk you through the program details and help you understand what to expect before enrolling.",
  };
}

const learningSteps = [
  {
    number: "01",
    title: "Learn the concepts",
    description: "Start with clear explanations that help you understand the ideas behind each topic.",
  },
  {
    number: "02",
    title: "Practice with purpose",
    description: "Apply what you learn through focused questions and regular revision.",
  },
  {
    number: "03",
    title: "Review your progress",
    description: "Use practice and feedback to see what is working and where to focus next.",
  },
];

const testimonialsByProgram = {
  "Medical entrance": [
    {
      quote: "I used to rush through Biology and miss small details. Revising one topic at a time helped me see where I needed more practice.",
      attribution: "NEET aspirant",
    },
    {
      quote: "Physics felt challenging at first. Breaking each problem into steps made me less nervous about trying the questions.",
      attribution: "NEET student",
    },
    {
      quote: "Practicing questions by subject helped me keep track of what I wanted to revise before a test.",
      attribution: "Medical entrance student",
    },
  ],
  "Engineering entrance": [
    {
      quote: "I struggled to connect formulas to the actual problems. Working through each step made the ideas clearer to me.",
      attribution: "JEE aspirant",
    },
    {
      quote: "Math questions used to take me a long time. Practicing different approaches helped me think through them more calmly.",
      attribution: "JEE student",
    },
    {
      quote: "Reviewing my mistakes helped me notice the topics I kept overlooking and decide what to work on next.",
      attribution: "Engineering entrance student",
    },
  ],
  Foundation: [
    {
      quote: "Math and Science felt easier when I understood the idea behind each question instead of just memorizing steps.",
      attribution: "Foundation student",
    },
    {
      quote: "Practice helped me feel more confident with school topics and showed me which parts I still needed to revise.",
      attribution: "School student",
    },
    {
      quote: "When I get stuck, breaking a big question into smaller parts helps me keep trying.",
      attribution: "Foundation learner",
    },
  ],
  "Academic program": [
    {
      quote: "Having a clear routine helped me see what I had learned and what I wanted to practice next.",
      attribution: "Lakshya student",
    },
    {
      quote: "Taking time to understand a topic before moving on made my study sessions feel more focused.",
      attribution: "Program student",
    },
    {
      quote: "Keeping track of the questions I found difficult helped me choose what to revise.",
      attribution: "Course student",
    },
  ],
};

function getDisplayCourseName(name = "") {
  return name
    .replace(/\b(?:online|self[\s-]?paced)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasRemoteLearningCopy(text = "") {
  return /\b(?:online|self[\s-]?paced|recorded|virtual|remote)\b|live\s+(?:classes|doubt|sessions)/i.test(text);
}

function DetailSection({ children, className = "", delay = 0 }) {
  return (
    <section
      className={`course-detail-reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

function ScrollReveal({ as: Element = "div", children, className = "", delay = 0 }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`course-scroll-reveal ${isVisible ? "course-scroll-reveal-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Element>
  );
}

export default function CourseDetailClient({ slug }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fallbackCourse = fallbackCourses.find(
      (item) => String(item.id) === String(slug)
    );

    const loadCourse = async () => {
      try {
        const response = await courseAPI.getPublic();
        const courses = Array.isArray(response.data) ? response.data : [];
        const match = courses.find((item) => String(item.id) === String(slug));
        if (active) setCourse(match || fallbackCourse || null);
      } catch {
        if (active) setCourse(fallbackCourse || null);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCourse();
    return () => {
      active = false;
    };
  }, [slug]);

  const type = getCourseType(course?.course_name);
  const displayCourseName = getDisplayCourseName(course?.course_name);
  const courseDescription =
    course?.description && !hasRemoteLearningCopy(course.description)
      ? course.description
      : type.summary;
  const isFoundation = type.label === "Foundation";
  const testimonials = testimonialsByProgram[type.label] || testimonialsByProgram["Academic program"];
  const examName = type.label === "Medical entrance"
    ? "NEET"
    : type.label === "Engineering entrance"
      ? "JEE"
      : null;
  const faqs = course
    ? [
        {
          question: "What subjects does this course cover?",
          answer: `The main focus areas are ${type.subjects.join(", ")}. Contact our team for a detailed topic-wise syllabus.`,
        },
        {
          question: isFoundation
            ? "How can this course help me strengthen my basics?"
            : examName
              ? `How can I crack ${examName} with classroom coaching?`
              : "How can this course support my learning goals?",
          answer: isFoundation
            ? "A strong foundation comes from understanding concepts, practicing regularly, and asking questions when a topic feels difficult. Contact our team to learn how the course is structured."
            : "A clear study plan, consistent classroom learning, focused practice, and reviewing mistakes can help you prepare more effectively. Our counsellors can discuss the course approach with you.",
        },
        {
          question: isFoundation
            ? "Is it too late to improve my understanding of a topic?"
            : `Is it too late to restart my ${examName || "course"} preparation?`,
          answer: "It is possible to make progress at different stages. Start by identifying the topics that need attention and discuss a realistic plan with your teachers or counsellor.",
        },
        {
          question: isFoundation
            ? "Can students at different levels benefit from this course?"
            : examName
              ? `Can average students crack ${examName} in a repeat year?`
              : "Can students with different starting levels succeed in this course?",
          answer: "Students can make progress from different starting points. Consistent effort, clear guidance, and regular review are important; no course can guarantee a particular result.",
        },
        {
          question: isFoundation
            ? "I find some topics difficult. What should I do differently?"
            : examName
              ? `I couldn't clear ${examName} last year. What should I do differently this time?`
              : "I am finding some topics difficult. What should I do differently?",
          answer: "Review your previous preparation, identify specific gaps, and set manageable goals for them. A counsellor can help you understand the available course support and plan your next steps.",
        },
        {
          question: "How can I catch up if I miss a class?",
          answer: "Speak with your teacher or counsellor about the missed topics and make a catch-up plan. Regular revision and practice can help you rejoin the class with confidence.",
        },
        {
          question: "How can I track whether I'm improving?",
          answer: "Keep track of the topics you have covered, questions you find difficult, and how your practice is going over time. Ask your teacher for feedback on what to focus on next.",
        },
      ]
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f8fc]">
        <div className="bg-white border-b border-gray-100">
          <nav
            className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="font-medium text-gray-500 transition-colors hover:text-[#C8102E]">
              Home
            </Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <Link href="/courses" className="font-medium text-gray-500 transition-colors hover:text-[#C8102E]">
              Courses
            </Link>
            {course && (
              <>
                <span className="text-gray-300" aria-hidden="true">/</span>
                <span className="truncate font-semibold text-[#C8102E]">{displayCourseName}</span>
              </>
            )}
          </nav>
        </div>

        {loading ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#C8102E] border-t-transparent" />
            <p className="text-sm text-gray-500">Loading course details...</p>
          </div>
        ) : !course ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E]">Course unavailable</p>
            <h1 className="mt-3 text-3xl font-black text-[#1a1a2e]">We couldn&apos;t find that course.</h1>
            <p className="mt-3 max-w-md text-gray-500">It may have been removed or the link may be incorrect.</p>
            <Link href="/courses" className="mt-7 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a50d25]">
              Browse all courses
            </Link>
          </div>
        ) : (
          <>
            <DetailSection className="relative isolate overflow-hidden bg-[#1a1a2e] text-white">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(200,16,46,0.42),transparent_38%),linear-gradient(125deg,#171a32_0%,#202844_65%,#321d35_100%)]" />
              <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
                <div
                  className="course-detail-slide-left"
                  style={{ animationDelay: "100ms" }}
                >
                  <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
                    <span aria-hidden="true">←</span> All courses
                  </Link>
                  <p className="mt-9 text-xs font-bold uppercase tracking-[0.24em] text-[#F5C518]">
                    {type.label}
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {displayCourseName}
                  </h1>
                  <p className="mt-5 max-w-2xl text-xl font-bold leading-snug text-white sm:text-2xl">
                    {type.heroLead}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                    {courseDescription}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                    {type.heroExplanation}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#F5C518] px-6 py-3.5 text-sm font-extrabold text-[#1a1a2e] shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-400"
                  >
                    Talk to a counsellor
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div
                  className="course-detail-zoom relative mx-auto w-full max-w-md"
                  style={{ animationDelay: "180ms" }}
                >
                  <div className="absolute -inset-4 rounded-[2rem] bg-[#C8102E]/20 blur-2xl" />
                  <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-sm sm:p-9">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C518] text-[#1a1a2e]">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h2 className="mt-7 text-2xl font-extrabold">{type.panelTitle}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {type.panelDescription}
                    </p>
                    <div className="mt-7 h-px bg-white/15" />
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                      Focus areas
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {type.subjects.map((subject) => (
                        <span key={subject} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white/85">
                          {subject}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/15 pt-5">
                      {type.outcomes.map((outcome, index) => (
                        <div key={outcome}>
                          <span className="text-[10px] font-black tracking-widest text-[#F5C518]">0{index + 1}</span>
                          <p className="mt-1 text-xs font-semibold leading-5 text-white/75">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DetailSection>

            <DetailSection delay={100} className="py-16 sm:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">A thoughtful approach</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1a1a2e] sm:text-4xl">
                    Learn with purpose. Progress with confidence.
                  </h2>
                  <p className="mt-4 leading-7 text-gray-500">
                    Effective preparation is built one step at a time. This program brings learning, practice, and reflection into one clear routine.
                  </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {learningSteps.map((step, index) => (
                    <article
                      key={step.number}
                      className="course-detail-reveal group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C8102E]/20 hover:shadow-xl"
                      style={{ animationDelay: `${180 + index * 100}ms` }}
                    >
                      <p className="text-sm font-black tracking-widest text-[#C8102E]">{step.number}</p>
                      <h3 className="mt-5 text-lg font-extrabold text-[#1a1a2e]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">{step.description}</p>
                      <div className="mt-6 h-1 w-12 rounded-full bg-[#F5C518] transition-all duration-300 group-hover:w-20" />
                    </article>
                  ))}
                </div>
              </div>
            </DetailSection>

            <DetailSection delay={160} className="border-y border-gray-100 bg-white py-16 sm:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">Student voices</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1a1a2e] sm:text-4xl">
                    A little more confidence, one step at a time.
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Illustrative sample testimonials — replace with verified feedback before publishing.
                  </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                    <ScrollReveal
                      key={testimonial.attribution}
                      as="figure"
                      className="testimonial-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                      delay={index * 120}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C8102E] via-[#F5C518] to-[#C8102E] transition-all duration-300 group-hover:h-2 motion-reduce:transition-none" />
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8102E]/10 text-[#C8102E] transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h7v-6H5.5v-.83A1.67 1.67 0 0 1 7.17 9.5H9V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V18h7v-6h-3.5v-.83a1.67 1.67 0 0 1 1.67-1.67H19V6h-1.83Z" />
                          </svg>
                        </span>
                        <span className="rounded-full bg-[#f7f8fc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {testimonial.attribution}
                        </span>
                      </div>
                      <blockquote className="mt-5 flex-1 text-sm leading-7 text-gray-700">
                        “{testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a2e] text-xs font-bold text-white" aria-hidden="true">
                          {testimonial.attribution.split(" ").map((part) => part[0]).join("")}
                        </span>
                        <span className="text-sm font-bold text-[#1a1a2e]">{testimonial.attribution}</span>
                      </figcaption>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </DetailSection>

            <DetailSection delay={220} className="py-16 sm:py-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">FAQs</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1a1a2e] sm:text-4xl">
                    Questions about this course?
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Here are a few helpful details. Our team can answer questions about current batches and enrollment.
                  </p>
                </div>
                <div className="mt-9 space-y-3">
                  {faqs.map((faq, index) => (
                    <details
                      key={faq.question}
                      className={`${index % 2 === 0 ? "course-detail-slide-left" : "course-detail-slide-right"} group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors open:border-[#C8102E]/25 sm:p-6 motion-reduce:transition-none`}
                      style={{ animationDelay: `${240 + index * 75}ms` }}
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-sm font-bold text-[#1a1a2e] sm:text-base">
                        <span className="flex items-center gap-3">
                          <span className="text-xs font-extrabold tracking-wider text-[#C8102E]">
                            Q{index + 1}.
                          </span>
                          {faq.question}
                        </span>
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E]/10 text-lg leading-none text-[#C8102E] transition-transform group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <p className="mt-4 max-w-3xl pr-8 text-sm leading-7 text-gray-500">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </DetailSection>

            <DetailSection delay={280} className="border-y border-gray-100 bg-white py-16 sm:py-20">
              <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#1a1a2e] p-7 text-white shadow-xl sm:p-10">
                  <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[#C8102E]/35 blur-3xl" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C518]">Your next chapter</p>
                  <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                    {type.nextStepTitle}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                    {type.nextStepDescription}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
                      {type.label}
                    </span>
                    {course.duration && (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
                        Duration: {course.duration}
                      </span>
                    )}
                  </div>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F5C518] px-5 py-3 text-sm font-extrabold text-[#1a1a2e] transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-400"
                  >
                    Discuss this course <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="rounded-[2rem] border border-gray-100 bg-[#f7f8fc] p-7 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">Before you get started</p>
                  <h3 className="mt-3 text-2xl font-extrabold text-[#1a1a2e]">
                    Get clarity on the details that matter.
                  </h3>
                  <div className="mt-7 space-y-5">
                    {[
                      ["01", "Course focus", `Review the main subjects: ${type.subjects.join(", ")}.`],
                      ["02", "Your preparation goals", "Share what you want to improve and ask about the course structure."],
                      ["03", "Practical details", "Confirm current batch availability, duration, fees, and enrollment steps."],
                    ].map(([number, title, description]) => (
                      <div key={number} className="flex gap-4">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-[#C8102E] shadow-sm">
                          {number}
                        </span>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#1a1a2e]">{title}</h4>
                          <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DetailSection>

            <DetailSection delay={340} className="bg-[#f7f8fc] px-4 py-8 sm:py-10">
              <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">Ready when you are</p>
                  <h2 className="mt-2 text-xl font-black text-[#1a1a2e] sm:text-2xl">
                    Have questions about {displayCourseName}?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Speak with our team about course details, batch availability, and the next step that suits your goals.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a50d25]"
                >
                  Contact our team <span aria-hidden="true">→</span>
                </Link>
              </div>
            </DetailSection>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
