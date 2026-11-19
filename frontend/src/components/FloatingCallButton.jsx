"use client";

import { usePathname } from "next/navigation";

const PHONE_NUMBER = "tel:+919823300034"; 

export default function FloatingCallButton() {
  const pathname = usePathname();

  const isHidden =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student") ||
    pathname?.startsWith("/teacher") ||
    pathname?.startsWith("/staff") ||
    pathname?.startsWith("/parent") ||
    pathname === "/login";

  if (isHidden) return null;

  return (
    <>
      <style>{`
        @keyframes callPulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.65); opacity: 0;   }
          100% { transform: scale(1.65); opacity: 0;   }
        }
        .call-float-btn {
          position: fixed;
          bottom: 96px;
          right: 28px;
          z-index: 999;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #C8102E 0%, #900A1F 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(200, 16, 46, 0.45);
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .call-float-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 10px 32px rgba(200, 16, 46, 0.6);
        }
        .call-float-btn .call-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-color: #C8102E;
          z-index: -1;
          pointer-events: none;
          animation: callPulse 2s ease-out infinite;
        }
        .call-float-btn .call-tooltip {
          position: absolute;
          right: 68px;
          white-space: nowrap;
          background: #1a1a2e;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 20px;
          opacity: 0;
          pointer-events: none;
          transform: translateX(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .call-float-btn .call-tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #1a1a2e;
          border-right: 0;
        }
        .call-float-btn:hover .call-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <a
        href={PHONE_NUMBER}
        aria-label="Call Lakshya Institute (+91 98233-00034)"
        className="call-float-btn group"
      >
        <span className="call-pulse" aria-hidden="true" />

        {/* Hover Tooltip */}
        <span className="call-tooltip">
          Call us: +91 98233-00034
        </span>

        {/* Phone SVG icon */}
        <svg
          className="w-6 h-6 text-white drop-shadow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.59 9.09a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
