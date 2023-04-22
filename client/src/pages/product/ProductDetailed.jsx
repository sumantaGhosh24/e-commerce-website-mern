import {useState} from "react";
import {FaCartPlus} from "react-icons/fa";
import {useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {useAddCartMutation} from "../../app/features/cart/cartApiSlice";
import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {useTitle} from "../../hooks";

const ProductDetailed = () => {
  useTitle("Product Detailed");

  const {id} = useParams();

  const [cart, setCart] = useState({
    productId: id,
    quantity: 1,
  });

  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({
      product: data?.entities[id],
    }),
  });

  if (!product) {
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

  const [addCart, {isLoading}] = useAddCartMutation();

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const {message} = await addCart(cart).unwrap();
      toast.success(message);
    } catch (error) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error");
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0]);
        } else {
          toast.error(error?.data?.message);
        }
      }
    }
  };

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

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold capitalize mb-10">
          Detailed Product
        </h2>
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
            <div className="text-xl mb-5">
              <span className="font-bold">Title: </span> {product.title}
            </div>
            <div className="text-xl mb-5">
              <span className="font-bold">Description: </span>{" "}
              {product.description}
            </div>
            <div className="text-xl mb-5">
              <span className="font-bold">Content: </span> {product.content}
            </div>
            <div className="text-xl mb-5">
              <span className="font-bold">Price: </span> {product.price}
            </div>
            <div className="font-bold text-xl mb-5">
              <span className="font-bold">Category: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5 flex">
                <img
                  className="w-24 h-24 bg-white border border-gray-200 rounded-lg shadow"
                  src={product.category.image}
                  alt={product.category._id}
                />
                <h5 className="ml-2 text-2xl font-semibold tracking-tight text-gray-900">
                  {product.category.name}
                </h5>
              </div>
            </div>
            <div className="font-bold text-xl mb-2">
              <span className="font-bold">Brand: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5 flex">
                <img
                  className="w-24 h-24 bg-white border border-gray-200 rounded-lg shadow"
                  src={product.brand.image}
                  alt={product.brand._id}
                />
                <h5 className="ml-2 text-2xl font-semibold tracking-tight text-gray-900">
                  {product.brand.name}
                </h5>
              </div>
            </div>
            <div className="font-bold text-xl mb-2">
              <span className="font-bold">User: </span>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-5 flex">
                <img
                  className="w-24 h-24 bg-white border border-gray-200 rounded-lg shadow"
                  src={product.user.image}
                  alt={product.user._id}
                />
                <h5 className="ml-2 text-2xl font-semibold tracking-tight text-gray-900">
                  {product.user.username}
                </h5>
              </div>
            </div>
            <div className="font-bold text-xl mb-2 mt-5">
              <span className="font-bold">Stock: </span> {product.stock}
            </div>
          </div>
        </div>
        <button className="btn-icon m5-10" onClick={handleCart}>
          <FaCartPlus className="btn-icons" /> Add to Cart
        </button>
      </section>
    </>
  );
};

export default ProductDetailed;
