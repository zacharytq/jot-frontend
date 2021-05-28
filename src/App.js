import React from 'react';
import { UploadImage } from './components/UploadImage';
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
        </Switch>

      </div>
    </Router>
  );
}

export default App;
