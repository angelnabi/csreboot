import { useMemo, useState } from 'react'
import { TUTORIAL } from '../data/monsters'
import { shuffle } from '../game/shuffle'

export default function TutorialBattle({ character, onComplete }) {
  const [chosen, setChosen] = useState(null)
  const choiceOrder = useMemo(() => shuffle(TUTORIAL.choices), [])

  const handleChoose = (choice) => {
    setChosen(choice)
  }

  const reactionClass = chosen ? (chosen.type === 'bad' ? ' portrait-bad' : chosen.type === 'good' ? ' portrait-good' : '') : ''
  const charSrc = chosen?.type === 'good' ? character.poses.good : character.poses.idle
  const monsterSrc = chosen?.type === 'bad' ? TUTORIAL.poses.attack : TUTORIAL.poses.idle

  return (
    <div className="screen">
      <div className="battle-arena" key={chosen ? chosen.type : 'idle'}>
        <div className="arena-side">
          <div className={`portrait-wrap idle-float${reactionClass}`}>
            <img src={charSrc} alt={character.name} />
          </div>
          <div className="arena-name">{character.name}</div>
        </div>
        <div className="arena-vs">VS</div>
        <div className="arena-side">
          <div className={`portrait-wrap idle-float${reactionClass}`}>
            <img src={monsterSrc} alt={TUTORIAL.name} />
          </div>
          <div className="arena-name">{TUTORIAL.name}</div>
        </div>
      </div>

      <div className="story-box">{TUTORIAL.intro}</div>

      {!chosen && (
        <div className="card-row">
          {choiceOrder.map((c) => (
            <button
              key={c.type}
              type="button"
              className="choice-card"
              onClick={() => handleChoose(c)}
            >
              <span className="card-line">"{c.line}"</span>
            </button>
          ))}
        </div>
      )}

      {chosen && (
        <>
          <div className={`log-box${chosen.type === 'bad' ? ' shake' : ''}`}>
            <div className="log-announce">{chosen.label}!</div>
            <div className={chosen.type === 'bad' ? 'log-line-bad' : 'log-line-good'}>
              "{chosen.line}"
            </div>
            <div className="log-note">{TUTORIAL.systemLine}</div>
          </div>
          <div className="continue-row">
            <button type="button" className="btn-primary" onClick={onComplete}>
              계속하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
