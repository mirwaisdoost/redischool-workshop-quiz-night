import { useEffect, useEffectEvent, useRef, useState } from 'react'
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
  const [askingToQuit, setAskingToQuit] = useState(false) // true while the quit window is open
  const quitDialog = useRef<HTMLDialogElement>(null) // the quit window on the page

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
  // The timer pauses while the quit window is open.
  // When the time reaches zero, the question ends without a point.
  useEffect(() => {
    if (screen !== 'question' || done || askingToQuit) return
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
  }, [screen, done, timeLeft, askingToQuit])

  // After "Time's up!", wait 3 seconds so the player can read the message, then skip ahead.
  // useEffectEvent lets the timer call the latest nextQuestion without restarting the timer.
  const skipAfterTimeout = useEffectEvent(() => nextQuestion())
  useEffect(() => {
    if (!timedOut || askingToQuit) return
    const timer = setTimeout(skipAfterTimeout, 3000)
    return () => clearTimeout(timer) // cancelled if the player clicks the button first
  }, [timedOut, askingToQuit])

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

  // The Quit button opens a window that asks the player to confirm.
  // showModal() puts it on top of the quiz; the Escape key also closes it.
  function askToQuit() {
    setAskingToQuit(true)
    quitDialog.current?.showModal()
  }

  // Leave the quiz and go back to the topic list. The score of this round is thrown away.
  function quitQuiz() {
    quitDialog.current?.close()
    setAskingToQuit(false) // set it here too: the window disappears before its close event arrives
    resetQuestion() // also stops the timer
    setScreen('start')
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
      <main className="card start">
        <header className="start-header">
          <h1>
            <span aria-hidden="true">🧠</span> Quiz Night
          </h1>
          <p className="lead">Test what you learned about LLMs and AI agents. Pick a topic to start!</p>
        </header>

        {/* Two columns side by side; on small screens they stack (see .columns in index.css). */}
        <div className="columns">
          <section className="panel" aria-labelledby="rules-title">
            <h2 id="rules-title">📋 Rules</h2>
            <ul className="rules">
              <li>Each topic has {topic.questions.length} questions, and you get two tries for each one.</li>
              <li>Some questions have one right answer, others ask you to choose all that apply.</li>
              <li>A right answer on the first try earns a point.</li>
              <li>
                You have {secondsPerQuestion} seconds for each question. When the time runs out, the quiz moves on.
              </li>
            </ul>
          </section>

          <section aria-labelledby="topics-title">
            <h2 id="topics-title">🗂️ Topics</h2>
            <div className="topics">
              {topics.map((t) => (
                <button key={t.id} className="topic" onClick={() => startQuiz(t)}>
                  <span className="topic-emoji">{t.emoji}</span>
                  <span className="topic-name">{t.name}</span>
                  <span className="topic-description">{t.description}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
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

      <div className="topic-row">
        <p className="topic-label">
          {topic.emoji} {topic.name}
          {isMulti && <span className="tag">Choose all that apply</span>}
        </p>
        <button className="quit" onClick={askToQuit}>
          ✕ Quit
        </button>
      </div>
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

      <dialog
        ref={quitDialog}
        className="modal"
        aria-labelledby="quit-title"
        onClose={() => setAskingToQuit(false)}
      >
        <div className="modal-icon">🚪</div>
        <h2 id="quit-title">Quit this quiz?</h2>
        <p className="lead">
          You are on question {current + 1} of {quizQuestions.length} with {score} {score === 1 ? 'point' : 'points'}.
          If you quit now, this round's score will be lost.
        </p>
        <div className="buttons">
          <button className="primary" onClick={() => quitDialog.current?.close()} autoFocus>
            Keep playing
          </button>
          <button className="danger" onClick={quitQuiz}>
            Quit quiz
          </button>
        </div>
      </dialog>
    </main>
  )
}
