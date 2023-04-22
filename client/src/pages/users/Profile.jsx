import CircleLoader from "react-spinners/CircleLoader";

import {useGetUserQuery} from "../../app/features/user/userApiSlice";
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
    content = (
      <div className="max-w-4xl flex items-center flex-wrap mx-auto shadow-xl p-5 rounded-xl my-20">
        <h1 className="text-3xl font-bold text-capitalize">My Profile</h1>
        <div className="w-full">
          <div className="p-4 md:p-12 text-center lg:text-left">
            <img
              src={user.image}
              alt={user.username}
              className="rounded-xl h-[350px] w-full"
            />
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Full Name: </span>
              {user.firstName} {user.lastName}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Username: </span>
              {user.username}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Email: </span>
              {user.email}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Mobile Number: </span>
              {user.mobileNumber}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">DOB: </span>
              {user.dob}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Gender: </span>
              {user.gender}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">City: </span>
              {user.city}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">State: </span>
              {user.state}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Country: </span>
              {user.country}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Zip: </span>
              {user.zip}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Address Line 1: </span>
              {user.addressline1}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Address Line 2: </span>
              {user.addressline2}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Status: </span>
              {user.status}
            </p>
            <p className="pt-8 text-lg font-medium">
              <span className="font-bold">Role: </span>
              {user.role}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default Profile;
