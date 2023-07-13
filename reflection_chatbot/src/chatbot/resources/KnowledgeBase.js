import Contexts from "./BotContext";

const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    initialChatMessage: `The project description describes what problem your project solves and how.`,
    initialChatContext: Contexts.Description,
    initialChatMenu: [
      {text: `Tell me more`, content:`explain`},
      {text: `Show an example`, content: `example`},
      {text: `Give me some ideas`, content: `ideas`},
    ],
    content: {
      explain: [
        `Describe who your project helps and with what problem.`,
        `A good way to phrase your description is: This project will help [_who_] with [_problem_]`,
      ],
      example: [
        `Let's say that you are making a chatbot that acts as a school counselor.`,
        `This project will help school counselors give their students access to advice and resources to better navigate issues in school and to plan their future careers.`
      ],
      ideas: [
        `Some problems that AI chatbots can address in schools are supporting teachers, school staff, or school counselors in working with students.`,
        `They could also work with students directly to give them personalized support that helps them be successful.`,
        `Usually these chatbots focus on one specific area, like career advice or a particular school subject.`
      ],
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
      example: [
        `Three key stakeholders for a school counselor charbot are students, school counselors, and parents.`,
        `The most vulnerable stakeholders are students who have less power than adults in school settings.`
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
      example: [
        `The benefits of a school counselor chatbot are that counselors will be able to help more students, students may feel more comfortable opening up to a non-judgemental chatbot, and counseling could be more pesonalized.`,
        `Students at schools where counselors are less available could benefit the most. This would have a high impact.`
      ],
      common: [
        `Chatbots in school settings have the potential to help school staff, to make students more independent, to further equitable access to important resources, and to make learning or counseling more personalized.`
      ],
      stakeholders: [
        `It is important to know which stakeholders get the most benefits.`,
        `Design justice means doing your best to help people who need it the most.`,
      ],
      impact: [
        `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects.`,
        `Medium impact problems have less reach. But may still involve important parts of people's lives.`,
        `Low impact problems are less likely to effect important parts of people's lives.`
      ]
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
    content: {
      explain: [
        `Foresee ways that your project might cause harm to people, whether through unintended consequences or introducting new problems.`,
        `A good way to phrase the negative impacts is:  The potential harms of this project are [_three harms_]. [_Stakeholders_] are most likely to be harmed by this work. This project is [high / medium / low] risk.`
      ],
      example: [
        `The potentual harms of an AI counselor are that students could put too much trust in them, human counselors could have their jobs threatened, and this could lead to students who really need support not getting the resources they need.`,
        `Students who are typically thought of as special cases who need more support than others are most at risk. This would be a pretty high risk project which would need a lot of oversight.`
      ],
      common: [
        `Common negative impacts of chatbots in school settings are that people can rely too much on flawed systems, the chatbot might unfairly treat some students differently than others, or students could feel their privacy is compromised by data collection.`,
        `Also the existence of school counselors could threaten the jobs of humans in those roles, especially at schools that are already low-resourced.`
      ],
      stakeholders: [
        `It is important to know which stakeholders are most at risk of harm. The potential benefits should be balanced with the potential for harm.`,
        `Design justice means doing yor best to reduce harm, especially for the stakeholders that are most vulnerable.`
      ],
      risk: [
        `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being.`,
        `Medium risk projects are less likely to have negative consequences or to have severe consequences. Usually these projects are complex but not critical.`,
        `Low risk projects have minimal likelihood of negative consequences. Perhaps the systems is well understood or predicitable, or any negative consequences are easily resolved.`
      ],
    },

  },
};

export default KnowledgeBase;
