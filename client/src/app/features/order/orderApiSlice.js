import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState();

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `/orders`,
      transformResponse: (responseData) => {
        const loadedOrder = responseData.map((order) => {
          order.id = order._id;
          return order;
        });
        return orderAdapter.setAll(initialState, loadedOrder);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Order", id: "LIST"},
            ...result.ids.map((id) => ({type: "Order", id})),
          ];
        } else return [{type: "Order", id: "LIST"}];
      },
    }),
    getUserOrder: builder.query({
      query: () => "/order",
      transformResponse: (responseData) => {
        const loadedOrder = responseData.map((order) => {
          order.id = order._id;
          return order;
        });
        return orderAdapter.setAll(initialState, loadedOrder);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Order", id: "LIST"},
            ...result.ids.map((id) => ({type: "Order", id})),
          ];
        } else return [{type: "Order", id: "LIST"}];
      },
    }),
    updateOrder: builder.mutation({
      query: (initialOrder) => ({
        url: "/order",
        method: "PUT",
        body: {
          ...initialOrder,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Order", id: arg.id}],
    }),
  }),
});

export const {useGetOrdersQuery, useGetUserOrderQuery, useUpdateOrderMutation} =
  orderApiSlice;
