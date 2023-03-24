import Card from 'react-bootstrap/Card';

function TutorialCard({card}) {
  return (
    <Card style={{ width: '225px' }} text='dark'>
      <Card.Img variant="top" src={card.imageSrc} />
      <Card.Body>
        <Card.Title> { card.name } </Card.Title>
        <Card.Text style={{ fontSize: '15px' }}>
          { card.text }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TutorialCard;