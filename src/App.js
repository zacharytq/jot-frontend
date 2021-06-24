import React from 'react';
import { UploadImage } from './components/UploadImage';
import { ImagesContainer } from './containers/ImagesContainer';
import { JotsContainer } from './containers/JotsContainer'
import { Navbar } from './components/NavBar';
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
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <React.Fragment><UploadImage /></React.Fragment>} />
          <Route exact path='/signup' render={() => <><Signup /></>} />
          <Route exact path='/login' component={Login} />
          <Route path='/images' render={() => <><ImagesContainer /></>} />
          <Route path='/jots' render={() => <><JotsContainer /></>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
