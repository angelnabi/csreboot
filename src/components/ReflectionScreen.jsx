import { useState } from 'react'

export default function ReflectionScreen({ boss, onFinish }) {
  const [answer, setAnswer] = useState('')

  return (
    <div className="screen">
      <div className="portrait-wrap idle-float reflection-portrait">
        <img src={boss.poses.defeat} alt={boss.name} />
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
