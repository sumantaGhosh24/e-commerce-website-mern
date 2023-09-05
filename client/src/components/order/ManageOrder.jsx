import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetOrdersQuery} from "../../app/features/order/orderApiSlice";

const ManageOrder = ({orderId, ind}) => {
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
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-3"
                key={i}
              >
                <img
                  className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow mb-3"
                  src={item?.product?.image[0]}
                  alt={item?.product?._id}
                />
                <p className="mb-3 font-normal text-gray-500">
                  <span className="font-bold">Product: </span>
                  {item?.product?.title}
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
            {order?.paymentResult?.id}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Status: </span>
            {order?.paymentResult?.status}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Order Id: </span>
            {order?.paymentResult?.razorpay_order_id}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Payment Id: </span>
            {order?.paymentResult?.razorpay_payment_id}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Signature: </span>
            {order?.paymentResult?.razorpay_signature}
          </p>
        </td>
        <td className="px-6 py-4">
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Address: </span>
            {order?.shippingAddress?.address}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">City: </span>
            {order?.shippingAddress?.city}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Pin: </span>
            {order?.shippingAddress?.pin}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">Country: </span>
            {order?.shippingAddress?.country}
          </p>
          <p className="mb-3 font-normal text-gray-500">
            <span className="font-bold">State: </span>
            {order?.shippingAddress?.state}
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

ManageOrder.propTypes = {
  orderId: propTypes.string,
  ind: propTypes.number,
};

export default ManageOrder;
