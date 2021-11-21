import { RouterContext } from 'next/dist/shared/lib/router-context';

import ShopProvider from '@context/ShopContext';

import Login from '@components/common/Login';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Login', () => {
  const setShowModal = jest.fn();
  const setup = () => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
    render(<Login setShowModal={setShowModal} showModal={true} />);
  };

  it('render login modal and close it', () => {
    setup();
    expect(screen.getByRole('dialog', { name: /welcome to formula/i })).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /close modal/i }));
    expect(setShowModal).toBeCalledTimes(1);
    expect(setShowModal).toBeCalledWith(false);
  });
});
