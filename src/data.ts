export type AxisCode = 'EI' | 'SN' | 'TF' | 'JP'
export type PreferenceSide = 'first' | 'second'
export type ResponseValue = -3 | -2 | -1 | 0 | 1 | 2 | 3
export type TypeCode = `${'E' | 'I'}${'S' | 'N'}${'T' | 'F'}${'J' | 'P'}`

export interface Question {
  id: number
  axis: AxisCode
  prompt: string
  note: string
  polarity: PreferenceSide
}

export interface AxisMeta {
  code: AxisCode
  title: string
  first: string
  second: string
  firstLabel: string
  secondLabel: string
  firstDescription: string
  secondDescription: string
  color: string
}

export const axisMeta: Record<AxisCode, AxisMeta> = {
  EI: {
    code: 'EI',
    title: 'エネルギーの向き',
    first: 'E',
    second: 'I',
    firstLabel: '外界から充電',
    secondLabel: '内側から充電',
    firstDescription: '人や場とのやり取りを通して考えが動きやすい',
    secondDescription: '一人の時間で考えを深めると力を取り戻しやすい',
    color: '#d86755',
  },
  SN: {
    code: 'SN',
    title: '情報の受け取り方',
    first: 'S',
    second: 'N',
    firstLabel: '事実・実感',
    secondLabel: '可能性・意味',
    firstDescription: '具体的な事実や経験を手がかりに理解しやすい',
    secondDescription: '背景にある意味やこれからの可能性を手がかりにしやすい',
    color: '#7a8c69',
  },
  TF: {
    code: 'TF',
    title: '判断のよりどころ',
    first: 'T',
    second: 'F',
    firstLabel: '筋道・整合性',
    secondLabel: '価値観・調和',
    firstDescription: '基準や論理の一貫性から判断を組み立てやすい',
    secondDescription: '人の事情や大切にしたい価値から判断を組み立てやすい',
    color: '#3c4c8a',
  },
  JP: {
    code: 'JP',
    title: '進め方のリズム',
    first: 'J',
    second: 'P',
    firstLabel: '見通し・決定',
    secondLabel: '余白・探索',
    firstDescription: '見通しを立て、決めた状態で進むと落ち着きやすい',
    secondDescription: '選択肢を開いたまま、状況に合わせて進むと自然に力が出やすい',
    color: '#e1ab38',
  },
}

export const responseOptions: Array<{ value: ResponseValue; label: string; compact: string }> = [
  { value: 3, label: '強くそう思う', compact: '強く' },
  { value: 2, label: 'そう思う', compact: 'そう思う' },
  { value: 1, label: 'ややそう思う', compact: 'やや' },
  { value: 0, label: 'どちらともいえない', compact: '中立' },
  { value: -1, label: 'やや違う', compact: 'やや違う' },
  { value: -2, label: '違う', compact: '違う' },
  { value: -3, label: 'まったく違う', compact: 'まったく' },
]

// 1つの軸につき8問、両方向の文章を4問ずつ配置したオリジナル項目です。
const questionBank: Question[] = [
  { id: 1, axis: 'EI', polarity: 'first', prompt: '人と話した後、気分や考えが整理されていることが多い。', note: '人とのやり取りと、自分の思考の動きについて', },
  { id: 2, axis: 'EI', polarity: 'first', prompt: '新しい集まりでは、自分から会話のきっかけを作るほうだ。', note: '初対面の場での自然な動きについて', },
  { id: 3, axis: 'EI', polarity: 'first', prompt: '考えを声に出しながら整理することが多い。', note: '考えをまとめるときの順番について', },
  { id: 4, axis: 'EI', polarity: 'first', prompt: '予定のない休日でも、誰かと会うと元気が戻る。', note: '気力が回復するきっかけについて', },
  { id: 5, axis: 'EI', polarity: 'second', prompt: '大人数の場では、話す前に周囲を観察する時間が必要だ。', note: '大人数の場での居心地について', },
  { id: 6, axis: 'EI', polarity: 'second', prompt: '興味深い話でも、まず一人で考えてから共有したい。', note: '考えを人に伝えるタイミングについて', },
  { id: 7, axis: 'EI', polarity: 'second', prompt: '知らない人の多い場の後は、一人の時間が欲しくなる。', note: '場を離れた後の回復方法について', },
  { id: 8, axis: 'EI', polarity: 'second', prompt: '自分の考えは、文章や頭の中でまとめると伝えやすい。', note: '表現を組み立てる方法について', },
  { id: 9, axis: 'SN', polarity: 'first', prompt: '説明を読むとき、まず具体例や手順に注目する。', note: '情報を理解するときの入り口について', },
  { id: 10, axis: 'SN', polarity: 'first', prompt: '経験のある方法を少しずつ改善するのが得意だ。', note: '慣れた方法と新しい方法の扱いについて', },
  { id: 11, axis: 'SN', polarity: 'first', prompt: '今使える情報をもとに、現実的な結論を出す。', note: '判断を具体化するときの手がかりについて', },
  { id: 12, axis: 'SN', polarity: 'first', prompt: '話の中の事実関係や細部の違いによく気づく。', note: '会話や資料から拾う情報について', },
  { id: 13, axis: 'SN', polarity: 'second', prompt: '目の前の事実から、まだ形のない可能性を考えるのが好きだ。', note: '事実を広げて考えるときの方向について', },
  { id: 14, axis: 'SN', polarity: 'second', prompt: '一つの出来事から、全体の流れや意味を想像する。', note: '出来事を文脈に置くときの見方について', },
  { id: 15, axis: 'SN', polarity: 'second', prompt: '既存の枠にないやり方を試すと、発想が広がる。', note: '発想を広げる方法について', },
  { id: 16, axis: 'SN', polarity: 'second', prompt: '将来の理想像を思い描くと、今の行動が決めやすい。', note: '今の選択と未来のイメージについて', },
  { id: 17, axis: 'TF', polarity: 'first', prompt: '判断するとき、筋が通っているかを最初に確認する。', note: '判断を始めるときの基準について', },
  { id: 18, axis: 'TF', polarity: 'first', prompt: '問題が起きたら、感情より原因と解決策を整理する。', note: 'トラブルへの向き合い方について', },
  { id: 19, axis: 'TF', polarity: 'first', prompt: '誰に対しても同じ基準を適用することが公平だと思う。', note: '公平さの考え方について', },
  { id: 20, axis: 'TF', polarity: 'first', prompt: '率直な指摘でも、改善につながるなら伝えるほうだ。', note: 'フィードバックを伝えるときの優先順位について', },
  { id: 21, axis: 'TF', polarity: 'second', prompt: '決める前に、関係する人の気持ちや事情を想像する。', note: '決定前に確認することについて', },
  { id: 22, axis: 'TF', polarity: 'second', prompt: '意見が違っても、相手の大切にしていることを理解したい。', note: '意見の違いへの向き合い方について', },
  { id: 23, axis: 'TF', polarity: 'second', prompt: '正しさだけでなく、場の雰囲気を守ることも重要だ。', note: '結論と関係性のバランスについて', },
  { id: 24, axis: 'TF', polarity: 'second', prompt: '励ますときは、解決策よりもまず気持ちを受け止める。', note: '人を支えるときの自然な反応について', },
  { id: 25, axis: 'JP', polarity: 'first', prompt: '締め切りや予定は、前もって決めておくと安心する。', note: '時間の見通しについて', },
  { id: 26, axis: 'JP', polarity: 'first', prompt: '旅行や外出は、行程をある程度組んでから出発したい。', note: '外出前の準備について', },
  { id: 27, axis: 'JP', polarity: 'first', prompt: '作業は一つずつ終わらせてから次に進みたい。', note: '作業の進め方について', },
  { id: 28, axis: 'JP', polarity: 'first', prompt: '選択肢を早めに絞ると、集中しやすい。', note: '決めることと集中の関係について', },
  { id: 29, axis: 'JP', polarity: 'second', prompt: '予定は余白を残して、その場の流れで決めたい。', note: '予定と余白の取り方について', },
  { id: 30, axis: 'JP', polarity: 'second', prompt: '途中で面白い情報が入ったら、計画を変えるのが楽しい。', note: '途中の発見と計画変更について', },
  { id: 31, axis: 'JP', polarity: 'second', prompt: '締め切りが近づくと集中力が上がることが多い。', note: '時間の制約と集中について', },
  { id: 32, axis: 'JP', polarity: 'second', prompt: '複数の作業を行き来しながら進めるほうが自然だ。', note: '作業を切り替える感覚について', },
]

// 同じ軸の設問が連続しないように並べ替え、回答者が軸を推測して答えを作りにくくする。
const questionOrder = [
  1, 9, 17, 25,
  2, 10, 18, 26,
  3, 11, 19, 27,
  4, 12, 20, 28,
  5, 13, 21, 29,
  6, 14, 22, 30,
  7, 15, 23, 31,
  8, 16, 24, 32,
]

export const questions: Question[] = questionOrder.map((id) => questionBank.find((question) => question.id === id)!).filter(Boolean)

export interface TypeProfile {
  name: string
  summary: string
  detail: string
  strengths: string[]
  care: string
}

export const typeProfiles: Record<TypeCode, TypeProfile> = {
  ESTJ: { name: '整えて動かす人', summary: '目的を現実の段取りに変え、周囲と前へ進めるタイプ。', detail: '見通しと役割を整えることで、チームの力を安定して引き出します。', strengths: ['決めたことを実行に移す', '役割と手順を明確にする', '現実的な判断を積み重ねる'], care: '速さや正しさを求めるときほど、相手のペースを確認すると強みが伝わります。' },
  ESTP: { name: '現場を動かす人', summary: '状況を素早くつかみ、今ある選択肢から最善手を選ぶタイプ。', detail: '変化のある現場でも、観察力と行動力を使って流れをつくります。', strengths: ['状況を見て即座に動く', '実用的な工夫を見つける', '人を巻き込みながら試す'], care: '新しい刺激に惹かれたときほど、後から効く確認や記録を少し残すと安心です。' },
  ESFJ: { name: '場をつなぐ人', summary: '具体的な気配りで、人が安心して関われる場を育てるタイプ。', detail: '相手の変化によく気づき、必要な支えを実際の行動に変えます。', strengths: ['周囲のニーズを察知する', '協力しやすい環境を整える', '約束や役割を丁寧に守る'], care: '周囲を優先し続けず、自分が本当に望んでいることも同じように扱ってください。' },
  ESFP: { name: '今をひらく人', summary: 'その場の空気を明るくし、体験を通して人とつながるタイプ。', detail: '目の前の人や出来事への感度が高く、楽しさを周囲へ自然に広げます。', strengths: ['場に合わせて柔軟に動く', '人の良さを見つけて伝える', '体験から学びを得る'], care: '気持ちが動く選択に加えて、明日の自分を助ける小さな準備も味方になります。' },
  ENTJ: { name: '道筋を描く人', summary: '大きな目標を構造化し、必要な判断を積み重ねて実現するタイプ。', detail: '複雑な課題も要素に分け、達成までの道筋をはっきりさせます。', strengths: ['目標から逆算して設計する', '判断を先送りせず前に進める', '仕組みを改善して成果を伸ばす'], care: '結論へ急ぐ場面では、まだ言葉になっていない懸念にも一度耳を傾けると視野が広がります。' },
  ENTP: { name: '可能性をひらく人', summary: '問いを立て直し、異なる案を組み合わせて突破口をつくるタイプ。', detail: '既存の前提を軽やかに疑い、議論の中から面白い可能性を引き出します。', strengths: ['前提を見直して発想する', '複数の案を比較できる', '対話を通して案を磨く'], care: 'アイデアを広げる力に、ひとつを仕上げる時間を意識的に組み合わせると成果が残ります。' },
  ENFJ: { name: '人を導く人', summary: '人の可能性を見つけ、共通の方向へ気持ちをそろえていくタイプ。', detail: '相手の成長と全体の調和を見ながら、意味のある行動を促します。', strengths: ['人の良さを言語化する', '共通の目的をつくる', '関係性を育てながら進める'], care: '支える役割を担うほど、自分の負荷を客観的に見積もる習慣が助けになります。' },
  ENFP: { name: '意味を結ぶ人', summary: '人やアイデアのつながりから、まだ見えていない可能性を見つけるタイプ。', detail: '好奇心と共感を使い、自由な発想を人の心が動く形へ育てます。', strengths: ['新しい視点を見つける', '人の内側の願いを感じ取る', '熱量を共有して輪を広げる'], care: '可能性を大切にしながら、今やることを一つに絞る短い区切りも有効です。' },
  ISTJ: { name: '確かに積み上げる人', summary: '事実と約束を大切にし、確実な手順で信頼を積み上げるタイプ。', detail: '細部まで確認し、継続できる仕組みに変えることで安定した成果をつくります。', strengths: ['情報を正確に扱う', '約束を守り続ける', '手順を改善して再現性を高める'], care: '十分な根拠を待つだけでなく、途中の小さな試行を許すと選択肢が増えます。' },
  ISTP: { name: '仕組みを試す人', summary: '物事の仕組みを静かに見抜き、必要なところだけ手を入れるタイプ。', detail: '複雑な状況でも冷静に構造を読み、実際に試して答えを確かめます。', strengths: ['仕組みの問題点を見抜く', '必要最小限の手を動かす', '変化に合わせて方法を変える'], care: '一人で解決できる課題でも、考えていることを短く共有すると協力が得やすくなります。' },
  ISFJ: { name: '日々を支える人', summary: '具体的な気づかいと責任感で、身近な人や場を丁寧に守るタイプ。', detail: 'これまでの経験を活かしながら、相手が安心できる小さな変化をつくります。', strengths: ['細やかな変化に気づく', '継続的に支える', '経験を実際の助けに変える'], care: '頼られることと引き受けることを同一視せず、境界線を置くことも大切です。' },
  ISFP: { name: '感覚を形にする人', summary: '自分の価値観と感覚を大切にし、静かな誠実さで行動するタイプ。', detail: '目の前の状況をよく感じ取り、無理のない方法で人やものをより良くします。', strengths: ['相手の気持ちに寄り添う', '質感や違いを見つける', '自分の価値観を行動で表す'], care: '選択を急いで言葉にできないときは、まず感じていることをメモすると整理しやすくなります。' },
  INTJ: { name: '構想を設計する人', summary: '複雑な情報を長い目で組み立て、理想へ続く設計図を描くタイプ。', detail: '本質的な課題を見つけ、独自の見通しを現実に近づけるための構造をつくります。', strengths: ['長期の構想を描く', '複雑な情報を整理する', '改善の核心を見つける'], care: '完成度の高い構想ほど、途中の理解を周囲とこまめに共有すると実現しやすくなります。' },
  INTP: { name: '原理を探る人', summary: '問いの前提を深く掘り、筋道を組み替えながら理解を広げるタイプ。', detail: '一人で考えを深める時間を使い、物事の背後にある仕組みを明らかにします。', strengths: ['概念を構造化する', '矛盾を見つけて検討する', '独立した視点で考える'], care: '考えが十分に整うのを待ちすぎず、仮説として共有すると新しい材料が集まります。' },
  INFJ: { name: '意味を育てる人', summary: '人の内面と大きな意味を結び、静かな確信を行動へ変えるタイプ。', detail: '表面の出来事の奥にある流れを感じ取り、より良い方向を丁寧に思い描きます。', strengths: ['本質的なパターンを読む', '相手の可能性を信じる', '価値のある方向へ粘り強く進む'], care: '理想を守るためにも、現実的な小さな区切りと休息を予定に含めてください。' },
  INFP: { name: '価値を守る人', summary: '自分の内側にある大切な価値を手がかりに、誠実な可能性を探すタイプ。', detail: '人や物語の意味を深く感じ取り、自分らしい形で世界に返そうとします。', strengths: ['大切な価値を見失わない', '人の痛みや願いを想像する', '独自の表現を育てる'], care: '理想と現実の差を責めるのではなく、今日できる小さな一歩に翻訳すると動きやすくなります。' },
}

export const axisOrder: AxisCode[] = ['EI', 'SN', 'TF', 'JP']
