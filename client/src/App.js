import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/layout/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Pomokan from './components/pomokan/Pomokan';


function App() {
  return (
    <Router>
        <Route exact path='/' component={Homepage} />
        <section>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/pomokan' component={Pomokan} />
          </Switch>
        </section>
    </Router>
  );
}

export default App;