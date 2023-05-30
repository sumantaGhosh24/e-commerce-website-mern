import {FaMinusCircle, FaPlusCircle, FaTimesCircle} from "react-icons/fa";
import {toast} from "react-toastify";

import {
  useAddCartMutation,
  useRemoveCartMutation,
} from "../../app/features/cart/cartApiSlice";
import {getWordStr} from "../../lib";
import {Loading} from "../";

const Cart = ({product, ind}) => {
  const [addCart, {isLoading: addLoading}] = useAddCartMutation();

  const [removeCart, {isLoading: removeLoading}] = useRemoveCartMutation();

  const handleDecrement = async (e) => {
    e.preventDefault();
    try {
      if (product.quantity <= 1) {
        const {message} = await removeCart({id: product.product._id}).unwrap();
        toast.success(message);
      } else {
        const {message} = await addCart({
          productId: product.product._id,
          quantity: product.quantity - 1,
        }).unwrap();
        toast.success(message);
      }
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

  const handleIncrement = async (e) => {
    e.preventDefault();
    try {
      const {message} = await addCart({
        productId: product.product._id,
        quantity: product.quantity + 1,
      }).unwrap();
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

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const {message} = await removeCart({id: product.product._id}).unwrap();
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

  if (addLoading || removeLoading) {
    return <Loading />;
  }

  return (
    <tr className="bg-white border-b text-base font-bold">
      <th scope="row" className="px-6 py-4">
        {ind}
      </th>
      <td className="px-6 py-4">
        <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
          <img
            className="w-24 h-24 p-2 mb-3 bg-white border border-gray-200 rounded-lg shadow"
            src={product?.product?.image[0]}
            alt={product?.product?._id}
          />
          <h5 className="mb-2 font-bold tracking-tight">
            {getWordStr(product?.product?.title)}
          </h5>
        </div>
      </td>
      <td className="px-6 py-4">
        <FaMinusCircle
          className="h-10 w-10 text-blue-500 cursor-pointer"
          onClick={handleDecrement}
        />
      </td>
      <td className="px-6 py-4">{product.quantity}</td>
      <td className="px-6 py-4">
        <FaPlusCircle
          className="h-10 w-10 text-blue-500 cursor-pointer"
          onClick={handleIncrement}
        />
      </td>
      <td className="px-6 py-4">
        <FaTimesCircle
          className="h-10 w-10 text-blue-500 cursor-pointer"
          onClick={handleRemove}
        />
      </td>
      <td className="px-6 py-4">{product.price}</td>
      <td className="px-6 py-4">{product.taxPrice}</td>
      <td className="px-6 py-4">{product.shippingPrice}</td>
      <td className="px-6 py-4">{product.totalPrice}</td>
    </tr>
  );
};

export default Cart;
