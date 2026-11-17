"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function StaffDashboard() {
  return (
    <ProtectedRoute allowedRoles={["staff"]}>
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-[#1a1a2e]">Welcome to Staff Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Operational & Staff Portal</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
