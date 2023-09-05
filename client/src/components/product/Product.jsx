import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {getWordStr} from "../../lib";

const Product = ({productId}) => {
  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({product: data?.entities[productId]}),
  });

  if (product) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <Link to={`/product/${product._id}`}>
          <img
            className="rounded-t-lg"
            src={product.image[0]}
            alt={product.title}
          />
        </Link>
        <div className="p-3">
          <Link to={`/product/${product._id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {getWordStr(product.title, 7)}
            </h5>
          </Link>
          <p className="mb-2 font-normal text-gray-700">
            {getWordStr(product.description, 12)}
          </p>
          <Link className="btn-icon" to={`/product/${product.id}`}>
            <FaEye className="mr-2 h-5 w-5" /> Details
          </Link>
        </div>
      </div>
    );
  } else return null;
};

Product.propTypes = {
  productId: propTypes.string,
};

export default Product;
