import { useEffect, useState } from 'react'
import { ArrowRight, Eye, EyeOff, Sparkles, UserPlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { validateAuthForm } from '../utils/validation'

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState('')
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
    setSuccess('')
    try {
      await register({ email: form.email.trim(), password: form.password })
      setSuccess('Account created successfully. You can now sign in.')
      setForm({ email: form.email, password: '' })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold">TaskFlow</span>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-7">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserPlus className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">Start organizing your work with TaskFlow.</p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
              {serverError}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label" htmlFor="register-email">Email</label>
              <input
                id="register-email"
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
              <label className="label" htmlFor="register-password">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`input pr-11 ${errors.password ? 'border-red-400' : ''}`}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }) }}
                  autoComplete="new-password"
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
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link className="font-bold text-indigo-600 hover:text-indigo-700" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
