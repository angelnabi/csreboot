import { useState } from 'react'
import CaveBackdrop from './CaveBackdrop'
import CorridorMiniMap from './CorridorMiniMap'
import TypewriterText from './TypewriterText'

// The path isn't just a straight line — it winds. Each entry is the direction
// needed to move from beat i to beat i+1.
const TURN_PATTERN = ['up', 'right', 'up', 'left']

const WRONG_WAY = [
  '그쪽은 막혀 있다. 길이 아니다.',
  '벽뿐이다. 이 방향은 아닌 것 같다.',
  '더 가봐도 막다른 곳이다.',
]

const DIR_HINT = {
  up: '▲ 눌러서 곧게 이어진 길을 따라가기',
  right: '▶ 눌러서 오른쪽으로 굽은 길 따라가기',
  left: '◀ 눌러서 왼쪽으로 휘어진 길 따라가기',
}

// Splits `text` on newlines into beats the player steps through with a D-pad.
// Progressing requires the correct direction per beat (see TURN_PATTERN) —
// the wrong direction just shows a "dead end" flavor line, no penalty.
export default function CorridorStep({ text, character, onDone }) {
  const beats = text.split('\n').filter(Boolean)
  const dirs = beats.slice(0, -1).map((_, i) => TURN_PATTERN[i % TURN_PATTERN.length])
  const [beatIndex, setBeatIndex] = useState(0)
  const [sideMessage, setSideMessage] = useState(null)
  const [stepKey, setStepKey] = useState(0)

  const isLast = beatIndex === beats.length - 1
  const requiredDir = isLast ? 'up' : dirs[beatIndex]

  const handleDirection = (dir) => {
    if (dir !== requiredDir) {
      setSideMessage(WRONG_WAY[Math.floor(Math.random() * WRONG_WAY.length)])
      return
    }
    setSideMessage(null)
    setStepKey((k) => k + 1)
    if (beatIndex < beats.length - 1) {
      setBeatIndex((i) => i + 1)
    } else {
      onDone()
    }
  }

  const handleBack = () => {
    setSideMessage(null)
    setStepKey((k) => k + 1)
    setBeatIndex((i) => Math.max(0, i - 1))
  }

  return (
    <div className="screen">
      <div className="cave-scene">
        <CaveBackdrop />
        <div className="cave-walker" key={stepKey}>
          <img src={character.poses.back} alt={character.name} />
        </div>
      </div>

      <CorridorMiniMap total={beats.length} current={beatIndex} dirs={dirs} />

      <div className="story-box" key={`beat-${beatIndex}`}>
        <TypewriterText text={beats[beatIndex]} />
      </div>
      {sideMessage && <div className="story-box side-glance">{sideMessage}</div>}

      <div className="dpad">
        <div />
        <button
          type="button"
          className={`dpad-btn${requiredDir === 'up' ? ' suggested' : ''}`}
          onClick={() => handleDirection('up')}
          aria-label="위로"
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          className={`dpad-btn${requiredDir === 'left' ? ' suggested' : ''}`}
          onClick={() => handleDirection('left')}
          aria-label="왼쪽으로"
        >
          ◀
        </button>
        <div className="dpad-center">{beatIndex + 1} / {beats.length}</div>
        <button
          type="button"
          className={`dpad-btn${requiredDir === 'right' ? ' suggested' : ''}`}
          onClick={() => handleDirection('right')}
          aria-label="오른쪽으로"
        >
          ▶
        </button>
        <div />
        <button
          type="button"
          className="dpad-btn"
          onClick={handleBack}
          disabled={beatIndex === 0}
          aria-label="뒤로"
        >
          ▼
        </button>
        <div />
      </div>

      <div className="corridor-hint">{isLast ? '앞으로 눌러 계속 나아가기' : DIR_HINT[requiredDir]}</div>
    </div>
  )
}
