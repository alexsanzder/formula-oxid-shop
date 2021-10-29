import ProductCard from '@components/ProductCard';
import { GetProductSiteQuery } from '@generated/types';
import clsx from 'clsx';

export interface GridProps {
  items: GetProductSiteQuery['products'];
  className?: string;
}

const GridView = ({ items, className }: GridProps) => {
  return (
    <ul className={clsx('sm:grid-cols-2 lg:grid-cols-4 grid w-full grid-cols-1 gap-8', className)}>
      {items && items!.map((item) => <ProductCard key={item.id} product={item} />)}
    </ul>
  );
};

export default GridView;
