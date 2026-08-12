import { CheckCircle2, XCircle, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  const success = toast.type === 'success'

  return (
    <div className="fixed right-4 top-4 z-[70] w-[calc(100%-2rem)] max-w-sm animate-[fadeIn_.2s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-soft ${
          success ? 'border-emerald-200' : 'border-red-200'
        }`}
      >
        {success ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        )}
        <p className="flex-1 text-sm font-medium text-slate-700">{toast.message}</p>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
