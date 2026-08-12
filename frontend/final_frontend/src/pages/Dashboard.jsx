import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Circle, Clock3, ListTodo, Plus, RefreshCw, Search, Sparkles } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Modal from '../components/Modal'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import AiTaskForm from '../components/AiTaskForm'
import Spinner from '../components/Spinner'
import StatCard from '../components/StatCard'
import Toast from '../components/Toast'
import { useTasks } from '../context/TaskContext'

const initialToast = null

export default function Dashboard() {
  const {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
  } = useTasks()

  const [modal, setModal] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [toast, setToast] = useState(initialToast)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'TODO').length,
    progress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    done: tasks.filter((t) => t.status === 'DONE').length,
  }), [tasks])

  const filteredTasks = useMemo(() => {
    const search = query.trim().toLowerCase()

    return tasks
      .filter((task) => statusFilter === 'ALL' || task.status === statusFilter)
      .filter((task) => priorityFilter === 'ALL' || task.priority === priorityFilter)
      .filter((task) => !search || `${task.title} ${task.description || ''}`.toLowerCase().includes(search))
      .sort((a, b) => {
        const statusOrder = { TODO: 0, IN_PROGRESS: 1, DONE: 2 }
        return statusOrder[a.status] - statusOrder[b.status] || b.id - a.id
      })
  }, [tasks, query, statusFilter, priorityFilter])

  const openCreate = () => {
    setEditingTask(null)
    setModal('task')
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setModal('task')
  }

  const submitTask = async (payload) => {
    setFormSubmitting(true)
    try {
      // An AI suggestion is a pre-filled NEW task, so it has no id.
      // Only an existing task (with an id) should be updated.
      if (editingTask?.id) {
        await updateTask(editingTask.id, payload)
        setToast({ type: 'success', message: 'Task updated successfully.' })
      } else {
        await createTask(payload)
        setToast({ type: 'success', message: 'Task created successfully.' })
      }
      setModal(null)
      setEditingTask(null)
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setFormSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!editingTask) return
    setDeleting(true)
    try {
      await deleteTask(editingTask.id)
      setToast({ type: 'success', message: 'Task deleted successfully.' })
      setModal(null)
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setDeleting(false)
    }
  }

  const handleDelete = (task) => {
    setEditingTask(task)
    setModal('delete')
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status)
      setToast({ type: 'success', message: 'Task status updated.' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    }
  }

  const useAiResult = (result) => {
    // Keep the AI result as a new task draft. It deliberately has no id,
    // so submitting the form calls POST /api/tasks instead of PUT /api/tasks/{id}.
    setEditingTask({
      title: result.title,
      description: result.description,
      priority: result.priority,
      dueDate: '',
    })
    setModal('task')
  }

  return (
    <AppLayout onCreate={openCreate} onAi={() => setModal('ai')}>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <section className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">Workspace</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Your tasks</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Stay on top of your work, move tasks through the pipeline and use AI when you need a head start.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          New task
        </button>
      </section>

      <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="All tasks" value={stats.total} icon={ListTodo} />
        <StatCard label="To do" value={stats.todo} icon={Circle} tone="amber" />
        <StatCard label="In progress" value={stats.progress} icon={Clock3} tone="blue" />
        <StatCard label="Completed" value={stats.done} icon={CheckCircle2} tone="emerald" />
      </section>

      <section className="card mb-6 p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select className="input lg:w-44" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All statuses</option>
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
          <select className="input lg:w-40" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="ALL">All priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <button
            onClick={loadTasks}
            className="btn-secondary shrink-0"
            disabled={loading}
            title="Refresh tasks"
          >
            {loading ? <Spinner /> : <RefreshCw className="h-4 w-4" />}
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>
      </section>

      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button onClick={loadTasks} className="btn-secondary self-start border-red-200 text-red-700">
            Try again
          </button>
        </div>
      )}

      {loading && tasks.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-3 text-sm text-slate-500">Loading your tasks...</p>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="card flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            {query || statusFilter !== 'ALL' || priorityFilter !== 'ALL' ? (
              <Search className="h-6 w-6" />
            ) : (
              <Sparkles className="h-6 w-6" />
            )}
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {query || statusFilter !== 'ALL' || priorityFilter !== 'ALL' ? 'No matching tasks' : 'Your task list is empty'}
          </h2>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            {query || statusFilter !== 'ALL' || priorityFilter !== 'ALL'
              ? 'Try changing your search or filters.'
              : 'Create your first task or ask the AI assistant to generate task details.'}
          </p>
          {!query && statusFilter === 'ALL' && priorityFilter === 'ALL' && (
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button onClick={openCreate} className="btn-primary">
                <Plus className="h-4 w-4" />
                Create task
              </button>
              <button onClick={() => setModal('ai')} className="btn-secondary">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Use AI
              </button>
            </div>
          )}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </section>
      )}

      <Modal
        open={modal === 'task'}
        onClose={() => !formSubmitting && setModal(null)}
        title={editingTask?.id ? 'Edit task' : 'Create new task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={submitTask}
          onCancel={() => setModal(null)}
          submitting={formSubmitting}
        />
      </Modal>

      <Modal open={modal === 'ai'} onClose={() => setModal(null)} title="AI task assistant">
        <AiTaskForm
          onUseResult={(result) => {
            useAiResult(result)
          }}
        />
      </Modal>

      <Modal open={modal === 'delete'} onClose={() => !deleting && setModal(null)} title="Delete task" maxWidth="max-w-md">
        <p className="text-sm leading-6 text-slate-500">
          Are you sure you want to delete <strong className="text-slate-800">{editingTask?.title}</strong>? This action cannot be undone.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button className="btn-secondary" onClick={() => setModal(null)} disabled={deleting}>
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting && <Spinner />}
            Delete task
          </button>
        </div>
      </Modal>
    </AppLayout>
  )
}
