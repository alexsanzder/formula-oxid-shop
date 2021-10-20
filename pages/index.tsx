import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const placeholderImg = "/product-img-placeholder.svg";

import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Slider from "react-slick";

import Layout from "@components/Layout";
import GridView from "@components/GridView";
import Marquee from "@components/Marquee";

import { ssrGetHomeSite } from "@generated/pages";

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
    manufacturers,
    newest,
    top,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    var sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div className="min-h-screen">
            <Slider {...sliderSettings}>
                {banners.map(
                    (banner) =>
                        banner.active && (
                            <div
                                key={banner.id}
                                className="h-[600px] w-full overflow-y-hidden relative"
                            >
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
            <div className="max-w-7xl flex flex-col items-center justify-between px-4 py-8 mx-auto mt-12">
                <h2
                    className="px-4 py-1 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
                    dangerouslySetInnerHTML={{
                        __html: bargain.title,
                    }}
                />
                <GridView items={bargain.products} />
            </div>

            <div className="bg-gray-100">
                <div className="max-w-7xl flex flex-col items-center justify-between w-full px-4 py-8 mx-auto">
                    <h2 className="px-4 py-1 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300">
                        Our brands
                    </h2>
                </div>
                <Marquee gradient={false} className="py-4">
                    {manufacturers.map(
                        (manufacturer) =>
                            manufacturer.active && (
                                <div
                                    key={manufacturer.id}
                                    className="w-full mx-4"
                                >
                                    <Image
                                        quality="85"
                                        src={
                                            manufacturer.icon || placeholderImg
                                        }
                                        alt={
                                            manufacturer.title ||
                                            "Manufacturer Image"
                                        }
                                        width={320}
                                        height={320}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </div>
                            )
                    )}
                </Marquee>
            </div>

            <div className="max-w-7xl flex flex-col items-center justify-between px-4 py-12 mx-auto">
                <h2
                    className="px-4 py-1 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
                    dangerouslySetInnerHTML={{
                        __html: newest.title,
                    }}
                />
                <GridView items={newest.products} />
            </div>
            <div className="max-w-7xl flex flex-col items-center justify-between px-4 py-12 mx-auto">
                <h2
                    className="px-4 py-1 text-2xl font-semibold text-gray-700 capitalize border-b-2 border-gray-300"
                    dangerouslySetInnerHTML={{
                        __html: top.title,
                    }}
                />
                <GridView items={top.products} />
            </div>
        </div>
    );
};

Home.Layout = Layout;
export default Home;
