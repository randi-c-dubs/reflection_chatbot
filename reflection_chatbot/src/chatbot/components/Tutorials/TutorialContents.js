import HelpConvoIcon from "./decks/help-1-convo-icon.png";
import HelpEthicsIcon from "./decks/help-2-ethics-icon.png";
import HelpFunctionIcon from "./decks/help-3-function-icon.png";
import HelpProgrammingIcon from "./decks/help-4-programming-icon.png";
import HelpConvoIcon2 from "./decks/help-5-convo-icon2.png";

const TutorialDecks =
  /* Add other decks of information by using this format*/
  // TODO add links
  {
    helpDeck: [
      {
        name: `Overview`,
        imageSrc: HelpConvoIcon,
        text: `This tool is a large language model (LLM) backed chatbot that can do a few helpful things.`,
        index: 1,
      },
      {
        name: `Functions`,
        imageSrc: HelpFunctionIcon,
        text: `Currently, the tool is equipped to tell you all about Jibo, to discuss Scratch programming, and to give you feedback on your AI design project`,
        index: 2,
      },
      {
        name: `Learn About Jibo`,
        imageSrc: `https://laughingsquid.com/wp-content/uploads/2017/10/jibo.gif?w=750`,
        text: `Jibo is a social robot. You can learn more about Jibo by clicking the "Learn About Jibo" button.`,
        index: 3,
      },
      {
        name: `Scratch Code`,
        imageSrc: HelpProgrammingIcon,
        text: `Sparki uses GPT3 to discuss example programs in the Scratch programming language. You can explore this by clicking the "Discuss Programming" button.`,
        index: 4,
      },
      {
        name: `AI Design Feedback`,
        imageSrc: HelpEthicsIcon,
        text:
          `This tool can also talk you through the designs of AI projects -- like goals, potential impacts, and harm mitigation.` +
          ` Click the "Design Journal" button to see more.`,
        index: 5,
      },
      {
        name: `Explore Sparki`,
        imageSrc: HelpConvoIcon2,
        text: `That's it for the basics of this tool and how it works.`,
        link: `https://github.com/randi-c-dubs/reflection_chatbot`,
        linkText: `Learn more on Github`,
        index: 6,
      },
    ],
    exampleJiboDeck: [
      {
        name: `Card 1`,
        imageSrc: `https://s.wsj.net/public/resources/images/OG-AZ338_STERN1_G_20171129130916.gif`,
        text: `Jibo is an awesome social robot built by a team of roboticists led by Dr. Cynthia Breazeal.`,
        index: 1,
      },
      {
        name: `Card 2`,
        imageSrc: `https://laughingsquid.com/wp-content/uploads/2017/10/jibo.gif?w=750`,
        text: `Jibo's favorite color is blue and his favorite animal is penguins.`,
        index: 2,
      },
    ],
  };

export default TutorialDecks;
