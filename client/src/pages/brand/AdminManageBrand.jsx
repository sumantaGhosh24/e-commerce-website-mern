import {FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";

import {useGetBrandsQuery} from "../../app/features/brand/brandApiSlice";
import {Loading, ManageBrand} from "../../components";
import {useTitle} from "../../hooks";

const AdminManageBrand = () => {
  useTitle("Manage Brand");

  const {
    data: brand,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBrandsQuery("brandList", {
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
    const {ids} = brand;
    const tableContent =
      ids?.length &&
      ids.map((brandId, i) => (
        <ManageBrand key={brandId} brandId={brandId} ind={i + 1} />
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
        <h2 className="text-3xl font-bold capitalize mb-10">Manage Brand</h2>
        <Link className="btn-icon" to="/admin-create-brand">
          <FaPlus className="btn-icons" /> Create Brand
        </Link>
        {content}
      </section>
    </>
  );
};

export default AdminManageBrand;
