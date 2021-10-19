import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";

import { GetProductQuery } from "@generated/types";
import { NextSeo } from "next-seo";
import GridView from "./GridView";

const ProductView = ({ product }: GetProductQuery) => {
    const [state, setState] = useState({
        size: "",
        color: "",
    });

    useEffect(() => {
        setState({
            size: "M",
            color: product?.variants[0]?.variantValues[1],
        });
    }, [product]);

    const getFilterVariants = (index: any) => {
        const array = product.variants.map(
            (variant: { variantValues: any }) => variant.variantValues[index]
        );

        return [...new Set(array)];
    };

    const getFilterVariantsImages = (filter: string) => {
        return product.variants
            .filter((variant: any) => variant.variantValues[1] === filter)
            .map((variant: any) => variant.imageGallery.icon) as any;
    };

    return (
        <>
            <div className="max-w-7xl flex items-start flex-1 w-full px-4 py-4 mx-auto mt-8 space-x-40">
                <div className=" flex justify-center">
                    <div className="relative flex flex-col items-start justify-start mr-4">
                        {product.imageGallery.images.map(
                            (image: any, idx: number) => (
                                <div
                                    key={image.icon.substr(
                                        image.icon.length - 16
                                    )}
                                    className={clsx(
                                        "w-18 h-18 mb-4",
                                        idx !== 0 && "opacity-50"
                                    )}
                                >
                                    <Image
                                        src={image.icon}
                                        alt={image.icon || "Product Image"}
                                        width={100}
                                        height={100}
                                        layout="fixed"
                                        objectFit="contain"
                                        blurDataURL={image.icon}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <Image
                        src={product.imageGallery.images[0].image}
                        alt={product.title || "Product Image"}
                        width={600}
                        height={600}
                        layout="fixed"
                        objectFit="contain"
                        blurDataURL={product.imageGallery.images[0].image}
                    />
                </div>
                <div className="max-w-lg p-4">
                    <p className="py-2 text-xs text-gray-600">
                        {product.categories[0].parent &&
                        product.categories[0].parent.parent
                            ? `${product.categories[0].parent.parent.title} / `
                            : null}
                        {product.categories[0].parent
                            ? `${product.categories[0].parent.title} / `
                            : null}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: product.categories[0].title,
                            }}
                        ></span>
                    </p>
                    <div className="py-2 border-b border-gray-200">
                        <h2
                            className="text-2xl font-bold"
                            dangerouslySetInnerHTML={{
                                __html: product.title,
                            }}
                        />
                        <p
                            className="py-1 text-sm font-light text-gray-500"
                            dangerouslySetInnerHTML={{
                                __html: product.shortDescription,
                            }}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-start py-1 mt-4 space-x-1">
                            <div className="flex items-start justify-start text-sm">
                                <span className=" text-2xl font-semibold">
                                    {Math.trunc(product.price.price)}
                                </span>
                                <span className="text-gray-800">
                                    {`.${
                                        (
                                            product.price.price.toFixed(2) + ""
                                        ).split(".")[1]
                                    }`}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.price.currency.sign}
                            </span>
                        </div>
                        {product.variantLabels.map(
                            (label: string, idx: any) => (
                                <div key={label}>
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <span className="text-sm font-light capitalize">
                                                {`${label}: `}
                                            </span>
                                            <span className="text-sm font-medium">
                                                {label === "Color"
                                                    ? state.color
                                                    : label === "EU-Size"
                                                    ? state.size
                                                    : null}
                                            </span>
                                        </div>
                                        {label === "EU-Size" && (
                                            <button className="float-right text-xs font-light underline">
                                                Size Guide
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        className={clsx(
                                            "flex items-center py-1 space-x-2",
                                            label === "EU-Size" &&
                                                "justify-between"
                                        )}
                                    >
                                        {getFilterVariants(idx).map(
                                            (variant: any) => (
                                                <div
                                                    key={variant}
                                                    className={clsx(
                                                        "px-6 py-2 border border-gray-400 rounded-lg",
                                                        state.color ===
                                                            variant &&
                                                            "border-black",
                                                        state.size ===
                                                            variant &&
                                                            "border-black"
                                                    )}
                                                >
                                                    {label.toLowerCase() ===
                                                    "color" ? (
                                                        <div className="relative w-16 h-16">
                                                            <img
                                                                className="object-cover"
                                                                src={
                                                                    getFilterVariantsImages(
                                                                        variant
                                                                    )[0]
                                                                }
                                                                alt={variant}
                                                            />
                                                            {state.color ===
                                                            variant ? (
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
                                                        <p className="text-sm">
                                                            {variant}
                                                        </p>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                        <div className="flex w-full pt-6 space-x-2">
                            <div className="rounded-3 flex justify-around w-20 py-4 text-sm border border-gray-300">
                                <div
                                    className="text-gray-300"
                                    role="button"
                                    tabIndex={0}
                                >
                                    -
                                </div>
                                1
                                <div
                                    className="text-black"
                                    role="button"
                                    tabIndex={0}
                                >
                                    +
                                </div>
                            </div>
                            <button className="rounded-3 flex-1 py-4 text-sm font-light text-white bg-black">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl flex flex-col items-center justify-between px-4 py-8 mx-auto">
                <div className="w-full py-8">
                    <h2 className="text-xl font-semibold text-gray-700 capitalize">
                        Related Products
                    </h2>
                    <GridView items={product.crossSelling} />
                </div>
            </div>
            <NextSeo
                title={product.title}
                description={product.shortDescription}
                openGraph={{
                    type: "website",
                    title: product.title,
                    description: product.shortDescription,
                    images: [
                        {
                            url: product.imageGallery.images[0]?.image!,
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
