import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImageById, selectImageById } from '../store/imagesSlice';
import { JotCard } from './JotCard';

export const ImageCard = () => {
  const dispatch = useDispatch();
  const { imageId } = useParams()
  const selectedImage = useSelector(state => selectImageById(state, imageId))
  const status = useSelector(state => state.images.status)

  useEffect(() => {
      dispatch(fetchImageById(imageId))
      
  }, [dispatch, imageId])

  let content

  if (status === 'loading') {
    content = <div>
      <p>loading</p>
      </div>
  } else if (status === 'success') {
    content = (
      <>
        <img src={selectedImage.imageUrl} alt={selectedImage.imageUrl} />
        {selectedImage.jots.map((jot) => {
          return (
            <JotCard jotId={jot.id} />
          )
        })}
      </>
        
    )
  }
  return (
    <div>
      {content}
    </div>
  )
}
