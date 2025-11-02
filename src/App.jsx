import { useState } from 'react'
import HeaderQuote from './components/HeaderQuote'
import MoodSelector from './components/MoodSelector'
import DailyTrackers from './components/DailyTrackers'
import MinuteOfCalm from './components/MinuteOfCalm'

function App() {
  const [mood, setMood] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Gaurav Version 2.0 — The Comeback App</h1>
            <p className="text-slate-600">Emotional, warm, supportive – jaise ek dost jo hamesha saath ho.</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700">Daily Companion</p>
            <p className="text-xs text-slate-500">Calm blue-orange vibe</p>
          </div>
        </div>

        <HeaderQuote />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MoodSelector onChange={setMood} />
            <DailyTrackers />
          </div>
          <div className="space-y-6">
            <MinuteOfCalm />
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Helpful Reminders</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1 text-sm">
                <li>5am: Uth ja Gaurav – Naya din, nayi shuruaat!</li>
                <li>8am: Stay focused Gaurav, aaj ka goal yaad hai?</li>
                <li>2pm: Paani pee aur thoda stretch kar.</li>
                <li>6pm: Tough day? Sun “Unstoppable by Sia”.</li>
                <li>10pm: Reflect before you sleep – kal aur better.</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="pt-4 text-center text-sm text-slate-500">
          “Tera discipline har din thoda aur improve ho raha hai – proud of you.”
        </footer>
      </div>
    </div>
  )
}

export default App
