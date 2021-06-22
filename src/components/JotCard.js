import { Button, Card, Icon } from 'semantic-ui-react';
export const JotCard = (props) => {

  return (
    <Card>
      <Card.Content>
        <Icon name='calendar' size='large' style={{float: "right"}} />
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>{props.location}</Card.Meta>
        <Card.Description>Date</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='3'>
          <Button compact color='green'>
            Accept
          </Button>
          <Button compact color='red'>
            Reject
          </Button>
          <Button compact>
            Edit
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
