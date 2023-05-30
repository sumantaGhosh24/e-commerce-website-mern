import {Loading, ReviewCard} from "../";
import {useGetReviewsQuery} from "../../app/features/review/reviewApiSlice";

const ProductReviews = ({id}) => {
  const {
    data: review,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery(id);

  if (isLoading) {
    return <Loading />;
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
      ids.map((reviewId) => (
        <ReviewCard key={reviewId} reviewId={reviewId} id={id} />
      ));

    content = (
      <div className="container mx-auto shadow-xl rounded-xl my-10 p-5">
        <h1 className="mb-5 text-2xl font-bold">Product Reviews</h1>
        <div className="flex items-center justify-between flex-wrap">
          {tableContent}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default ProductReviews;
