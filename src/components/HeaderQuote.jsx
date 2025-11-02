import { useMemo, useState } from 'react'
import { Heart, Music, Play, Pause } from 'lucide-react'

const QUOTES = [
  {
    power: 'Tu ruk gaya hai Gaurav, khatam nahi hua. — Keep moving, one gentle step at a time.',
    main: 'You can do it, I believe in you.'
  },
  {
    power: 'Aaj ka din naya chance hai — apne aap ko ek mauka aur de.',
    main: 'Small wins today, big change tomorrow.'
  },
  {
    power: 'Tu strong hai, aur ban raha hai aur bhi strong. Steady reh.',
    main: 'Breathe. Reset. Rise.'
  },
  {
    power: 'Pain temporary hai, pride forever. Aaj gentle progress.',
    main: 'Show up for yourself.'
  }
]

const musicSrc = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c0f6d277b7.mp3?filename=calm-ambient-110997.mp3'

export default function HeaderQuote() {
  const [isPlaying, setIsPlaying] = useState(false)

  const quote = useMemo(() => {
    const block = Math.floor(Date.now() / (6 * 60 * 60 * 1000))
    return QUOTES[block % QUOTES.length]
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white p-6 shadow-xl">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-3 rounded-xl bg-white/10 backdrop-blur">
          <Heart className="w-7 h-7 text-orange-300" />
        </div>
        <div className="flex-1">
          <p className="text-sm uppercase tracking-wider text-sky-100/90">Aaj ka Power Quote</p>
          <h2 className="mt-1 text-lg leading-snug text-sky-50">{quote.power}</h2>
          <h1 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">“{quote.main}”</h1>
        </div>
        <MusicControl isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
      <audio id="bg-music" src={musicSrc} loop />
    </div>
  )
}

function MusicControl({ isPlaying, setIsPlaying }) {
  const toggle = () => {
    const el = document.getElementById('bg-music')
    if (!el) return
    if (isPlaying) {
      el.pause()
      setIsPlaying(false)
    } else {
      el.volume = 0.25
      el.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <button
      onClick={toggle}
      className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/15 transition"
      aria-label="Toggle background music"
    >
      <Music className="w-4 h-4 text-orange-200" />
      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      <span className="hidden sm:inline text-sm">Calm Music</span>
    </button>
  )
}
