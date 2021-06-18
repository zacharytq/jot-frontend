import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImageById, selectImageById } from '../store/imagesSlice';
import { selectAllJots, selectJotsByImage } from '../store/jotsSlice'
import { JotCard } from './JotCard';

export const ImageCard = () => {
  const dispatch = useDispatch();
  const { imageId } = useParams()
  const selectedImage = useSelector(state => selectImageById(state, imageId))
  const status = useSelector(state => state.images.status)
  const jotStatus = useSelector(state => state.jots.status)
  const jots = useSelector(state => selectAllJots(state)).filter(jot => jot.image_id === 1)

  useEffect(() => {
      dispatch(fetchImageById(imageId))
      
  }, [dispatch, imageId])

  let content

  if (status === 'loading' || jotStatus === 'loading') {
    content = <div>
      <p>loading</p>
      </div>
  } else if (status === 'success' && jotStatus === 'success') {
    content = jots.map(jot => (
      <JotCard key={jot.id.toString()} title={jot.title} />
    ))
  }
  return (
    <div>
      {content}
    </div>
  )
}
