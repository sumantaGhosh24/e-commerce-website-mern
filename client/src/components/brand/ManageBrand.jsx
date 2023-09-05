import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetBrandsQuery} from "../../app/features/brand/brandApiSlice";

const ManageBrand = ({brandId, ind}) => {
  const {brand} = useGetBrandsQuery("brandList", {
    selectFromResult: ({data}) => ({brand: data?.entities[brandId]}),
  });

  if (brand) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{brand.id}</td>
        <td className="px-6 py-4">{brand.name}</td>
        <td className="px-6 py-4">
          <img
            src={brand.image}
            alt={brand.name}
            className="rounded-full h-24 w-24"
          />
        </td>
        <td className="px-6 py-4">{brand.createdAt}</td>
        <td className="px-6 py-4">{brand.updatedAt}</td>
        <td className="px-6 py-4">
          <Link className="btn-icon" to={`/admin-brand/${brand.id}`}>
            <FaEye className="mr-2 h-10 w-10" /> Manage Brand
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

ManageBrand.propTypes = {
  brandId: propTypes.string,
  ind: propTypes.number,
};

export default ManageBrand;
