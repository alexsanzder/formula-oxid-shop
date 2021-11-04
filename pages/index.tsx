import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
const placeholderImg = '/product-img-placeholder.svg';

import { useEffect } from 'react';

import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

import { useShop } from '@context/AppContext';

import { Layout } from '@components/common';
import { Grid, Marquee } from '@components/ui';
import { ssrGetHomeSite } from '@generated/pages';

export const getStaticProps = async () => {
  const {
    props: { data, error },
  } = await ssrGetHomeSite.getServerPage({});
  if (error) {
    throw new Error(`Home page error: ${error}`);
  }

  return {
    props: { ...data, isSticky: true },
    revalidate: 60,
  };
};

const Home = ({
  banners,
  bargain,
  brands,
  newest,
  top,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { shopState, setShopState } = useShop();
  useEffect(() => {
    setShopState({ ...shopState, isSticky: true });
  }, [setShopState, shopState]);

  var sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className="min-h-screen">
      <Slider {...sliderSettings}>
        {banners.map(
          (banner) =>
            banner.active && (
              <div key={banner.id} className="h-[740px] w-full overflow-y-hidden relative">
                <Image
                  key={banner.id}
                  alt={banner.title}
                  src={banner.picture}
                  layout="responsive"
                  width={1200}
                  height={740}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={banner.picture}
                />
              </div>
            )
        )}
      </Slider>
      <div className="container flex flex-col items-center justify-between px-4 py-12 mx-auto mt-12">
        <h2
          className="dark:text-purple-500 px-4 py-2 text-2xl font-semibold text-gray-900 capitalize"
          dangerouslySetInnerHTML={{
            __html: bargain.title,
          }}
        />
        <Grid className="py-4" items={bargain.products} />
      </div>

      <div className="dark:bg-gray-800 mb-6 bg-gray-100">
        <div className="container flex flex-col items-center justify-between w-full px-4 pt-8 mx-auto">
          <h2 className="dark:text-purple-500 px-4 text-2xl font-semibold text-gray-900 capitalize">
            Our brands
          </h2>
        </div>
        <Marquee gradient={false} className="py-6">
          {brands.map(
            (brand) =>
              brand.active && (
                <Link key={brand.id} href={`/search/brands/${brand.title.toLowerCase()}`}>
                  <a className="hover:scale-125 w-full mx-6 transform">
                    <Image
                      quality="85"
                      src={brand.icon || placeholderImg}
                      alt={brand.title || 'Manufacturer Image'}
                      width={100}
                      height={100}
                      layout="fixed"
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )
          )}
        </Marquee>
      </div>

      <div className="container flex flex-col items-center justify-between px-4 py-12 mx-auto">
        <h2
          className="dark:text-purple-500 px-4 py-2 text-2xl font-semibold text-gray-900 capitalize"
          dangerouslySetInnerHTML={{
            __html: newest.title,
          }}
        />
        <Grid className="py-4" items={newest.products} />
      </div>
      <div className="container flex flex-col items-center justify-between px-4 py-12 mx-auto">
        <h2
          className="dark:text-purple-500 px-4 py-2 text-2xl font-semibold text-gray-900 capitalize"
          dangerouslySetInnerHTML={{
            __html: top.title,
          }}
        />
        <Grid className="py-4" items={top.products} />
      </div>
    </div>
  );
};

Home.Layout = Layout;
export default Home;
