import {memo} from "react";
import {FaTrash} from "react-icons/fa";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../app/features/user/userApiSlice";
import {useTitle} from "../../hooks";

const AdminManageUser = () => {
  useTitle("Manage User");

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUserQuery("userList", {
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
    const {ids} = user;
    const tableContent =
      ids?.length &&
      ids.map((userId, i) => <User key={userId} userId={userId} ind={i + 1} />);

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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Zip
              </th>
              <th scope="col" className="px-6 py-3">
                Address Line 1
              </th>
              <th scope="col" className="px-6 py-3">
                Address Line 2
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
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
      <h2 className="text-3xl font-bold capitalize mb-10">Manage User</h2>
      {content}
    </section>
  );
};

const User = ({userId, ind}) => {
  const {user} = useGetAllUserQuery("userList", {
    selectFromResult: ({data}) => ({user: data?.entities[userId]}),
  });

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteUser({id: userId}).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (user) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.mobileNumber}</td>
        <td className="px-6 py-4">{user.firstName}</td>
        <td className="px-6 py-4">{user.lastName}</td>
        <td className="px-6 py-4">{user.username}</td>
        <td className="px-6 py-4">
          <img src={user.image} alt="user" className="w-24 h-24 rounded-full" />
        </td>
        <td className="px-6 py-4">{user.dob}</td>
        <td className="px-6 py-4">{user.gender}</td>
        <td className="px-6 py-4">{user.city}</td>
        <td className="px-6 py-4">{user.state}</td>
        <td className="px-6 py-4">{user.country}</td>
        <td className="px-6 py-4">{user.zip}</td>
        <td className="px-6 py-4">{user.addressline1}</td>
        <td className="px-6 py-4">{user.addressline2}</td>
        <td className="px-6 py-4">
          {user.status === "active" ? (
            <p className="bg-green-500 p-2 rounded-lg text-white">Active</p>
          ) : (
            <p className="bg-red-500 p-2 rounded-lg text-white">Inactive</p>
          )}
        </td>
        <td className="px-6 py-4">
          {user.role === "admin" ? (
            <p className="bg-pink-500 p-2 rounded-lg text-white">Admin</p>
          ) : (
            <p className="bg-blue-500 p-2 rounded-lg text-white">User</p>
          )}
        </td>
        <td className="px-6 py-4">
          {user.createdAt ?? (
            <p className="bg-red-500 p-2 rounded-lg text-white">not defined</p>
          )}
        </td>
        <td className="px-6 py-4">
          {user.updatedAt ?? (
            <p className="bg-red-500 p-2 rounded-lg text-white">not defined</p>
          )}
        </td>
        <td className="px-6 py-4">
          <button className="btn-icon" onClick={handleDelete}>
            <FaTrash className="mr-2 h-10 w-10" /> Delete User
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memorizedUser = memo(User);

export default AdminManageUser;
