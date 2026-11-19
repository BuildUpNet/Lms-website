import Link from "next/link";

const originalFee = "₹52,500";
const discountedFee = "₹44,625";

function getCourseDetails(course) {
  const name = course.course_name?.toLowerCase() || "";

  if (name.includes("foundation")) {
    return {
      subtitle: "School prep along with an early JEE-NEET headstart",
      highlights: [
        "100% NCERT coverage with advanced Foundation topics",
        "Weekly practice classes to develop problem-solving skills",
        "Subjective and Objective tests every 21 days",
      ],
    };
  }

  if (name.includes("ncert")) {
    return {
      subtitle: "Best-in-class school preparation",
      highlights: [
        "100% NCERT coverage to ace school exams",
        "Weekly practice classes for school-style questions",
        "Subjective and Objective tests every 21 days",
      ],
    };
  }

  const highlights = [];
  if (name.includes("jee") && name.includes("neet")) {
    highlights.push("Focused preparation for IIT-JEE and NEET");
  } else if (name.includes("jee")) {
    highlights.push("Focused preparation for IIT-JEE");
  } else if (name.includes("neet")) {
    highlights.push("Focused preparation for NEET");
  }
  if (name.includes("crash")) highlights.push("Focused revision and exam practice");
  if (course.duration) highlights.push(`Course duration: ${course.duration}`);
  if (highlights.length === 0) highlights.push("Program details available from our counsellors");

  return {
    subtitle: course.description || "A structured program built around your academic goals.",
    highlights,
  };
}

export default function CourseCard({ course }) {
  const details = getCourseDetails(course);

  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#C8102E]/25 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#1a1a2e] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Active course
        </span>
        <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#C8102E]">
          Early bird · 15% off
        </span>
      </div>

      <h2 className="text-lg font-extrabold leading-snug text-[#1a1a2e]">
        {course.course_name}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-gray-500">{details.subtitle}</p>

      <ul className="mt-5 space-y-3">
        {details.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-5">
        <div>
          <p className="text-xs text-gray-400 line-through">{originalFee}</p>
          <p className="text-2xl font-black text-[#1a1a2e]">{discountedFee}</p>
        </div>
        <Link
          href={`/courses/${encodeURIComponent(course.id)}`}
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-[#C8102E] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#a50d25]"
        >
          Know more
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
