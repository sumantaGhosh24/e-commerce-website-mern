import {useGetProductsQuery} from "../../app/features/product/productApiSlice";
import {useTitle} from "../../hooks";
import {Loading, PublicHeader, PublicProduct} from "../../components";

const Public = () => {
  useTitle("Public");

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery("productList", {
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
    const {ids} = product;
    const tableContent =
      ids?.length &&
      ids.map((productId) => (
        <PublicProduct key={productId} productId={productId} />
      ));

    content = (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tableContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <PublicHeader />
      {content}
    </>
  );
};

export default Public;
