import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";

const ManageCategory = ({catId, ind}) => {
  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({category: data?.entities[catId]}),
  });

  if (category) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{category.id}</td>
        <td className="px-6 py-4">{category.name}</td>
        <td className="px-6 py-4">
          <img
            src={category.image}
            alt={category.name}
            className="rounded-full h-24 w-24"
          />
        </td>
        <td className="px-6 py-4">{category.createdAt}</td>
        <td className="px-6 py-4">{category.updatedAt}</td>
        <td className="px-6 py-4">
          <Link className="btn-icon" to={`/admin-category/${category.id}`}>
            <FaEye className="mr-2 h-10 w-10" /> Manage Category
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

ManageCategory.propTypes = {
  catId: propTypes.string,
  ind: propTypes.number,
};

export default ManageCategory;
