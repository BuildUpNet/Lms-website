"use client";

import EmployeeDashboard from "@/components/EmployeeDashboard";

const TEACHER_ROLES = ["teacher"];

export default function TeacherDashboard() {
  return <EmployeeDashboard allowedRoles={TEACHER_ROLES} />;
}
