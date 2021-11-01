import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { GetProductSiteQuery } from '@generated/types';
import StarRating from './StarRating';

interface ListItemProps {
  className?: string;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  product: GetProductSiteQuery['products'][0];
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard = ({ className, product, imgProps }: ListItemProps) => {
  const { seo, title, imageGallery, price, rating } = product;

  return (
    <li className={className}>
      <Link href="/product/[slug]" as={`/product/${seo.slug}`}>
        <a className="hover:cursor-pointer hover:shadow-2xl hover:border-gray-300 dark:hover:bg-black hover:bg-white flex flex-col justify-start w-full p-4 mt-4 space-y-4 border border-transparent rounded-sm">
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
          <div>
            <h2
              className="dark:text-gray-400 py-1 text-base font-bold text-gray-700"
              dangerouslySetInnerHTML={{ __html: title || '' }}
            />
            <p className="dark:text-gray-300 text-xl font-semibold">{`${price?.price} ${price?.currency.sign}`}</p>
            <StarRating className="py-2" count={rating.rating} />
            <button className="hover:bg-gradient-to-r dark:bg-gradient-to-r dark:hover:bg-none dark:bg-gray-700 from-purple-600 to-blue-600 flex items-center justify-center w-full py-2 my-4 text-center text-white bg-black">
              <span className="mr-2"> Add to cart</span>
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
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ProductCard;
