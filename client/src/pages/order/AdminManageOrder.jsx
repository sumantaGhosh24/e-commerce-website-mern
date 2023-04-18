import {memo} from "react";
import {FaEye, FaJediOrder} from "react-icons/fa";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetOrdersQuery} from "../../app/features/order/orderApiSlice";
import {useTitle} from "../../hooks";

const AdminManageOrder = () => {
  useTitle("Manage Order");

  const {
    data: order,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery("orderList", {
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

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = order;
    const tableContent =
      ids?.length &&
      ids.map((orderId, i) => (
        <Order key={orderId} orderId={orderId} ind={i + 1} />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
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
              <th scope="col" className="px-6 py-3">
                Is Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Paid At
              </th>
              <th scope="col" className="px-6 py-3">
                Is Delivered
              </th>
              <th scope="col" className="px-6 py-3">
                Delivered At
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold capitalize mb-10">Manage Order</h2>
        {content}
      </section>
    </>
  );
};

const Order = ({orderId, ind}) => {
  const {order} = useGetOrdersQuery("orderList", {
    selectFromResult: ({data}) => ({order: data?.entities[orderId]}),
  });

  if (order) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{order.id}</td>
        <td className="px-6 py-4">
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
        </td>
        <td className="px-6 py-4">
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
        </td>
        <td className="px-6 py-4">
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
        </td>
        <td className="px-6 py-4">
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
        </td>
        <td className="px-6 py-4 uppercase">{order.orderStatus}</td>
        <td className="px-6 py-4">{order.price}</td>
        <td className="px-6 py-4">{order.taxPrice}</td>
        <td className="px-6 py-4">{order.shippingPrice}</td>
        <td className="px-6 py-4">{order.totalPrice}</td>
        <td className="px-6 py-4">
          {order.isPaid ? <span>paid</span> : <span>not paid</span>}
        </td>
        <td className="px-6 py-4">{order.paidAt}</td>
        <td className="px-6 py-4">
          {order.isDeliverd ? <span>deliver</span> : <span>not deliver</span>}
        </td>
        <td className="px-6 py-4">{order.deliverAt}</td>
        <td className="px-6 py-4">{order.createdAt}</td>
        <td className="px-6 py-4">{order.updatedAt}</td>
        <td className="px-6 py-4">
          <Link className="btn-icon" to={`/admin-order/${order.id}`}>
            <FaEye className="mr-2 h-10 w-10" /> Manage Order
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

const memorizedOrder = memo(Order);

export default AdminManageOrder;
