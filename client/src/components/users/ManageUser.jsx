import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";

import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../app/features/user/userApiSlice";

const ManageUser = ({userId, ind}) => {
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

export default ManageUser;
