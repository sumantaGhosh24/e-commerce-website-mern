import React from "react";
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {AuthLayout, Layout} from "./layouts";
import {
  Public,
  Register,
  Login,
  Welcome,
  Dashboard,
  AdminManageUser,
  AdminManageReview,
  AdminManageProduct,
  AdminCreateProduct,
  AdminUpdateProduct,
  AdminManageOrder,
  AdminUpdateOrder,
  AdminManageCategory,
  AdminCreateCategory,
  AdminUpdateCategory,
  AdminManageBrand,
  AdminCreateBrand,
  AdminUpdateBrand,
  Profile,
  MyReviews,
  ProductDetailed,
  MyOrder,
  MyCart,
} from "./pages";
import {PersistLogin, RequireUser, RequireAdmin} from "./components";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PersistLogin />}>
            <Route element={<AuthLayout />}>
              {/* user routes */}
              <Route
                path="welcome"
                element={<RequireUser elm={<Welcome />} />}
              />
              <Route
                path="profile"
                element={<RequireUser elm={<Profile />} />}
              />
              <Route
                path="my-reviews"
                element={<RequireUser elm={<MyReviews />} />}
              />
              <Route
                path="product/:id"
                element={<RequireUser elm={<ProductDetailed />} />}
              />
              <Route
                path="my-order"
                element={<RequireUser elm={<MyOrder />} />}
              />
              <Route
                path="my-cart"
                element={<RequireUser elm={<MyCart />} />}
              />

              {/* admin routes */}
              <Route
                path="dashboard"
                element={<RequireAdmin elm={<Dashboard />} />}
              />
              <Route
                path="admin-users"
                element={<RequireAdmin elm={<AdminManageUser />} />}
              />
              <Route
                path="admin-reviews"
                element={<RequireAdmin elm={<AdminManageReview />} />}
              />
              <Route
                path="admin-products"
                element={<RequireAdmin elm={<AdminManageProduct />} />}
              />
              <Route
                path="admin-create-product"
                element={<RequireAdmin elm={<AdminCreateProduct />} />}
              />
              <Route
                path="admin-product/:id"
                element={<RequireAdmin elm={<AdminUpdateProduct />} />}
              />
              <Route
                path="admin-orders"
                element={<RequireAdmin elm={<AdminManageOrder />} />}
              />
              <Route
                path="admin-order/:id"
                element={<RequireAdmin elm={<AdminUpdateOrder />} />}
              />
              <Route
                path="admin-category"
                element={<RequireAdmin elm={<AdminManageCategory />} />}
              />
              <Route
                path="admin-create-category"
                element={<RequireAdmin elm={<AdminCreateCategory />} />}
              />
              <Route
                path="admin-category/:id"
                element={<RequireAdmin elm={<AdminUpdateCategory />} />}
              />
              <Route
                path="admin-brand"
                element={<RequireAdmin elm={<AdminManageBrand />} />}
              />
              <Route
                path="admin-create-brand"
                element={<RequireAdmin elm={<AdminCreateBrand />} />}
              />
              <Route
                path="admin-brand/:id"
                element={<RequireAdmin elm={<AdminUpdateBrand />} />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
