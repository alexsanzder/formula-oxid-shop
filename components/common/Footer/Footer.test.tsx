import MockDate from 'mockdate';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import Footer from '@components/common/Footer';
import { createMockRouter } from '@test-utils/createMockRouter';
import { render, screen } from '@testing-library/react';

const setShowModal = jest.fn();
const setup = () => {
  const pages = [
    {
      id: 'page',
      title: 'Page',
      folder: 'CMSFOLDER_USERINFO',
    },
  ];
  const brands = [
    {
      id: 'brand',
      title: 'Brand',
    },
  ];
  const MyComponent = () => (
    <RouterContext.Provider value={createMockRouter({ query: { q: 'kite' } })}>
      <Footer pages={pages} brands={brands} />
    </RouterContext.Provider>
  );
  render(<MyComponent />);
};

describe('Footer', () => {
  beforeEach(() => MockDate.set('2021-11-22'));
  afterAll(() => MockDate.reset());

  it('render footer links and logo', () => {
    setup();

    expect(screen.getByRole('link', { name: /powered by oxid e sales/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /brand/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('render copyright date', () => {
    setup();
    expect(screen.getByText(/in freiburg 2021/i)).toBeInTheDocument();
  });
});
