import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../app/features/order/orderApiSlice";
import {useTitle} from "../../hooks";

const AdminUpdateOrder = () => {
  useTitle("Update Order");

  const {id} = useParams();

  const {order} = useGetOrdersQuery("orderList", {
    selectFromResult: ({data}) => ({order: data?.entities[id]}),
  });

  if (!order) {
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

  return <EditOrder order={order} />;
};

export default AdminUpdateOrder;

const EditOrder = ({order}) => {
  const [updateOrder, {isLoading, isSuccess, isError, error}] =
    useUpdateOrderMutation();

  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    orderStatus: order.orderStatus,
    isPaid: order.isPaid,
    isDeliverd: order.isDeliverd,
    paidAt: order.paidAt,
    deliverAt: order.deliverAt,
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
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
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
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-xl font-bold capitalize mb-5">Detailed Order</h2>
        <div className="rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <img
                  className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow mb-3"
                  src={order?.user?.image}
                  alt={order?.user?._id}
                />
                <p className="mb-3 font-normal text-gray-500">
                  {order?.user?.username}
                </p>
                <p className="mb-3 font-normal text-gray-500">
                  {order?.user?.email}
                </p>
                <p className="mb-3 font-normal text-gray-500">
                  {order?.user?.mobileNumber}
                </p>
              </div>
            </div>
            <div className="font-bold text-xl mb-2">
              <div className="flex">
                {order?.orderItems?.map((item, i) => (
                  <div
                    className="max-2-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-3"
                    key={i}
                  >
                    <img
                      className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow mb-3"
                      src={item.product.image[0]}
                      alt={item.product._id}
                    />
                    <p className="mb-3 font-normal text-gray-500">
                      <span className="font-bold">Product: </span>
                      {item.product.title}
                    </p>
                    <p className="mb-3 font-normal text-gray-500">
                      <span className="font-bold">Quantity: </span>
                      {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="font-bold text-xl mb-2">
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Id: </span>
                {order.paymentResult.id}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Status: </span>
                {order.paymentResult.status}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Order Id: </span>
                {order.paymentResult.razorpay_order_id}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Payment Id: </span>
                {order.paymentResult.razorpay_payment_id}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Signature: </span>
                {order.paymentResult.razorpay_signature}
              </p>
            </div>
            <div className="font-bold text-xl mb-2">
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Address: </span>
                {order.shippingAddress.address}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">City: </span>
                {order.shippingAddress.city}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Pin: </span>
                {order.shippingAddress.pin}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">Country: </span>
                {order.shippingAddress.country}
              </p>
              <p className="mb-3 font-normal text-gray-500">
                <span className="font-bold">State: </span>
                {order.shippingAddress.state}
              </p>
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Order Status: </span>
              {order.orderStatus}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Price: </span>
              {order.price}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Tax Price: </span>
              {order.taxPrice}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Shipping Price: </span>
              {order.shippingPrice}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Total Price: </span>
              {order.totalPrice}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Paid: </span>
              {order.isPaid ? <span>paid</span> : <span>not paid</span>}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Paid At: </span>
              {order.paidAt}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Deliver: </span>
              {order.isDeliverd ? (
                <span>deliver</span>
              ) : (
                <span>not deliver</span>
              )}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Deliver At: </span>
              {order.deliverAt}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Created At: </span>
              {order.createdAt}
            </div>
            <div className="font-normal mb-3 text-gray-500">
              <span className="font-bold">Updated At: </span>
              {order.updatedAt}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
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
