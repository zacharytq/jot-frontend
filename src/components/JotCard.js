import { useState } from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { acceptJot, rejectJot } from '../store/jotsSlice';
import { JotEditModal } from './JotEditModal'

export const JotCard = (props) => {
  const dispatch = useDispatch()
  const acceptableJot = {accepted: true}
  const [open, setOpen] = useState(false)
  
  const handleReject = () => {
    dispatch(rejectJot(props.jot.id))
  } 

  const handleAccept = () => {
    dispatch(acceptJot(acceptableJot))
  }

  return (
    <Card>
      <Card.Content>
        <Icon name='calendar' size='large' style={{float: "right"}} />
        <Card.Header>{props.jot.title}</Card.Header>
        <Card.Meta>{props.jot.location}</Card.Meta>
        <Card.Description>{props.jot.formattedDate}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='3'>
          <Button compact color='green' onClick={handleAccept}>
            Accept
          </Button>
          <Button compact color='red' onClick={handleReject}>
            Reject
          </Button>
          <Button compact onClick={() => setOpen(true)} >
            Edit
          </Button>
        </Button.Group>
        <JotEditModal jot={props.jot} opener={open} setOpener={setOpen} />
      </Card.Content>
    </Card>
  )
}
