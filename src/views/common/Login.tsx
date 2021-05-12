import React, { useRef, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { ValidateUtil } from '../../utils';

const Login: React.FunctionComponent = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError('');
    setPassword(e.currentTarget.value);
  };

  const handleClickShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleMouseDownPassword = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSignIn = async () => {
    const emailError = ValidateUtil.validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      emailRef.current?.focus();
      return;
    }
    const passwordError = ValidateUtil.validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      passwordRef.current?.focus();
      return;
    }
  };

  return (
    <div className={classes.body}>
      <Container maxWidth='xs'>
        <Paper className={classes.box}>
          <Grid container direction='column' alignItems='flex-start' justify='center'>
            <Typography className={classes.heading} variant='h5'>
              Sign in
            </Typography>
            <TextField
              inputRef={emailRef}
              className={classes.emailField}
              required
              fullWidth
              variant='outlined'
              label='Email'
              value={email}
              autoFocus
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              inputRef={passwordRef}
              className={classes.passwordField}
              required
              fullWidth
              variant='outlined'
              label='Password'
              type={isPasswordHidden ? 'password' : 'text'}
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      color='primary'
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {isPasswordHidden ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button className={classes.forgotPassBtn} color='primary'>
              Forgot Password?
            </Button>
            <Button
              className={classes.signInBtn}
              fullWidth
              variant='contained'
              color='primary'
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Grid>
        </Paper>
        <Grid
          container
          direction='row'
          alignItems='center'
          justify='center'
          className={classes.signUpView}
        >
          <Typography variant='body1'>{"Don't have an account? "}</Typography>
          <Button className={classes.signUpBtn} color='primary' component={Link} to='/register'>
            Sign up
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(Login);

const useStyles = makeStyles(() => ({
  body: {
    height: '90vh',
    backgroundColor: '#fafafa',
    paddingLeft: '2vw',
    paddingRight: '2vw',
    paddingTop: '10vh'
  },
  box: {
    padding: 40,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 10
  },
  heading: {
    fontWeight: 'bold'
  },
  emailField: {
    marginTop: 30
  },
  passwordField: {
    marginTop: 20
  },
  forgotPassBtn: {
    marginTop: 5,
    textTransform: 'none'
  },
  signInBtn: {
    marginTop: 20
  },
  signUpView: {
    marginTop: 15
  },
  signUpBtn: {
    textTransform: 'none'
  }
}));
