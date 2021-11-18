import clsx from 'clsx';

import ProductCard from '@components/product/ProductCard/ProductCard';
import { GetProductSiteQuery } from '@generated/types';

export interface GridProps {
  items: GetProductSiteQuery['products'];
  className?: string;
}

const Grid = ({ items, className }: GridProps) => {
  return (
    <ul className={clsx('sm:grid-cols-2 lg:grid-cols-4 grid w-full grid-cols-1 gap-3', className)}>
      {items && items!.map((item) => <ProductCard key={item.id} product={item} />)}
    </ul>
  );
};

export default Grid;
