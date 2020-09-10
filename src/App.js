import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
function App() {
  return (
    <Router>
        <Route exact path='/' component={Homepage} />
    </Router>
  );
}

export default App;