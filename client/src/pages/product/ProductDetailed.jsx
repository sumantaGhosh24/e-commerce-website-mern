import {useState} from "react";
import {FaCartPlus} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

import {useAddCartMutation} from "../../app/features/cart/cartApiSlice";
import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {CreateReview, Loading, ProductReviews} from "../../components";
import {useTitle} from "../../hooks";

const ProductDetailed = () => {
  useTitle("Product Detailed");

  const {id} = useParams();

  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState({
    productId: id,
    quantity: 1,
  });

  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({
      product: data?.entities[id],
    }),
  });

  const [addCart, {isLoading}] = useAddCartMutation();

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const {message} = await addCart(cart).unwrap();
      toast.success(message, {toastId: "product-success"});
    } catch (error) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "product-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "product-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "product-error"});
        }
      }
    }
  };

  if (isLoading || !product) {
    return <Loading />;
  }

  return (
    <>
      <section className="container p-6 mx-auto my-10 shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-10">Product Details</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <img
              src={product.image[0]}
              alt="product"
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <div className="flex gap-3">
              {product.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="product"
                  className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="text-3xl font-bold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-700 leading-relaxed">{product.content}</p>
            <div className="text-3xl font-bold text-blue-600">
              ₹{product.price}
            </div>
            <p className="text-sm text-gray-500">
              Stock: <span className="font-semibold">{product.stock}</span>
            </p>
            <div className="flex items-center gap-3 border rounded-md p-3">
              <img
                src={product.category.image}
                alt={product.category._id}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{product.category.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded-md p-3">
              <img
                src={product.brand.image}
                alt={product.brand._id}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-semibold">{product.brand.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded-md p-3">
              <img
                src={product.user.image}
                alt={product.user._id}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Seller</p>
                <p className="font-semibold">{product.user.username}</p>
              </div>
            </div>
            <button
              onClick={handleCart}
              className="mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
            >
              <FaCartPlus />
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <CreateReview id={product.id} />
      <ProductReviews id={product.id} />
    </>
  );
};

export default ProductDetailed;
