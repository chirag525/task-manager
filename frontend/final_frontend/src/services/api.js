const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

async function request(path, options = {}) {
  const token = localStorage.getItem('taskflow_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new Event('taskflow:unauthorized'))
    }

    const message =
      typeof data === 'object' && data?.message
        ? data.message
        : typeof data === 'string' && data
          ? data
          : 'Something went wrong. Please try again.'

    throw new Error(message)
  }

  return data
}

export const api = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getTasks: () => request('/tasks'),

  getTask: (id) => request(`/tasks/${id}`),

  createTask: (payload) =>
    request('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateTask: (id, payload) =>
    request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, {
      method: 'DELETE',
    }),

  updateStatus: (id, status) =>
    request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  generateTask: (title) =>
    request('/ai/generate-task', {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),
}
