import {Link} from "react-router-dom";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {getWordStr} from "../../lib";

const PublicProduct = ({productId}) => {
  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({product: data?.entities[productId]}),
  });

  if (product) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow mt-10">
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
          <p className="mb-5 font-normal text-gray-700">
            {getWordStr(product.description, 12)}
          </p>
          <p className="mt-3 font-normal text-red-500">
            Please login to buy or view details of this product{" "}
            <Link className="ml-2 underline font-bold" to={`/login`}>
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  } else return null;
};

export default PublicProduct;
