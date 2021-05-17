import userEvent from '@testing-library/user-event';
import { render, screen } from 'src/test/test-utils';
import { build, fake } from '@jackfranklin/test-data-bot';

import Login from '../Login';

interface SignInData {
  email: string;
  password: string;
}

const buildForm = build<SignInData>({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password(8))
  }
});

describe('tests for Login page', () => {
  it('renders without errors', () => {
    render(<Login />);
  });

  it('gives error when email is empty', () => {
    render(<Login />);

    userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.queryByText(/email cannot be empty!/i)).toBeInTheDocument();
  });

  it('gives error when email is invalid', () => {
    render(<Login />);
    const { email } = buildForm({
      overrides: { email: 'invalidemail@gmail' }
    });

    userEvent.type(screen.getByRole('textbox', { name: /email/i }), email);
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.queryByText(/email cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/please enter a valid email!/i)).toBeInTheDocument();
  });

  it('gives error when password is empty or has less than 8 characters', () => {
    render(<Login />);
    const { email, password } = buildForm({
      overrides: { password: fake((f) => f.internet.password(5)) }
    });

    const signInBtn = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(screen.getByRole('textbox', { name: /email/i }), email);
    userEvent.click(signInBtn);
    expect(screen.queryByText(/email cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/please enter a valid email!/i)).not.toBeInTheDocument();
    const passwordError = screen.queryByText(/password must contain at least 8 characters!/i);
    expect(passwordError).toBeInTheDocument();

    userEvent.type(screen.getByTestId(/password/i), password);
    userEvent.click(signInBtn);
    expect(passwordError).toBeInTheDocument();
  });
});
