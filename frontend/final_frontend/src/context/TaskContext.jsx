import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setTasks([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await api.getTasks()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  const createTask = async (payload) => {
    const created = await api.createTask(payload)
    setTasks((current) => [created, ...current])
    return created
  }

  const updateTask = async (id, payload) => {
    const updated = await api.updateTask(id, payload)
    setTasks((current) => current.map((task) => (task.id === id ? updated : task)))
    return updated
  }

  const deleteTask = async (id) => {
    await api.deleteTask(id)
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const updateStatus = async (id, status) => {
    const updated = await api.updateStatus(id, status)
    setTasks((current) => current.map((task) => (task.id === id ? updated : task)))
    return updated
  }

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      loadTasks,
      createTask,
      updateTask,
      deleteTask,
      updateStatus,
    }),
    [tasks, loading, error, loadTasks],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used inside TaskProvider')
  return context
}
