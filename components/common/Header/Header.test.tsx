import { RouterContext } from 'next/dist/shared/lib/router-context';

import ShopProvider from '@context/ShopContext';

import Header from '@components/common/Header';
import { createMockRouter } from '@test-utils/createMockRouter';
import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';

const MyComponent = () => (
  <RouterContext.Provider value={createMockRouter({ query: { q: 'kite' } })}>
    <ShopProvider>
      <Header categories={[]} />
    </ShopProvider>
  </RouterContext.Provider>
);

describe('Header', () => {
  const setup = () => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
    render(<MyComponent />);
  };

  it('should render topbar, logo, searchbox and login button', () => {
    setup();
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should open the login modal', () => {
    setup();

    user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('dialog', { name: /welcome to formula/i })).toBeInTheDocument();
  });

  it('be sticky when the user scroll the page', () => {
    setup();
    expect(screen.getByRole('header')).not.toHaveClass('shadow-xl');
    fireEvent.scroll(window, { target: { scrollY: 300 } });
    expect(screen.getByRole('header')).toHaveClass('shadow-xl');
  });
});
