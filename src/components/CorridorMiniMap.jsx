// Small zigzag path visualization for the corridor: one dot per beat, offset
// up/down to match the turn direction needed to reach it, with the walker's
// current position highlighted.
export default function CorridorMiniMap({ total, current, dirs }) {
  const dots = Array.from({ length: total })
  return (
    <div className="corridor-map">
      {dots.map((_, i) => {
        const offsetClass = i === 0 ? '' : dirs[i - 1] === 'left' ? ' shift-left' : dirs[i - 1] === 'right' ? ' shift-right' : ''
        const status = i < current ? 'done' : i === current ? 'current' : 'upcoming'
        return (
          <div className={`corridor-dot-wrap${offsetClass}`} key={i}>
            <div className={`corridor-dot ${status}`} />
            {i < total - 1 && <div className={`corridor-dot-line ${i < current ? 'done' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}
