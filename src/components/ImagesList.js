import { Card } from 'semantic-ui-react';
import { ImageCard } from './ImageCard';

export const ImagesList = (props) => {
  return (
    <Card.Group>
      {props.imagesArray.map(i => <ImageCard key={i.id} imageObj={i} />)}
    </Card.Group>
  )
}
