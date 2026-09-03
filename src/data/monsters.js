import tutorialIdle from '../assets/game/tutorial_idle.png'
import tutorialAttack from '../assets/game/tutorial_attack.png'
import tutorialDefeat from '../assets/game/tutorial_defeat.png'
import q1Idle from '../assets/game/q1_idle.png'
import q1Attack from '../assets/game/q1_attack.png'
import q1Defeat from '../assets/game/q1_defeat.png'
import q2Idle from '../assets/game/q2_idle.png'
import q2Attack from '../assets/game/q2_attack.png'
import q2Defeat from '../assets/game/q2_defeat.png'
import q3Idle from '../assets/game/q3_idle.png'
import q3Attack from '../assets/game/q3_attack.png'
import q3Defeat from '../assets/game/q3_defeat.png'
import bossIdle from '../assets/game/boss_idle.png'
import bossAttack from '../assets/game/boss_attack.png'
import bossDefeat from '../assets/game/boss_defeat.png'

export const TUTORIAL = {
  id: 'tutorial',
  name: '생채기임프',
  asset: tutorialIdle,
  poses: { idle: tutorialIdle, attack: tutorialAttack, defeat: tutorialDefeat },
  intro: '작고 통통 튀는 형체가 웅얼거린다. "...작은... 건데... 아무도 신경 안 써서..."',
  choices: [
    { type: 'good', label: '다가가 듣기', line: '작은 거라도, 말해줘' },
    { type: 'normal', label: '지나치기', line: '...' },
    { type: 'bad', label: '대충 받아치기', line: '그런 걸로 뭘' },
  ],
  systemLine: '첫 마음을 열었다. 여정이 시작된다.',
}

// each quest stage: { good: {line}, normal: {line}, bad: {line} }, reaction text per choice tier
export const QUESTS = [
  {
    id: 'q1',
    name: '초조고블린',
    asset: q1Idle,
    poses: { idle: q1Idle, attack: q1Attack, defeat: q1Defeat },
    origin: '초조(焦燥)',
    entryText: '뚜벅... 뚜벅... 발소리가 축축한 바닥에 부딪혀 울린다.\n동굴 안쪽 통로, 공기가 점점 무거워진다.\n저 멀리서 규칙적으로 톡, 톡, 톡— 무언가 두드리는 소리가 들려온다.',
    // % position on scene_overworld_map.png the walker travels between as the corridor progresses
    mapPath: { from: [6, 64], to: [28, 45] },
    sideDiscoveries: [
      '바닥에 손톱으로 그은 듯한 짧은 선들이 줄지어 있다. 하루를 세던 흔적 같다.',
      '멈춰버린 낡은 시계가 벽에 걸려 있다. 오래전에 시간이 멈춘 듯하다.',
    ],
    deadEndLines: [
      '두드리는 소리만 더 크게 울릴 뿐, 길은 없다.',
      '벽을 따라가 봐도 제자리로 돌아온다.',
    ],
    encounterText: '"...왜 이렇게 늦어... 나는... 계속 기다렸는데..."',
    easterEgg: {
      prompt: '녹슨 자물쇠 문이 보인다.',
      openLabel: '문을 딴다',
      openResult: '박쥐 떼가 쏟아진다! 벽에 낙서가 보인다 — "여기, 아무도 오지 않았다"',
      hint: '낙서 옆에 작은 손톱자국이 촘촘히 새겨져 있다. 세어보니... 마흔일곱 개. 매일 하나씩, 무언가를 기다리며 새긴 걸까?',
      skipLabel: '지나친다',
    },
    stages: [
      {
        good: '무슨 일이 있었는지, 나한테 말해줄래?',
        normal: '일단 무슨 상황인지부터 살펴볼게',
        bad: '설명은 됐고, 일단 처리하자',
        reactionGood: '두드림이 눈에 띄게 느려진다',
        reactionNormal: '두드림이 살짝 잦아든다',
        reactionBad: '두드림이 심해지고 몸이 떨린다',
      },
      {
        good: '그렇게 기다렸는데 아무 말도 없었으면, 나라도 화났을 거야',
        normal: '그래, 힘들었겠네',
        bad: '알았어 알았어. 그건 그렇고',
        reactionGood: '두드림 사이로 훌쩍이는 소리가 섞인다',
        reactionNormal: '두드림이 조금 느려진다',
        reactionBad: '두드림이 심해지고 몸이 떨린다',
      },
      {
        good: '내가 지금 바로 나서서, 가장 빠르게 해결해볼게',
        normal: '곧 괜찮아질 거야',
        bad: '조금만 더 기다려봐',
        badNote: '(또 기다리게 함)',
        reactionGood: '두드림이 완전히 멈춘다 — 임팩트!',
        reactionNormal: '두드림이 느려진다',
        reactionBad: '두드림이 심해지고 몸이 떨린다',
      },
      {
        good: '기다려줘서 고마워, 앞으로는 이렇게 두지 않을게',
        normal: '고생했어, 이제 가도 돼',
        bad: '그래, 다음에 보자',
        reactionGood: '따뜻한 빛으로 부드럽게 흩어진다',
        reactionNormal: '옅은 빛으로 흩어진다',
        reactionBad: '흐려지며 사라진다',
      },
    ],
    completionText: '...고마워',
  },
  {
    id: 'q2',
    name: '메아리오크',
    asset: q2Idle,
    poses: { idle: q2Idle, attack: q2Attack, defeat: q2Defeat },
    origin: '메아리(반복 되울림)',
    entryText: '조금 더 걸어 들어가자, 통로가 점점 좁아진다.\n발끝에 차가운 물웅덩이가 밟힌다.\n그리고, 벽에 부딪혀 되돌아오는 목소리가 들린다 — 같은 말이 자꾸만 반복된다.',
    mapPath: { from: [28, 45], to: [43, 40] },
    sideDiscoveries: [
      '벽에 귀를 대보니, 아주 희미하게 같은 말이 계속 맴돈다.',
      '누군가 새겨놓은 글씨 — "내 말 좀 들어줘" — 여러 번 덧새겨져 있다.',
    ],
    deadEndLines: [
      '물웅덩이만 발끝에 차갑게 닿을 뿐이다.',
      '같은 메아리가 이쪽에서도 되돌아온다.',
    ],
    encounterText: '"...왜... 왜... 왜..." — 같은 말이 반복되고, 입가에서 조각난 파편이 흩어진다.',
    easterEgg: {
      prompt: '금이 간 거울이 놓여 있다.',
      openLabel: '만진다',
      openResult: '거울 속 얼굴이 잠깐 다르게 비친다.',
      hint: '분명 내 얼굴인데, 어딘가 낯설다. 이 동굴에서는... 다들 이런 걸 보게 되는 걸까?',
      skipLabel: '지나친다',
    },
    stages: [
      {
        good: '무엇이 반복되고 있었는지, 말해줄래?',
        normal: '알겠어, 알겠어',
        bad: '일단 진정해',
        reactionGood: '반복문이 처음으로 깨지고, 다른 단어가 하나 섞인다',
        reactionNormal: '조금 진정한다',
        reactionBad: '같은 말을 더 크게 반복한다',
      },
      {
        good: '억울했다는 거, 지금 알았어',
        normal: '그랬구나...',
        bad: '그니까 아까 말한 그거지?',
        badNote: '(제대로 안 들음)',
        reactionGood: '목소리가 조금 더 또렷해진다',
        reactionNormal: '고개를 끄덕인다',
        reactionBad: '다시 처음부터 반복한다',
      },
      {
        good: '내가 제대로 알아보고, 다시는 이런 일 없게 바로잡을게',
        normal: '다음엔 다를 거야',
        bad: '그건 나도 잘 몰라서, 다른 애한테 다시 물어봐',
        badNote: '(또 반복시킴)',
        reactionGood: '문장이 점점 완전해진다',
        reactionNormal: '조용히 듣는다',
        reactionBad: '메아리가 다시 커진다',
      },
      {
        good: '말해줘서 고마워, 이제 제대로 들었어',
        normal: '알겠어, 신경 쓸게',
        bad: '다음에 또 얘기하자',
        badNote: '(또 말하게 만듦)',
        reactionGood: '완전한 문장으로 흩어진다',
        reactionNormal: '옅게 흩어진다',
        reactionBad: '흐려지며 사라진다',
      },
    ],
    completionText: '...고마워, 이제 알겠어',
  },
  {
    id: 'q3',
    name: '굴레트롤',
    asset: q3Idle,
    poses: { idle: q3Idle, attack: q3Attack, defeat: q3Defeat },
    origin: '굴레(속박, 제자리 맴돌기)',
    entryText: '통로가 아래로 이어진다. 어딘가에서 쇠사슬이 끌리는 소리가 들린다.\n한 걸음씩 내디딜 때마다, 소리는 점점 가까워진다.\n곧, 사슬로 스스로를 옭아맨 무언가가 제자리를 맴도는 모습이 보인다.',
    mapPath: { from: [43, 40], to: [63, 20] },
    sideDiscoveries: [
      '여러 겹으로 겹쳐 쓰인 이름들이 보인다. 다들 이 일에서 발을 뺀 듯하다.',
      '사슬 끝에 작은 팻말이 매달려 있다 — "내 담당 아님"',
    ],
    deadEndLines: [
      '쇠사슬 끌리는 소리만 더 가까워질 뿐이다.',
      '발이 자꾸 제자리로 되돌아오는 것 같다.',
    ],
    encounterText: '"또... 또 누구야... 또 떠넘기려고..."',
    easterEgg: {
      prompt: '낙서투성이 지도조각이 떨어져 있다.',
      openLabel: '줍는다',
      openResult: '"무슨 소용이야" — 바로 버려버린다.',
      hint: '버려진 지도 구석에 글씨가 언뜻 보였다 — "출구는, 아마" — 그 뒤는 찢겨 나가고 없다.',
      skipLabel: '무시',
    },
    trap: {
      stageIndex: 0,
      trapLabel: '경청 공격',
      trapLine: '괜찮아, 내가 다 들어줄게',
      trapResult: '⚠️ 함정! 트롤이 놀라 반격한다',
      trapCrackStacks: 2,
      safeLabel: '거리 두고 지켜보기',
      safeLine: '무슨 일인지, 여기서 지켜볼게',
      safeResult: '안전하다. 사슬이 살짝 느슨해진다',
      badLabel: '베기',
      badLine: '...',
      badResult: '사슬이 거칠게 흔들리며 반격한다',
    },
    stages: [
      null, // stage 0 handled by trap config above
      {
        good: '이리저리 밀려다닌 거, 답답했겠다',
        normal: '고생했겠다',
        bad: '그건 나도 잘 모르는 부분이라',
        badNote: '(발뺌)',
        reactionGood: '사슬이 조금 흔들린다',
        reactionNormal: '가만히 듣는다',
        reactionBad: '다시 맴돌기 시작한다',
      },
      {
        good: '내가 직접 끝까지 데려다줄게, 더는 안 돌게',
        normal: '곧 나아질 거야',
        bad: '그건 다른 애한테 물어봐',
        badNote: '(또 떠넘김, 반격 트리거)',
        reactionGood: '사슬 한 겹이 풀린다 — 큰 임팩트!',
        reactionNormal: '조금씩 멈춰선다',
        reactionBad: '다시 맴돌며 반격한다',
      },
      {
        good: '이제 그만 맴돌아도 돼, 고생 많았어',
        normal: '잘 해결됐으면 좋겠다',
        bad: '나도 어쩔 수 없어서',
        badNote: '(책임 회피)',
        reactionGood: '사슬이 모두 풀리며 흩어진다',
        reactionNormal: '옅게 흩어진다',
        reactionBad: '흐려지며 사라진다',
      },
    ],
    completionText: '...고마워, 이제 그만 맴돌아도 되겠다',
  },
]

export const BOSS = {
  id: 'boss',
  name: '잔향마왕',
  asset: bossIdle,
  poses: { idle: bossIdle, attack: bossAttack, defeat: bossDefeat },
  origin: '잔향(殘響, 사라지지 않는 울림)',
  entryText: '가장 깊은 곳. 공기마저 멈춘 듯 고요하다.\n여러 겹의 흐릿한 형체가 겹쳐 보인다 — 앞서 만난 셋의 잔상이 그 위로 스친다.',
  mapPath: { from: [63, 20], to: [85, 15] },
  sideDiscoveries: [
    '여러 목소리가 겹쳐 들리다가, 한 목소리로 잦아든다.',
    '바닥에 흩어진 발자국들이 모두 같은 곳에서 시작된 것 같다.',
  ],
  deadEndLines: [
    '고요함만 더 짙어질 뿐, 길은 없다.',
    '공기가 무겁게 가라앉을 뿐이다.',
  ],
  encounterText: '"...나는... 몇 번이나... 여기 있었는데..."',
  easterEgg: {
    prompt: '희미하게 빛나는 돌이 놓여 있다.',
    openLabel: '만진다',
    openResult: '화면이 흔들리며 — "...아직은, 때가 아니다" — 원래 자리로 돌아온다.',
    hint: '돌 표면에 무언가 새겨져 있던 흔적이 있다. 이름 같기도 한데, 다시 보니 아무것도 읽히지 않는다.',
    skipLabel: '지나친다',
  },
  trap: {
    stageIndex: 0,
    trapLabel: '경청 공격',
    trapLine: '괜찮아, 내가 다 들어줄게',
    trapResult: '⚠️ 가장 방어적인 존재, 크게 튕겨낸다',
    trapCrackStacks: 3,
    safeLabel: '조심스럽게 거리 유지하며 다가가기',
    safeLine: '천천히 다가갈게, 준비되면 말해줘',
    safeResult: '안전하다. 형체가 조금 잦아든다',
    badLabel: '베기',
    badLine: '...',
    badResult: '형체가 크게 흐트러지며 반격한다',
  },
  stages: [
    null,
    {
      good: '몇 번이나 그랬다는 거, 이제라도 알았어',
      goodNote: '(앞선 셋의 잔상이 스치는 연출, 복선 강화)',
      normal: '그랬구나',
      bad: '이번이 처음 듣는 얘기라서',
      badNote: '(누적 무시)',
      reactionGood: '형체가 조금 또렷해진다',
      reactionNormal: '가만히 듣는다',
      reactionBad: '흐트러지며 반격한다',
    },
    {
      good: '이번 한 번이 아니라 계속 반복됐던 거잖아, 이제 제대로 짚어볼게',
      normal: '이번엔 다르게 해볼게',
      bad: '이런 건 원래 어쩔 수 없는 부분이라',
      badNote: '(체념 유도)',
      reactionGood: '겹쳐 있던 형체가 하나로 모이기 시작한다',
      reactionNormal: '조금씩 진정한다',
      reactionBad: '다시 흩어지며 반격한다',
    },
    {
      good: '그동안 몇 번이고 놓쳤던 거, 이제라도 제대로 봤어. 고마워, 말해줘서',
      normal: '이제라도 알아서 다행이야',
      bad: '그래, 좋은 하루 보내',
      badNote: '(무심한 작별)',
      reactionGood: '빛과 함께 하나의 얼굴로 흩어진다',
      reactionNormal: '옅게 흩어진다',
      reactionBad: '흐려지며 사라진다',
    },
  ],
  completionText: null, // handled by dedicated ending scene
}

export const ENDING_SCENE = `잔향마왕이 흩어지며, 빛 속에 생채기임프·초조고블린·메아리오크·굴레트롤의 잔상이 차례로 스쳐 하나로 겹쳐진다.

돌아보면, 흔적은 늘 있었다 — 문 옆에 촘촘히 새겨진 마흔일곱 개의 자국, 낯설게 비치던 거울 속 얼굴, 찢겨나간 지도 위 "출구는, 아마"라는 글씨, 이름마저 지워진 돌 하나까지. 전부 같은 사람이, 같은 방식으로 남긴 흔적이었다.

마침내 남는 건 한 사람의 온전한 얼굴 — 특별할 것 없는, 평범한 얼굴. 처음으로 눈을 마주치며, 옅게 웃는다.
"나는... 그냥, 누군가 나를 제대로 봐주기를 바랐던 사람이야."
그 미소를 남긴 채, 빛과 함께 조용히 사라진다. 동굴에 빛이 번지고, 사라졌던 이들의 흔적이 하나씩 돌아온다.`

export const TRUE_ENDING = {
  text: '동굴에 온기가 돌아온다. 사라졌던 이들의 목소리가, 저 멀리서 다시 들려오기 시작한다.',
  label: '당신은 마음을 들었다',
}

export const INCOMPLETE_ENDING = {
  text: '몬스터는 사라졌지만, 동굴은 여전히 어둡다. 무언가 놓친 기분이 든다.',
  label: '당신은 문제를 처리했다. 하지만...',
}
