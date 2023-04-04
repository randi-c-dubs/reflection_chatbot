import React, {useState} from 'react';
import TutorialDecks from "./TutorialContents";
import TutorialCard from "./TutorialCard.jsx";

import "./InlineTutorialWidget.css";

const InlineTutorialWidget = ({ tutorialName }) => {
  // start off at beginning of deck
  const [current, setCurrent] = useState(1);

  // load cards from Tutorial Deck file
  const cards = TutorialDecks[tutorialName];
  const totalCards = cards.length;

  const nextSlide = () => {
    setCurrent(current + 1);
  };

  const prevSlide = () => {
    setCurrent(current - 1);
  };

  return (
    <>
    <div className="inline-tutorial-container">
      <div>
        {current > 1 && (
          <button className="btn in-tutorial-left-btn" onClick={prevSlide}>
            <i className="bi bi-caret-left-fill"></i>
          </button>
        )}
        {current < totalCards && (
          <button className="btn in-tutorial-right-btn" onClick={nextSlide}>
            <i className="bi bi-caret-right-fill"></i>
          </button>
        )}
        {cards.map((card) => {
          return (
            current === card.index && (
              <TutorialCard
                className={card.index === current ? "slide active" : "slide"}
                key={card.index}
                card={card}
                totalCards={cards.length}
              />
            )
          );
        })}
      </div>
    </div>
    </>
  );
};

export default InlineTutorialWidget;
