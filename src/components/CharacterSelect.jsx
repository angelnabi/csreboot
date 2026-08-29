import { useState } from 'react'
import { CHARACTERS, STAGE_LABELS } from '../data/characters'

const STAT_META = [
  { key: 'perspective', label: '관점' },
  { key: 'empathy', label: '공감' },
  { key: 'solution', label: '해결' },
  { key: 'tone', label: '톤앤매너' },
]

export default function CharacterSelect({ onConfirm }) {
  const [selectedId, setSelectedId] = useState(CHARACTERS[0].id)
  const selected = CHARACTERS.find((c) => c.id === selectedId)

  return (
    <div className="screen">
      <h2 className="select-title">누구로 동굴에 들어갈까요?</h2>

      <div className="char-grid">
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`char-card${c.id === selectedId ? ' selected' : ''}`}
            style={{ '--char-color': c.color }}
            onClick={() => setSelectedId(c.id)}
          >
            <img src={c.asset} alt={c.name} />
            <span className="char-name">{c.name}</span>
            <span className="char-subtitle">{c.subtitle}</span>
          </button>
        ))}
      </div>

      <div className="char-detail" style={{ '--char-color': selected.color }}>
        <div className="passive">
          <b>{selected.passiveName}</b> · 강점 단계: {STAGE_LABELS[selected.strengthStage]}
          <br />
          {selected.passiveDesc}
        </div>
        <p className="preview-line">"{selected.previewLine}"</p>
        <div className="stat-bars">
          {STAT_META.map((s) => (
            <div className="stat-bar-row" key={s.key}>
              <span>{s.label}</span>
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(selected.stats[s.key] / 5) * 100}%` }}
                />
              </div>
              <span>{selected.stats[s.key]}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="btn-primary" onClick={() => onConfirm(selected)}>
        {selected.name}(으)로 시작하기
      </button>
    </div>
  )
}
