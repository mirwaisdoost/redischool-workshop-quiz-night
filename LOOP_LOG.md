# Loop Log

One line per loop: what you asked the agent, what happened, and what you changed afterwards. Use it to prepare your presentation.

| # | Prompt (short) | What happened | What we changed |
|---:|---|---|---|
| 1 | Draft ten quiz questions about LLMs, tokens, context windows and agents in one data file | Agent wrote `src/questions.ts` with ten four-option questions | Nothing yet; the team still needs to fact-check all ten and move the best five to the top |
| 2 | Build the quiz flow from APP_BRIEF.md: start screen, five questions, feedback, running score, result screen with Play again | Agent built it in `src/App.tsx`; lint and build pass; a browser test answered 4 of 5 right and saw "4 of 5", then Play again reset the score to 0 | Nothing yet; try it with `npm run dev` |

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
