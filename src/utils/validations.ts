type isValid = string | null;

const validateEmail = (email: string): isValid => {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length < 1) return 'Email cannot be empty!';
  const emailPatternTest = emailPattern.test(email);
  if (!emailPatternTest) return 'Please enter a valid email!';
  return null;
};

const validatePassword = (password: string): isValid => {
  if (password.length < 8) return 'Password must contain at least 8 characters!';
  return null;
};

export default { validateEmail, validatePassword };
