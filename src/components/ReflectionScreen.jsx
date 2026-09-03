import { useState } from 'react'
import gatheringCircle from '../assets/game/scene_gathering_circle.png'

export default function ReflectionScreen({ onFinish }) {
  const [answer, setAnswer] = useState('')

  return (
    <div className="screen">
      <div className="map-reveal-frame">
        <img src={gatheringCircle} alt="함께 모인 순간" className="map-reveal-img" />
      </div>
      <div className="reflection-question">오늘 어떤 선택에서 가장 고민했나요?</div>
      <div className="reflection-note">이 답변은 공유되지 않아요. 나만 보는 기록이에요.</div>
      <textarea
        className="reflection-textarea"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="편하게 적어보세요..."
      />
      <button type="button" className="btn-primary" onClick={onFinish}>
        마치기
      </button>
    </div>
  )
}
