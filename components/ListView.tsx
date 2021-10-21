import ProductCard from '@components/ProductCard';
import type { Product } from '@generated/graphql';

export interface ListProps {
  items: Product[];
}

const ListView = ({ items }: ListProps) => {
  return (
    <ul className="flex flex-col items-center justify-center w-full">
      {items && items.map((item) => <ProductCard key={item.id} product={item} />)}
    </ul>
  );
};

export default ListView;
