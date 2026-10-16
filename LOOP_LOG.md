# Loop Log

One line per loop: what you asked the agent, what happened, and what you changed afterwards. Use it to prepare your presentation.

| # | Prompt (short) | What happened | What we changed |
|---:|---|---|---|
| 1 | Draft ten quiz questions about LLMs, tokens, context windows and agents in one data file | Agent wrote `src/questions.ts` with ten four-option questions | Nothing yet; the team still needs to fact-check all ten and move the best five to the top |
| 2 | Build the quiz flow from APP_BRIEF.md: start screen, five questions, feedback, running score, result screen with Play again | Agent built it in `src/App.tsx`; lint and build pass; a browser test answered 4 of 5 right and saw "4 of 5", then Play again reset the score to 0 | Nothing yet; try it with `npm run dev` |
| 3 | Don't reveal the right answer after a wrong click; keep the wrong answer red and give one more chance | Agent added a second try; a browser test checked right-first-try, right-second-try and wrong-twice | Decided only a first-try right answer earns a point |
| 4 | Add more multiple-choice questions and make the design look good | Agent added four "choose all that apply" questions (two in the first five) and a new design; a browser test checked single and multi questions on desktop and phone width | Nothing yet; fact-check the new questions too |
| 5 | Create different topics; when the player picks one, show five questions for it | Agent grouped the questions into four topics with five each (six new questions) and added a topic picker; a browser test played all four topics | Nothing yet; fact-check the six new questions in "AI agents" and "Using AI well" |
| 6 | Add a Quit button inside the quiz that goes back to the home page | Agent added "✕ Quit" next to the topic name, with a confirmation; a browser test checked Cancel, OK, and quitting during the "Time's up!" pause | Nothing yet |

## For the Presentation

Each group has about five minutes. Use the log to answer:

- What did you try to build?
- What did you actually achieve?
- What worked well with the AI agent?
- What surprised you?
- Where did the AI struggle?
- What did you change or correct?
- What would you try next?

An unfinished app is fine if you can explain what you learned.
