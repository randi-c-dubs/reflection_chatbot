import Card from "react-bootstrap/Card";

function TutorialCard({ card, totalCards }) {
  return (
    <Card style={{ width: "225px", height: "350px" }} text="dark">
      <Card.Img variant="top" src={card.imageSrc} />
      <Card.Body>
        <Card.Title> {card.name} </Card.Title>
        <Card.Text style={{ fontSize: "15px" }}>{card.text}</Card.Text>
        {card.link && (
          <Card.Text style={{ fontSize: "15px", fontWeight: "bold" }}>
            <a target="_blank" rel="noreferrer" href={card.link}>
              {" "}
              {card.linkText}{" "}
            </a>
          </Card.Text>
        )}
        <Card.Text className="slide-num" style={{ fontSize: "10px" }}>
          Card {card.index} of {totalCards}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TutorialCard;
