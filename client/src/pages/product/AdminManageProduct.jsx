import {memo} from "react";
import {FaEye, FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {useTitle} from "../../hooks";

const AdminManageProduct = () => {
  useTitle("Manage Product");

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
      ids.map((productId, i) => (
        <Product key={productId} productId={productId} ind={i + 1} />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Owner
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Checked
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold capitalize mb-10">Manage Product</h2>
        <Link className="btn-icon" to="/admin-create-product">
          <FaPlus className="btn-icons" /> Create Product
        </Link>
        {content}
      </section>
    </>
  );
};

const Product = ({productId, ind}) => {
  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({product: data?.entities[productId]}),
  });

  if (product) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{product.id}</td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={product.user.image}
              alt={product.user._id}
            />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                {product.user.username}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500">
              {product.user.email}
            </p>
            <p className="mb-3 font-normal text-gray-500">
              {product.user.mobileNumber}
            </p>
          </div>
        </td>
        <td className="px-6 py-4">{getWordStr(product.title, 7)}</td>
        <td className="px-6 py-4">
          {product.image.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={product}
              className="h-18 w-18 mb-3 rounded-full"
            />
          ))}
        </td>
        <td className="px-6 py-4">{getWordStr(product.description)}</td>
        <td className="px-6 py-4">{getWordStr(product.content)}</td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={product.category.image}
              alt={product.category._id}
            />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                {product.category.name}
              </h5>
            </a>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={product.brand.image}
              alt={product.brand._id}
            />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                {product.brand.name}
              </h5>
            </a>
          </div>
        </td>
        <td className="px-6 py-4">{product.price}</td>
        <td className="px-6 py-4">
          {product.checked === true ? (
            <p className="bg-green-600 p-3 rounded-lg text-white">
              Checked by Admin
            </p>
          ) : (
            <p className="bg-red-600 p-3 rounded-lg text-white">
              Not Checked by Admin
            </p>
          )}
        </td>
        <td className="px-6 py-4">{product.stock}</td>
        <td className="px-6 py-4">{product.sold}</td>
        <td className="px-6 py-4">{product.createdAt}</td>
        <td className="px-6 py-4">{product.updatedAt}</td>
        <td className="px-6 py-4">
          <Link className="btn-icon" to={`/admin-product/${product.id}`}>
            <FaEye className="mr-2 h-10 w-10" /> Manage Product
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

function getWordStr(str, len = 10) {
  return str.split(/\s+/).slice(0, len).join(" ");
}

export default AdminManageProduct;
