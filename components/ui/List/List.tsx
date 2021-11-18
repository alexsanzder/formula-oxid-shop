import ProductCard from '@components/product/ProductCard/ProductCard';
import type { Product } from '@generated/graphql';

export interface ListProps {
  items: Product[];
}

const List = ({ items }: ListProps) => {
  return (
    <ul className="flex flex-col items-center justify-center w-full">
      {items && items.map((item) => <ProductCard key={item.id} product={item} />)}
    </ul>
  );
};

export default List;
