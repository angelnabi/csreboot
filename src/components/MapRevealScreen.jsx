import overworldMap from '../assets/game/scene_overworld_map.png'

export default function MapRevealScreen({ onStart }) {
  return (
    <div className="screen">
      <div className="map-reveal-frame">
        <img src={overworldMap} alt="동굴 전경" className="map-reveal-img" />
      </div>
      <div className="story-box">
        동굴은 생각보다 깊다. 튜토리얼을 지나 세 갈래 길, 그리고 가장 깊은 곳까지 —
        네 개의 마음을 지나야 진실에 닿을 수 있다.
      </div>
      <button type="button" className="btn-primary" onClick={onStart}>
        동굴로 들어가기
      </button>
    </div>
  )
}
