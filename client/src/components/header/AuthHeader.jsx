import jwtDecode from "jwt-decode";
import {useState, useEffect} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {useSendLogoutMutation} from "../../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../../app/features/auth/authSlice";

const AuthHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();

  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const {role} = decoded.UserInfo;
  let navLinks;

  const [sendLogout, {isLoading, isSuccess, isError, error}] =
    useSendLogoutMutation();

  if (role === "admin") {
    navLinks = (
      <>
        <li className="text-white hover:text-blue-200">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-category">Category</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-brand">Brands</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-products">Products</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-reviews">Reviews</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-users">Users</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/admin-orders">Orders</Link>
        </li>
      </>
    );
  }

  if (role === "user") {
    navLinks = (
      <>
        <li className="text-white hover:text-blue-200">
          <Link to="/welcome">Products</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/my-reviews">My Reviews</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/my-order">My Order</Link>
        </li>
        <li className="text-white hover:text-blue-200">
          <Link to="/my-cart">Cart</Link>
        </li>
      </>
    );
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isLoading, navigate]);

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

  if (isError) {
    toast.error(error, {autoClose: 7000, delay: 300});
  }

  return (
    <nav className="w-full bg-blue-500 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-white">E-Commerce</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaTimes color="white" size={24} />
                ) : (
                  <FaBars color="white" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navLinks}
              <li className="text-white hover:text-blue-200">
                <Link onClick={sendLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthHeader;
