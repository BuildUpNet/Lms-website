"use client";

import { useEffect, useState } from "react";
import { studentAPI } from "@/services/api";

const statusColor = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
};

const emptyForm = {
  username: "",
  password: "",
  admission_number: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  phone: "",
  address: "",
  admission_date: "",
  status: "active",
};

const avatarColors = [
  "bg-[#C8102E]", "bg-blue-500", "bg-green-500", "bg-yellow-500",
  "bg-purple-500", "bg-teal-500", "bg-orange-500", "bg-pink-500",
];

const toDateInput = (value) => {
  if (!value) return "";
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value).split("T")[0];
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentAPI.getAll();
      if (data.success) {
        setStudents(data.data);
      } else {
        console.error("Failed to load students:", data.message || "Unknown API error");
      }
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.username.trim()) nextErrors.username = "Required";
    if (!editingStudent && !form.password) nextErrors.password = "Required";
    else if (form.password && form.password.length < 6) nextErrors.password = "Minimum 6 characters";
    if (!form.admission_number.trim()) nextErrors.admission_number = "Required";
    if (!form.first_name.trim()) nextErrors.first_name = "Required";
    if (form.phone && !/^\d{10,15}$/.test(form.phone)) nextErrors.phone = "Enter 10 to 15 digits";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const data = editingStudent
        ? await studentAPI.update(editingStudent.id, form)
        : await studentAPI.create(form);
      if (data.success) {
        setForm(emptyForm);
        setErrors({});
        setFormError("");
        setEditingStudent(null);
        setShowModal(false);
        await fetchStudents();
      } else {
        const message = data.message || "Unknown API error";
        const normalizedMessage = message.toLowerCase();
        const fieldError = [
          { match: "username already exists", field: "username" },
          { match: "admission number already exists", field: "admission_number" },
          { match: "password must be at least", field: "password" },
          { match: "phone must contain", field: "phone" },
        ].find(({ match }) => normalizedMessage.includes(match));

        if (fieldError) {
          setErrors((current) => ({ ...current, [fieldError.field]: message }));
        } else if (
          normalizedMessage.includes("required") ||
          normalizedMessage.includes("invalid student details") ||
          normalizedMessage.includes("gender must be") ||
          normalizedMessage.includes("status must be")
        ) {
          setFormError(message);
        } else {
          console.error("Failed to save student:", message);
        }
      }
    } catch (error) {
      console.error("Failed to save student:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setForm({
      ...emptyForm,
      username: student.username || "",
      admission_number: student.admission_number || "",
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      date_of_birth: toDateInput(student.date_of_birth),
      gender: student.gender || "",
      phone: student.phone || "",
      address: student.address || "",
      admission_date: toDateInput(student.admission_date),
      status: student.status || "active",
    });
    setErrors({});
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormError("");
    setErrors({});
  };

  const handleDelete = async (studentId) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const data = await studentAPI.delete(studentId);
      if (data.success) {
        setStudents((current) => current.filter((student) => student.id !== studentId));
      } else {
        console.error("Failed to delete student:", data.message || "Unknown API error");
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const normalizedSearch = search.toLowerCase();
  const filtered = students.filter((student) => {
    const name = `${student.first_name || ""} ${student.last_name || ""}`.toLowerCase();
    const matchesSearch = name.includes(normalizedSearch) ||
      student.admission_number?.toLowerCase().includes(normalizedSearch) ||
      student.username?.toLowerCase().includes(normalizedSearch) ||
      student.phone?.toLowerCase().includes(normalizedSearch);
    return matchesSearch && (statusFilter === "All" || student.status === statusFilter);
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-extrabold text-[#1a1a2e]">Students</h1>
          <p className="text-sm text-gray-500">{filtered.length} of {students.length} students</p>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setForm(emptyForm);
            setErrors({});
            setFormError("");
            setShowModal(true);
          }}
          className="flex items-center gap-2 self-start rounded-xl bg-[#C8102E] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#a50d25] sm:self-auto"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Total Students", value: students.length, color: "bg-[#1a1a2e]" },
          { label: "Active", value: students.filter((student) => student.status === "active").length, color: "bg-green-500" },
          { label: "Inactive", value: students.filter((student) => student.status === "inactive").length, color: "bg-gray-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <span className="text-sm font-extrabold text-white">{value}</span>
            </div>
            <p className="text-xs font-semibold text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, admission number, username..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none"
        >
          <option>All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-[#C8102E] border-t-transparent" />
            <p className="text-sm text-gray-400">Loading students...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-[#f7f8fc]">
                  {["Id", "Admission No.", "Student", "Username", "Phone", "Date of Birth", "Admission Date", "Status", "Actions"].map((heading) => (
                    <th key={heading} className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((student, index) => (
                  <tr key={student.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3.5 text-xs text-gray-400">{student.id}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs font-semibold text-[#C8102E]">{student.admission_number}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[index % avatarColors.length]}`}>
                          {student.first_name?.charAt(0)}
                        </div>
                        <p className="whitespace-nowrap font-semibold text-[#1a1a2e]">{student.first_name} {student.last_name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{student.username}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-gray-600">{student.phone || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-gray-500">{student.date_of_birth?.split("T")[0] || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-gray-500">{student.admission_date?.split("T")[0] || "—"}</td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColor[student.status] || statusColor.inactive}`}>{student.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(student)}
                          className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                          title="Edit"
                          aria-label={`Edit ${student.first_name} ${student.last_name || ""}`}
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.687a2.121 2.121 0 013 3l-1.687 1.687M16.862 4.487L8.3 13.05a4 4 0 00-1.03 1.73L6.5 17.5l2.72-.77a4 4 0 001.73-1.03l8.562-8.562M16.862 4.487l3 3M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                          title="Delete"
                          aria-label={`Delete ${student.first_name} ${student.last_name || ""}`}
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm font-medium text-gray-400">No students found</p>
                <p className="mt-1 text-xs text-gray-300">Click &quot;Add Student&quot; to get started</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#1a1a2e]">{editingStudent ? "Edit Student" : "Add Student"}</h2>
              <button onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100" aria-label="Close dialog">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {formError && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
                </p>
              )}
              <div className="rounded-xl bg-[#f7f8fc] p-3">
                <p className="mb-2 text-xs font-semibold text-gray-600">Login Credentials</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "Username", name: "username", type: "text", required: true },
                    { label: "Password", name: "password", type: "password", required: !editingStudent },
                  ].map(({ label, name, type, required }) => (
                    <div key={name}>
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        {label}{required && <span className="ml-0.5 text-[#C8102E]">*</span>}
                      </label>
                      <input
                        type={type}
                        value={form[name]}
                        required={required}
                        placeholder={name === "password" && editingStudent ? "Leave blank to keep current password" : ""}
                        autoComplete="new-password"
                        onChange={(event) => { setForm((current) => ({ ...current, [name]: event.target.value })); setErrors((current) => ({ ...current, [name]: "" })); setFormError(""); }}
                        className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 ${errors[name] ? "border-red-400" : "border-gray-200 focus:border-[#C8102E]"}`}
                      />
                      {errors[name] && <p className="mt-0.5 text-xs text-red-500">{errors[name]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Admission Number", name: "admission_number", type: "text" },
                  { label: "First Name", name: "first_name", type: "text" },
                  { label: "Last Name", name: "last_name", type: "text" },
                  { label: "Phone", name: "phone", type: "tel" },
                  { label: "Date of Birth", name: "date_of_birth", type: "date" },
                  { label: "Admission Date", name: "admission_date", type: "date" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                      {label}{["admission_number", "first_name"].includes(name) && <span className="ml-0.5 text-[#C8102E]">*</span>}
                    </label>
                    <input
                      type={type}
                      value={form[name]}
                      onChange={(event) => {
                        const value = name === "phone" ? event.target.value.replace(/\D/g, "").slice(0, 15) : event.target.value;
                        setForm((current) => ({ ...current, [name]: value }));
                        setErrors((current) => ({ ...current, [name]: "" }));
                        setFormError("");
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 ${errors[name] ? "border-red-400" : "border-gray-200 focus:border-[#C8102E]"}`}
                    />
                    {errors[name] && <p className="mt-0.5 text-xs text-red-500">{errors[name]}</p>}
                  </div>
                ))}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Gender</label>
                  <select value={form.gender} onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#C8102E] focus:outline-none">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Status</label>
                  <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#C8102E] focus:outline-none">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Address</label>
                <textarea rows={2} value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                  className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#C8102E] focus:outline-none" />
              </div>

              <div className="flex gap-3 pt-2">
              <button type="button" onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={submitting}
                  className="flex-1 rounded-xl bg-[#C8102E] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#a50d25] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? "Saving..." : editingStudent ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
