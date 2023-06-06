import Contexts from "./BotContext";

const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    initialChatMessage: `The project description describes what problem your project solves and how.`,
    initialChatContext: Contexts.Description,
    initialChatMenu: [
      {text: `Tell me more`, content:`explain`},
      {text: `Show an example`, content: `example`}
    ],
    content: {
      explain: [
        `Describe who your project helps and with what problem.`,
        `A good way to phrase your description is: This project will help [_who_] with [_problem_]`,
      ],
      //example: ,
      //who: ,
      //situations: ,
      //goal: ,
    },
  },
  stakeholders: {
    inputPlaceholder: `Which individuals, groups, or organizations might be impacted by your project?`,
    initialChatMessage: `Stakeholders are anyone that might be interested in your project and its outcomes.`,
    initialChatContext: Contexts.Stakeholders,
    initialChatMenu: [
      {text: `Tell me more`, content: `explain`},
      {text: `Show an example`, content: `example`},
      {text: `List common stakeholders`, content: `common`},
    ],
    content: {
      explain: [
        `Think of at least three stakeholders. Then point out which stakeholder you think is most at risk.`,
        `A good way to phrase your stakeholders is: The key stakeholders are [_three stakeholders]. The most vulnerable stakeholders are [_one of the three_].`,
      ],
      common: [
        `Consider potential customers, their communities, the environment, corporations, their leaders, investors, suppliers, and governments officials.`,
      ],
      vulnerable: [
        `Vulnerable stakeholders are the people who are most at risk and have the least control over the algorithm's impact on themselves.`,
        `Who may be at risk because of bias or not knowing a lot about technology?`,
      ],
    },
  },
  positiveImpacts: {
    inputPlaceholder: `What are the potential benefits of your project?`,
    initialChatMessage: `Positive impacts are ways that your project helps your stakeholders.`,
    initialChatContext: Contexts.PositiveImpacts,
    initialChatMenu: [
      {text: `Tell me more`, content: `explain`},
      {text: `Show an example`, content: `example`},
      {text: `List common benefits`, content: `common`},
    ],
    content: {
      explain: [
        `Think of three ways your project might help people. Also consider who will benefit the most and how big your project's impact is.`,
        `A good way to phrase the positive impacts is: The benefits of this work are [_three benefits_]. [_Stakeholder_] is likely to benefit the most. Overall, this project is [high / medium / low] impact.`,
      ],
      stakeholders: [
        `It is important to know which stakeholders get the most benefits.`,
        `Do your best to help people who need it the most.`,
      ],
    },
  },
  negativeImpacts: {
    inputPlaceholder: `What are the potentially harmful consequences of your project?`,
    initialChatMessage: `Negative impacts are ways that your projects might (unintentionally!) harm your stakeholders or put them at risk.`,
    initialChatContext: Contexts.NegativeImpacts,
    initialChatMenu: [
      {text: `Tell me more`, content: `explain`},
      {text: `Show an example`, content: `example`},
      {text: `List common risks`, content: `common`},
    ],
    content: {},
  },
};

export default KnowledgeBase;
