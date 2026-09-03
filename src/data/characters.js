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
    strengthBank: [
      '나는 이런 거 무섭지 않아. 다 들을 준비 됐어',
      '나는... 이런 거 잘 못 하는데. 그래도... 그랬겠다',
      '정확힌 모르겠지만, 이렇게 하면 될 것 같아',
      '말은 서툴어도... 진심은 담을게',
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
      '무서워도, 일단 다가가서 들어볼게',
      '그 마음, 알 것 같아',
      '이게 맞는 방법인진 모르겠지만, 해볼게',
      '예쁘게 말은 못해도, 따뜻하게는 할 수 있어',
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
      '관점 읽는 건 잘 못 하지만... 일단 들어볼게',
      '위로하는 건 어렵지만... 마음은 알겠어',
      '여기가 시작점이야, 이렇게 풀면 돼',
      '매끄럽진 않아도, 방법은 확실해',
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
      '잘 듣는 건 자신 없지만... 그래도 한번 들어볼게',
      '공감이 서툴러도... 진심은 전할 수 있어',
      '해결까진 어렵지만, 방향은 보여',
      '이 말이, 어떻게 가 닿을지 알아',
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
