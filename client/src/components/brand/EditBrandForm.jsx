import {useEffect, useState} from "react";
import {BiImageAdd} from "react-icons/bi";
import {FaTrash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import propTypes from "prop-types";

import {
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "../../app/features/brand/brandApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../";

const EditBrandForm = ({brand}) => {
  const [updateBrand, {isLoading, isSuccess, isError, error}] =
    useUpdateBrandMutation();

  const [deleteBrand, {isSuccess: isDelSuccess}] = useDeleteBrandMutation();

  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    name: brand?.name,
    image:
      brand?.image ||
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
  });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setCatData({...catData, image: base64});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCatData({...catData, [name]: value});
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setCatData({
        name: "",
        image: "",
      });
      navigate("/admin-brand");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateBrand({
        id: brand.id,
        name: catData.name,
        image: catData.image,
      }).unwrap();
      toast.success(message, {toastId: "brand-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "brand-error"});
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteBrand({id: brand.id}).unwrap();
      toast.success(message, {toastId: "brand-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "brand-error"});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl ">
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-xl font-bold capitalize mb-5 ">Detailed Brand</h2>
        <div className="max-w-sm rounded overflow-hidden shadow-xl">
          <img
            className="w-[300px] h-[300px]"
            src={brand?.image}
            alt={brand?.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 ">{brand?.name}</div>
          </div>
        </div>
        <button className="btn-icon mt-10" onClick={handleDelete}>
          <FaTrash className="btn-icons" /> Delete Brand
        </button>
      </section>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-xl font-bold capitalize mb-5 text-white">
          Update Brand
        </h2>
        <div className="mb-5">
          <img
            src={catData.image}
            alt="brand"
            className="mx-auto rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Brand Image
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
                  <span className="">Upload brand image</span>
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
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="name">
                Brand Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={catData.name}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn btn-red" type="submit">
              Update Brand
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

EditBrandForm.propTypes = {
  brand: propTypes.object,
};

export default EditBrandForm;
