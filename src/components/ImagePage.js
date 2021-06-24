import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectImageById } from '../store/imagesSlice';
import { Container, Image } from 'semantic-ui-react';
import { JotsList } from './JotsList';

export const ImagePage = (props) => {
  const { imageId } = useParams()
  const image = useSelector((state) => selectImageById(state, imageId))

  return (
    <Container>
      <Image src={image.image_url} size='large' />
      <JotsList jots={image.jots} />
    </Container>
  )
}
