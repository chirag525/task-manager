import { useState } from 'react'
import { LogOut, Menu, Plus, Sparkles, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AppLayout({ onCreate, onAi, children }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-extrabold tracking-tight text-slate-900">TaskFlow</p>
              <p className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:block">
                AI task manager
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <button onClick={onAi} className="btn-secondary">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              AI Assistant
            </button>
            <button onClick={onCreate} className="btn-primary">
              <Plus className="h-4 w-4" />
              New task
            </button>
            <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right">
                <p className="max-w-48 truncate text-sm font-semibold text-slate-800">{user?.email}</p>
                <p className="text-xs text-slate-400">Signed in</p>
              </div>
              <button
                onClick={logout}
                className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </nav>

          <button
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <button onClick={() => { onAi(); close() }} className="btn-secondary w-full">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                AI Assistant
              </button>
              <button onClick={() => { onCreate(); close() }} className="btn-primary w-full">
                <Plus className="h-4 w-4" />
                New task
              </button>
              <button onClick={() => { logout(); close() }} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-600">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
