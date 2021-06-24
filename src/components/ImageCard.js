import { Card, Header, Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const ImageCard = (props) => {
  return (
    <Card as={Link} to={`/images/${props.imageObj.id}`}>
      <Image src={props.imageObj.image_url} size='medium'/>
      <Card.Content>
        <Header as='h3'>Associated Jots</Header>
        <List items={props.imageObj.jots.map(j => j.title)} />
      </Card.Content> 
    </Card>
  )
}
