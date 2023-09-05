import propTypes from "prop-types";

import {useGetAllReviewsQuery} from "../../app/features/review/reviewApiSlice";

const ManageReview = ({reviewId, ind}) => {
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
              src={review?.product?.image[0]}
              alt={review?.product?._id}
            />
            <h5 className="mb-2 font-bold tracking-tight">
              {review?.product?.title}
            </h5>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-6 bg-white border border-gray-200 rounded-lg shadow"
              src={review?.user?.image}
              alt={review?.user?._id}
            />
            <h5 className="mb-2 font-bold tracking-tight">
              {review?.user?.email}
            </h5>
          </div>
        </td>
      </tr>
    );
  } else return null;
};

ManageReview.propTypes = {
  reviewId: propTypes.string,
  ind: propTypes.number,
};

export default ManageReview;
