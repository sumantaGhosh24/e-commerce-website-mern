import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {BiImageAdd} from "react-icons/bi";

import {useTitle} from "../../hooks";
import {useRegisterMutation} from "../../app/features/auth/authApiSlice";
import {Loading, PublicHeader} from "../../components";
import {convertToBase64} from "../../lib";

const Register = () => {
  useTitle("Register");

  const [user, setUser] = useState({
    image:
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    email: "",
    mobileNumber: "",
    password: "",
    cf_password: "",
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    addressline1: "",
    addressline2: "",
  });

  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({...user, image: base64});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {message} = await register(user).unwrap();
      setUser({
        image:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        email: "",
        mobileNumber: "",
        password: "",
        cf_password: "",
        firstName: "",
        lastName: "",
        username: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        addressline1: "",
        addressline2: "",
      });
      toast.success(message, {toastId: "register-success"});
      navigate("/login");
    } catch (error) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "register-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "register-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "register-error"});
        }
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PublicHeader />
      <section className="max-w-4xl p-6 mx-auto bg-blue-500 rounded-md shadow-md my-20">
        <h1 className="text-xl font-bold text-white capitalize mb-5">
          Register User
        </h1>
        <div className="mb-5">
          <img
            src={user.image}
            alt="profile"
            className="mx-auto rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            {" "}
            Image{" "}
          </label>
          <div
            className="
                mt-1
                flex
                justify-center
                px-6
                pt-5
                pb-6
                border-2 border-gray-300 border-dashed
                rounded-md
              "
          >
            <div className="space-y-1 text-center">
              <BiImageAdd color="white" size={48} className="mx-auto mb-5" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image"
                  className="
                      relative
                      cursor-pointer
                      bg-white
                      rounded-md
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus-within:outline-none
                      focus-within:ring-2
                      focus-within:ring-offset-2
                      focus-within:ring-indigo-500
                    "
                >
                  <span className="">Upload a Image</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleFile}
                    required
                  />
                </label>
                <p className="pl-1 text-white">or drag and drop</p>
              </div>
              <p className="text-xs text-white">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.email}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.mobileNumber}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.password}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="cf_password">
                Confirm Password
              </label>
              <input
                id="cf_password"
                name="cf_password"
                type="password"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.cf_password}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.firstName}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.lastName}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.username}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="dob">
                DOB
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.dob}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.gender}
                required
              >
                <option>select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-white" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.city}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="state">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.state}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.country}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="zip">
                Zip
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.zip}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="addressline1">
                Address Line 1
              </label>
              <input
                id="addressline1"
                name="addressline1"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.addressline1}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="addressline2">
                Address Line 2
              </label>
              <input
                id="addressline2"
                name="addressline2"
                type="text"
                className="
                block
                w-full
                px-4
                py-2
                mt-2
                text-gray-700
                bg-white
                border border-gray-300
                rounded-md
                focus:border-blue-500 focus:outline-none focus:ring
              "
                onChange={handleChange}
                value={user.addressline2}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn btn-red" type="submit">
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-white text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-red-700 underline">
            login
          </Link>
        </p>
      </section>
    </>
  );
};

export default Register;
