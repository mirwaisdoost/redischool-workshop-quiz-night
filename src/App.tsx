import { useState } from 'react'
import { questions } from './questions'

// The quiz plays the first five questions from questions.ts.
const quizQuestions = questions.slice(0, 5)

type Screen = 'start' | 'question' | 'result'

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [current, setCurrent] = useState(0) // index of the current question
  const [score, setScore] = useState(0)
  const [wrongPicks, setWrongPicks] = useState<number[]>([]) // wrong answers clicked on this question
  const [done, setDone] = useState(false) // true when this question is finished

  function startQuiz() {
    setCurrent(0)
    setScore(0)
    setWrongPicks([])
    setDone(false)
    setScreen('question')
  }

  // The player gets two tries per question. Only a right answer on the first try earns a point.
  function pickAnswer(index: number) {
    if (done || wrongPicks.includes(index)) return
    if (index === quizQuestions[current].correctIndex) {
      if (wrongPicks.length === 0) setScore(score + 1)
      setDone(true)
    } else {
      setWrongPicks([...wrongPicks, index])
      if (wrongPicks.length === 1) setDone(true) // second wrong answer: no tries left
    }
  }

  function nextQuestion() {
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1)
      setWrongPicks([])
      setDone(false)
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
          if (done && index === question.correctIndex) className += ' correct'
          else if (wrongPicks.includes(index)) className += ' wrong'
          return (
            <button
              key={index}
              className={className}
              onClick={() => pickAnswer(index)}
              disabled={done || wrongPicks.includes(index)}
            >
              {option}
            </button>
          )
        })}
      </div>
      <div role="status">
        {!done && wrongPicks.length === 1 && <p className="feedback">❌ Not quite. Try one more time!</p>}
        {done && (
          <>
            <p className="feedback">
              {wrongPicks.length === 0 && '✅ Correct!'}
              {wrongPicks.length === 1 && '✅ Correct on your second try! (no point this time)'}
              {wrongPicks.length === 2 &&
                `❌ Wrong again. The right answer is: ${question.options[question.correctIndex]}`}
            </p>
            <button onClick={nextQuestion}>{isLast ? 'See result' : 'Next question'}</button>
          </>
        )}
      </div>
    </main>
  )
}
