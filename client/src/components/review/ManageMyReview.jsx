import {useGetMyReviewsQuery} from "../../app/features/review/reviewApiSlice";
import {getWordStr} from "../../lib";

const ManageMyReview = ({reviewId, ind}) => {
  const {review} = useGetMyReviewsQuery("reviewList", {
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
          <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 p-2 mb-3 bg-white border border-gray-200 rounded-lg shadow"
              src={review?.product?.image[0]}
              alt={review?.product?._id}
            />
            <h5 className="mb-2 font-bold tracking-tight">
              {getWordStr(review?.product?.title)}
            </h5>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="w-24 h-24 mb-3 p-2 bg-white border border-gray-200 rounded-lg shadow"
              src={review?.user?.image}
              alt={review?.user?._id}
            />
            <th className="mb-2 font-bold tracking-tight">
              {review?.user?.email}
            </th>
          </div>
        </td>
      </tr>
    );
  } else return null;
};

export default ManageMyReview;
