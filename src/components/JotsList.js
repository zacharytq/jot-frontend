import {Card} from 'semantic-ui-react';
import { JotCard } from './JotCard';

export const JotsList = (props) => {
  const content = props.jots.map(jot => (
    <JotCard
      key={jot.id}
      jot={jot}
    />
  ))
  return (
    <Card.Group>
      {content}
    </Card.Group>
  )
}
