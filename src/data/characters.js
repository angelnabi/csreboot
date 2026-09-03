import warriorIdle from '../assets/game/warrior_idle.png'
import warriorGood from '../assets/game/warrior_good.png'
import warriorBack from '../assets/game/warrior_back.png'
import healerIdle from '../assets/game/healer_idle.png'
import healerGood from '../assets/game/healer_good.png'
import healerBack from '../assets/game/healer_back.png'
import solverIdle from '../assets/game/solver_idle.png'
import solverGood from '../assets/game/solver_good.png'
import solverBack from '../assets/game/solver_back.png'
import mageIdle from '../assets/game/mage_idle.png'
import mageGood from '../assets/game/mage_good.png'
import mageBack from '../assets/game/mage_back.png'

// stageIndex: 0=관점파악, 1=공감표현, 2=해결책제시, 3=톤앤매너마무리
export const CHARACTERS = [
  {
    id: 'warrior',
    name: '전사',
    subtitle: '흔들리지 않는 자',
    asset: warriorIdle,
    poses: { idle: warriorIdle, good: warriorGood, back: warriorBack },
    color: '#FF9364',
    strengthStage: 0,
    passiveName: '굳은살',
    passiveDesc: '나쁨을 선택해도 균열이 발생하지 않아요',
    previewLine: '어떤 말을 들어도, 난 괜찮아. 그러니 힘든 점을 나눠줘.',
    stats: { perspective: 5, empathy: 3, solution: 3, tone: 2 },
    // strengthBank[stageIndex] = one line per quest (q1, q2, q3, boss) — no two quests
    // ever show the same phrasing for this character at this stage.
    strengthBank: [
      [
        '나는 이런 거 무섭지 않아. 다 들을 준비 됐어',
        '겁먹을 거 없어. 뭐든 말해봐',
        '난 든든하니까, 걱정 말고 얘기해',
        '이 정도로 흔들리지 않아. 편하게 말해',
      ],
      [
        '나는... 이런 거 잘 못 하는데. 그래도... 그랬겠다',
        '위로는 서툴러도... 마음은 알 것 같아',
        '이런 말 잘 못 하지만... 힘들었겠다',
        '잘 표현은 못해도... 그 마음 알겠어',
      ],
      [
        '정확힌 모르겠지만, 이렇게 하면 될 것 같아',
        '확실친 않아도, 한번 해볼게',
        '잘 모르지만... 일단 부딪혀볼게',
        '완벽친 않아도, 시도는 해볼게',
      ],
      [
        '말은 서툴어도... 진심은 담을게',
        '표현은 어설퍼도... 진심이야',
        '말솜씨는 없어도... 마음은 진짜야',
        '서투른 말이지만... 진심으로 하는 말이야',
      ],
    ],
  },
  {
    id: 'healer',
    name: '힐러',
    subtitle: '아픈 자리를 아는 자',
    asset: healerIdle,
    poses: { idle: healerIdle, good: healerGood, back: healerBack },
    color: '#4ADE80',
    strengthStage: 1,
    passiveName: '정화의 손',
    passiveDesc: '좋음 선택 시 회복량 1.5배 + 기존 균열 1스택 자동 제거',
    previewLine: '아픈 마음은 보듬고 안아줘야 나을 수 있어.',
    stats: { perspective: 3, empathy: 5, solution: 2, tone: 3 },
    strengthBank: [
      [
        '무서워도, 일단 다가가서 들어볼게',
        '떨리지만... 가까이 가서 들어볼게',
        '긴장되지만, 일단 다가가볼게',
        '무섭긴 해도, 곁으로 가서 들을게',
      ],
      [
        '그 마음, 알 것 같아',
        '그 아픔, 나도 느껴져',
        '얼마나 힘들었을지, 알 것 같아',
        '그 마음 다 이해해, 여기 있을게',
      ],
      [
        '이게 맞는 방법인진 모르겠지만, 해볼게',
        '정답인진 몰라도, 시도해볼게',
        '확신은 없지만... 해볼게',
        '맞을지 모르겠지만, 일단 해볼게',
      ],
      [
        '예쁘게 말은 못해도, 따뜻하게는 할 수 있어',
        '말주변은 없어도, 따뜻함은 전할게',
        '능숙친 않아도, 진심은 따뜻해',
        '서툴러도, 마음만은 따뜻하게',
      ],
    ],
  },
  {
    id: 'solver',
    name: '해결사',
    subtitle: '실마리를 보는 자',
    asset: solverIdle,
    poses: { idle: solverIdle, good: solverGood, back: solverBack },
    color: '#60A5FA',
    strengthStage: 2,
    passiveName: '실마리 포착',
    passiveDesc: '3단계에서 가장 효과적인 카드에 은은한 힌트가 표시돼요',
    previewLine: '아무리 엉켜 있어도, 시작점은 반드시 있어.',
    stats: { perspective: 3, empathy: 2, solution: 5, tone: 3 },
    strengthBank: [
      [
        '관점 읽는 건 잘 못 하지만... 일단 들어볼게',
        '눈치는 없어도... 일단 들어볼게',
        '상황 파악은 서툴러도, 들어볼게',
        '잘 읽어내진 못해도... 귀 기울여볼게',
      ],
      [
        '위로하는 건 어렵지만... 마음은 알겠어',
        '따뜻한 말은 어려워도... 마음은 알아',
        '위로는 서툴지만, 공감은 돼',
        '말로 달래긴 어려워도... 마음은 이해해',
      ],
      [
        '여기가 시작점이야, 이렇게 풀면 돼',
        '실마리를 찾았어, 이렇게 풀어보자',
        '여기서부터 풀리기 시작할 거야',
        '이 지점이 핵심이야, 이렇게 하면 돼',
      ],
      [
        '매끄럽진 않아도, 방법은 확실해',
        '세련되진 않아도, 확실한 방법이야',
        '말은 투박해도, 방법은 틀림없어',
        '능숙친 않아도, 확실하게 마무리할게',
      ],
    ],
  },
  {
    id: 'mage',
    name: '마술사',
    subtitle: '닿는 법을 아는 자',
    asset: mageIdle,
    poses: { idle: mageIdle, good: mageGood, back: mageBack },
    color: '#FF6600',
    strengthStage: 3,
    passiveName: '정찰의 눈',
    passiveDesc: '4단계에서 카드 선택 시 상대에게 어떻게 들릴지 미리 볼 수 있어요',
    previewLine: '같은 말도, 마음을 담고 표현하기에 달렸어.',
    stats: { perspective: 2, empathy: 3, solution: 3, tone: 5 },
    strengthBank: [
      [
        '잘 듣는 건 자신 없지만... 그래도 한번 들어볼게',
        '듣는 게 서툴러도... 귀 기울여볼게',
        '잘하는 건 아니지만... 들어볼게',
        '능숙친 않아도... 한번 들어볼게',
      ],
      [
        '공감이 서툴러도... 진심은 전할 수 있어',
        '공감은 어려워도... 마음은 전할게',
        '잘 헤아리진 못해도... 진심은 있어',
        '서툰 위로지만... 진심을 담을게',
      ],
      [
        '해결까진 어렵지만, 방향은 보여',
        '완전한 답은 아니어도, 길은 보여',
        '확실친 않아도, 방향은 잡힐 것 같아',
        '다 풀진 못해도, 실마리는 보여',
      ],
      [
        '이 말이, 어떻게 가 닿을지 알아',
        '이 표현이 어떻게 들릴지, 알 것 같아',
        '말에 마음을 담는 법을 알아',
        '어떻게 전해야 닿을지, 느껴져',
      ],
    ],
  },
]

export const STAGE_LABELS = ['관점파악', '공감표현', '해결책제시', '톤앤매너마무리']

export const CARD_LABELS = {
  0: { good: '경청의 자세', normal: '관찰', bad: '일축' },
  1: { good: '공감', normal: '위로', bad: '화제전환' },
  2: { good: '해결의 손길', normal: '완화', bad: '발뺌' },
  3: { good: '진심의 마무리', normal: '정중한 인사', bad: '형식적 인사' },
}

// Order matches the game's quest sequence — used to pick which of the 4
// strengthBank variants a given quest shows for the "good" choice.
export const QUEST_VARIANT_INDEX = { q1: 0, q2: 1, q3: 2, boss: 3 }

export function getGoodLine(character, stageIndex, questId) {
  const variantIndex = QUEST_VARIANT_INDEX[questId] ?? 0
  return character.strengthBank[stageIndex][variantIndex]
}
