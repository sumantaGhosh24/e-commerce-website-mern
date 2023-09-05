import {useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle, usePersist} from "../../hooks";
import {useLoginMutation} from "../../app/features/auth/authApiSlice";
import {setCredentials} from "../../app/features/auth/authSlice";
import {Loading, PublicHeader} from "../../components";

const Login = () => {
  useTitle("Login");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const handleToggle = () => setPersist((prev) => !prev);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {accessToken} = await login(user).unwrap();
      dispatch(setCredentials({accessToken}));
      setUser({
        email: "",
        password: "",
      });
      toast.success("login successful", {
        toastId: "login-success",
      });
      navigate("/welcome");
    } catch (err) {
      console.log(err);
      if (err.status === "FETCH_ERROR") {
        toast.error(err.error, {toastId: "login-error"});
      } else {
        if (typeof err.data.message === "object") {
          toast.error(err?.data?.message[0], {toastId: "login-error"});
        } else {
          toast.error(err?.data?.message, {toastId: "login-error"});
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
        <h2 className="text-xl font-bold text-white capitalize mb-5">
          Login User
        </h2>
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.email}
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.password}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="persist">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                  className="mr-5"
                />
                Trust this website
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-red" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-white text-lg">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-red-700 underline">
            Register
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
