import {useParams} from "react-router-dom";

import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {EditProductForm, Loading} from "../../components";
import {useTitle} from "../../hooks";

const AdminUpdateProduct = () => {
  useTitle("Update and Delete Product");

  const {id} = useParams();

  const {product} = useGetProductsQuery("productList", {
    selectFromResult: ({data}) => ({
      product: data?.entities[id],
    }),
  });

  if (!product) {
    return <Loading />;
  }

  return <EditProductForm product={product} />;
};

export default AdminUpdateProduct;
