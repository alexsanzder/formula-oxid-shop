import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { useShop } from '@context/AppContext';

import { Grid, StarRating } from '@components/ui';
import { GetProductQuery } from '@generated/types';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import ProductPrice from '../ProductPrice';

const ProductView = ({ product }: GetProductQuery) => {
  const [state, setState] = useState({
    size: '',
    color: '',
  });

  const [active, setActive] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isShadowed, setIsShadowed] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    product?.variants.length ??
      setState({
        size: 'M',
        color: product?.variants[0]?.variantValues[1],
      });
  }, [product]);

  const getFilterVariants = (index: any) => {
    const array = product?.variants.length
      ? product.variants.map((variant: { variantValues: any }) => variant.variantValues[index])
      : [];

    return [...new Set(array)];
  };

  const getFilterVariantsImages = (filter: string) => {
    return product?.variants.length
      ? (product.variants
          .filter((variant: any) => variant.variantValues[1] === filter)
          .map((variant: any) => variant.imageGallery.icon) as any)
      : [];
  };

  const { shopState, setShopState } = useShop();
  useScrollPosition(
    ({ currPos }) => {
      // console.log('pos', currPos.y);
      setIsShadowed(currPos.y >= 420);
      setIsSticky(currPos.y >= 830);
      setShopState({ ...shopState, isSticky: currPos.y <= 540 });

      if (null !== scrollRef.current) {
        setIsShowed(currPos.y >= scrollRef.current.clientHeight + 100);
      }
    },
    [isSticky, isShadowed],
    undefined,
    true,
    0
  );
  return (
    <>
      <div
        className={clsx(
          'dark:bg-black dark:border-gray-600 fixed top-0 z-50 w-full bg-white border-b border-gray-300 shadow-lg',
          isSticky ? 'inline-block' : 'hidden'
        )}
      >
        <div className=" container flex items-center justify-between mx-auto text-sm">
          <div className="flex overflow-x-scroll text-sm text-gray-900">
            <button
              className={clsx(
                'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                'dark:text-gray-200 dark:bg-transparent ',
                'hover:border-gray-900 dark:hover:border-gray-50',
                active === 0 ? 'border-gray-900 dark:border-gray-50' : ''
              )}
            >
              Details
            </button>
            <button
              className={clsx(
                'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                'dark:text-gray-200 dark:bg-transparent ',
                'hover:border-gray-900 dark:hover:border-gray-50',
                active === 1 ? 'border-gray-50 dark:border-gray-900' : ''
              )}
            >
              Reviews
            </button>
            <button
              className={clsx(
                'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                'dark:text-gray-200 dark:bg-transparent ',
                'hover:border-gray-900 dark:hover:border-gray-50',
                active === 3 ? 'border-gray-50 dark:border-gray-900' : ''
              )}
            >
              Related
            </button>
          </div>
          <div
            className={clsx(
              'flex items-center justify-between',
              isShowed ? 'inline-block' : 'hidden'
            )}
          >
            <div className="flex flex-col items-end">
              <h3
                className="text-sm font-medium leading-4"
                dangerouslySetInnerHTML={{
                  __html: product.title,
                }}
              />
              <span className="dark:text-gray-300 text-xs leading-4 text-gray-600">{`${product.price.price.toFixed(
                2
              )} ${product.price.currency.sign}`}</span>
            </div>

            <div className="max-h-10 px-2">
              <Image
                src={product.imageGallery.images[0].image}
                alt={product.title || 'Product Image'}
                width={40}
                height={40}
                layout="fixed"
                objectFit="contain"
                blurDataURL={product.imageGallery.images[0].image}
              />
            </div>
            <button
              className={clsx(
                'bg-black flex items-center px-10 py-2.5 space-x-1 text-white rounded-sm',
                'dark:bg-transparent dark:hover:text-gray-400 dark:text-gray-50',
                'hover:border-gray-600 hover:text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className="capitalize">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      <article className="container flex-col items-start pt-4 pb-8 mx-auto space-y-4">
        <div
          ref={scrollRef}
          className="justify-items-end dark:border-gray-700 inline-grid w-full grid-cols-3 py-8 border-b border-gray-300"
        >
          <div className=" w-full col-span-2">
            <div className="flex justify-start">
              <div className="relative flex flex-col items-start justify-start mr-4">
                {product.imageGallery.images.map((image: any, idx: number) => (
                  <div
                    key={image.icon.substr(image.icon.length - 16)}
                    className={clsx('w-18 h-18 mb-4', idx !== 0 && 'opacity-50')}
                  >
                    <Image
                      src={image.icon}
                      alt={image.icon || 'Product Image'}
                      width={100}
                      height={100}
                      layout="fixed"
                      objectFit="contain"
                      blurDataURL={image.icon}
                    />
                  </div>
                ))}
              </div>
              <Image
                src={product.imageGallery.images[0].image}
                alt={product.title || 'Product Image'}
                width={600}
                height={600}
                layout="fixed"
                objectFit="contain"
                blurDataURL={product.imageGallery.images[0].image}
              />
            </div>
            <div className="dark:border-gray-600 flex w-full mt-6 overflow-x-scroll text-sm text-gray-900 border-b border-gray-300">
              <button
                className={clsx(
                  'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                  'dark:text-gray-200 dark:bg-transparent ',
                  'hover:border-gray-900 dark:hover:border-gray-50',
                  active === 0 ? 'border-gray-900 dark:border-gray-50' : ''
                )}
              >
                Details
              </button>
              <button
                className={clsx(
                  'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                  'dark:text-gray-200 dark:bg-transparent ',
                  'hover:border-gray-900 dark:hover:border-gray-50',
                  active === 1 ? 'border-gray-50 dark:border-gray-900' : ''
                )}
              >
                Reviews
              </button>
              <button
                className={clsx(
                  'inline-block mr-8 py-4 text-gray-700 border-b-2 border-transparent',
                  'dark:text-gray-200 dark:bg-transparent ',
                  'hover:border-gray-900 dark:hover:border-gray-50',
                  active === 3 ? 'border-gray-50 dark:border-gray-900' : ''
                )}
              >
                Related
              </button>
            </div>
            <div
              className="prose-purple dark:prose-dark w-full prose"
              dangerouslySetInnerHTML={{
                __html: product.longDescription ?? '',
              }}
            ></div>
          </div>
          <aside>
            <div className="w-96 flex flex-col px-6">
              <p className="py-2 text-xs text-gray-600">
                {product.categories[0].parent && product.categories[0].parent.parent
                  ? `${product.categories[0].parent.parent.title} / `
                  : null}
                {product.categories[0].parent ? `${product.categories[0].parent.title} / ` : null}
                <span
                  dangerouslySetInnerHTML={{
                    __html: product.categories[0].title,
                  }}
                ></span>
              </p>
              <div className="dark:border-gray-600 py-2 border-b border-gray-200">
                <h2
                  className="text-2xl font-bold"
                  dangerouslySetInnerHTML={{
                    __html: product.title,
                  }}
                />
                <p
                  className="py-1 text-sm font-light text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription ?? '',
                  }}
                />
              </div>
            </div>
            <div
              className={clsx(
                'flex flex-col w-96 p-6 sticky mt-3 rounded-sm top-32 border border-transparent',
                isShadowed && 'shadow-2xl dark:border-gray-700'
              )}
            >
              <ProductPrice price={product.price} />

              {product.variants && product.variantLabels
                ? product.variantLabels.map((label: string, idx: any) => (
                    <div key={label}>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-sm font-light capitalize">{`${label}: `}</span>
                          <span className="text-sm font-medium">
                            {label === 'Color'
                              ? state.color
                              : label === 'EU-Size'
                              ? state.size
                              : null}
                          </span>
                        </div>
                        {label === 'EU-Size' && (
                          <button className="float-right text-xs font-light underline">
                            Size Guide
                          </button>
                        )}
                      </div>
                      <div
                        className={clsx(
                          'flex items-center py-1 space-x-2',
                          label === 'EU-Size' && 'justify-between'
                        )}
                      >
                        {getFilterVariants(idx).map((variant: any) => (
                          <div
                            key={variant}
                            className={clsx(
                              'px-6 py-2 border border-gray-400 rounded-lg',
                              state.color === variant && 'border-black',
                              state.size === variant && 'border-black'
                            )}
                          >
                            {label.toLowerCase() === 'color' ? (
                              <div className="relative w-16 h-16">
                                <Image
                                  src={getFilterVariantsImages(variant)[0]}
                                  alt={getFilterVariantsImages(variant)[0] || 'Product Image'}
                                  width={100}
                                  height={100}
                                  layout="fill"
                                  objectFit="fill"
                                  blurDataURL={getFilterVariantsImages(variant)[0]}
                                />

                                {state.color === variant ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="-right-3 -bottom-1 absolute w-6 h-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : null}
                              </div>
                            ) : (
                              <p className="text-sm">{variant}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                : null}
              <div className="flex w-full pt-6 space-x-2">
                <div className="rounded-3 flex justify-around w-20 py-4 text-sm border border-gray-300 rounded-sm">
                  <div className="text-gray-300" role="button" tabIndex={0}>
                    -
                  </div>
                  1
                  <div className="dark:text-white text-black" role="button" tabIndex={0}>
                    +
                  </div>
                </div>
                <button className="rounded-3 dark:bg-white dark:text-black flex-1 py-4 text-sm font-medium text-white bg-black rounded-sm">
                  Add to cart
                </button>
              </div>
            </div>
          </aside>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="container w-full py-8 mx-auto">
            <h2 className="text-xl font-semibold text-black capitalize">Reviews</h2>
            {product.reviews.length ? (
              product?.reviews?.map((review) => (
                <div key={review.id} className="flex items-center py-4">
                  <div className="w-14 h-14 flex items-center justify-center text-lg text-center text-white capitalize bg-gray-400 rounded-full">
                    {review.reviewer?.firstName.charAt(0)}
                  </div>
                  <div className="flex flex-col ml-3">
                    <p className="flex items-start space-x-1 text-sm font-medium">
                      <StarRating count={review.rating}></StarRating>
                      <span>{`(${review.rating}/5)`}</span>
                    </p>
                    <i className="">{review.text}</i>
                    <p className="text-xs text-gray-700">
                      <span>{review.reviewer?.firstName}</span>
                      <span className="px-1">&#8226;</span>
                      <span>{format(new Date(review.createAt), 'eeee dd MMMM yyyy')}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-3">There are no reviews yet.</div>
            )}
          </div>
          {product.accessories ? (
            <div className="container w-full py-8 mx-auto">
              <h2 className="py-2 text-xl font-semibold text-black capitalize">Accessories</h2>
              <Grid className="py-4" items={product.accessories} />
            </div>
          ) : null}
          {product.crossSelling ? (
            <div className="container w-full py-8 mx-auto">
              <h2 className="py-2 text-xl font-semibold text-black capitalize">Related Products</h2>
              <Grid className="py-4" items={product.crossSelling} />
            </div>
          ) : null}
        </div>
      </article>

      <NextSeo
        title={product.title}
        description={product.shortDescription}
        openGraph={{
          type: 'website',
          title: product.title,
          description: product.shortDescription,
          images: [
            {
              url: product.imageGallery.images[0].image,
              width: 800,
              height: 600,
              alt: product.title,
            },
          ],
        }}
      />
    </>
  );
};

export default ProductView;
