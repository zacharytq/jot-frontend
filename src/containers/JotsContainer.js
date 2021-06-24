import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllJots, fetchJots } from '../store/jotsSlice';
import { JotsList } from '../components/JotsList';
import {Container} from 'semantic-ui-react';

export const JotsContainer = () => {
  const jotStatus = useSelector(state => state.jots.status)
  const dispatch = useDispatch();
  const allJots = useSelector(state => selectAllJots(state))

  useEffect(() => {
    dispatch(fetchJots())
  }, [dispatch])

  let content 

  if (jotStatus === 'loading') {
    console.log(allJots)
    content = <div>
      <p>Loading</p>
      </div>
  } else if (jotStatus === 'success') {
    content = <JotsList jots={allJots} />
  }

  return (
    <div className='JotsContainer'>
      <Container>
      {content}
      </Container>
    </div>
  )
}

