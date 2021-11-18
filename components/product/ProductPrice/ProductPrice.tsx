import React from 'react';

interface ProductPriceProps {
  price: any;
}
const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <div className="flex items-start py-1 space-x-1">
      <div className="flex items-start justify-start text-sm">
        <span className="text-2xl font-medium">{Math.trunc(price.price)}</span>
        <span className="dark:text-gray-200 text-gray-900">
          {`.${(price.price.toFixed(2) + '').split('.')[1]}`}
        </span>
      </div>
      <span className="dark:text-gray-400 text-sm text-gray-600">{price.currency.sign}</span>
    </div>
  );
};

export default ProductPrice;
