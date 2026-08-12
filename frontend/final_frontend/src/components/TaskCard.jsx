import { CalendarDays, CheckCircle2, Clock3, Edit3, Trash2 } from 'lucide-react'

const priorityClasses = {
  HIGH: 'bg-red-50 text-red-700 ring-red-600/10',
  MEDIUM: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  LOW: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
}

const statusClasses = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-blue-50 text-blue-700',
  DONE: 'bg-emerald-50 text-emerald-700',
}

const statusLabels = {
  TODO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
}

function formatDate(value) {
  if (!value) return 'No due date'
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(`${value}T00:00:00`),
  )
}

function formatCreated(value) {
  if (!value) return ''
  const date = new Date(value)
  return `Created ${new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)}`
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const done = task.status === 'DONE'

  return (
    <article className={`card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${done ? 'opacity-80' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${priorityClasses[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClasses[task.status]}`}>
              {statusLabels[task.status]}
            </span>
          </div>
          <h3 className={`break-words text-base font-bold text-slate-900 ${done ? 'line-through decoration-slate-400' : ''}`}>
            {task.title}
          </h3>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
            aria-label={`Edit ${task.title}`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{task.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(task.dueDate)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          {formatCreated(task.createdAt)}
        </span>
      </div>

      <div className="mt-4">
        <label className="sr-only">Update task status</label>
        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
            className="input py-2 text-xs font-semibold"
          >
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
          {done && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
        </div>
      </div>
    </article>
  )
}
