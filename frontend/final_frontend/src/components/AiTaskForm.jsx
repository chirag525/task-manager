import { useState } from 'react'
import { Bot, Check, Sparkles, Wand2 } from 'lucide-react'
import { api } from '../services/api'
import Spinner from './Spinner'

export default function AiTaskForm({ onUseResult }) {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async (event) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('Enter a task title first')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await api.generateTask(title.trim())
      setResult(data)
    } catch (err) {
      setError(err.message || 'AI generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-4 ring-1 ring-indigo-100">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">AI task assistant</h3>
            <p className="mt-0.5 text-sm leading-5 text-slate-500">
              Enter a title and the backend Gemini integration will suggest a description, priority and effort.
            </p>
          </div>
        </div>

        <form onSubmit={generate} className="flex flex-col gap-2 sm:flex-row">
          <input
            className="input flex-1"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError('') }}
            placeholder="Prepare client presentation"
            maxLength={150}
          />
          <button className="btn-primary shrink-0" disabled={loading}>
            {loading ? <Spinner /> : <Wand2 className="h-4 w-4" />}
            Generate
          </button>
        </form>
        {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
      </div>

      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <p className="text-sm font-bold text-slate-900">AI suggestion</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
              {result.priority}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{result.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated effort</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{result.estimatedEffort}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onUseResult({ title, ...result })}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-100"
          >
            <Check className="h-4 w-4" />
            Use suggestion in new task
          </button>
        </div>
      )}
    </div>
  )
}
