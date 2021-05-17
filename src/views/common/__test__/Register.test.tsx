import userEvent from '@testing-library/user-event';
import { render, screen } from 'src/test/test-utils';
import { build, fake } from '@jackfranklin/test-data-bot';

import Register from '../Register';

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const buildForm = build<SignUpData>({
  fields: {
    firstName: fake((f) => f.name.firstName()),
    lastName: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password(8))
  }
});

describe('tests for Register page', () => {
  it('renders without errors', () => {
    render(<Register />);
  });

  it('gives error when first name is empty', () => {
    render(<Register />);

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.queryByText(/first name cannot be empty!/i)).toBeInTheDocument();
  });

  it('gives error when last name is empty', () => {
    render(<Register />);
    const { firstName } = buildForm();

    userEvent.type(screen.getByRole('textbox', { name: /first name/i }), firstName);
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.queryByText(/first name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name cannot be empty!/i)).toBeInTheDocument();
  });

  it('gives error when email is empty', () => {
    render(<Register />);
    const { firstName, lastName } = buildForm();

    userEvent.type(screen.getByRole('textbox', { name: /first name/i }), firstName);
    userEvent.type(screen.getByRole('textbox', { name: /last name/i }), lastName);
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.queryByText(/first name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email cannot be empty!/i)).toBeInTheDocument();
  });

  it('gives error when email is invalid', () => {
    render(<Register />);
    const { firstName, lastName, email } = buildForm({
      overrides: { email: 'invalidemail@gmail' }
    });

    userEvent.type(screen.getByRole('textbox', { name: /first name/i }), firstName);
    userEvent.type(screen.getByRole('textbox', { name: /last name/i }), lastName);
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), email);
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.queryByText(/first name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/please enter a valid email!/i)).toBeInTheDocument();
  });

  it('gives error when password is empty or has less than 8 characters', () => {
    render(<Register />);
    const { firstName, lastName, email, password } = buildForm({
      overrides: { password: fake((f) => f.internet.password(5)) }
    });

    const signUpBtn = screen.getByRole('button', { name: /sign up/i });

    userEvent.type(screen.getByRole('textbox', { name: /first name/i }), firstName);
    userEvent.type(screen.getByRole('textbox', { name: /last name/i }), lastName);
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), email);
    userEvent.click(signUpBtn);
    expect(screen.queryByText(/first name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email cannot be empty!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/please enter a valid email!/i)).not.toBeInTheDocument();
    const passwordError = screen.queryByText(/password must contain at least 8 characters!/i);
    expect(passwordError).toBeInTheDocument();

    userEvent.type(screen.getByTestId(/password/i), password);
    userEvent.click(signUpBtn);
    expect(passwordError).toBeInTheDocument();
  });
});
