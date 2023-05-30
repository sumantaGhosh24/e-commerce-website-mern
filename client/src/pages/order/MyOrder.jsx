import {useGetUserOrderQuery} from "../../app/features/order/orderApiSlice";
import {Loading, ManageMyOrder} from "../../components";
import {useTitle} from "../../hooks";

const MyOrder = () => {
  useTitle("My Orders");

  const {
    data: order,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserOrderQuery("orderList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
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
        <ManageMyOrder key={orderId} orderId={orderId} ind={i + 1} />
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
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold capitalize mb-10">My Orders</h2>
      {content}
    </section>
  );
};

export default MyOrder;
