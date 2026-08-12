export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateAuthForm({ email, password }) {
  const errors = {}

  if (!email.trim()) errors.email = 'Email is required'
  else if (!validateEmail(email.trim())) errors.email = 'Enter a valid email'

  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'

  return errors
}

export function validateTaskForm({ title, priority, dueDate }) {
  const errors = {}

  if (!title.trim()) errors.title = 'Title is required'
  if (!priority) errors.priority = 'Priority is required'

  if (dueDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selected = new Date(`${dueDate}T00:00:00`)
    if (selected < today) errors.dueDate = 'Due date cannot be in the past'
  }

  return errors
}
