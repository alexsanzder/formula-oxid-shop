import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import { StarRating } from '@components/ui';
import { GetProductSiteQuery } from '@generated/types';

import ProductPrice from '../ProductPrice';

interface ListItemProps {
  className?: string;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  product: GetProductSiteQuery['products'][0];
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard = ({ className, product, imgProps }: ListItemProps) => {
  const { seo, title, imageGallery, rating } = product;

  return (
    <li className={clsx('relative group', className)}>
      <button className="group-hover:shadow-lg right-5 top-4 dark:bg-black absolute z-30 p-4 bg-white rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <Link href="/product/[slug]" as={`/product/${seo.slug}`}>
        <a className="hover:cursor-pointer hover:shadow-xl dark:hover:bg-black hover:bg-white h-[500px]  flex flex-col justify-between w-full p-6 space-y-4 border border-gray-200 rounded">
          <div className="relative w-full bg-white">
            {imageGallery && (
              <Image
                quality="85"
                src={imageGallery.thumb || placeholderImg}
                alt={title || 'Product Image'}
                width={320}
                height={320}
                layout="responsive"
                objectFit="contain"
                blurDataURL={imageGallery.thumb}
                {...imgProps}
              />
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <h2
              className="dark:text-gray-400 text-base font-bold text-gray-700"
              dangerouslySetInnerHTML={{ __html: title || '' }}
            />
            <ProductPrice price={product.price} />
            <StarRating count={rating.rating} />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ProductCard;
