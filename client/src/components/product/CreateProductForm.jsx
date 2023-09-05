import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {BiImageAdd} from "react-icons/bi";
import propTypes from "prop-types";

import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";
import {useCreateProductMutation} from "../../app/features/product/productApiSlice";
import {useTitle} from "../../hooks";
import {convertToBase64} from "../../lib";
import {Loading} from "../";

const CreateProductForm = ({brand}) => {
  useTitle("Create Product");

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: [
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    ],
    stock: "",
    content: "",
    brand: "",
  });

  const [createProduct, {isLoading, isSuccess, isError, error}] =
    useCreateProductMutation();

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id) => data?.entities[id]),
    }),
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
      setProductData({
        title: "",
        price: "",
        description: "",
        category: "",
        image: [
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        ],
        stock: "",
        content: "",
        brand: "",
      });
      navigate("/admin-create-product");
    }
  }, [isSuccess, navigate]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createProduct(productData).unwrap();
      toast.success(message, {toastId: "product-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "product-error"});
    }
  };

  if (!category?.length) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-3xl font-bold capitalize mb-10 text-white">
          Create Product
        </h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10 text-white">
            {error.message}
          </h3>
        )}
        <div className="mb-5 flex gap-3">
          {productData.image.length === 1 ? (
            <img
              src={productData.image[0]}
              alt="product"
              className="mx-auto rounded-full"
            />
          ) : (
            productData.image.map((img, i) => (
              <img
                src={img}
                key={i}
                alt="product"
                className="w-24 h-24 rounded-full"
              />
            ))
          )}
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
        <form onSubmit={handleCreateProduct}>
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
            <div>
              <label className="text-white" htmlFor="category">
                Product Category
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                id="category"
                name="category"
                onChange={handleChange}
                value={productData.category}
                required
              >
                <option>select product category</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white" htmlFor="brand">
                Product Brand
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                id="brand"
                name="brand"
                onChange={handleChange}
                value={productData.brand}
                required
              >
                <option>select product brand</option>
                {brand.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn btn-red" type="submit">
              Create Product
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

CreateProductForm.propTypes = {
  brand: propTypes.array,
};

export default CreateProductForm;
