import {useState} from "react";
import propTypes from "prop-types";

import {
  useGetRazorpayMutation,
  useVerificationMutation,
} from "../../app/features/payment/paymentApiSlice";
import {formatFloatingNumber, getSum} from "../../lib";

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
    let price = formatFloatingNumber(prices.reduce(getSum, 0));
    let taxPrice = formatFloatingNumber(taxPrices.reduce(getSum, 0));
    let shippingPrice = formatFloatingNumber(shippingPrices.reduce(getSum, 0));
    let totalPrice = formatFloatingNumber(totalPrices.reduce(getSum, 0));
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
      key: import.meta.env.VITE_RAZORPAY_KEY,
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

Checkout.propTypes = {
  cart: propTypes.object,
};

export default Checkout;
