import {useParams} from "react-router-dom";

import {useGetBrandsQuery} from "../../app/features/brand/brandApiSlice";
import {EditBrandForm, Loading} from "../../components";
import {useTitle} from "../../hooks";

const AdminUpdateBrand = () => {
  useTitle("Update and Delete Brand");

  const {id} = useParams();

  const {brand} = useGetBrandsQuery("brandList", {
    selectFromResult: ({data}) => ({
      brand: data?.entities[id],
    }),
  });

  if (!brand) {
    return <Loading />;
  }

  return <EditBrandForm brand={brand} />;
};

export default AdminUpdateBrand;
