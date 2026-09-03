import { useState } from 'react'
import CorridorMiniMap from './CorridorMiniMap'
import TypewriterText from './TypewriterText'
import { shuffle } from '../game/shuffle'
import overworldMap from '../assets/game/scene_overworld_map.png'

// The path isn't just a straight line — it winds. Each entry is the direction
// needed to move from beat i to beat i+1.
const TURN_PATTERN = ['up', 'right', 'up', 'left']

const WRONG_WAY = [
  '그쪽은 막혀 있다. 길이 아니다.',
  '벽뿐이다. 이 방향은 아닌 것 같다.',
  '더 가봐도 막다른 곳이다.',
  '발밑이 축축해질 뿐, 길은 없다.',
  '어둠만 깊어질 뿐이다.',
]

const DIR_HINT = {
  up: '▲ 눌러서 곧게 이어진 길을 따라가기',
  right: '▶ 눌러서 오른쪽으로 굽은 길 따라가기',
  left: '◀ 눌러서 왼쪽으로 휘어진 길 따라가기',
}

// Splits `text` on newlines into beats the player steps through with a D-pad.
// Progressing requires the correct direction per beat (see TURN_PATTERN); the
// wrong direction is where the game's secrets live — the quest's easter egg
// (an interactive find/skip prompt) surfaces on the first wrong press, then
// flavor "discoveries" on the next few, then generic dead-end lines after that.
// Players who only ever press the right direction never see any of it — the
// egg only appears if you actually wander off the path.
export default function CorridorStep({
  text,
  character,
  sideDiscoveries,
  deadEndLines,
  easterEgg,
  mapPath,
  onDone,
}) {
  const beats = text.split('\n').filter(Boolean)
  const dirs = beats.slice(0, -1).map((_, i) => TURN_PATTERN[i % TURN_PATTERN.length])
  const [beatIndex, setBeatIndex] = useState(0)

  const progress = beats.length > 1 ? beatIndex / (beats.length - 1) : 1
  const walkerX = mapPath ? mapPath.from[0] + (mapPath.to[0] - mapPath.from[0]) * progress : 50
  const walkerY = mapPath ? mapPath.from[1] + (mapPath.to[1] - mapPath.from[1]) * progress : 50

  const [sideMessage, setSideMessage] = useState(null)
  const [isDiscovery, setIsDiscovery] = useState(false)
  const [eggPhase, setEggPhase] = useState(null) // null | 'prompt' | 'resolved'
  const [eggTriggered, setEggTriggered] = useState(false)

  const [discoveryQueue] = useState(() => shuffle(sideDiscoveries || []))
  const [discoveryIndex, setDiscoveryIndex] = useState(0)

  // Dead-end flavor is a shuffled deck (quest-specific lines + generic ones),
  // dealt one at a time; the whole deck is reshuffled only once it's used up,
  // so nothing repeats until every line has been seen.
  const wrongPool = [...(deadEndLines || []), ...WRONG_WAY]
  const [wrongDeck, setWrongDeck] = useState(() => shuffle(wrongPool))
  const [wrongCursor, setWrongCursor] = useState(0)

  const isLast = beatIndex === beats.length - 1
  const requiredDir = isLast ? 'up' : dirs[beatIndex]

  const clearSide = () => {
    setSideMessage(null)
    setIsDiscovery(false)
    setEggPhase(null)
  }

  const handleDirection = (dir) => {
    if (dir !== requiredDir) {
      if (easterEgg && !eggTriggered) {
        setEggTriggered(true)
        setEggPhase('prompt')
        setSideMessage(null)
        return
      }
      if (discoveryIndex < discoveryQueue.length) {
        setEggPhase(null)
        setSideMessage(discoveryQueue[discoveryIndex])
        setIsDiscovery(true)
        setDiscoveryIndex((i) => i + 1)
      } else {
        const atEnd = wrongCursor >= wrongDeck.length
        const deck = atEnd ? shuffle(wrongPool) : wrongDeck
        const cursor = atEnd ? 0 : wrongCursor
        if (atEnd) setWrongDeck(deck)
        setWrongCursor(cursor + 1)
        setEggPhase(null)
        setSideMessage(deck[cursor])
        setIsDiscovery(false)
      }
      return
    }
    clearSide()
    if (beatIndex < beats.length - 1) {
      setBeatIndex((i) => i + 1)
    } else {
      onDone()
    }
  }

  const handleBack = () => {
    clearSide()
    setBeatIndex((i) => Math.max(0, i - 1))
  }

  return (
    <div className="screen">
      <div className="cave-scene">
        <img src={overworldMap} alt="동굴 지도" className="cave-scene-map" />
        <div className="cave-walker" style={{ left: `${walkerX}%`, top: `${walkerY}%` }}>
          <img src={character.poses.back} alt={character.name} />
        </div>
      </div>

      <CorridorMiniMap total={beats.length} current={beatIndex} dirs={dirs} />

      <div className="story-box" key={`beat-${beatIndex}`}>
        <TypewriterText text={beats[beatIndex]} />
      </div>

      {eggPhase === 'prompt' && (
        <div className="easter-egg-box discovery">
          <div className="discovery-tag">발견!</div>
          <div>{easterEgg.prompt}</div>
          <div className="easter-egg-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setEggPhase('resolved')}
            >
              {easterEgg.openLabel}
            </button>
            <button type="button" className="btn-ghost" onClick={() => setEggPhase(null)}>
              {easterEgg.skipLabel}
            </button>
          </div>
        </div>
      )}

      {eggPhase === 'resolved' && (
        <div className="easter-egg-box discovery">
          <div>{easterEgg.openResult}</div>
          {easterEgg.hint && <div className="easter-egg-hint">{easterEgg.hint}</div>}
        </div>
      )}

      {sideMessage && (
        <div className={`story-box side-glance${isDiscovery ? ' discovery' : ''}`}>
          {isDiscovery && <div className="discovery-tag">발견!</div>}
          {sideMessage}
        </div>
      )}

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
