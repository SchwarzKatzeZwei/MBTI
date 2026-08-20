import {
  axisMeta,
  axisOrder,
  questions,
  type AxisCode,
  type PreferenceSide,
  type ResponseValue,
  type TypeCode,
} from './data'

export type Answers = Partial<Record<number, ResponseValue>>

export interface AxisResult {
  code: AxisCode
  title: string
  first: string
  second: string
  firstLabel: string
  secondLabel: string
  firstPercent: number
  strength: number
  score: number
  maxScore: number
  winner: PreferenceSide | 'tie'
  confidence: '拮抗' | 'やや傾向' | '比較的はっきり'
  color: string
}

export interface AnalysisResult {
  type: TypeCode
  axes: Record<AxisCode, AxisResult>
  answeredCount: number
  totalQuestions: number
  complete: boolean
}

function getAxisScore(axis: AxisCode, answers: Answers): { score: number; maxScore: number } {
  const axisQuestions = questions.filter((question) => question.axis === axis)
  const score = axisQuestions.reduce((total, question) => {
    const response = answers[question.id]
    if (response === undefined) return total
    const orientedValue = question.polarity === 'first' ? response : -response
    return total + orientedValue
  }, 0)

  return { score, maxScore: axisQuestions.length * 3 }
}

function getConfidence(strength: number): AxisResult['confidence'] {
  if (strength < 25) return '拮抗'
  if (strength < 55) return 'やや傾向'
  return '比較的はっきり'
}

function toAxisResult(axis: AxisCode, answers: Answers): AxisResult {
  const meta = axisMeta[axis]
  const { score, maxScore } = getAxisScore(axis, answers)
  const firstPercent = Math.round(((score + maxScore) / (maxScore * 2)) * 100)
  const strength = Math.round((Math.abs(score) / maxScore) * 100)

  return {
    code: axis,
    title: meta.title,
    first: meta.first,
    second: meta.second,
    firstLabel: meta.firstLabel,
    secondLabel: meta.secondLabel,
    firstPercent,
    strength,
    score,
    maxScore,
    winner: score === 0 ? 'tie' : score > 0 ? 'first' : 'second',
    confidence: getConfidence(strength),
    color: meta.color,
  }
}

function selectLetter(result: AxisResult): string {
  // 中央値は常に先頭側を仮置きし、結果画面では「拮抗」と明示する。
  return result.score >= 0 ? result.first : result.second
}

export function scoreAnswers(answers: Answers): AnalysisResult {
  const axes = axisOrder.reduce((result, axis) => {
    result[axis] = toAxisResult(axis, answers)
    return result
  }, {} as Record<AxisCode, AxisResult>)

  const type = axisOrder.map((axis) => selectLetter(axes[axis])).join('') as TypeCode
  const answeredCount = Object.keys(answers).length

  return {
    type,
    axes,
    answeredCount,
    totalQuestions: questions.length,
    complete: answeredCount === questions.length,
  }
}

