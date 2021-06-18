import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllJots, fetchJots } from '../store/jotsSlice';

export const JotsContainer = () => {
  const jotStatus = useSelector(state => state.jots.status)
  const dispatch = useDispatch();
  const allJots = useSelector(state => selectAllJots(state))

  useEffect(() => {
    dispatch(fetchJots())
  }, [dispatch])

  console.log(allJots)

}

