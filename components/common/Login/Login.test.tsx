import Login from '@components/common/Login';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

afterEach(cleanup);

const setShowModal = jest.fn();
const setup = () => {
  // eslint-disable-next-line testing-library/no-node-access
  let portalRoot = global.document && global.document.getElementById('portal');

  if (!portalRoot) {
    portalRoot = global.document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    global.document.body.appendChild(portalRoot);
  }

  render(<Login setShowModal={setShowModal} showModal={true} />);
};

describe('Login', () => {
  it('render login modal and close it', () => {
    setup();

    expect(screen.getByRole('dialog', { name: /welcome to formula/i })).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /close modal/i }));
    expect(setShowModal).toBeCalledTimes(1);
    expect(setShowModal).toBeCalledWith(false);
  });

  it('test clicking the submit button should validate the form', async () => {
    setup();

    expect(screen.queryByText('email is a required field')).not.toBeInTheDocument();
    expect(screen.queryByText('password must be at least 8 characters')).not.toBeInTheDocument();

    user.click(screen.getByText(/sign in/i));
    await screen.findByText('email is a required field');
    await screen.findByText('password must be at least 8 characters');
  });

  it('test adding correct input values should submit the form', async () => {
    setup();

    user.type(screen.getByLabelText(/email/i), 'test@tester.test');
    user.type(screen.getByLabelText(/password/i), 'secretPassword');
    user.click(screen.getByText(/sign in/i));

    await waitFor(() => {
      expect(screen.queryByText('email is a required field')).not.toBeInTheDocument();
    });
    expect(screen.queryByText('password must be at least 8 characters')).toBeNull();
  });
});
