import { Fragment } from 'react'

const NODES = [
  { id: 'tutorial', label: '생채기임프' },
  { id: 'q1', label: '초조고블린' },
  { id: 'q2', label: '메아리오크' },
  { id: 'q3', label: '굴레트롤' },
  { id: 'boss', label: '잔향마왕' },
]

// currentId: id of the node currently in progress (or null if the journey is over)
export default function JourneyMap({ currentId, doneIds }) {
  return (
    <div className="journey-map">
      {NODES.map((node, i) => {
        const isDone = doneIds.includes(node.id)
        const isCurrent = node.id === currentId
        const status = isDone ? 'done' : isCurrent ? 'current' : 'upcoming'
        return (
          <Fragment key={node.id}>
            <div className="journey-step">
              <div className={`journey-node ${status}`}>{isDone ? '✓' : i + 1}</div>
              <div className={`journey-label ${status}`}>{node.label}</div>
            </div>
            {i < NODES.length - 1 && <div className={`journey-line ${isDone ? 'done' : ''}`} />}
          </Fragment>
        )
      })}
    </div>
  )
}
