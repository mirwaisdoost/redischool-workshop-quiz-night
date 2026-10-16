import { useState } from 'react'
import { questions } from './questions'

// The quiz plays the first five questions from questions.ts.
const quizQuestions = questions.slice(0, 5)

type Screen = 'start' | 'question' | 'result'

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [current, setCurrent] = useState(0) // index of the current question
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null) // answer the player clicked

  function startQuiz() {
    setCurrent(0)
    setScore(0)
    setPicked(null)
    setScreen('question')
  }

  function pickAnswer(index: number) {
    if (picked !== null) return // only one answer per question
    setPicked(index)
    if (index === quizQuestions[current].correctIndex) {
      setScore(score + 1)
    }
  }

  function nextQuestion() {
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1)
      setPicked(null)
    } else {
      setScreen('result')
    }
  }

  if (screen === 'start') {
    return (
      <main>
        <h1>Quiz Night</h1>
        <p>Test what you learned about LLMs and AI agents: {quizQuestions.length} questions, four options each.</p>
        <button onClick={startQuiz}>Start</button>
      </main>
    )
  }

  if (screen === 'result') {
    return (
      <main>
        <h1>Your result</h1>
        <p className="big">
          {score} of {quizQuestions.length}
        </p>
        <button onClick={startQuiz}>Play again</button>
      </main>
    )
  }

  const question = quizQuestions[current]
  const answered = picked !== null
  const isLast = current + 1 === quizQuestions.length

  return (
    <main>
      <p className="status">
        Question {current + 1} of {quizQuestions.length} · Score: {score}
      </p>
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((option, index) => {
          let className = 'option'
          if (answered && index === question.correctIndex) className += ' correct'
          else if (answered && index === picked) className += ' wrong'
          return (
            <button key={index} className={className} onClick={() => pickAnswer(index)} disabled={answered}>
              {option}
            </button>
          )
        })}
      </div>
      {answered && (
        <div role="status">
          <p className="feedback">
            {picked === question.correctIndex
              ? '✅ Correct!'
              : `❌ Wrong. The right answer is: ${question.options[question.correctIndex]}`}
          </p>
          <button onClick={nextQuestion}>{isLast ? 'See result' : 'Next question'}</button>
        </div>
      )}
    </main>
  )
}
