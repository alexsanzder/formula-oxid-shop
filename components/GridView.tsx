import ProductCard from "@components/ProductCard";
import { Product } from "@generated/types";

export interface GridProps {
    items: any[];
}

const GridView = ({ items }: GridProps) => {
    return (
        <ul className="flex flex-col items-center justify-center">
            <div className="sm:grid sm:grid-cols-4 sm:gap-8 w-full">
                {items &&
                    items.map((item: Partial<Product>) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
            </div>
        </ul>
    );
};

export default GridView;
