import {apiSlice} from "../../api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRazorpay: builder.mutation({
      query: (credentials) => ({
        url: "/razorpay",
        method: "POST",
        body: {...credentials},
      }),
    }),
    verification: builder.mutation({
      query: (credentials) => ({
        url: "/verification",
        method: "POST",
        body: {...credentials},
      }),
    }),
  }),
});

export const {useGetRazorpayMutation, useVerificationMutation} =
  paymentApiSlice;
