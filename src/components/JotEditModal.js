import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Modal, Icon, Button, Form } from 'semantic-ui-react';
import { updateJot } from '../store/jotsSlice';

export const JotEditModal = (props) => {
  const [editableJot, setEditableJot] = useState({...props.jot})
  const jotEditStatus = useSelector(state => state.jots.editStatus)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      dispatch(updateJot(editableJot))
    } catch (error) {
      console.log(error)
    } finally {
      props.setOpener(false)
    }
  }

  const handleChange = (event) => setEditableJot({...editableJot, [event.target.name]: event.target.value})

  return (
    <Modal
      open={props.opener}
      closeIcon
      onOpen={() => props.setOpener(true)}
      onClose={() => props.setOpener(false)}
    >
      <Header icon='calendar' content='Edit Jot' />
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input label='Event Title' defaultValue={editableJot.title} name='title' onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Location' name='location' defaultValue={editableJot.location} onChange={handleChange}/>
          </Form.Group>
          <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Content>
      </Modal> )
}
