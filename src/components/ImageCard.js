import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const ImageCard = () => {
  const dispatch = useDispatch();
  const { params } = useParams()
  const selectedImage = useSelector((state) => state.images.find(i => i.id === params))

  useEffect(() => {
    dispatch(fetchImagesById(params))
  }, [])
  
  return (
    <div>
      //image at top
      //render jots below
    </div>
  )
}
