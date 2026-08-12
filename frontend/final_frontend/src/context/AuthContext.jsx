import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'taskflow_token'
const USER_KEY = 'taskflow_user'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    } catch {
      return null
    }
  })

  const isAuthenticated = Boolean(token)

  const login = async (credentials) => {
    const data = await api.login(credentials)
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        userId: data.userId,
        email: data.email,
      }),
    )
    setToken(data.token)
    setUser({ userId: data.userId, email: data.email })
    return data
  }

  const register = async (credentials) => {
    return api.register(credentials)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener('taskflow:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('taskflow:unauthorized', handleUnauthorized)
  }, [])

  const value = useMemo(
    () => ({ token, user, isAuthenticated, login, register, logout }),
    [token, user, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
