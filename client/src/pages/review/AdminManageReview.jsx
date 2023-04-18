import {memo} from "react";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetAllReviewsQuery} from "../../app/features/review/reviewApiSlice";
import {useTitle} from "../../hooks";

const AdminManageReview = () => {
  useTitle("Manage Review");

  const {
    data: review,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllReviewsQuery("reviewList", {
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
    const {ids} = review;
    const tableContent =
      ids?.length &&
      ids.map((reviewId, i) => (
        <Review key={reviewId} reviewId={reviewId} ind={i + 1} />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold capitalize mb-10">Manage Review</h2>
      {content}
    </section>
  );
};

const Review = ({reviewId, ind}) => {
  const {review} = useGetAllReviewsQuery("reviewList", {
    selectFromResult: ({data}) => ({review: data?.entities[reviewId]}),
  });

  if (review) {
    return (
      <tr className="bg-white border-b text-base font-bold">
        <th scope="row" className="px-6 py-4">
          {ind}
        </th>
        <td className="px-6 py-4">{review.id}</td>
        <td className="px-6 py-4">{review.comment}</td>
        <td className="px-6 py-4">{review.rating}</td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={review.product.image[0]}
              alt={review.product._id}
            />
            <h5 className="mb-2 font-bold tracking-tight">
              {review.product.title}
            </h5>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={review.user.image}
              alt={review.user._id}
            />
            <h5 className="mb-2 font-bold tracking-tight">
              {review.user.email}
            </h5>
          </div>
        </td>
      </tr>
    );
  } else return null;
};

const memorizedReview = memo(Review);

export default AdminManageReview;
