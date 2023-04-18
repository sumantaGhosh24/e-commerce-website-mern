import {memo} from "react";
import {FaEye, FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";
import {useTitle} from "../../hooks";

const AdminManageCategory = () => {
  useTitle("Manage Category");

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery("categoryList", {
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
    const {ids} = category;
    const tableContent =
      ids?.length &&
      ids.map((catId, i) => <Category key={catId} catId={catId} ind={i + 1} />);

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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
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
        <h2 className="text-3xl font-bold capitalize mb-10">Manage Category</h2>
        <Link className="btn-icon" to="/admin-create-category">
          <FaPlus className="btn-icons" /> Create Category
        </Link>
        {content}
      </section>
    </>
  );
};

const Category = ({catId, ind}) => {
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

const memorizedCategory = memo(Category);

export default AdminManageCategory;
