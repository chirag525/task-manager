import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { validateTaskForm } from '../utils/validation'
import Spinner from './Spinner'

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  dueDate: '',
}

function toForm(task) {
  return task
    ? {
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'MEDIUM',
        dueDate: task.dueDate || '',
      }
    : EMPTY_FORM
}

export default function TaskForm({ task, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(toForm(task))
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(toForm(task))
    setErrors({})
  }, [task])

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateTaskForm(form)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label" htmlFor="task-title">Task title *</label>
        <input
          id="task-title"
          className={`input ${errors.title ? 'border-red-400 focus:border-red-500' : ''}`}
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Prepare client presentation"
          maxLength={150}
          autoFocus
        />
        {errors.title && <p className="mt-1 text-xs font-medium text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="label" htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          className="input min-h-28 resize-y"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Add useful details about this task..."
          maxLength={2000}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="task-priority">Priority *</label>
          <select
            id="task-priority"
            className={`input ${errors.priority ? 'border-red-400' : ''}`}
            value={form.priority}
            onChange={(e) => update('priority', e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && <p className="mt-1 text-xs font-medium text-red-600">{errors.priority}</p>}
        </div>

        <div>
          <label className="label" htmlFor="task-due-date">Due date</label>
          <input
            id="task-due-date"
            type="date"
            className={`input ${errors.dueDate ? 'border-red-400' : ''}`}
            value={form.dueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => update('dueDate', e.target.value)}
          />
          {errors.dueDate && <p className="mt-1 text-xs font-medium text-red-600">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? <Spinner /> : <Save className="h-4 w-4" />}
          {task?.id ? 'Save changes' : 'Create task'}
        </button>
      </div>
    </form>
  )
}
