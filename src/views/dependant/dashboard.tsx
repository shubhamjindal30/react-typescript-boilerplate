import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';

import { AuthActions } from '../../redux/actions';

const Dashboard: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthActions.signOut());
  };
  return (
    <Container maxWidth='sm'>
      <Typography>Welcome to the dashboard!</Typography>
      <Button variant='contained' color='primary' onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
