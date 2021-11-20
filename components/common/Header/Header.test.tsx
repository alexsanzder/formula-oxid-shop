import { RouterContext } from 'next/dist/shared/lib/router-context';

import ShopProvider from '@context/ShopContext';

import Header from '@components/common/Header';
import { createMockRouter } from '@test-utils/createMockRouter';
import { render, screen } from '@testing-library/react';

const MyComponent = () => (
  <RouterContext.Provider value={createMockRouter({ query: { q: 'kite' } })}>
    <ShopProvider>
      <Header categories={[]} />
    </ShopProvider>
  </RouterContext.Provider>
);

describe('Header', () => {
  it('should render topbar, logo, searchbox and login button', () => {
    render(<MyComponent />);
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
