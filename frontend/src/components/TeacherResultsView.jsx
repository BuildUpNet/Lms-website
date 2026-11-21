"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { exams, getGrade, getStudentResult, students, subjects } from "@/data/studentResults";

const batches = ["All batches", ...new Set(students.map((student) => student.batch))];

export default function TeacherResultsView() {
  const [exam, setExam] = useState("annual");
  const [batch, setBatch] = useState("All batches");
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesBatch = batch === "All batches" || student.batch === batch;
      const matchesSearch = !query ||
        student.name.toLowerCase().includes(query) ||
        student.admissionNo.toLowerCase().includes(query);
      return matchesBatch && matchesSearch;
    });
  }, [batch, search]);

  const results = filteredStudents.map((student) => getStudentResult(student, exam));
  const average = results.length
    ? results.reduce((sum, result) => sum + result.percentage, 0) / results.length
    : 0;
  const passRate = results.length
    ? (results.filter((result) => result.passed).length / results.length) * 100
    : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8102E]">Academic performance</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#1a1a2e]">Student results</h1>
          <p className="mt-1 text-sm text-gray-500">Review examination marks for your students.</p>
        </div>
        <label className="w-full sm:w-auto">
          <span className="mb-1.5 block text-xs font-semibold text-gray-500">Examination</span>
          <select
            value={exam}
            onChange={(event) => setExam(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none sm:min-w-64"
          >
            {Object.entries(exams).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Students" value={filteredStudents.length} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="bg-[#1a1a2e]" />
        <StatCard label="Class average" value={`${average.toFixed(1)}%`} icon="M3 3v18h18M18 17V9m-5 8V5m-5 12v-3" color="bg-blue-500" />
        <StatCard label="Pass rate" value={`${passRate.toFixed(0)}%`} icon="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" color="bg-green-500" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by student name or admission number..."
            aria-label="Search students"
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
          />
        </div>
        <select
          value={batch}
          onChange={(event) => setBatch(event.target.value)}
          aria-label="Filter by batch"
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none"
        >
          {batches.map((item) => <option key={item}>{item}</option>)}
        </select>
        <p className="self-center whitespace-nowrap text-xs text-gray-500">{filteredStudents.length} students</p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-bold text-[#1a1a2e]">{exams[exam].label}</h2>
          <p className="mt-1 text-xs text-gray-400">Marks by subject · Maximum {exams[exam].marksPerSubject} marks per subject</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f7f8fc]">
                {["Student", "Batch", ...subjects, "Total", "Percentage", "Grade", "Result"].map((heading) => (
                  <th key={heading} scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((student) => {
                const result = getStudentResult(student, exam);
                return (
                  <tr key={student.id} className="transition-colors hover:bg-gray-50">
                    <th scope="row" className="px-4 py-3.5 text-left">
                      <p className="whitespace-nowrap font-semibold text-[#1a1a2e]">{student.name}</p>
                      <p className="mt-0.5 font-mono text-xs font-normal text-gray-400">{student.admissionNo}</p>
                    </th>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-gray-600">{student.batch}</td>
                    {result.marks.map((mark, index) => (
                      <td key={subjects[index]} className="whitespace-nowrap px-4 py-3.5 font-medium text-gray-700">
                        {mark}<span className="text-gray-400"> / {exams[exam].marksPerSubject}</span>
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3.5 font-bold text-[#1a1a2e]">{result.total} / {result.maxMarks}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-700">{result.percentage.toFixed(1)}%</td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">{getGrade(result.percentage)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${result.passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {result.passed ? "Passed" : "Not passed"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-gray-500">No students found</p>
              <p className="mt-1 text-xs text-gray-400">Try changing your search or batch filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon d={icon} className="h-5 w-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="mt-0.5 text-xl font-extrabold text-[#1a1a2e]">{value}</p>
      </div>
    </div>
  );
}
