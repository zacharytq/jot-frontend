import { useSelector } from 'react-redux';
import { selectJotById } from '../store/jotsSlice';

export const JotCard = (props) => {
  const jot = useSelector(state => selectJotById(state, props.jotId))

  return (
    <div>
      <p>{jot.title}</p>
    </div>
  )
}
