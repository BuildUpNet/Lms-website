"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutModal from "@/components/LogoutModal";
import { useLogout } from "@/hooks/useLogout";

const resultsSublinks = [
  {
    label: "IIT-JEE Results",
    sublabel: "Mains & Advanced",
    href: "/results/iit-jee",
    badge: "Engineering",
    badgeColor: "bg-red-50 text-red-700",
  },
  {
    label: "NEET (UG) Results",
    sublabel: "Medical Entrance",
    href: "/results/neet",
    badge: "Medical",
    badgeColor: "bg-green-50 text-green-700",
  },
  {
    label: "Class 9-10 (Foundation)",
    sublabel: "Boards & Olympiads",
    href: "/results/class-9-10",
    badge: "Foundation",
    badgeColor: "bg-blue-50 text-blue-700",
  },
];

const scholarshipSublinks = [
  {
    label: "LTSE 2025",
    sublabel: "Lakshya Talent Search Exam",
    href: "/scholarship/ltse",
    badge: "Up to 100%",
    badgeColor: "bg-amber-50 text-amber-800",
  },
  {
    label: "FAST Exam",
    sublabel: "Foundation & Advanced Test",
    href: "/scholarship/fast",
    badge: "Instant Test",
    badgeColor: "bg-red-50 text-red-700",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/results", dropdown: "results" },
  { label: "Scholarship", href: "/scholarship", dropdown: "scholarship" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultsHover, setResultsHover] = useState(false);
  const [scholarshipHover, setScholarshipHover] = useState(false);
  const [mobileResultsOpen, setMobileResultsOpen] = useState(false);
  const [mobileScholarshipOpen, setMobileScholarshipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { loggingOut, handleLogout } = useLogout();

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      if (u) setCurrentUser(JSON.parse(u));
    } catch {}
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top accent bar */}
      <div className="h-1 w-full yellow-bar" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Lakshya — IIT-JEE / NEET / Foundation"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdown === "results") {
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setResultsHover(true)}
                    onMouseLeave={() => setResultsHover(false)}
                  >
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#C8102E] rounded-md transition-colors duration-200 relative group flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          resultsHover ? "rotate-180 text-[#C8102E]" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8102E] group-hover:w-full transition-all duration-300 rounded" />
                    </Link>

                    {/* Desktop Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-72 pt-2 transition-all duration-200 ${
                        resultsHover
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 space-y-1">
                        <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Results by Course
                          </span>
                          <Link
                            href="/results"
                            className="text-[11px] font-bold text-[#C8102E] hover:underline"
                            onClick={() => setResultsHover(false)}
                          >
                            All Results →
                          </Link>
                        </div>

                        {resultsSublinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setResultsHover(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-red-50/60 group transition-all"
                          >
                            <div>
                              <p className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#C8102E] transition-colors">
                                {sub.label}
                              </p>
                              <p className="text-[11px] text-gray-400 font-medium">{sub.sublabel}</p>
                            </div>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${sub.badgeColor}`}
                            >
                              {sub.badge}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              if (link.dropdown === "scholarship") {
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setScholarshipHover(true)}
                    onMouseLeave={() => setScholarshipHover(false)}
                  >
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#C8102E] rounded-md transition-colors duration-200 relative group flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          scholarshipHover ? "rotate-180 text-[#C8102E]" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8102E] group-hover:w-full transition-all duration-300 rounded" />
                    </Link>

                    {/* Scholarship Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 ${
                        scholarshipHover
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 space-y-1">
                        <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Scholarship Exams
                          </span>
                          <Link
                            href="/scholarship"
                            className="text-[11px] font-bold text-[#C8102E] hover:underline"
                            onClick={() => setScholarshipHover(false)}
                          >
                            All Programs →
                          </Link>
                        </div>

                        {scholarshipSublinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setScholarshipHover(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/60 group transition-all"
                          >
                            <div>
                              <p className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#C8102E] transition-colors">
                                {sub.label}
                              </p>
                              <p className="text-[11px] text-gray-400 font-medium">{sub.sublabel}</p>
                            </div>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${sub.badgeColor}`}
                            >
                              {sub.badge}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#C8102E] rounded-md transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8102E] group-hover:w-full transition-all duration-300 rounded" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={currentUser.role === "admin" ? "/admin" : "/student/dashboard"}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#1a1a2e] hover:bg-[#C8102E] rounded-xl transition-all duration-200 shadow-md flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-[#C8102E] hover:text-white border border-red-200/80 rounded-xl transition-all duration-200 shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Logout"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#C8102E] rounded-xl hover:bg-[#a50d25] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#C8102E] hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => {
              if (link.dropdown === "results") {
                return (
                  <div key={link.label} className="border-b border-gray-50 pb-1">
                    <div className="flex items-center justify-between px-4 py-2">
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-gray-700 hover:text-[#C8102E]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileResultsOpen(!mobileResultsOpen)}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:text-[#C8102E]"
                        aria-label="Toggle results sublinks"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileResultsOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Mobile results sublinks list */}
                    {mobileResultsOpen && (
                      <div className="pl-6 pr-4 py-1 space-y-1 bg-gray-50/60 rounded-xl my-1 mx-2">
                        {resultsSublinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center justify-between py-2 text-xs font-semibold text-gray-700 hover:text-[#C8102E]"
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileResultsOpen(false);
                            }}
                          >
                            <span>{sub.label}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${sub.badgeColor}`}>
                              {sub.badge}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.dropdown === "scholarship") {
                return (
                  <div key={link.label} className="border-b border-gray-50 pb-1">
                    <div className="flex items-center justify-between px-4 py-2">
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-gray-700 hover:text-[#C8102E]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileScholarshipOpen(!mobileScholarshipOpen)}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:text-[#C8102E]"
                        aria-label="Toggle scholarship sublinks"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileScholarshipOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Mobile scholarship sublinks list */}
                    {mobileScholarshipOpen && (
                      <div className="pl-6 pr-4 py-1 space-y-1 bg-gray-50/60 rounded-xl my-1 mx-2">
                        {scholarshipSublinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center justify-between py-2 text-xs font-semibold text-gray-700 hover:text-[#C8102E]"
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileScholarshipOpen(false);
                            }}
                          >
                            <span>{sub.label}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${sub.badgeColor}`}>
                              {sub.badge}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C8102E] hover:bg-red-50 rounded-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="px-4 pt-3 border-t border-gray-100 space-y-2">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href={currentUser.role === "admin" ? "/admin" : "/student/dashboard"}
                    className="block text-center py-2.5 text-sm font-bold text-white bg-[#1a1a2e] rounded-full hover:bg-[#C8102E] transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-all cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block text-center py-2.5 text-sm font-bold text-white bg-[#C8102E] rounded-full hover:bg-[#a50d25] transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <LogoutModal isOpen={loggingOut} />
    </header>
  );
}
