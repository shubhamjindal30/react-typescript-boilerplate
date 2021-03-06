import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { ValidateUtil } from '../../utils';
import { AuthActions } from '../../redux/actions';

const Register: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameError('');
    setFirstName(e.currentTarget.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameError('');
    setLastName(e.currentTarget.value);
  };

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

  const handleSignUp = async () => {
    if (firstName.length < 1) {
      setFirstNameError('First name cannot be empty!');
      firstNameRef.current?.focus();
      return;
    }
    if (lastName.length < 1) {
      setLastNameError('Last name cannot be empty!');
      lastNameRef.current?.focus();
      return;
    }
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
    const onError = (errorMsg: string) => {
      setError(errorMsg);
      setLoading(false);
    };
    setLoading(true);
    dispatch(AuthActions.signUp({ firstName, lastName, email, password }, onError));
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div className={classes.body}>
      <Container maxWidth='xs'>
        <Paper className={classes.box}>
          <Grid container direction='column' alignItems='flex-start' justifyContent='center'>
            <Typography className={classes.heading} variant='h5'>
              Sign up
            </Typography>
            <TextField
              id='first-name'
              inputRef={firstNameRef}
              className={classes.firstNameField}
              required
              fullWidth
              variant='outlined'
              label='First Name'
              value={firstName}
              autoFocus
              onChange={handleFirstNameChange}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              id='last-name'
              inputRef={lastNameRef}
              className={classes.textFields}
              required
              fullWidth
              variant='outlined'
              label='Last Name'
              value={lastName}
              onChange={handleLastNameChange}
              error={!!lastNameError}
              helperText={lastNameError}
            />
            <TextField
              id='email'
              inputRef={emailRef}
              className={classes.textFields}
              required
              fullWidth
              variant='outlined'
              label='Email'
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              id='password'
              data-testid='password'
              inputRef={passwordRef}
              className={classes.textFields}
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
            <Button
              className={classes.signUpBtn}
              fullWidth
              variant='contained'
              color='primary'
              onClick={handleSignUp}
            >
              {loading ? 'Loading...' : 'Sign up'}
            </Button>
            {error && (
              <Typography variant='body2' className={classes.errorMsg}>
                {error}
              </Typography>
            )}
          </Grid>
        </Paper>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='center'
          className={classes.signInView}
        >
          <Typography variant='body1'>{'Already have an account? '}</Typography>
          <Button className={classes.signInBtn} color='primary' onClick={handleSignInClick}>
            Sign in
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;

const useStyles = makeStyles({
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
  firstNameField: {
    marginTop: 30
  },
  textFields: {
    marginTop: 20
  },
  forgotPassBtn: {
    marginTop: 5,
    textTransform: 'none'
  },
  signUpBtn: {
    marginTop: 30
  },
  errorMsg: {
    marginTop: 10,
    color: 'red'
  },
  signInView: {
    marginTop: 15
  },
  signInBtn: {
    textTransform: 'none'
  }
});
