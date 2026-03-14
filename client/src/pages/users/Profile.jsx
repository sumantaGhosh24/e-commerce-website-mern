import {useGetUserQuery} from "../../app/features/user/userApiSlice";
import {Loading} from "../../components";
import {useTitle} from "../../hooks";

const Profile = () => {
  useTitle("Profile");

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery("userList", {
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
    content = (
      <div className="container flex items-center flex-wrap mx-auto shadow-md p-5 rounded-md my-10">
        <div className="px-6 pb-8">
          <img
            src={user.image}
            alt={user.username}
            className="w-[600px] h-[400px] border-4 border-white dark:border-gray-900 object-cover"
          />
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold capitalize">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 uppercase font-bold">
              {user.status}
            </span>

            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 uppercase font-bold">
              {user.role}
            </span>
          </div>
          <div className="border-t my-8" />
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Mobile:</span>{" "}
                {user.mobileNumber}
              </p>
              <p>
                <span className="font-semibold">DOB:</span> {user.dob}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {user.gender}
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">City:</span> {user.city}
              </p>
              <p>
                <span className="font-semibold">State:</span> {user.state}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {user.country}
              </p>
              <p>
                <span className="font-semibold">Zip:</span> {user.zip}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-semibold">Address</p>
            <p className="text-gray-500">{user.addressline}</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default Profile;
