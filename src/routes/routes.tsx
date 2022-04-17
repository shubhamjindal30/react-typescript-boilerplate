import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AuthActions } from '../redux/actions';
import { Landing, Login, Register, Dashboard } from '../views';

const Routes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        setLoading(true);
        await dispatch(AuthActions.getUserData(user.uid));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path='/' component={Landing} />
        <PublicRoute exact path='/login' component={Login} />
        <PublicRoute exact path='/register' component={Register} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
