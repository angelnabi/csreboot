import { useState } from 'react'
import './App.css'
import TitleScreen from './components/TitleScreen'
import CharacterSelect from './components/CharacterSelect'
import TutorialBattle from './components/TutorialBattle'
import QuestBattle from './components/QuestBattle'
import EndingScreen from './components/EndingScreen'
import ReflectionScreen from './components/ReflectionScreen'
import JourneyMap from './components/JourneyMap'
import MapRevealScreen from './components/MapRevealScreen'
import { QUESTS, BOSS } from './data/monsters'

const ENCOUNTERS = [...QUESTS, BOSS]
const JOURNEY_ORDER = ['tutorial', ...ENCOUNTERS.map((e) => e.id)]

function App() {
  const [step, setStep] = useState('title')
  const [character, setCharacter] = useState(null)
  const [encounterIndex, setEncounterIndex] = useState(0)
  const [results, setResults] = useState({})
  const [isRetry, setIsRetry] = useState(false)

  const currentEncounter = ENCOUNTERS[encounterIndex]

  const handleQuestComplete = (percent) => {
    setResults((r) => ({ ...r, [currentEncounter.id]: percent }))
    if (encounterIndex < ENCOUNTERS.length - 1) {
      setEncounterIndex((i) => i + 1)
    } else {
      setStep('ending')
    }
  }

  const handleRetry = () => {
    setResults({})
    setEncounterIndex(0)
    setIsRetry(true)
    setStep('battle')
  }

  const handleRestartFromTitle = () => {
    setCharacter(null)
    setResults({})
    setEncounterIndex(0)
    setIsRetry(false)
    setStep('title')
  }

  let mapCurrentId = null
  let mapDoneIds = []
  if (step === 'tutorial') {
    mapCurrentId = 'tutorial'
  } else if (step === 'battle') {
    mapCurrentId = currentEncounter.id
    mapDoneIds = JOURNEY_ORDER.slice(0, JOURNEY_ORDER.indexOf(currentEncounter.id))
  } else if (step === 'ending' || step === 'reflection' || step === 'closing') {
    mapDoneIds = JOURNEY_ORDER
  }

  return (
    <div className="app-shell">
      <div className="game-frame">
        <div className="game-frame-notch" />
        <div className="game-frame-inner">
          {mapCurrentId !== null || mapDoneIds.length > 0 ? (
            <JourneyMap currentId={mapCurrentId} doneIds={mapDoneIds} />
          ) : null}

          {step === 'title' && <TitleScreen onStart={() => setStep('select')} />}

          {step === 'select' && (
            <CharacterSelect
              onConfirm={(c) => {
                setCharacter(c)
                setStep('map')
              }}
            />
          )}

          {step === 'map' && <MapRevealScreen onStart={() => setStep('tutorial')} />}

          {step === 'tutorial' && (
            <TutorialBattle character={character} onComplete={() => setStep('battle')} />
          )}

          {step === 'battle' && (
            <QuestBattle
              key={currentEncounter.id}
              monster={currentEncounter}
              character={character}
              isRetry={isRetry}
              onComplete={handleQuestComplete}
            />
          )}

          {step === 'ending' && (
            <EndingScreen
              results={results}
              character={character}
              boss={BOSS}
              onRetry={handleRetry}
              onReflect={() => setStep('reflection')}
            />
          )}

          {step === 'reflection' && (
            <ReflectionScreen character={character} onFinish={() => setStep('closing')} />
          )}

          {step === 'closing' && (
            <div className="screen title-screen">
              <div className="closing-portrait idle-float">
                <img src={character.poses.good} alt={character.name} />
              </div>
              <h1 className="title-name">여정을 마쳤습니다</h1>
              <p className="title-lore">
                이제 오프라인에서, 오늘 어떤 선택이 가장 고민됐는지 함께 이야기 나눠볼까요?
              </p>
              <button type="button" className="btn-ghost" onClick={handleRestartFromTitle}>
                처음부터 다시하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
