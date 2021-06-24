import {Card} from 'semantic-ui-react';
import { JotCard } from './JotCard';

export const JotsList = (props) => {

  let content

  if (props.jots) {
    content = props.jots.map(jot => (
    <JotCard
      key={jot.id}
      jot={jot}
    />
  ))
  } else {
    content = <div></div>
  }
  return (
    <Card.Group>
      {content}
    </Card.Group>
  )
}
