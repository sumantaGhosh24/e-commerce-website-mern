import {useState} from "react";

import {useTitle} from "../../hooks";
import {useGetPaginationProductQuery} from "../../app/features/product/productApiSlice";
import {Loading, Product} from "../../components";
import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";

const Welcome = () => {
  useTitle("Welcome");

  const [sCategory, setSCategory] = useState("");
  const [sSort, setSSort] = useState("");
  const [sSearch, setSSearch] = useState("");
  const [sPage, setSPage] = useState(1);

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaginationProductQuery({
    category: sCategory,
    sort: sSort,
    search: sSearch,
    page: sPage,
  });

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!category?.length) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleCategory = (e) => {
    setSCategory(e.target.value);
    setSSearch("");
  };

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
      ids.map((productId) => <Product key={productId} productId={productId} />);

    content = (
      <div className="container mx-auto shadow-xl rounded-xl my-10 p-5">
        <h1 className="mb-5 text-2xl font-bold">All Products</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tableContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl bg-blue-500">
        <h2 className="text-3xl font-bold capitalize mb-10 text-white">
          Search Product
        </h2>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 w-1/4 mt-5 mx-5">
            <span className="text-white mr-3 text-xl">Filters: </span>
            <select
              name="category"
              value={sCategory}
              onChange={handleCategory}
              className="p-2 w-full"
            >
              <option value="">All Products</option>
              {category.map((category) => (
                <option value={"category=" + category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-1/4 md:w-2/5 lg:w-4/5 mt-5 mx-5">
            <span className="text-white mr-3 text-xl">Search: </span>
            <input
              type="text"
              value={sSearch}
              placeholder="Enter your search!"
              onChange={(e) => setSSearch(e.target.value.toLowerCase())}
              className="p-2 w-full"
            />
          </div>
          <div className="flex-1 w-1/4 md:w-2/5 lg:w-4/5 mt-5 mx-5">
            <span className="text-white mr-3 text-xl">Sort By: </span>
            <select
              value={sSort}
              onChange={(e) => setSSort(e.target.value)}
              className="p-2 w-full"
            >
              <option value="">Newest</option>
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best sales</option>
              <option value="sort=-price">Price: Hight-Low</option>
              <option value="sort=price">Price: Low-Hight</option>
            </select>
          </div>
        </div>
      </section>
      {content}
      <div className="my-5 flex align-center justify-center">
        <button className="btn btn-red" onClick={() => setSPage(sPage + 1)}>
          Load More
        </button>
      </div>
    </>
  );
};

export default Welcome;
