import Link from "next/link";
import Image, { ImageProps } from "next/image";
import type { Product } from "@generated/types";

interface ListItemProps {
    className?: string;
    imgProps?: Omit<
        ImageProps,
        "src" | "layout" | "placeholder" | "blurDataURL"
    >;
    product: Partial<Product>;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard = ({ className, product, imgProps }: ListItemProps) => {
    const { id, seo, title, imageGallery, price } = product;
    const url = new URL(seo?.url ? seo.url : "/");
    const slug = url.pathname.replace(/\.[^/.]+$/, "");
    return (
        <Link href="/product/[id]" as={`/product/${id}`}>
            <a className={className}>
                <li className="hover:cursor-pointer hover:shadow hover:border-gray-300 hover:bg-gray-50 flex flex-col justify-start w-full p-4 mt-4 space-y-4 border border-transparent rounded-sm">
                    <div className="relative w-full bg-white">
                        {imageGallery && (
                            <Image
                                quality="85"
                                src={imageGallery.thumb || placeholderImg}
                                alt={title || "Product Image"}
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
                            className="text-lg font-bold"
                            dangerouslySetInnerHTML={{ __html: title || "" }}
                        />
                        <span className="font-semibold text-gray-700">{`${price?.price} ${price?.currency.sign}`}</span>
                    </div>
                </li>
            </a>
        </Link>
    );
};

export default ProductCard;
