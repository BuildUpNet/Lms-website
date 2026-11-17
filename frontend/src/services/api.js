const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Central fetch wrapper that always includes credentials for HTTP-only cookies
const apiFetch = async (endpoint, options = {}) => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Automatically passes & receives HTTP-only cookies
  });

  return res.json();
};

export const authAPI = {
  login: (username, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  getMe: () => apiFetch('/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  logout: async () => {
    try {
      return await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout API error:', err);
      return { success: true };
    }
  },
};

export const studentAPI = {
  getAll: () => apiFetch('/students'),
  create: (data) =>
    apiFetch('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiFetch(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) => apiFetch(`/students/${id}`, { method: 'DELETE' }),
};

export const teacherAPI = {
  getAll: () => apiFetch('/teachers'),
  create: (data) =>
    apiFetch('/teachers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiFetch(`/teachers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) => apiFetch(`/teachers/${id}`, { method: 'DELETE' }),
};

export const staffAPI = {
  getAll: () => apiFetch('/staff'),
  create: (data) =>
    apiFetch('/staff', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiFetch(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) => apiFetch(`/staff/${id}`, { method: 'DELETE' }),
};

export const courseAPI = {
  getPublic: () => apiFetch('/courses/public'),
  getAll: () => apiFetch('/courses'),
  create: (data) =>
    apiFetch('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiFetch(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) => apiFetch(`/courses/${id}`, { method: 'DELETE' }),
};

export const galleryAPI = {
  getAll: () => apiFetch('/gallery'),
  upload: (formData) =>
    apiFetch('/gallery', {
      method: 'POST',
      body: formData,
    }),
  delete: (id) => apiFetch(`/gallery/${id}`, { method: 'DELETE' }),
};

export const studentPortalAPI = {
  getProfile: () => apiFetch('/student-portal/profile'),
  getCourses: () => apiFetch('/student-portal/courses'),
};
