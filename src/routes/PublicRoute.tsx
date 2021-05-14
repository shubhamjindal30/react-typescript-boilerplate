import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../redux';

const PublicRoute: React.FunctionComponent<RouteProps> = (props) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  if (authenticated) {
    return <Redirect to='/dashboard' />;
  } else return <Route {...props} />;
};

export default PublicRoute;
