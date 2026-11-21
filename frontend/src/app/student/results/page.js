"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { icons } from "../icons";
import { Card, PageTitle } from "../ui";

const resultsByExam = {
  "Annual Examination 2024-25": {
    date: "15 May 2025",
    subjects: [
      { name: "Mathematics", code: "MATH-101", marks: 92, total: 100 },
      { name: "Physics", code: "PHY-102", marks: 86, total: 100 },
      { name: "Chemistry", code: "CHEM-103", marks: 84, total: 100 },
      { name: "Biology", code: "BIO-104", marks: 90, total: 100 },
      { name: "English", code: "ENG-105", marks: 76, total: 100 },
    ],
  },
  "Mid-term Examination 2024-25": {
    date: "20 Dec 2024",
    subjects: [
      { name: "Mathematics", code: "MATH-101", marks: 44, total: 50 },
      { name: "Physics", code: "PHY-102", marks: 41, total: 50 },
      { name: "Chemistry", code: "CHEM-103", marks: 39, total: 50 },
      { name: "Biology", code: "BIO-104", marks: 45, total: 50 },
      { name: "English", code: "ENG-105", marks: 38, total: 50 },
    ],
  },
};

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  return "Needs improvement";
}

export default function StudentResults() {
  const [selectedExam, setSelectedExam] = useState("Annual Examination 2024-25");
  const result = resultsByExam[selectedExam];
  const totalMarks = result.subjects.reduce((sum, subject) => sum + subject.total, 0);
  const marksObtained = result.subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const percentage = ((marksObtained / totalMarks) * 100).toFixed(1);
  const appearedSubjects = result.subjects.filter((subject) => Number.isFinite(subject.marks)).length;
  return (
    <div className="space-y-6">
      <PageTitle title="My Results" subtitle="Review your exam performance and subject-wise marks.">
        <div className="w-full sm:w-auto">
          <label htmlFor="exam" className="block text-xs font-semibold text-gray-500 mb-1.5">Examination</label>
          <select
            id="exam"
            value={selectedExam}
            onChange={(event) => setSelectedExam(event.target.value)}
            className="w-full sm:min-w-64 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
          >
            {Object.keys(resultsByExam).map((exam) => <option key={exam}>{exam}</option>)}
          </select>
        </div>
      </PageTitle>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-5 text-white sm:p-7">
        <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full bg-white/5" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">Examination result</p>
            <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">{selectedExam}</h2>
            <p className="mt-1 text-sm text-gray-300">Result declared {result.date}</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5C518] text-lg font-extrabold text-[#1a1a2e]">
              {getGrade(Number(percentage))}
            </div>
            <div>
              <p className="text-xs text-gray-300">Overall grade</p>
              <p className="text-sm font-bold">Excellent work!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total marks" value={`${marksObtained} / ${totalMarks}`} note="Marks obtained" icon={icons.document} color="bg-[#C8102E]" />
        <SummaryCard label="Overall percentage" value={`${percentage}%`} note="Passing score: 35%" icon={icons.clipboardCheck} color="bg-green-500" />
        <SummaryCard label="Total subjects" value={`${appearedSubjects} / ${result.subjects.length}`} note="Appeared / total subjects" icon={icons.book} color="bg-[#1a1a2e]" />
      </div>

      <Card title="Subject-wise results" action={<span className="text-xs text-gray-400">Maximum marks: {result.subjects[0].total}</span>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th scope="col" className="pb-3 pr-4 font-semibold">Subject</th>
                <th scope="col" className="pb-3 px-4 font-semibold">Marks</th>
                <th scope="col" className="pb-3 px-4 font-semibold">Percentage</th>
                <th scope="col" className="pb-3 px-4 font-semibold">Grade</th>
                <th scope="col" className="pb-3 pl-4 text-right font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {result.subjects.map((subject) => {
                const subjectPercentage = (subject.marks / subject.total) * 100;
                const passed = subjectPercentage >= 35;
                return (
                  <tr key={subject.code}>
                    <th scope="row" className="py-4 pr-4 font-semibold text-[#1a1a2e]">
                      {subject.name}
                      <span className="mt-0.5 block text-xs font-normal text-gray-400">{subject.code}</span>
                    </th>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-700">{subject.marks} <span className="font-normal text-gray-400">/ {subject.total}</span></td>
                    <td className="px-4 py-4 text-sm text-gray-600">{subjectPercentage.toFixed(0)}%</td>
                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-700">{getGrade(subjectPercentage)}</span>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${passed ? "bg-green-500" : "bg-red-500"}`} />
                        {passed ? "Passed" : "Not passed"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Your performance">
        <div className="space-y-4">
          {result.subjects.map((subject) => {
            const subjectPercentage = (subject.marks / subject.total) * 100;
            return (
              <div key={subject.code}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="font-medium text-gray-700">{subject.name}</span>
                  <span className="font-semibold text-[#1a1a2e]">{subjectPercentage.toFixed(0)}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-label={`${subject.name} score`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(subjectPercentage)}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-[#C8102E] to-[#F5C518]" style={{ width: `${subjectPercentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, note, icon, color }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${color}`}>
          <Icon d={icon} />
        </div>
      </div>
      <p className="text-2xl font-extrabold text-[#1a1a2e]">{value}</p>
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}
