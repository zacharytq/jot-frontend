import React from 'react';
import { UploadImage } from './components/UploadImage';
import { Images } from './components/Images';
import Signup from './auth/Signup';
import Login from './auth/Login';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => <React.Fragment><UploadImage /></React.Fragment>} />
          <Route exact path='/signup' render={() => <><Signup /></>} />
          <Route exact path='/login' component={Login} />
          <Route path='/images' render={() => <><Images /></>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
