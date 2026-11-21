export const exams = {
  annual: { label: "Annual Examination 2024-25", marksPerSubject: 100 },
  midterm: { label: "Mid-term Examination 2024-25", marksPerSubject: 50 },
};

export const subjects = ["Mathematics", "Physics", "Chemistry"];

export const students = [
  { id: 1, name: "Aarav Sharma", admissionNo: "LKS-2024-001", batch: "JEE 2026-A", annual: [92, 86, 84], midterm: [46, 42, 41] },
  { id: 2, name: "Ananya Kapoor", admissionNo: "LKS-2024-008", batch: "JEE 2026-A", annual: [88, 91, 87], midterm: [43, 45, 44] },
  { id: 3, name: "Kabir Singh", admissionNo: "LKS-2024-014", batch: "JEE 2026-A", annual: [74, 29, 78], midterm: [36, 14, 39] },
  { id: 4, name: "Meera Joshi", admissionNo: "LKS-2024-021", batch: "JEE 2026-B", annual: [96, 93, 89], midterm: [48, 47, 43] },
  { id: 5, name: "Rohan Verma", admissionNo: "LKS-2024-027", batch: "JEE 2026-B", annual: [65, 72, 68], midterm: [32, 36, 34] },
  { id: 6, name: "Ishita Rao", admissionNo: "LKS-2024-033", batch: "JEE 2026-B", annual: [81, 77, 90], midterm: [40, 38, 46] },
];

export function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  return "D";
}

export function getStudentResult(student, exam) {
  const marks = student[exam];
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const maxMarks = marks.length * exams[exam].marksPerSubject;
  const percentage = (total / maxMarks) * 100;
  const passed = marks.every((mark) => mark / exams[exam].marksPerSubject >= 0.35);

  return { marks, total, maxMarks, percentage, passed };
}
