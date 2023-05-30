import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {getWordStr} from "../../lib";

const ManageProduct = ({productId, ind}) => {
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
              src={product?.user?.image}
              alt={product?.user?._id}
            />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                {product?.user?.username}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500">
              {product?.user?.email}
            </p>
            <p className="mb-3 font-normal text-gray-500">
              {product?.user?.mobileNumber}
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

export default ManageProduct;
