import { ENDING_SCENE, TRUE_ENDING, INCOMPLETE_ENDING } from '../data/monsters'
import { isSuccess } from '../game/battleEngine'

export default function EndingScreen({ results, onRetry, onReflect }) {
  const scores = Object.values(results)
  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  const success = isSuccess(average)
  const ending = success ? TRUE_ENDING : INCOMPLETE_ENDING

  return (
    <div className="screen">
      <div className="ending-scene-text">{ENDING_SCENE}</div>
      <div className={`ending-badge ${success ? 'true' : 'incomplete'}`}>{ending.label}</div>
      <div className="story-box">{ending.text}</div>
      <div className="ending-score">평균 마음의 문: {Math.round(average)} / 100</div>

      {success ? (
        <button type="button" className="btn-primary" onClick={onReflect}>
          성찰하기
        </button>
      ) : (
        <>
          <button type="button" className="btn-primary" onClick={onRetry}>
            다시 도전하기
          </button>
          <button type="button" className="btn-ghost" onClick={onReflect}>
            그래도 성찰하기
          </button>
        </>
      )}
    </div>
  )
}
