import {useEffect, useState} from "react";
import {BiImageAdd} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useCreateCategoryMutation} from "../../app/features/category/categoryApiSlice";
import {Loading} from "../../components";
import {useTitle} from "../../hooks";
import {convertToBase64} from "../../lib";

const AdminCreateCategory = () => {
  useTitle("Create Category");

  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    name: "",
    image:
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
  });

  const [createCategory, {isLoading, isSuccess, isError, error}] =
    useCreateCategoryMutation();

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
    if (isSuccess) {
      setCatData({
        name: "",
        image: "",
      });
      navigate("/admin-category");
    }
  }, [isSuccess, navigate]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createCategory(catData).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "category-error"});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-3xl font-bold capitalize mb-10 text-white">
          Create Category
        </h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10 text-white">
            {error.message}
          </h3>
        )}
        <div className="mb-5">
          <img
            src={catData.image}
            alt="category"
            className="mx-auto rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Category Image
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
                  <span className="">Upload category image</span>
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
        <form onSubmit={handleCreateCategory}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="name">
                Category Name
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
              Create Category
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminCreateCategory;
