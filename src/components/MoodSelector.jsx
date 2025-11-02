import { useEffect, useState } from 'react'
import { Smile, Frown, Zap, Sun } from 'lucide-react'

const MOODS = [
  {
    key: 'Calm',
    icon: Sun,
    color: 'bg-sky-100 text-sky-800 border-sky-200',
    message: 'Shabash, aaj ka pace calm rakhenge. Gentle focus, gentle wins.',
    suggestion: { label: 'Lo-Fi Focus Playlist', url: 'https://open.spotify.com/playlist/1A2b3C4D5E6F' }
  },
  {
    key: 'Tired',
    icon: Frown,
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    message: 'Aaj body ko respect. Short breaks + pani + 10-min stretch.',
    suggestion: { label: 'Soft Piano Energy', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' }
  },
  {
    key: 'Stressed',
    icon: Zap,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    message: '4-7-8 breathing try karein. Main saath hoon — everything will settle.',
    suggestion: { label: 'Soothing Breath Track', url: 'https://www.youtube.com/watch?v=YRPh_GaiL8s' }
  },
  {
    key: 'Hopeful',
    icon: Smile,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    message: 'Energy high! Momentum banayein. You are unstoppable.',
    suggestion: { label: 'Unstoppable – Sia', url: 'https://www.youtube.com/watch?v=YaEG2aWJnZ8' }
  },
  {
    key: 'Focused',
    icon: Sun,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    message: 'Laser focus mode ON. Single-tasking wins.',
    suggestion: { label: 'Deep Focus Mix', url: 'https://www.youtube.com/watch?v=WPni755-Krg' }
  }
]

export default function MoodSelector({ onChange }) {
  const [mood, setMood] = useState(() => localStorage.getItem('gv_mood') || 'Calm')

  useEffect(() => {
    localStorage.setItem('gv_mood', mood)
    onChange && onChange(MOODS.find(m => m.key === mood))
  }, [mood, onChange])

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800">Mood Selector</h3>
        <p className="text-sm text-slate-500">Choose how you feel</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {MOODS.map(({ key, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setMood(key)}
            className={`group flex items-center justify-center gap-2 rounded-xl border px-3 py-2 transition hover:scale-[1.02] ${color} ${mood === key ? 'ring-2 ring-offset-2 ring-orange-400' : ''}`}
            aria-pressed={mood === key}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{key}</span>
          </button>
        ))}
      </div>
      <MoodMessage moodKey={mood} />
    </div>
  )
}

function MoodMessage({ moodKey }) {
  const data = MOODS.find(m => m.key === moodKey)
  if (!data) return null
  return (
    <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-orange-50 p-4">
      <p className="text-slate-700">{data.message}</p>
      <a
        href={data.suggestion.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-sm text-blue-700 hover:text-blue-900 font-medium"
      >
        ▶ {data.suggestion.label}
      </a>
    </div>
  )
}
