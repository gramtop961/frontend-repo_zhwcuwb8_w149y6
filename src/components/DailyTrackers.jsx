import { useEffect, useMemo, useState } from 'react'
import { Droplet, CheckCircle, Minus, Plus, MessageSquare } from 'lucide-react'

const ROUTINE_ITEMS = [
  { key: 'wake5', label: 'Wake 5am' },
  { key: 'silence10', label: '10-min Silence' },
  { key: 'walk15', label: '15-min Walk' },
  { key: 'focusWork', label: 'Work Focus' },
  { key: 'noDrink', label: 'No Drink Today' },
  { key: 'messageSomeone', label: 'Message Ek Zaroori Insaan' }
]

export default function DailyTrackers() {
  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const [water, setWater] = useState(() => {
    const saved = localStorage.getItem(`gv_${todayKey}_water`)
    return saved ? parseInt(saved) : 0
  })
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem(`gv_${todayKey}_meals`)
    return saved ? JSON.parse(saved) : { breakfast: false, lunch: false, dinner: false }
  })
  const [routine, setRoutine] = useState(() => {
    const saved = localStorage.getItem(`gv_${todayKey}_routine`)
    return saved ? JSON.parse(saved) : Object.fromEntries(ROUTINE_ITEMS.map(i => [i.key, false]))
  })

  useEffect(() => {
    localStorage.setItem(`gv_${todayKey}_water`, String(water))
  }, [water, todayKey])
  useEffect(() => {
    localStorage.setItem(`gv_${todayKey}_meals`, JSON.stringify(meals))
  }, [meals, todayKey])
  useEffect(() => {
    localStorage.setItem(`gv_${todayKey}_routine`, JSON.stringify(routine))
  }, [routine, todayKey])

  const totalChecks = 3 + ROUTINE_ITEMS.length
  const doneChecks = (meals.breakfast?1:0) + (meals.lunch?1:0) + (meals.dinner?1:0) + ROUTINE_ITEMS.reduce((acc, i) => acc + (routine[i.key]?1:0), 0)
  const progress = Math.round((doneChecks / totalChecks) * 100)

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold text-slate-800">Water Tracker</h3>
          </div>
          <p className="text-sm text-slate-500">Glasses</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setWater(Math.max(0, water - 1))} className="rounded-xl border px-3 py-2 hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
          <div className="text-3xl font-bold text-slate-800 min-w-[3ch] text-center">{water}</div>
          <button onClick={() => setWater(Math.min(20, water + 1))} className="rounded-xl border px-3 py-2 hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Meal Checklist</h3>
        <div className="grid grid-cols-3 gap-3">
          {['Breakfast','Lunch','Dinner'].map((label) => {
            const key = label.toLowerCase()
            const on = meals[key]
            return (
              <button key={label} onClick={() => setMeals({ ...meals, [key]: !on })} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${on ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'hover:bg-slate-50'}`}>
                <span>{label}</span>
                {on && <CheckCircle className="w-4 h-4 text-emerald-600" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-800">Daily Routine</h3>
          <span className="text-sm text-slate-500">Progress {progress}%</span>
        </div>
        <div className="mb-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-orange-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {ROUTINE_ITEMS.map(item => (
            <label key={item.key} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer ${routine[item.key] ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
              <input type="checkbox" className="accent-blue-600" checked={!!routine[item.key]} onChange={() => setRoutine({ ...routine, [item.key]: !routine[item.key] })} />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> “Tu broken nahi hai, bas pause pe tha. Ab restart gently.”</p>
      </div>
    </div>
  )
}
