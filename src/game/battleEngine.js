const BASE_POINTS = { good: 13, normal: 5, bad: 0 }

// Each stage choice is worth its base value applied twice (T1 select + T2 reaction tick),
// so a full quest (4 stages, all "good") caps at 4 * 2 * 13 = 104, matching the spec's
// "8턴 만점 104 → 100 캡" rule.
export function scoreChoice({ choiceType, stageIndex, character, crackStacks }) {
  const base = BASE_POINTS[choiceType] ?? 0
  let gain = base * 2
  let crackDelta = 0
  let counterTriggered = false
  let crackRemoved = 0

  const isWarriorStrength = character.id === 'warrior' && stageIndex === character.strengthStage
  const isHealerStrength = character.id === 'healer' && stageIndex === character.strengthStage

  if (choiceType === 'good') {
    if (isHealerStrength) {
      gain = Math.round(gain * 1.5) // healer bonus skips the crack-halving rule entirely
      crackRemoved = Math.min(1, crackStacks)
    } else if (crackStacks > 0) {
      gain = Math.floor(gain / 2)
    }
  } else if (choiceType === 'bad') {
    gain = 0
    counterTriggered = true
    crackDelta = isWarriorStrength ? 0 : 1
  }

  return { gain, crackDelta, crackRemoved, counterTriggered }
}

// Trap-stage variant: 'trap' looks like the safe/listening choice but is actually a bad
// outcome, 'safe' is the real correct answer (scored like "good"), 'bad' is the plain
// bad/attack option.
export function scoreTrapChoice({ optionType, trapCrackStacks, character, stageIndex, crackStacks }) {
  if (optionType === 'safe') {
    return scoreChoice({ choiceType: 'good', stageIndex, character, crackStacks })
  }
  if (optionType === 'trap') {
    const isWarriorStrength = character.id === 'warrior' && stageIndex === character.strengthStage
    return {
      gain: 0,
      crackDelta: isWarriorStrength ? 0 : trapCrackStacks,
      crackRemoved: 0,
      counterTriggered: true,
    }
  }
  return scoreChoice({ choiceType: 'bad', stageIndex, character, crackStacks })
}

export function gaugeToPercent(rawGauge) {
  return Math.max(0, Math.min(100, Math.round(rawGauge)))
}

export function isSuccess(percent) {
  return percent >= 70
}
