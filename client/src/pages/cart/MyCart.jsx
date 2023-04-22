import {useState} from "react";
import {memo} from "react";
import {FaMinusCircle, FaPlusCircle, FaTimesCircle} from "react-icons/fa";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {
  useAddCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
} from "../../app/features/cart/cartApiSlice";
import {
  useGetRazorpayMutation,
  useVerificationMutation,
} from "../../app/features/payment/paymentApiSlice";
import {useTitle} from "../../hooks";
import {RAZORPAY_KEY} from "../../lib/config";

const MyCart = () => {
  useTitle("My Cart");

  const {
    data: cart,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartQuery("cartList", {
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

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold capitalize mb-10">My Cart</h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10">
            {error.message}
          </h3>
        )}
        {isSuccess && (
          <div className="relative overflow-x-auto mt-10">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-lg text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Decrement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Increment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tax Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shipping Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.product?.map((pro, ind) => (
                  <Cart product={pro} ind={ind + 1} key={ind} />
                ))}
              </tbody>
              {cart?.product?.length === 0 && (
                <div className="font-bold text-xl">Your cart is empty.</div>
              )}
              {!cart && (
                <div className="font-bold text-xl">Your cart is empty.</div>
              )}
            </table>
          </div>
        )}
      </section>
      <Checkout cart={cart} />
    </>
  );
};

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

const Checkout = ({cart}) => {
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setShippingAddress({...shippingAddress, [name]: value});
  };

  const [getRazorpay] = useGetRazorpayMutation();

  const [verification] = useVerificationMutation();

  const handleCheckout = async (e) => {
    e.preventDefault();
    let prices = [];
    let taxPrices = [];
    let shippingPrices = [];
    let totalPrices = [];
    for (let i = 0; i < cart.product.length; i++) {
      prices.push(cart.product[i].price);
      taxPrices.push(cart.product[i].taxPrice);
      shippingPrices.push(cart.product[i].shippingPrice);
      totalPrices.push(cart.product[i].totalPrice);
    }
    let price = prices.reduce(getSum, 0);
    let taxPrice = taxPrices.reduce(getSum, 0);
    let shippingPrice = shippingPrices.reduce(getSum, 0);
    let totalPrice = totalPrices.reduce(getSum, 0);
    const result = await getRazorpay({price: totalPrice}).unwrap();
    if (!result) {
      alert("something went wrong please try again later.");
    }
    const orderItems = [];
    for (let i = 0; i < cart?.product?.length; i++) {
      let newObj = {
        product: cart?.product[i]?.product._id,
        quantity: cart?.product[i]?.quantity,
      };
      orderItems.push(newObj);
    }
    const {amount, id: order_id, currency} = result;
    const options = {
      key: RAZORPAY_KEY,
      amount: Number(amount),
      currency: currency,
      order_id: order_id,
      name: "E-Commerce Website",
      description: "This is test e-commerce website for only tutorial purpose.",
      handler: async function (response) {
        const data = {
          cartId: cart._id,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderItems: orderItems,
          shippingAddress: shippingAddress,
          price,
          taxPrice,
          shippingPrice,
          totalPrice,
        };
        const result = await verification(data).unwrap();
        alert(result.message);
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <section className="max-w-7xl p-6 mx-auto bg-blue-500 rounded-md shadow-md my-20">
      <h1 className="text-xl font-bold text-white capitalize mb-5">Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              value={shippingAddress.address}
              required
            />
          </div>
          <div>
            <label className="text-white" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              value={shippingAddress.city}
              required
            />
          </div>
          <div>
            <label className="text-white" htmlFor="pin">
              Pin
            </label>
            <input
              id="pin"
              name="pin"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              value={shippingAddress.pin}
              required
            />
          </div>
          <div>
            <label className="text-white" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              value={shippingAddress.state}
              required
            />
          </div>
          <div>
            <label className="text-white" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              value={shippingAddress.country}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="btn btn-red" type="submit">
            Checkout
          </button>
        </div>
      </form>
    </section>
  );
};

const memorizedCart = memo(Cart);

function getWordStr(str, len = 10) {
  return str.split(/\s+/).slice(0, len).join(" ");
}

function getSum(total, num) {
  return total + Math.ceil(num);
}

export default MyCart;
