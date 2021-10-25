import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
const placeholderImg = '/product-img-placeholder.svg';

import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

import Layout from '@components/Layout';
import GridView from '@components/GridView';
import Marquee from '@components/Marquee';

import { ssrGetHomeSite } from '@generated/pages';

export const getStaticProps = async () => {
  const {
    props: { data, error },
  } = await ssrGetHomeSite.getServerPage({});
  if (error) {
    throw new Error(`Home page error: ${error}`);
  }

  return {
    props: data,
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
              <div key={banner.id} className="h-[600px] w-full overflow-y-hidden relative">
                <Image
                  key={banner.id}
                  className="h-[600px]"
                  alt={banner.title}
                  src={banner.picture}
                  layout="responsive"
                  width={1200}
                  height={600}
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
          className="dark:text-gray-100 px-4 py-2 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
          dangerouslySetInnerHTML={{
            __html: bargain.title,
          }}
        />
        <GridView className="py-2" items={bargain.products} />
      </div>

      <div className="dark:bg-gray-800 mb-6 bg-gray-100">
        <div className="container flex flex-col items-center justify-between w-full px-4 py-12 mx-auto">
          <h2 className="dark:text-gray-100 px-4 py-2 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300">
            Our brands
          </h2>
        </div>
        <Marquee gradient={false} className="py-4">
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
          className="dark:text-gray-100 px-4 py-2 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
          dangerouslySetInnerHTML={{
            __html: newest.title,
          }}
        />
        <GridView className="py-2" items={newest.products} />
      </div>
      <div className="container flex flex-col items-center justify-between px-4 py-12 mx-auto">
        <h2
          className="dark:text-gray-100 px-4 py-2 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
          dangerouslySetInnerHTML={{
            __html: top.title,
          }}
        />
        <GridView className="py-2" items={top.products} />
      </div>
    </div>
  );
};

Home.Layout = Layout;
export default Home;
