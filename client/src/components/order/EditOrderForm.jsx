import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import propTypes from "prop-types";

import {useUpdateOrderMutation} from "../../app/features/order/orderApiSlice";
import {Loading} from "../";

const EditOrderForm = ({order}) => {
  const [updateOrder, {isLoading, isSuccess, isError, error}] =
    useUpdateOrderMutation();

  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    orderStatus: order?.orderStatus,
    isPaid: order?.isPaid,
    isDeliverd: order?.isDeliverd,
    paidAt: order?.paidAt,
    deliverAt: order?.deliverAt,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setOrderData({...orderData, [name]: value});
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin-orders");
    }
  }, [isSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateOrder({
        id: order.id,
        orderStatus: orderData.orderStatus,
        isPaid: orderData.isPaid,
        isDeliverd: orderData.isDeliverd,
        paidAt: orderData.paidAt,
        deliverAt: orderData.deliverAt,
      }).unwrap();
      toast.success(message, {toastId: "order-error"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "order-success"});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="container p-6 mx-auto my-10">
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-3xl font-bold mb-8">Order Details</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="shadow-md rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Customer</h3>
              <div className="flex items-center gap-4">
                <img
                  src={order?.user?.image}
                  alt={order?.user?._id}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{order?.user?.username}</p>
                  <p className="text-sm">{order?.user?.email}</p>
                  <p className="text-sm">{order?.user?.mobileNumber}</p>
                </div>
              </div>
            </div>
            <div className="shadow-md rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order?.orderItems?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item?.product?.image[0]}
                        alt={item?.product?._id}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item?.product?.title}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shadow-md rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>
                {order.shippingAddress.country} - {order.shippingAddress.pin}
              </p>
            </div>
            <div className="shadow-md rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Payment Info</h3>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {order.paymentResult.status}
                </p>
                <p>
                  <span className="font-semibold">Payment ID:</span>{" "}
                  {order.paymentResult.razorpay_payment_id}
                </p>
                <p>
                  <span className="font-semibold">Order ID:</span>{" "}
                  {order.paymentResult.razorpay_order_id}
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-md rounded-md p-6 h-fit">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price</span>
                <span>{order.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                {order.orderStatus}
              </p>
              <p>
                <span className="font-semibold">Paid:</span>{" "}
                {order.isPaid ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Delivered:</span>{" "}
                {order.isDeliverd ? "Yes" : "No"}
              </p>
            </div>
            <div className="mt-6 text-xs text-gray-500">
              <p>Created: {order.createdAt}</p>
              <p>Updated: {order.updatedAt}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container p-6 mx-auto my-10 shadow-md rounded-md bg-blue-500">
        <h2 className="text-xl font-bold capitalize mb-5 text-white">
          Update Order
        </h2>
        <div className="mb-5">
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white" htmlFor="orderStatus">
                  Order Status
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  id="orderStatus"
                  name="orderStatus"
                  onChange={handleChange}
                  value={orderData.orderStatus}
                  required
                >
                  <option>select order status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refund">Refund</option>
                </select>
              </div>
              <div>
                <label className="text-white" htmlFor="isPaid">
                  Is Paid
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  id="isPaid"
                  name="isPaid"
                  onChange={handleChange}
                  value={orderData.isPaid}
                  required
                >
                  <option>select paid status</option>
                  <option value="true">Paid</option>
                  <option value="false">Not Paid</option>
                </select>
              </div>
              <div>
                <label className="text-white" htmlFor="isDeliverd">
                  Is Paid
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  id="isDeliverd"
                  name="isDeliverd"
                  onChange={handleChange}
                  value={orderData.isDeliverd}
                  required
                >
                  <option>select paid status</option>
                  <option value="true">Delivered</option>
                  <option value="false">Not Delivered</option>
                </select>
              </div>
              <div>
                <label className="text-white" htmlFor="paidAt">
                  Paid At
                </label>
                <input
                  id="paidAt"
                  name="paidAt"
                  type="date"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={orderData.paidAt}
                  required
                />
              </div>
              <div>
                <label className="text-white" htmlFor="deliverAt">
                  Deliver At
                </label>
                <input
                  id="deliverAt"
                  name="deliverAt"
                  type="date"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={orderData.deliverAt}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-red" type="submit">
                Update Order
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

EditOrderForm.propTypes = {
  order: propTypes.object,
};

export default EditOrderForm;
