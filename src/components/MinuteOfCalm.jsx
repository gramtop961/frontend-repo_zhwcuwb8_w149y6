import { useEffect, useRef, useState } from 'react'
import { Wind, PlayCircle, PauseCircle } from 'lucide-react'

const calmSrc = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7a0b2e1a63.mp3?filename=relaxing-11104.mp3'

export default function MinuteOfCalm() {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(60)
  const timerRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(timerRef.current)
            setRunning(false)
            return 60
          }
          return s - 1
        })
      }, 1000)
      try {
        audioRef.current.volume = 0.2
        audioRef.current.play().catch(() => {})
      } catch {}
    }
    return () => clearInterval(timerRef.current)
  }, [running])

  const pct = (60 - seconds) / 60

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-semibold text-slate-800">Minute of Calm</h3>
        </div>
        <button
          onClick={() => setRunning(r => !r)}
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-50"
        >
          {running ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
          <span className="text-sm font-medium">{running ? 'Pause' : 'Start'}</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-24 h-24 rotate-[-90deg]">
            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="45" stroke="url(#grad)" strokeWidth="8" fill="none" strokeDasharray={Math.PI * 2 * 45} strokeDashoffset={(1 - pct) * Math.PI * 2 * 45} strokeLinecap="round" />
            <defs>
              <linearGradient id="grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-xl font-semibold text-slate-800">{seconds}s</div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-slate-700">4-7-8 breathing: 4s inhale • 7s hold • 8s exhale. Gentle rhythm, gentle mind.</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-500">
            <div className="rounded-xl bg-blue-50 px-2 py-1 text-blue-700">Inhale 4</div>
            <div className="rounded-xl bg-slate-50 px-2 py-1">Hold 7</div>
            <div className="rounded-xl bg-orange-50 px-2 py-1 text-orange-700">Exhale 8</div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={calmSrc} loop />
    </div>
  )
}
