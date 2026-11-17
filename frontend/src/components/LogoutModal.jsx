"use client";

export default function LogoutModal({ isOpen, message = "Logout Successfully", subMessage = "You have been securely signed out. Redirecting to login..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-200 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl max-w-sm w-full text-center border border-gray-100 animate-in fade-in zoom-in-95">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-extrabold text-[#1a1a2e]">{message}</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          {subMessage}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600">
          <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Redirecting...</span>
        </div>
      </div>
    </div>
  );
}
