import MockDate from 'mockdate';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import Footer from '@components/common/Footer';
import { Content, Manufacturer } from '@generated/types';
import { createMockRouter } from '@test-utils/createMockRouter';
import { render, screen } from '@testing-library/react';

const setup = ({ pages, brands }: any) => {
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
    setup({ pages, brands });

    expect(screen.getByRole('link', { name: /powered by oxid e sales/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /brand/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('render only cms pages', () => {
    const pages = [
      {
        id: 'page',
        title: 'Page',
        folder: 'NO_CMS_FOLDER',
      },
    ];
    const brands = [
      {
        id: 'brand',
        title: 'Brand',
      },
    ];
    setup({ pages, brands });
    expect(screen.queryByRole('link', { name: /page/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('render copyright date', () => {
    const pages = [
      {
        id: 'page',
        title: 'Page',
        folder: '',
      },
    ];
    const brands = [
      {
        id: 'brand',
        title: 'Brand',
      },
    ];
    setup({ pages, brands });
    expect(screen.getByText(/in freiburg 2021/i)).toBeInTheDocument();
  });
});
