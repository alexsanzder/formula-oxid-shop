import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import ProductView from '@components/ProductView';
import { ssrGetProducts, ssrGetProductSite } from '@generated/pages';

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  const {
    props: { data, error },
  } = await ssrGetProductSite.getServerPage({
    variables: { slug: params!.slug },
  });
  if (error) {
    throw new Error(`Product with id '${params!.slug}' not found`);
  }

  return {
    props: data,
    revalidate: 200,
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const {
    props: {
      data: { products },
    },
  } = await ssrGetProducts.getServerPage({}, { req: undefined });

  const paths = locales
    ? locales.reduce<string[]>((arr, locale) => {
        // TODO Add a product path for every locale
        products.forEach((product) => {
          arr.push(`/${locale}/product/${product.seo.slug}`);
        });
        return arr;
      }, [])
    : products.map((product) => `/product/${product.seo.slug}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

const Product = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    product.active && <ProductView product={product} />
  );
};

Product.Layout = Layout;
export default Product;
