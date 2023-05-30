import {useGetReviewsQuery} from "../../app/features/review/reviewApiSlice";

const ReviewCard = ({reviewId, id}) => {
  const {review} = useGetReviewsQuery(`${id}`, {
    selectFromResult: ({data}) => ({review: data?.entities[reviewId]}),
  });

  if (review) {
    return (
      <div className="flex-1 w-1/4 md:w-2/5 lg:w-4/5 mt-5 mx-5 shadow-lg rounded p-5">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {review.comment}
          </div>
          <div className="text-gray-900 text-xl mb-2">
            <span className="font-medium">Rating: </span>
            {review.rating}
          </div>
          <p className="text-gray-700 text-base">{review.createdAt}</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={review?.user?.image}
            alt={review?.user?.username}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              {review?.user?.username}
            </p>
            <p className="text-gray-600">{review?.user?.email}</p>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default ReviewCard;
