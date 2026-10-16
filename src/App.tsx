import { useEffect, useEffectEvent, useState } from 'react'
import { topics, type Topic } from './questions'

const letters = ['A', 'B', 'C', 'D']
const secondsPerQuestion = 30

type Screen = 'start' | 'question' | 'result'

// True when both lists contain the same answer positions, in any order.
function sameAnswers(a: number[], b: number[]) {
  return a.length === b.length && a.every((x) => b.includes(x))
}

function resultMessage(score: number, total: number) {
  if (score === total) return '🏆 Perfect score! You really know your LLMs.'
  if (score >= total - 1) return '🎉 Great job! Almost perfect.'
  if (score >= total / 2) return '👍 Nice work! A few more facts to learn.'
  return '📚 Good start! Play again to learn more.'
}

// Shows seconds as minutes and seconds, for example 75 → "1:15".
function formatTime(seconds: number) {
  const s = seconds % 60
  return `${Math.floor(seconds / 60)}:${s < 10 ? '0' : ''}${s}`
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [topic, setTopic] = useState<Topic>(topics[0]) // the topic the player picked
  const [current, setCurrent] = useState(0) // index of the current question
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number[]>([]) // ticked answers in a "choose all" question
  const [wrongPicks, setWrongPicks] = useState<number[]>([]) // wrong answers the player chose
  const [tries, setTries] = useState(0) // wrong tries on this question (0, 1 or 2)
  const [done, setDone] = useState(false) // true when this question is finished
  const [timeLeft, setTimeLeft] = useState(secondsPerQuestion) // seconds left on this question
  const [timedOut, setTimedOut] = useState(false) // true when the time ran out before an answer

  const quizQuestions = topic.questions
  const question = quizQuestions[current]
  const isMulti = question.correct.length > 1

  function resetQuestion() {
    setSelected([])
    setWrongPicks([])
    setTries(0)
    setDone(false)
    setTimeLeft(secondsPerQuestion)
    setTimedOut(false)
  }

  function startQuiz(chosen: Topic) {
    setTopic(chosen)
    setCurrent(0)
    setScore(0)
    resetQuestion()
    setScreen('question')
  }

  // Count down one second at a time while the question is still open.
  // When the time reaches zero, the question ends without a point.
  useEffect(() => {
    if (screen !== 'question' || done) return
    const timer = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1)
      } else {
        setTimeLeft(0)
        setTimedOut(true)
        setDone(true)
      }
    }, 1000)
    return () => clearTimeout(timer) // stop this tick if the player answers or leaves the question
  }, [screen, done, timeLeft])

  // After "Time's up!", wait 3 seconds so the player can read the message, then skip ahead.
  // useEffectEvent lets the timer call the latest nextQuestion without restarting the timer.
  const skipAfterTimeout = useEffectEvent(() => nextQuestion())
  useEffect(() => {
    if (!timedOut) return
    const timer = setTimeout(skipAfterTimeout, 3000)
    return () => clearTimeout(timer) // cancelled if the player clicks the button first
  }, [timedOut])

  // The player gets two tries per question. Only a right answer on the first try earns a point.
  function checkAnswer(picks: number[]) {
    if (sameAnswers(picks, question.correct)) {
      if (tries === 0) setScore(score + 1)
      setDone(true)
      return
    }
    const newWrong = picks.filter((index) => !question.correct.includes(index))
    setWrongPicks([...wrongPicks, ...newWrong])
    setSelected(picks.filter((index) => question.correct.includes(index)))
    setTries(tries + 1)
    if (tries === 1) setDone(true) // second wrong try: no tries left
  }

  function clickOption(index: number) {
    if (done || wrongPicks.includes(index)) return
    if (isMulti) {
      setSelected(selected.includes(index) ? selected.filter((i) => i !== index) : [...selected, index])
    } else {
      checkAnswer([index])
    }
  }

  function nextQuestion() {
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1)
      resetQuestion()
    } else {
      setScreen('result')
    }
  }

  if (screen === 'start') {
    return (
      <main className="card center">
        <div className="logo">🧠</div>
        <h1>Quiz Night</h1>
        <p className="lead">Test what you learned about LLMs and AI agents. Pick a topic to start!</p>
        <div className="topics">
          {topics.map((t) => (
            <button key={t.id} className="topic" onClick={() => startQuiz(t)}>
              <span className="topic-emoji">{t.emoji}</span>
              <span className="topic-name">{t.name}</span>
              <span className="topic-description">{t.description}</span>
            </button>
          ))}
        </div>
        <ul className="rules">
          <li>Each topic has {topic.questions.length} questions, and you get two tries for each one.</li>
          <li>Some questions have one right answer, others ask you to choose all that apply.</li>
          <li>A right answer on the first try earns a point.</li>
          <li>You have 30 seconds for each question. When the time runs out, the quiz moves on.</li>
        </ul>
      </main>
    )
  }

  if (screen === 'result') {
    return (
      <main className="card center">
        <div className="logo">{topic.emoji}</div>
        <h1>Your result</h1>
        <p className="lead">{topic.name}</p>
        <p className="big">
          {score} of {quizQuestions.length}
        </p>
        <p className="lead">{resultMessage(score, quizQuestions.length)}</p>
        <div className="buttons">
          <button className="primary" onClick={() => startQuiz(topic)}>
            Play again
          </button>
          <button className="secondary" onClick={() => setScreen('start')}>
            Choose another topic
          </button>
        </div>
      </main>
    )
  }

  const isLast = current + 1 === quizQuestions.length
  const failed = done && tries === 2
  const hurry = timeLeft <= 10
  const progress = ((current + (done ? 1 : 0)) / quizQuestions.length) * 100
  const rightAnswers = question.correct.map((i) => question.options[i]).join(', ')

  return (
    <main className="card">
      <div className="topbar">
        <span>
          Question {current + 1} of {quizQuestions.length}
        </span>
        <span className={hurry ? 'timer hurry' : 'timer'} aria-label={`${timeLeft} seconds left`}>
          ⏱ {formatTime(timeLeft)}
        </span>
        <span className="score">⭐ Score: {score}</span>
      </div>
      <div className="progress" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="topic-label">
        {topic.emoji} {topic.name}
        {isMulti && <span className="tag">Choose all that apply</span>}
      </p>
      <h2>{question.text}</h2>

      <div className="options">
        {question.options.map((option, index) => {
          let className = 'option'
          if (done && question.correct.includes(index)) className += ' correct'
          else if (wrongPicks.includes(index)) className += ' wrong'
          else if (selected.includes(index)) className += ' selected'
          return (
            <button
              key={index}
              className={className}
              onClick={() => clickOption(index)}
              disabled={done || wrongPicks.includes(index)}
              aria-pressed={isMulti ? selected.includes(index) : undefined}
            >
              <span className="letter">{letters[index]}</span>
              {option}
            </button>
          )
        })}
      </div>

      <div role="status" className="footer">
        {!done && tries === 1 && (
          <p className="feedback try-again">
            {wrongPicks.length === 0
              ? '🤔 Almost! You are missing at least one right answer. Try one more time.'
              : '❌ Not quite. Try one more time!'}
          </p>
        )}
        {done && (
          <p className={failed || timedOut ? 'feedback bad' : 'feedback good'}>
            {timedOut &&
              `⏰ Time's up! The right answer${isMulti ? 's are' : ' is'}: ${rightAnswers}. ${
                isLast ? 'Showing your result…' : 'Moving to the next question…'
              }`}
            {!timedOut && tries === 0 && '✅ Correct! +1 point'}
            {!timedOut && tries === 1 && '✅ Correct on your second try! (no point this time)'}
            {failed && `❌ Out of tries. The right answer${isMulti ? 's are' : ' is'}: ${rightAnswers}`}
          </p>
        )}
        {!done && isMulti && (
          <button className="primary" onClick={() => checkAnswer(selected)} disabled={selected.length === 0}>
            Check answer
          </button>
        )}
        {done && (
          <button className="primary" onClick={nextQuestion}>
            {isLast ? 'See result' : 'Next question →'}
          </button>
        )}
      </div>
    </main>
  )
}
