import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  // Fungsi untuk membuat bintang rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${
            i < rating ? "text-yellow-400" : "text-gray-400"
          } text-lg`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link
      to={`/products/${product.slug}` ?? ''}
      className="flex flex-col max-w-[370px] flex-wrap p-4 bg-[#2C3E50] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {/* Tag Diskon */}
      {product.discount > 0 && (
        <span className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-full text-sm font-semibold">
          {product.discount}% OFF
        </span>
      )}
      
      <img
        src={product?.imageUrl ?? ''}
        alt={product?.name ?? 'No Title'}
        className="block max-h-[300px] mb-4 object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-110"
      />
      <div className="flex flex-col gap-3 relative">
        <h4 className="font-semibold text-lg text-white hover:text-[#1abc9c] transition-all duration-300 ease-in-out">
          {product?.name ?? 'No Title'}
        </h4>
        <span className="block font-medium text-sm text-[#B0BEC5]">{product?.category ?? "Uncategorized"}</span>
        <span className="block font-semibold text-xl text-white">
          {product?.price > 0 ? formatToIDRCurrency(product.price) : 'Not For Sale'}
        </span>

        {/* Rating */}
        <div className="flex gap-1">{renderRating(product.rating ?? 0)}</div>

        <div className="mt-4">
          {product.stock <= 0 ? (
            <p className="text-xl font-semibold text-center text-red-500">Out of Stock</p>
          ) : (product.stock <= 25 && product.stock !== 0) ? (
            <>
              <p className="text-xl font-semibold text-center text-yellow-500">Almost Sold Out</p>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-3 bg-[#1abc9c] text-center hover:bg-[#16a085] text-white active:bg-[#1d6e61] transition-all duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="inline-flex items-center justify-center gap-2 p-3 bg-[#1abc9c] text-center hover:bg-[#16a085] text-white active:bg-[#1d6e61] transition-all duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
              <span>Add to cart</span>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
