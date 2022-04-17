import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { RootState } from 'src/redux';
import { AuthActions } from '../redux/actions';
import { Landing, Login, Register, Dashboard } from '../views';

const Routes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);
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
      {!authenticated && (
        <BrowserRoutes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </BrowserRoutes>
      )}
      {authenticated && (
        <BrowserRoutes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </BrowserRoutes>
      )}
    </BrowserRouter>
  );
};

export default Routes;
