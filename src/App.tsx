import { useEffect, useState, type ReactNode } from 'react'
import {
  axisMeta,
  axisOrder,
  questions,
  researchSources,
  responseOptions,
  typeInsights,
  typeProfiles,
  type AxisCode,
  type ResponseValue,
  type TypeCode,
} from './data'
import { scoreAnswers, type AnalysisResult, type Answers, type AxisResult } from './engine'

type Screen = 'intro' | 'quiz' | 'result'

function SparkMark() {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 4.5v39M4.5 24h39M10.2 10.2l27.6 27.6M37.8 10.2 10.2 37.8" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
    </svg>
  )
}

function ArrowUpRight({ direction = 'up' }: { direction?: 'up' | 'left' }) {
  return (
    <svg aria-hidden="true" className={`icon icon-${direction}`} viewBox="0 0 20 20" fill="none">
      {direction === 'up' ? (
        <>
          <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <path d="M12.5 4.5 5.5 10l7 5.5M6 10h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20" fill="none">
      <path d="m4.5 10.5 3.6 3.6L15.8 6.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Header({ screen, onHome }: { screen: Screen; onHome: () => void }) {
  const labels: Record<Screen, string> = { intro: 'INTRO', quiz: 'REFLECT', result: 'RESULT' }

  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={onHome} aria-label="16タイプ分析の最初に戻る">
        <SparkMark />
        <span className="brand-copy">
          <strong>16タイプ分析</strong>
          <small>SELF-UNDERSTANDING TOOL</small>
        </span>
      </button>
      <div className="header-status" aria-label={`現在の画面: ${labels[screen]}`}>
        <span className="status-line" />
        <span>{labels[screen]}</span>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>16タイプ分析 / PERSONALITY, IN YOUR OWN WORDS</span>
      <span>回答はこのブラウザ内で処理されます</span>
    </footer>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="intro-layout page-enter">
      <section className="intro-copy">
        <p className="section-index">PERSONALITY / 01</p>
        <h1>
          自分の傾向を、
          <em>ひとつの言葉</em>
          にしない。
        </h1>
        <p className="intro-lead">
          4つの軸から、ふだんの考え方や動き方をゆっくり振り返ります。
          答えに正解はありません。今の自分に近いほうを選んでください。
        </p>
        <button className="primary-button intro-cta" type="button" onClick={onStart}>
          分析をはじめる
          <ArrowUpRight />
        </button>
        <div className="intro-meta" aria-label="分析の概要">
          <div>
            <strong>32</strong>
            <span>questions</span>
          </div>
          <div>
            <strong>04</strong>
            <span>axes</span>
          </div>
          <div>
            <strong>05</strong>
            <span>min approx.</span>
          </div>
        </div>
      </section>

      <aside className="intro-orbit" aria-label="4つの分析軸">
        <div className="orbit-drawing" aria-hidden="true">
          <span className="orbit-dot dot-coral" />
          <span className="orbit-dot dot-indigo" />
          <span className="orbit-dot dot-moss" />
          <span className="orbit-dot dot-yellow" />
          <div className="orbit-ring ring-outer" />
          <div className="orbit-ring ring-inner" />
          <div className="orbit-center">4<br /><small>AXES</small></div>
        </div>
        <div className="orbit-caption">
          <span className="caption-rule" />
          <div>
            <strong>自分を測るより、</strong>
            <span>自分の見方を増やすために。</span>
          </div>
        </div>
        <div className="axis-key">
          {axisOrder.map((axis) => {
            const meta = axisMeta[axis]
            return (
              <div className="axis-key-item" key={axis}>
                <div className="axis-key-heading">
                  <i style={{ backgroundColor: meta.color }} />
                  <b>{meta.first} / {meta.second}</b>
                  <span>{meta.title}</span>
                </div>
                <small>{meta.firstLabel} ↔ {meta.secondLabel}</small>
              </div>
            )
          })}
        </div>
      </aside>

      <section className="intro-notice">
        <span className="notice-number">NOTE</span>
        <p>
          これは公式のMBTI検査ではなく、独自に設計した16タイプ分析です。医療・心理検査・採用判断の代わりには使用しないでください。
        </p>
      </section>
    </main>
  )
}

function AxisProgress({ axis, answers, currentAxis }: { axis: AxisCode; answers: Answers; currentAxis: AxisCode }) {
  const axisQuestions = questions.filter((question) => question.axis === axis)
  const answered = axisQuestions.filter((question) => answers[question.id] !== undefined).length
  const meta = axisMeta[axis]
  const isCurrent = axis === currentAxis

  return (
    <div className={`axis-progress ${isCurrent ? 'is-current' : ''}`}>
      <div className="axis-progress-topline">
        <span className="axis-progress-code" style={{ color: meta.color }}>{meta.first}/{meta.second}</span>
        <span>{answered.toString().padStart(2, '0')} / 08</span>
      </div>
      <div className="axis-progress-track" aria-hidden="true">
        <span style={{ width: `${(answered / axisQuestions.length) * 100}%`, backgroundColor: meta.color }} />
      </div>
      <span className="axis-progress-title">{meta.title}</span>
    </div>
  )
}

function QuizScreen({
  answers,
  currentIndex,
  validation,
  onSelect,
  onBack,
  onNext,
}: {
  answers: Answers
  currentIndex: number
  validation: string
  onSelect: (value: ResponseValue) => void
  onBack: () => void
  onNext: () => void
}) {
  const currentQuestion = questions[currentIndex]
  const meta = axisMeta[currentQuestion.axis]
  const currentAnswer = answers[currentQuestion.id]
  const completion = Math.round(((currentIndex + (currentAnswer !== undefined ? 1 : 0)) / questions.length) * 100)
  const isLast = currentIndex === questions.length - 1

  return (
    <main className="quiz-layout page-enter">
      <aside className="quiz-rail">
        <div className="quiz-rail-heading">
          <span>REFLECTION LOG</span>
          <strong>{(currentIndex + 1).toString().padStart(2, '0')} <small>/ {questions.length.toString().padStart(2, '0')}</small></strong>
        </div>
        <div className="overall-progress" aria-label={`全体の進捗 ${completion}%`}>
          <div className="overall-progress-label"><span>PROGRESS</span><strong>{completion}%</strong></div>
          <div className="overall-progress-track"><span style={{ width: `${completion}%` }} /></div>
        </div>
        <div className="axis-progress-list" aria-label="軸ごとの回答状況">
          {axisOrder.map((axis) => <AxisProgress key={axis} axis={axis} answers={answers} currentAxis={currentQuestion.axis} />)}
        </div>
        <div className="rail-footnote">
          <span className="mini-cross" aria-hidden="true">+</span>
          <p>迷ったときは、理想の自分ではなく、最近の自分を思い出してみてください。</p>
        </div>
      </aside>

      <section className="question-panel" aria-labelledby="question-title">
        <div className="question-panel-topline">
          <span className="axis-tag" style={{ color: meta.color }}><i style={{ backgroundColor: meta.color }} />{meta.first} / {meta.second} · {meta.title}</span>
          <span className="question-count">QUESTION {(currentIndex + 1).toString().padStart(2, '0')}</span>
        </div>
        <div className="question-copy">
          <h1 id="question-title">{currentQuestion.prompt}</h1>
          <p>{currentQuestion.note}</p>
        </div>

        <fieldset className="response-fieldset">
          <legend>どのくらい当てはまりますか？</legend>
          <div className="response-scale-labels" aria-hidden="true">
            <span>当てはまる</span>
            <span>当てはまらない</span>
          </div>
          <div className="response-options">
            {responseOptions.map((option) => {
              const id = `question-${currentQuestion.id}-${option.value}`
              return (
                <label className={`response-option ${currentAnswer === option.value ? 'is-selected' : ''}`} key={option.value} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={() => onSelect(option.value)}
                  />
                  <span className="response-dot" aria-hidden="true" />
                  <span className="response-label">{option.label}</span>
                </label>
              )
            })}
          </div>
          <div className="response-scale-axis" aria-hidden="true"><span>強く</span><span>中立</span><span>強く</span></div>
        </fieldset>

        <div className="question-feedback" aria-live="polite">
          {validation && <span className="validation-message">{validation}</span>}
        </div>

        <div className="question-actions">
          <button className="text-button" type="button" onClick={onBack}>
            <ArrowUpRight direction="left" />
            戻る
          </button>
          <button className="primary-button" type="button" onClick={onNext}>
            {isLast ? '結果を見る' : '次の設問へ'}
            <ArrowUpRight />
          </button>
        </div>
        <p className="question-privacy"><span aria-hidden="true">⌁</span> 回答はこのページから外へ送信されません</p>
      </section>
    </main>
  )
}

function AxisResultCard({ result }: { result: AxisResult }) {
  const meta = axisMeta[result.code]
  const firstIsWinner = result.winner === 'first'
  const secondIsWinner = result.winner === 'second'
  const winnerText = result.winner === 'tie'
    ? 'この軸は拮抗しています'
    : result.confidence === '拮抗'
      ? `${result.winner === 'first' ? result.first : result.second}寄りですが拮抗`
      : `${result.winner === 'first' ? result.first : result.second}側に${result.confidence}`

  return (
    <article className="axis-result-card">
      <div className="axis-result-heading">
        <div>
          <span className="axis-result-code" style={{ color: result.color }}>{result.first} / {result.second}</span>
          <h3>{result.title}</h3>
        </div>
        <span className="axis-result-status">{winnerText}</span>
      </div>
      <div className="axis-meter" aria-label={`${result.first} ${result.firstPercent}%、${result.second} ${100 - result.firstPercent}%`}>
        <span className="axis-meter-fill" style={{ width: `${result.firstPercent}%`, backgroundColor: result.color }} />
        <span className="axis-meter-mark" style={{ left: `${result.firstPercent}%`, borderColor: result.color }} />
      </div>
      <div className="axis-result-ends">
        <span className={firstIsWinner ? 'is-winner' : ''}><b>{result.first}</b> {result.firstLabel}</span>
        <span className={secondIsWinner ? 'is-winner' : ''}>{result.secondLabel} <b>{result.second}</b></span>
      </div>
      <div className="axis-result-descriptions">
        <div>
          <strong>{meta.first} / {meta.firstLabel}</strong>
          <p>{meta.firstDescription}</p>
        </div>
        <div>
          <strong>{meta.second} / {meta.secondLabel}</strong>
          <p>{meta.secondDescription}</p>
        </div>
      </div>
    </article>
  )
}

const typeCodes = Object.keys(typeProfiles) as TypeCode[]
const compatibilityAxes = [
  { index: 0, label: 'エネルギー' },
  { index: 3, label: '進め方' },
]

function getCompatibilityCandidates(type: TypeCode): TypeCode[] {
  return typeCodes
    .filter((candidate) => candidate !== type && candidate[1] === type[1] && candidate[2] === type[2])
    .sort((left, right) => {
      const leftDifference = Number(left[0] !== type[0]) + Number(left[3] !== type[3])
      const rightDifference = Number(right[0] !== type[0]) + Number(right[3] !== type[3])
      return rightDifference - leftDifference || left.localeCompare(right)
    })
}

function compatibilityReason(type: TypeCode, candidate: TypeCode): string {
  const shared = [
    type[1] === candidate[1] ? '情報の受け取り方' : '',
    type[2] === candidate[2] ? '判断のよりどころ' : '',
  ].filter(Boolean)
  const different = compatibilityAxes
    .filter(({ index }) => type[index] !== candidate[index])
    .map(({ label }) => label)

  return `${shared.join('・')}が近く、${different.length ? `${different.join('・')}の違いが役割分担や新しい視点につながりやすい` : '自然なペースを共有しやすい'}候補です。`
}

function TypeGuide({ analysis }: { analysis: AnalysisResult }) {
  const insight = typeInsights[analysis.type]
  const candidates = getCompatibilityCandidates(analysis.type)

  return (
    <section className="type-guide">
      <div className="profile-detail-heading">
        <span className="section-index">03 / TYPE GUIDE</span>
        <h2>このタイプを、日常の言葉にすると</h2>
      </div>
      <div className="type-guide-body">
        <div className="type-keywords" aria-label="このタイプのキーワード">
          {insight.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
        <div className="insight-grid">
          <div className="insight-card">
            <span className="detail-label">力が出やすい場面</span>
            <p>{insight.workStyle}</p>
          </div>
          <div className="insight-card">
            <span className="detail-label">人との関わり方</span>
            <p>{insight.communication}</p>
          </div>
          <div className="insight-card insight-card-wide">
            <span className="detail-label">伸びしろとして意識すること</span>
            <p>{insight.growth}</p>
          </div>
        </div>

        <div className="compatibility-panel">
          <div className="compatibility-heading">
            <div>
              <span className="detail-label">RELATIONSHIPS / REFERENCE</span>
              <h3>相性が良い候補</h3>
            </div>
            <span className="compatibility-mark" aria-hidden="true">↗</span>
          </div>
          <p className="compatibility-intro">
            「合う・合わない」を決めるものではなく、共通点を土台に違いを活かしやすいタイプを表示しています。
          </p>
          <div className="compatibility-grid">
            {candidates.map((candidate) => (
              <article className="compatibility-card" key={candidate}>
                <div className="compatibility-type-line">
                  <strong>{candidate}</strong>
                  <span>{typeProfiles[candidate].name}</span>
                </div>
                <p>{compatibilityReason(analysis.type, candidate)}</p>
              </article>
            ))}
          </div>
          <p className="compatibility-note">タイプの組み合わせに「最良の正解」はありません。実際の相性は、尊重・対話・状況によって変わります。</p>
        </div>
      </div>
    </section>
  )
}

function AnswerReview({ answers }: { answers: Answers }) {
  return (
    <section className="answer-review">
      <div className="profile-detail-heading">
        <span className="section-index">04 / YOUR ANSWERS</span>
        <h2>32問の回答一覧</h2>
      </div>
      <p className="answer-review-intro">今回の回答と、それぞれの軸でどちら側に反映されたかを確認できます。</p>
      <div className="answer-review-list">
        {questions.map((question, index) => {
          const meta = axisMeta[question.axis]
          const value = answers[question.id] ?? 0
          const option = responseOptions.find((item) => item.value === value)
          const orientedValue = question.polarity === 'first' ? value : -value
          const preference = orientedValue === 0
            ? '中立'
            : orientedValue > 0
              ? `${meta.first}・${meta.firstLabel}`
              : `${meta.second}・${meta.secondLabel}`

          return (
            <article className="answer-review-item" key={question.id}>
              <span className="answer-review-number">Q{(index + 1).toString().padStart(2, '0')}</span>
              <div className="answer-review-main">
                <div className="answer-review-meta">
                  <span style={{ color: meta.color }}>{meta.first} / {meta.second} · {meta.title}</span>
                  <strong>{option?.label ?? '中立'}</strong>
                </div>
                <p>{question.prompt}</p>
                <small>{preference}</small>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ResearchNotes() {
  return (
    <section className="result-sources">
      <div>
        <span className="section-index">05 / REFERENCE</span>
        <h2>このページの考え方</h2>
      </div>
      <div>
        <p>4つの軸の説明とタイプ解説は、MBTI公式サイトの公開情報を参考に、この自己理解ツール向けに再構成しています。ここでの結果は公式検査ではありません。</p>
        <ul>
          {researchSources.map((source) => (
            <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight /></a></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ResultScreen({ analysis, answers, onRestart }: { analysis: AnalysisResult; answers: Answers; onRestart: () => void }) {
  const profile = typeProfiles[analysis.type]

  return (
    <main className="result-layout page-enter">
      <section className="result-hero">
        <div className="result-hero-topline"><span>YOUR CURRENT OUTLINE</span><span>16 TYPE ANALYSIS</span></div>
        <div className="result-stamp" aria-label={`推定タイプ ${analysis.type}`}>
          <span>ESTIMATED TYPE</span>
          <strong>{analysis.type}</strong>
          <i aria-hidden="true" />
        </div>
        <div className="result-intro">
          <p className="section-index">RESULT / 32 ANSWERS</p>
          <h1>{profile.name}</h1>
          <p>{profile.summary}</p>
        </div>
        <div className="result-caution">
          <span className="notice-number">READ THIS</span>
          <p>これは回答時点の傾向をもとにした参考結果です。人は状況や経験によって変化します。</p>
        </div>
      </section>

      <section className="result-content">
        <div className="result-section-heading">
          <span className="section-index">01 / AXES</span>
          <h2>4つの軸で見る、今の輪郭</h2>
          <p>割合は優劣ではなく、回答がどちら側に寄ったかの目安です。E/Iは社交性、T/Fは感情の強さを直接表すものではありません。</p>
        </div>
        <div className="axis-result-grid">
          {axisOrder.map((axis) => <AxisResultCard key={axis} result={analysis.axes[axis]} />)}
        </div>

        <div className="profile-detail">
          <div className="profile-detail-heading">
            <span className="section-index">02 / NOTES</span>
            <h2>このタイプの読み解き方</h2>
          </div>
          <div className="profile-detail-body">
          <p className="profile-detail-copy">{profile.detail}</p>
            <div className="profile-columns">
              <div>
                <span className="detail-label">自然に活かしやすいこと</span>
                <ul>{profile.strengths.map((strength) => <li key={strength}><CheckIcon />{strength}</li>)}</ul>
              </div>
              <div>
                <span className="detail-label">意識するとよいこと</span>
                <p className="care-copy">{profile.care}</p>
              </div>
            </div>
          </div>
        </div>

        <TypeGuide analysis={analysis} />
        <AnswerReview answers={answers} />
        <ResearchNotes />

        <div className="result-actions">
          <button className="primary-button" type="button" onClick={onRestart}>もう一度分析する <ArrowUpRight /></button>
          <p>公式のMBTI検査ではありません。自分を考えるためのひとつの視点としてご利用ください。</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [answers, setAnswers] = useState<Answers>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [validation, setValidation] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [screen, currentIndex])

  const start = () => {
    setAnswers({})
    setCurrentIndex(0)
    setValidation('')
    setAnalysis(null)
    setScreen('quiz')
  }

  const goHome = () => {
    setScreen('intro')
    setValidation('')
  }

  const goBack = () => {
    setValidation('')
    if (currentIndex === 0) {
      setScreen('intro')
      return
    }
    setCurrentIndex((index) => index - 1)
  }

  const selectAnswer = (value: ResponseValue) => {
    const id = questions[currentIndex].id
    setAnswers((current) => ({ ...current, [id]: value }))
    setValidation('')
  }

  const goNext = () => {
    const answer = answers[questions[currentIndex].id]
    if (answer === undefined) {
      setValidation('まず、いちばん近い回答をひとつ選んでください。')
      return
    }

    if (currentIndex === questions.length - 1) {
      setAnalysis(scoreAnswers(answers))
      setScreen('result')
      return
    }
    setCurrentIndex((index) => index + 1)
  }

  const restart = () => start()

  let content: ReactNode
  if (screen === 'intro') content = <IntroScreen onStart={start} />
  if (screen === 'quiz') {
    content = <QuizScreen answers={answers} currentIndex={currentIndex} validation={validation} onSelect={selectAnswer} onBack={goBack} onNext={goNext} />
  }
  if (screen === 'result' && analysis) content = <ResultScreen analysis={analysis} answers={answers} onRestart={restart} />

  return (
    <div className="app-shell">
      <div className="background-grid" aria-hidden="true" />
      <Header screen={screen} onHome={goHome} />
      {content}
      <Footer />
    </div>
  )
}

export default App
