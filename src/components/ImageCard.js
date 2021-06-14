import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImageById, imageById } from '../store/imagesSlice';

export const ImageCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  //const selectedImage = useSelector(state => imageById(state, id))

  useEffect(() => {
    dispatch(fetchImageById(id))
    
  }, [dispatch, id])
  
  return (
    <div>
      <p>is this working</p>
    </div>
  )
}
