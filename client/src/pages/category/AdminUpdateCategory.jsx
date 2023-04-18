import {useEffect, useState} from "react";
import {BiImageAdd} from "react-icons/bi";
import {FaTrash} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../app/features/category/categoryApiSlice";
import {useTitle} from "../../hooks";

const AdminUpdateCategory = () => {
  useTitle("Update and Delete Category");

  const {id} = useParams();

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.entities[id],
    }),
  });

  if (!category) return <CircleLoader color="#0D6EFD" size={480} />;

  return <EditCategory category={category} />;
};

export default AdminUpdateCategory;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const EditCategory = ({category}) => {
  const [updateCategory, {isLoading, isSuccess, isError, error}] =
    useUpdateCategoryMutation();

  const [deleteCategory, {isSuccess: isDelSuccess}] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    name: "",
    image:
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
      navigate("/admin-category");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateCategory({
        id: category.id,
        name: catData.name,
        image: catData.image,
      }).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteCategory({id: category.id}).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

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

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl ">
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-xl font-bold capitalize mb-5 ">
          Detailed Category
        </h2>
        <div className="max-w-sm rounded overflow-hidden shadow-xl">
          <img
            className="w-[300px] h-[300px]"
            src={category?.image}
            alt={category?.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 ">{category?.name}</div>
          </div>
        </div>
        <button className="btn-icon mt-10" onClick={handleDelete}>
          <FaTrash className="btn-icons" /> Delete Category
        </button>
      </section>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-xl font-bold capitalize mb-5 text-white">
          Update Category
        </h2>
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
        <form onSubmit={handleUpdate}>
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
              Update Category
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
