import {useParams} from "react-router-dom";

import {useGetOrdersQuery} from "../../app/features/order/orderApiSlice";
import {EditOrderForm, Loading} from "../../components";
import {useTitle} from "../../hooks";

const AdminUpdateOrder = () => {
  useTitle("Update Order");

  const {id} = useParams();

  const {order} = useGetOrdersQuery("orderList", {
    selectFromResult: ({data}) => ({order: data?.entities[id]}),
  });

  if (!order) {
    return <Loading />;
  }

  return <EditOrderForm order={order} />;
};

export default AdminUpdateOrder;
