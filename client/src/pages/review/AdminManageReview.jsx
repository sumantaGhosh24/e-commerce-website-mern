import {useGetAllReviewsQuery} from "../../app/features/review/reviewApiSlice";
import {Loading, ManageReview} from "../../components";
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
      ids.map((reviewId, i) => (
        <ManageReview key={reviewId} reviewId={reviewId} ind={i + 1} />
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

export default AdminManageReview;
