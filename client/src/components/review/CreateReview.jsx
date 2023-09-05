import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import propTypes from "prop-types";

import {useCreateReviewMutation} from "../../app/features/review/reviewApiSlice";
import {Loading} from "../";

const CreateReview = ({id}) => {
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 0,
    id: id,
  });

  const [createReview, {isLoading, isSuccess, isError, error}] =
    useCreateReviewMutation();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setReviewData({...reviewData, [name]: value});
  };

  useEffect(() => {
    if (isSuccess) {
      setReviewData({
        comment: "",
        rating: 0,
      });
    }
  }, [isSuccess]);

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createReview(reviewData).unwrap();
      toast.success(message, {toastId: "review-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "review-error"});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-3xl font-bold capitalize mb-10 text-white">
          Create Review
        </h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10 text-white">
            {error.message}
          </h3>
        )}
        <form onSubmit={handleCreateReview}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="comment">
                Review Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={reviewData.comment}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="rating">
                Review Rating
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                max="5"
                min="1"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={reviewData.rating}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn btn-red" type="submit">
              Create Review
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

CreateReview.propTypes = {
  id: propTypes.string,
};

export default CreateReview;
