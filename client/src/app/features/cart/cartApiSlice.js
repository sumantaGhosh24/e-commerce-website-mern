import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState();

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      transformResponse: (responseData) => responseData,
      providesTags: () => [{type: "Cart", id: "LIST"}],
    }),
    addCart: builder.mutation({
      query: (initialCart) => ({
        url: "/cart",
        method: "POST",
        body: {...initialCart},
      }),
      invalidatesTags: () => [{type: "Cart", id: "LIST"}],
    }),
    removeCart: builder.mutation({
      query: ({id}) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{type: "Cart", id: "LIST"}],
    }),
  }),
});

export const {useAddCartMutation, useGetCartQuery, useRemoveCartMutation} =
  cartApiSlice;
