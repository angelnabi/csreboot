import { useMemo, useState } from 'react'
import { STAGE_LABELS, CARD_LABELS, getGoodLine } from '../data/characters'
import { getCompletionText } from '../data/monsters'
import { scoreChoice, scoreTrapChoice, gaugeToPercent } from '../game/battleEngine'
import { shuffle } from '../game/shuffle'
import CorridorStep from './CorridorStep'

// Handles quests 1-3 and the boss. `monster` follows the shape in data/monsters.js
// (stages array, optional `trap` config for stage 0, optional `easterEgg`).
export default function QuestBattle({ monster, character, isRetry, onComplete }) {
  const [phase, setPhase] = useState(isRetry ? 'battle' : 'entry')
  const [stageIndex, setStageIndex] = useState(0)
  const [rawGauge, setRawGauge] = useState(0)
  const [crackStacks, setCrackStacks] = useState(0)
  const [reveal, setReveal] = useState(null) // { label, line, reactionText, type }
  const [shakeKey, setShakeKey] = useState(0)
  // One entry per completed stage, so "뒤로" can undo the most recent stage's
  // effect on the gauge/cracks instead of just resetting the visible phase.
  const [history, setHistory] = useState([])

  const isTrapStage = monster.trap && monster.trap.stageIndex === stageIndex
  const stageData = monster.stages[stageIndex]

  // Shuffled each time we land on a stage so the "good" option is never predictably
  // in the same slot.
  const cardOrder = useMemo(() => {
    const trapHere = monster.trap && monster.trap.stageIndex === stageIndex
    return shuffle(trapHere ? ['trap', 'safe', 'bad'] : ['good', 'normal', 'bad'])
  }, [stageIndex, monster])

  const advanceAfterEntry = () => {
    setPhase('encounter')
  }

  const applyOutcome = ({ gain, crackDelta, crackRemoved, counterTriggered }, label, line, reactionText, type) => {
    setRawGauge((g) => g + gain)
    setCrackStacks((c) => Math.max(0, c - crackRemoved + crackDelta))
    setReveal({ label, line, reactionText, type, counterTriggered })
    setShakeKey((k) => k + 1)
    setHistory((h) => [...h, { gain, crackDelta, crackRemoved }])
  }

  const handleBack = () => {
    if (stageIndex === 0) {
      setPhase('encounter')
      return
    }
    const last = history[history.length - 1]
    if (last) {
      setRawGauge((g) => g - last.gain)
      setCrackStacks((c) => Math.max(0, c + last.crackRemoved - last.crackDelta))
      setHistory((h) => h.slice(0, -1))
    }
    setStageIndex((i) => Math.max(0, i - 1))
  }

  const cardMeta = (type) => {
    if (isTrapStage) {
      const trap = monster.trap
      const label = type === 'trap' ? trap.trapLabel : type === 'safe' ? trap.safeLabel : trap.badLabel
      const line = type === 'trap' ? trap.trapLine : type === 'safe' ? trap.safeLine : trap.badLine
      const reactionPreview = type === 'trap' ? trap.trapResult : type === 'safe' ? trap.safeResult : trap.badResult
      return { label, line, reactionPreview }
    }
    const label = CARD_LABELS[stageIndex][type]
    const line = type === 'good' ? getGoodLine(character, stageIndex, monster.id) : stageData[type]
    const reactionPreview =
      type === 'good' ? stageData.reactionGood : type === 'normal' ? stageData.reactionNormal : stageData.reactionBad
    return { label, line, reactionPreview }
  }

  const handleChoose = (type) => {
    const { label, line, reactionPreview } = cardMeta(type)
    const outcome = isTrapStage
      ? scoreTrapChoice({
          optionType: type,
          trapCrackStacks: monster.trap.trapCrackStacks,
          character,
          stageIndex,
          crackStacks,
        })
      : scoreChoice({ choiceType: type, stageIndex, character, crackStacks })
    applyOutcome(outcome, label, line, reactionPreview, type)
  }

  const handleContinue = () => {
    setReveal(null)
    if (stageIndex < monster.stages.length - 1) {
      setStageIndex((i) => i + 1)
    } else {
      setPhase('complete')
    }
  }

  const finish = () => {
    onComplete(gaugeToPercent(rawGauge))
  }

  const percentNow = gaugeToPercent(rawGauge)

  if (phase === 'entry') {
    return (
      <CorridorStep
        text={monster.entryText}
        character={character}
        sideDiscoveries={monster.sideDiscoveries}
        deadEndLines={monster.deadEndLines}
        easterEgg={monster.easterEgg}
        mapPath={monster.mapPath}
        onDone={advanceAfterEntry}
      />
    )
  }

  if (phase === 'encounter') {
    return (
      <div className="screen">
        <div className="battle-header">
          <div className="monster-portrait-wrap idle-float">
            <img src={monster.poses.idle} alt={monster.name} />
          </div>
          <div className="monster-name">{monster.name}</div>
        </div>
        <div className="story-box">{monster.encounterText}</div>
        <button type="button" className="btn-primary" onClick={() => setPhase('battle')}>
          전투 시작
        </button>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div className="screen">
        <div className="battle-header">
          <div className="monster-portrait-wrap idle-float">
            <img src={monster.poses.defeat} alt={monster.name} />
          </div>
          <div className="monster-name">{monster.name}</div>
        </div>
        <div className="gauge-track">
          <div className="gauge-fill" style={{ width: `${percentNow}%` }} />
        </div>
        <div className="ending-score">마음의 문 {percentNow} / 100</div>
        {getCompletionText(monster, percentNow) && (
          <div className="story-box">{getCompletionText(monster, percentNow)}</div>
        )}
        <button type="button" className="btn-primary" onClick={finish}>
          계속
        </button>
      </div>
    )
  }

  // phase === 'battle'
  const isGoodReveal = reveal && (reveal.type === 'good' || reveal.type === 'safe')
  const isBadReveal = reveal && reveal.type !== 'normal' && !isGoodReveal
  const reactionClass = isGoodReveal ? ' portrait-good' : isBadReveal ? ' portrait-bad' : ''
  const charSrc = isGoodReveal ? character.poses.good : character.poses.idle
  const monsterSrc = isBadReveal ? monster.poses.attack : monster.poses.idle

  return (
    <div className="screen">
      <div className="battle-arena" key={shakeKey}>
        <div className="arena-side">
          <div className={`portrait-wrap char-portrait idle-float${reactionClass}`}>
            <img src={charSrc} alt={character.name} />
          </div>
          <div className="arena-name">{character.name}</div>
        </div>
        <div className="arena-vs">VS</div>
        <div className="arena-side">
          <div
            className={`portrait-wrap monster-portrait-wrap idle-float door-glow${reactionClass}`}
            style={{ '--door-open': percentNow / 100 }}
          >
            <img src={monsterSrc} alt={monster.name} />
          </div>
          <div className="arena-name">{monster.name}</div>
        </div>
      </div>

      <div className="battle-header">
        <div className="gauge-label">
          <span>마음의 문</span>
          <span>{percentNow} / 100</span>
        </div>
        <div className="gauge-track">
          <div className="gauge-fill" style={{ width: `${percentNow}%` }} />
        </div>
        <div className="crack-indicator">
          {Array.from({ length: crackStacks }).map((_, i) => (
            <span className="crack-mark" key={i} />
          ))}
          {crackStacks > 0 && <span>균열 {crackStacks}</span>}
        </div>
      </div>

      <div className="stage-label">{STAGE_LABELS[stageIndex]}</div>

      {!reveal && (
        <div className="card-row">
          {cardOrder.map((type) => {
            const { label, line, reactionPreview } = cardMeta(type)
            const isSolverHint = !isTrapStage && character.id === 'solver' && stageIndex === 2 && type === 'good'
            const showMageInsight = !isTrapStage && character.id === 'mage' && stageIndex === 3
            return (
              <button
                key={type}
                type="button"
                className={`choice-card${isSolverHint ? ' hint-good' : ''}`}
                onClick={() => handleChoose(type)}
              >
                {/* Only the "bad" trap action has no real spoken line ("..."), so only
                    it needs its action name shown up front — labeling the other two
                    (e.g. "경청 공격") would give away the trap before the line is read. */}
                {isTrapStage && line === '...' && <span className="card-label">{label}</span>}
                <span className="card-line">"{line}"</span>
                {showMageInsight && reactionPreview && (
                  <span className="card-preview">예상 반응: {reactionPreview}</span>
                )}
              </button>
            )
          })}
          <button type="button" className="btn-ghost back-row" onClick={handleBack}>
            ◀ 뒤로
          </button>
        </div>
      )}

      {reveal && (
        <>
          <div className={`log-box${reveal.type === 'bad' || reveal.type === 'trap' ? ' shake' : ''}`}>
            <div className="log-announce">{reveal.label}!</div>
            <div className={reveal.type === 'good' || reveal.type === 'safe' ? 'log-line-good' : reveal.type === 'normal' ? '' : 'log-line-bad'}>
              "{reveal.line}"
            </div>
            <div className="log-note">{reveal.reactionText}</div>
          </div>
          <div className="continue-row">
            <button type="button" className="btn-primary" onClick={handleContinue}>
              다음
            </button>
          </div>
        </>
      )}
    </div>
  )
}
