import {useGetBrandsQuery} from "../../app/features/brand/brandApiSlice";
import {CreateProductForm, Loading} from "../../components";

const AdminCreateProduct = () => {
  const {brand} = useGetBrandsQuery("brandList", {
    selectFromResult: ({data}) => ({
      brand: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!brand?.length) {
    return <Loading />;
  }

  return <CreateProductForm brand={brand} />;
};

export default AdminCreateProduct;
