// Procedural cave-tunnel illustration (no image assets) — dark walls converging on a
// distant glow, used behind the corridor-walking scene.
export default function CaveBackdrop() {
  return (
    <svg viewBox="0 0 400 260" className="cave-backdrop" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="caveGlow" cx="50%" cy="18%" r="55%">
          <stop offset="0%" stopColor="var(--carrot-glow)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="caveFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg-deep)" />
          <stop offset="100%" stopColor="var(--bg-void)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="260" fill="url(#caveFloor)" />
      <rect x="0" y="0" width="400" height="260" fill="url(#caveGlow)" />

      {/* perspective tunnel lines converging toward a distant point */}
      <polygon points="0,260 160,50 240,50 400,260" fill="var(--bg-panel)" opacity="0.35" />
      <polygon points="40,260 175,60 225,60 360,260" fill="var(--bg-panel-raised)" opacity="0.3" />

      {/* left rock wall */}
      <polygon
        points="0,260 0,90 30,120 20,150 55,170 40,200 70,220 40,260"
        fill="var(--bg-panel-raised)"
      />
      {/* right rock wall */}
      <polygon
        points="400,260 400,90 370,120 380,150 345,170 360,200 330,220 360,260"
        fill="var(--bg-panel-raised)"
      />

      {/* stalactites */}
      <polygon points="90,0 100,0 95,34" fill="var(--bg-panel-raised)" />
      <polygon points="150,0 158,0 154,22" fill="var(--bg-panel-raised)" />
      <polygon points="260,0 270,0 264,28" fill="var(--bg-panel-raised)" />
      <polygon points="310,0 320,0 314,18" fill="var(--bg-panel-raised)" />

      {/* faint drifting motes */}
      <circle className="cave-mote" cx="120" cy="150" r="1.6" fill="var(--carrot-soft)" opacity="0.5" />
      <circle className="cave-mote cave-mote-2" cx="260" cy="180" r="1.3" fill="var(--carrot-soft)" opacity="0.4" />
      <circle className="cave-mote cave-mote-3" cx="190" cy="120" r="1.1" fill="var(--carrot-soft)" opacity="0.35" />
    </svg>
  )
}
