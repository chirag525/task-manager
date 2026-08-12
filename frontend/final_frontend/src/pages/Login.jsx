import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Sparkles } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { validateAuthForm } from '../utils/validation'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = validateAuthForm(form)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setLoading(true)
    setServerError('')
    try {
      await login({ email: form.email.trim(), password: form.password })
      navigate(location.state?.from || '/dashboard', { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold">TaskFlow</span>
          </div>

          <div className="max-w-lg">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">AI-powered productivity</p>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Turn your work into a clear, manageable plan.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create tasks, track progress and let AI help you turn simple titles into actionable task details.
            </p>
            <div className="mt-8 space-y-3">
              {['JWT-secured task management', 'AI-assisted task creation', 'Responsive dashboard'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">TaskFlow • Java Full Stack Take-Home Assignment</p>
        </div>

        <div className="flex items-center justify-center bg-white px-4 py-8 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold text-slate-900">TaskFlow</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to manage your tasks.</p>
            </div>

            {serverError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                {serverError}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label" htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  className={`input ${errors.email ? 'border-red-400' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="label" htmlFor="login-password">Password</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`input pr-11 ${errors.password ? 'border-red-400' : ''}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }) }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs font-medium text-red-600">{errors.password}</p>}
              </div>

              <button className="btn-primary w-full py-3" disabled={loading}>
                {loading ? <Spinner /> : <ArrowRight className="h-4 w-4" />}
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link className="font-bold text-indigo-600 hover:text-indigo-700" to="/register">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
