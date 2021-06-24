import { useEffect } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImagesList } from '../components/ImagesList';
import { selectAllImages, fetchImages, selectImageById } from '../store/imagesSlice';
import { ImagePage } from '../components/ImagePage';
import { fetchJots, selectAllJots } from '../store/jotsSlice';

export const ImagesContainer = () => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const images = useSelector(state => selectAllImages(state))
  const imageStatus = useSelector(state => state.images.status)
  const selectedJots = useSelector(state => selectAllJots(state))

  useEffect(() => {
    dispatch(fetchImages())
    dispatch(fetchJots())
  }, [dispatch])

  return (imageStatus === 'success')?(
    <div>
      <Switch>
        <Route exact path={path}>
          {console.log(images)}
          <ImagesList imagesArray={images} />
        </Route>
        <Route path={`${path}/:imageId`}>
          <ImagePage />
        </Route>
      </Switch>
    </div>
  ):(
    <div>
    </div>
  )
}
