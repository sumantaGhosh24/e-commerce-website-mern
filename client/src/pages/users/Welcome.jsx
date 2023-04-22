import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {useTitle} from "../../hooks";

const Welcome = () => {
  useTitle("Welcome");

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircleLoader color="#0D6EFD" size={480} />
      </div>
    );
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = product;
    const tableContent =
      ids?.length &&
      ids.map((productId) => <Product key={productId} productId={productId} />);

    content = (
      <div className="container mx-auto shadow-xl rounded-xl my-10 p-5">
        <h1 className="mb-5 text-2xl font-bold">All Products</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tableContent}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

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

function getWordStr(str, len = 10) {
  return str.split(/\s+/).slice(0, len).join(" ");
}

export default Welcome;
