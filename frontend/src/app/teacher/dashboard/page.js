"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function TeacherDashboard() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-[#1a1a2e]">Welcome to Teacher Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Faculty & Class Management Portal</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
