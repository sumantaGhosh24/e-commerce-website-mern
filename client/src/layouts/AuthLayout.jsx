import {Outlet} from "react-router-dom";

import {AuthHeader, AuthFooter} from "../components";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
