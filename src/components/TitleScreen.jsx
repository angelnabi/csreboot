export default function TitleScreen({ onStart }) {
  return (
    <div className="screen title-screen">
      <div>
        <div className="title-mark">CS Reboot · Season 1 · Session 4</div>
        <h1 className="title-name">잔향의 동굴</h1>
      </div>
      <p className="title-lore">
        OO동굴에서 사람들이 자꾸 사라지고, 발견돼도 다친 채로 돌아온다는 소문이 돈다.
        당신은 진상을 밝히기 위해 동굴로 향한다.
      </p>
      <button type="button" className="btn-primary" onClick={onStart}>
        동굴로 들어가기
      </button>
    </div>
  )
}
