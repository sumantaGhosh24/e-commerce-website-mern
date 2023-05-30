import {useEffect, useState} from "react";
import {BiImageAdd} from "react-icons/bi";
import {FaTrash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../app/features/product/productApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../";

const EditProductForm = ({product}) => {
  const [updateProduct, {isLoading, isSuccess, isError, error}] =
    useUpdateProductMutation();

  const [deleteProduct, {isSuccess: isDelSuccess}] = useDeleteProductMutation();

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: product.title,
    description: product.description,
    content: product.content,
    price: product.price,
    category: product.category,
    image: product.image,
    stock: product.stock,
    brand: product.brand,
  });

  const handleFile = async (e) => {
    const file = e.target.files;
    let imgArr = [];
    for (let i = 0; i < file.length; i++) {
      let base64 = await convertToBase64(file[i]);
      imgArr.push(base64);
    }
    setProductData({...productData, image: imgArr});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData({...productData, [name]: value});
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/admin-product/${product.id}`);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isDelSuccess) {
      navigate("/admin-products");
    }
  }, [isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateProduct({
        id: product.id,
        title: productData.title,
        description: productData.description,
        content: productData.content,
        price: productData.price,
        category: productData.category,
        image: productData.image,
        stock: productData.stock,
        brand: productData.brand,
      }).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteProduct({id: product.id}).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-xl font-bold capitalize mb-5">Detailed Product</h2>
        <div className="rounded overflow-hidden">
          <div className="flex mb-5">
            {product.image.map((img, i) => (
              <img
                className="w-24 h-24 rounded-full mx-3"
                src={img}
                alt="product"
                key={i}
              />
            ))}
          </div>
          <div className="px-6 py-4">
            <div className="text-xl mb-2">
              <span className="font-bold">Title:</span> {product.title}
            </div>
            <div className="text-xl mb-2">
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </div>
            <div className="text-xl mb-2">
              <span className="font-bold">Content:</span> {product.content}
            </div>
            <div className="text-xl mb-2">
              <span className="font-bold">Price:</span> {product.price}
            </div>
            <div className="font-bold text-xl mb-2">
              {" "}
              <span className="font-bold">Category: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5">
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
            </div>
            <div className="font-bold text-xl mb-2">
              <span className="font-bold">Brand: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5">
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
            </div>
            <div className="font-bold text-xl mb-2">
              <span className="font-bold">User: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5">
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
              </div>
            </div>
            <div className="font-bold text-xl mb-2 mt-5">
              <span className="font-bold">Stock:</span>
              {product.stock}
            </div>
          </div>
        </div>
        <button className="btn-icon mt-10" onClick={handleDelete}>
          <FaTrash className="btn-icons" /> Delete Product
        </button>
      </section>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-xl font-bold capitalize mb-5 text-white">
          Update Product
        </h2>
        <div className="mb-5">
          <div className="flex mb-5">
            {productData.image.map((img, i) => (
              <img
                src={img}
                key={i}
                alt="product"
                className="h-24 w-24 rounded-full mx-3"
              />
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <BiImageAdd color="white" size={48} className="mx-auto mb-5" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload product images</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleFile}
                      required
                      multiple
                    />
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, JPEG up to 10MB</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white" htmlFor="title">
                  Product Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={productData.title}
                  required
                />
              </div>
              <div>
                <label className="text-white" htmlFor="description">
                  Product Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={productData.description}
                  required
                />
              </div>
              <div>
                <label className="text-white" htmlFor="content">
                  Product Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  type="textarea"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={productData.content}
                  required
                ></textarea>
              </div>
              <div>
                <label className="text-white" htmlFor="price">
                  Product Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={productData.price}
                  required
                />
              </div>
              <div>
                <label className="text-white" htmlFor="stock">
                  Product Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={productData.stock}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-red" type="submit">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProductForm;
