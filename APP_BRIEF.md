# App brief

This brief describes the first version of the app. Change it when your team decides something new; the agent follows it. Unfilled points are not requirements; the agent should ask about missing details needed for implementation.

## App name

Quiz Night

## User and problem

- Who will use it? Workshop participants who want to test what they learned about LLMs and AI agents.
- What problem does it solve? New concepts are easier to remember when you use them in a playful way.

## Main user journey

The player starts the quiz, answers five multiple-choice questions one at a time, sees immediately whether each answer was right, and finishes on a result screen with the score.

## Must-have features

1. Five questions with four answer options each.
2. Immediate feedback after each answer, with a visible running score.
3. A result screen with the final score and a "Play again" button.

## Demo acceptance criteria

- Given the start screen, when the player clicks Start, then question 1 of 5 appears with four answer options.
- Given a question, when the player picks the right answer, then it is marked as correct and the running score goes up by one.
- Given the last answer, then the result screen shows the score, for example "4 of 5", and "Play again" starts over with a score of 0.

## Sample data

Multiple-choice questions about LLMs, tokens, context windows and AI agents. The agent drafts ten questions in one data file. The app shows the first five in that order; the team fact-checks all ten and moves its best five to the top.

## Out of scope

- Difficulty levels
- Saving high scores
- More than one player
- Level-ups from README.md, until the team adds them to this brief

## Explicit overrides

- Git push (2026-10-16): Mirwais allowed the agent to push the quiz commits to the `claude/project-thread-jfgisj` branch on GitHub. Scope: that branch only; all other Git rules still apply.

When an override is requested, replace "None" with the specific participant decision and its scope. Only record decisions actually requested or approved by the participant; the agent must not propose alternative stacks or excluded features proactively.

## Project decisions

- Second chance (2026-10-16, Mirwais): a wrong answer stays red and the player gets one more try; the right answer is shown only after two wrong tries. Only a right answer on the first try earns a point.
- "Choose all that apply" questions (2026-10-16, Mirwais): some questions have more than one right answer. The player ticks answers and clicks "Check answer"; the same two-try rule applies. Two of them are in the first five, so they show up in the game.
- Question timer (2026-10-16, Nataliia, overrides "Timer" being out of scope): each question has 30 seconds (changed from 1 minute), counting down from when it appears. If the time runs out before the question is finished, the app says "Time's up!", shows the right answer, gives no point and moves on to the next question (or the result) after 3 seconds.
- Topics (2026-10-16, Mirwais, overrides "Categories" being out of scope): the start screen shows four topics (LLM basics, Tokens and context, AI agents, Using AI well). The player picks one and answers that topic's five questions. The result screen offers "Play again" (same topic) and "Choose another topic". All questions live in `src/questions.ts`, grouped by topic.
- Quit button (2026-10-16, Mirwais): during a quiz a "Quit" button opens a styled window (not the browser's own popup) asking "Quit this quiz?" with "Keep playing" and "Quit quiz". The timer pauses while the window is open. Quitting goes back to the topic list and the score of that round is not kept.
- New look (2026-10-16, Mirwais): card layout on a colourful background, progress bar, A–D answer badges and a result message that depends on the score.
