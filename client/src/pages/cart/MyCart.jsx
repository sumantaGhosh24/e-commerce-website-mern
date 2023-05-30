import {useGetCartQuery} from "../../app/features/cart/cartApiSlice";
import {Cart, Checkout, Loading} from "../../components";
import {useTitle} from "../../hooks";

const MyCart = () => {
  useTitle("My Cart");

  const {
    data: cart,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartQuery("cartList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="max-w-7xl p-6 mx-auto my-20 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold capitalize mb-10">My Cart</h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10">
            {error.message}
          </h3>
        )}
        {isSuccess && (
          <div className="relative overflow-x-auto mt-10">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-lg text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Decrement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Increment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tax Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shipping Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.product?.map((pro, ind) => (
                  <Cart product={pro} ind={ind + 1} key={ind} />
                ))}
              </tbody>
              {cart?.product?.length === 0 && (
                <div className="font-bold text-xl">Your cart is empty.</div>
              )}
              {!cart && (
                <div className="font-bold text-xl">Your cart is empty.</div>
              )}
            </table>
          </div>
        )}
      </section>
      <Checkout cart={cart} />
    </>
  );
};

export default MyCart;
