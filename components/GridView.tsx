import ProductCard from '@components/ProductCard';
import { GetProductSiteQuery } from '@generated/types';

export interface GridProps {
  items: GetProductSiteQuery['products'];
}

const GridView = ({ items }: GridProps) => {
  return (
    <ul className="sm:grid-cols-2 lg:grid-cols-4 grid w-full grid-cols-1 gap-8">
      {items && items!.map((item) => <ProductCard key={item.id} product={item} />)}
    </ul>
  );
};

export default GridView;
