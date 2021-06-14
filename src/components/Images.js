import { useEffect } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImageCard } from './ImageCard';

export const Images = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path} />
        <Route path={`${path}/:id`}>
          <ImageCard />
        </Route>
      </Switch>
    </div>
  )
}
