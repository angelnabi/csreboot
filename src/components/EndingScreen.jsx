import { ENDING_SCENE, TRUE_ENDING, INCOMPLETE_ENDING } from '../data/monsters'
import { isSuccess } from '../game/battleEngine'
import endingLight from '../assets/game/scene_ending_light.png'

export default function EndingScreen({ results, character, boss, onRetry, onReflect }) {
  const scores = Object.values(results)
  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  const success = isSuccess(average)
  const ending = success ? TRUE_ENDING : INCOMPLETE_ENDING

  return (
    <div className="screen">
      {success ? (
        <div className="map-reveal-frame">
          <img src={endingLight} alt="빛으로 향하는 길" className="map-reveal-img" />
        </div>
      ) : (
        <div className="ending-arena">
          <div className="portrait-wrap idle-float">
            <img src={character.poses.good} alt={character.name} />
          </div>
          <div className="portrait-wrap idle-float ending-dim">
            <img src={boss.poses.defeat} alt={boss.name} />
          </div>
        </div>
      )}
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
