// Quiz questions. The app shows the first five, in this order.
// To change which questions are played, move your best five to the top.

export type Question = {
  text: string
  options: string[] // exactly four answer options
  correctIndex: number // position of the right answer in options (0 to 3)
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
    correctIndex: 0,
  },
  {
    text: 'What is a token for an LLM?',
    options: [
      'A password that unlocks the model',
      'A small piece of text, such as a word or part of a word',
      'A coin you pay for each answer',
      'A full sentence',
    ],
    correctIndex: 1,
  },
  {
    text: 'What is the context window of an LLM?',
    options: [
      'The browser window where you chat with the model',
      'The list of websites the model has visited',
      'The maximum amount of text (in tokens) the model can look at at once',
      'The time of day the model is available',
    ],
    correctIndex: 2,
  },
  {
    text: 'What makes an AI agent different from a plain chatbot?',
    options: [
      'It always gives shorter answers',
      'It can only answer yes or no',
      'It never makes mistakes',
      'It can use tools and take steps on its own to reach a goal',
    ],
    correctIndex: 3,
  },
  {
    text: 'An LLM answers confidently but the fact is made up. What is this called?',
    options: ['A hallucination', 'A compilation', 'A token overflow', 'A reboot'],
    correctIndex: 0,
  },
  {
    text: 'At its core, how does an LLM produce text?',
    options: [
      'It copies answers from a fixed database',
      'It predicts the next token again and again',
      'It searches the internet for every word',
      'It asks a human in the background',
    ],
    correctIndex: 1,
  },
  {
    text: 'What happens when a conversation becomes longer than the context window?',
    options: [
      'The model gets faster',
      'Nothing, the model remembers everything forever',
      'The oldest parts no longer fit, so the model cannot see them',
      'The model starts a new language',
    ],
    correctIndex: 2,
  },
  {
    text: 'What is a "prompt"?',
    options: [
      'The model\'s training data',
      'A type of computer chip',
      'An error message',
      'The input or instruction you give the model',
    ],
    correctIndex: 3,
  },
  {
    text: 'Why should you check code or facts that an AI agent generates?',
    options: [
      'Because it can be wrong even when it sounds sure',
      'Because AI output is always copied from other people',
      'Because checking makes the agent faster',
      'You do not need to; agents are always right',
    ],
    correctIndex: 0,
  },
  {
    text: 'Which of these is a typical "tool" an AI coding agent can use?',
    options: [
      'A hammer',
      'Running commands in a terminal and editing files',
      'Printing money',
      'Turning off your computer\'s screen',
    ],
    correctIndex: 1,
  },
]
