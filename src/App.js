import React from 'react';
import { UploadImage } from './components/UploadImage';
import { Signup } from './auth/Signup'
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
        </Switch>

      </div>
    </Router>
  );
}

export default App;
