import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Landing } from '../views';

const Routes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
