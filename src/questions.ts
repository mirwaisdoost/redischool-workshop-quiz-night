// Quiz questions. The app shows the first five, in this order.
// To change which questions are played, move your best five to the top.

// A question with one right answer is a normal multiple-choice question.
// A question with two or more right answers is a "choose all that apply" question.
export type Question = {
  text: string
  options: string[] // exactly four answer options
  correct: number[] // positions of the right answers in options (0 to 3)
}

export const questions: Question[] = [
  {
    text: 'What does "LLM" stand for?',
    options: [
      'Large Language Model',
      'Long Learning Machine',
      'Linear Logic Module',
      'Language Lookup Memory',
    ],
    correct: [0],
  },
  {
    text: 'Which of these can an AI agent typically do?',
    options: [
      'Use tools, such as a web search or a terminal',
      'Plan several steps to reach a goal',
      'Guarantee that every answer is correct',
      'Look at the result of an action and adjust its next step',
    ],
    correct: [0, 1, 3],
  },
  {
    text: 'What is a token for an LLM?',
    options: [
      'A password that unlocks the model',
      'A small piece of text, such as a word or part of a word',
      'A coin you pay for each answer',
      'A full sentence',
    ],
    correct: [1],
  },
  {
    text: 'Which of these statements about tokens are true?',
    options: [
      'A token can be just part of a word',
      'Every token is exactly one letter',
      'A longer text usually means more tokens',
      'Every word is always exactly one token',
    ],
    correct: [0, 2],
  },
  {
    text: 'What is the context window of an LLM?',
    options: [
      'The browser window where you chat with the model',
      'The list of websites the model has visited',
      'The maximum amount of text (in tokens) the model can look at at once',
      'The time of day the model is available',
    ],
    correct: [2],
  },
  {
    text: 'What makes an AI agent different from a plain chatbot?',
    options: [
      'It always gives shorter answers',
      'It can only answer yes or no',
      'It never makes mistakes',
      'It can use tools and take steps on its own to reach a goal',
    ],
    correct: [3],
  },
  {
    text: 'An LLM answers confidently but the fact is made up. What is this called?',
    options: ['A hallucination', 'A compilation', 'A token overflow', 'A reboot'],
    correct: [0],
  },
  {
    text: 'At its core, how does an LLM produce text?',
    options: [
      'It copies answers from a fixed database',
      'It predicts the next token again and again',
      'It searches the internet for every word',
      'It asks a human in the background',
    ],
    correct: [1],
  },
  {
    text: 'What happens when a conversation becomes longer than the context window?',
    options: [
      'The model gets faster',
      'Nothing, the model remembers everything forever',
      'The oldest parts no longer fit, so the model cannot see them',
      'The model starts a new language',
    ],
    correct: [2],
  },
  {
    text: 'What is a "prompt"?',
    options: [
      'The model\'s training data',
      'A type of computer chip',
      'An error message',
      'The input or instruction you give the model',
    ],
    correct: [3],
  },
  {
    text: 'Why should you check code or facts that an AI agent generates?',
    options: [
      'Because it can be wrong even when it sounds sure',
      'Because AI output is always copied from other people',
      'Because checking makes the agent faster',
      'You do not need to; agents are always right',
    ],
    correct: [0],
  },
  {
    text: 'Which of these is a typical "tool" an AI coding agent can use?',
    options: [
      'A hammer',
      'Running commands in a terminal and editing files',
      'Printing money',
      'Turning off your computer\'s screen',
    ],
    correct: [1],
  },
  {
    text: 'Which of these are good ways to deal with hallucinations?',
    options: [
      'Give the model the source text to answer from',
      'Write the prompt in capital letters',
      'Check important answers against trusted sources',
      'Ask the model to say "I don\'t know" when it is unsure',
    ],
    correct: [0, 2, 3],
  },
  {
    text: 'What takes up space in the context window during a chat?',
    options: [
      'Your messages',
      'The model\'s own replies',
      'Websites the model was never shown',
      'Earlier messages in the same chat',
    ],
    correct: [0, 1, 3],
  },
]
