import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Results", href: "/results" },
    { label: "Scholarship", href: "/scholarship" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
  Resources: [
    { label: "Study Material", href: "#" },
    { label: "Practice Papers", href: "#" },
    { label: "Previous Year Papers", href: "#" },
    { label: "Video Lectures", href: "#" },
    { label: "Test Series", href: "#" },
  ],
  Programs: [
    { label: "IIT-JEE Mains & Advanced", href: "/results/iit-jee" },
    { label: "NEET (UG)", href: "/results/neet" },
    { label: "Foundation (VIII–X)", href: "/results/class-9-10" },
    { label: "All Courses", href: "/courses" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      {/* Top CTA strip */}
      <div className="bg-[#C8102E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-lg">
            Start your journey to IIT / NEET today — seats are limited!
          </p>
          <Link
            href="/login"
            className="px-6 py-2.5 bg-[#F5C518] text-[#1a1a2e] font-bold rounded-full text-sm hover:bg-yellow-400 transition-colors shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            {/* Logo */}
            <div>
              <Image
                src="/images/footer-logo.png"
                alt="Lakshya — IIT-JEE / NEET / Foundation"
                width={120}
                height={40}
                className=" object-contain"
              />
  
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students since 2005 with focused IIT-JEE, NEET, and Foundation coaching.
              Our proven pedagogy and dedicated faculty have produced thousands of top rankers.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {[
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2z", href: "https://www.instagram.com/lakshya.sangrur?dmpr=Y2N2YTh3bW9jOTly" },
              ].map(({ label, path, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8102E] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-base mb-4 relative">
                {heading}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#F5C518] rounded" />
              </h4>
              <ul className="space-y-2.5 mt-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-[#F5C518] transition-colors flex items-center gap-1.5 group"
                    >
                      <svg className="w-3 h-3 text-[#C8102E] group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info row */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
              text: "Jindal Complex, Near Blackstone, Bus Stand Road, Mubarik Mehal Colony, Sangrur, Punjab — 148001",
            },
            {
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              iconHref: "tel:+919823300034",
              phones: [
                { label: "+91 98233-00034", href: "tel:+919823300034" },
                { label: "+91 97679-00030", href: "tel:+919767900030" },
              ],
            },
            {
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              iconHref: "mailto:admissions@lakshya.ac.in",
              text: "admissions@lakshya.ac.in",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Icon Wrapper */}
              {item.iconHref ? (
                <a
                  href={item.iconHref}
                  aria-label="Call or Email"
                  className="w-8 h-8 rounded-full bg-[#C8102E]/20 hover:bg-[#C8102E]/40 transition-colors flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <svg className="w-4 h-4 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </a>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C8102E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
              )}

              {/* Text / Links */}
              {item.phones ? (
                <p className="text-sm text-gray-400">
                  {item.phones.map((phone, i) => (
                    <span key={phone.href}>
                      <a href={phone.href} className="hover:text-white transition-colors">
                        {phone.label}
                      </a>
                      {i < item.phones.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="text-sm text-gray-400">{item.text}</p>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 Lakshya Institute. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#F5C518] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#F5C518] transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-[#F5C518] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
