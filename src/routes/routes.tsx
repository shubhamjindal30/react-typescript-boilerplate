import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Landing, Login, Register } from '../views';

const Routes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
