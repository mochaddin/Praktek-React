import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductList({ products }) {
  return (
    <>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard
            product={product}
            index={index}
            key={product?.id ?? index}
            className="transform hover:scale-105 transition-all duration-300"
          />
        ))
      ) : (
        <h5 className="text-center col-span-4 text-2xl text-gray-500 font-semibold p-10">
          <span className="block text-xl text-red-600 mb-2">Oops!</span>
          There&apos;s no products currently.
        </h5>
      )}
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
