import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const reviewAdapter = createEntityAdapter();

const initialState = reviewAdapter.getInitialState();

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => `/all-reviews`,
      transformResponse: (responseData) => {
        const loadedReview = responseData.map((review) => {
          review.id = review._id;
          return review;
        });
        return reviewAdapter.setAll(initialState, loadedReview);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Review", id: "LIST"},
            ...result.ids.map((id) => ({type: "Review", id})),
          ];
        } else return [{type: "Review", id: "LIST"}];
      },
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      transformResponse: (responseData) => {
        const loadedReview = responseData.map((review) => {
          review.id = review._id;
          return review;
        });
        return reviewAdapter.setAll(initialState, loadedReview);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Review", id: "LIST"},
            ...result.ids.map((id) => ({type: "Review", id})),
          ];
        } else return [{type: "Review", id: "LIST"}];
      },
    }),
    getMyReviews: builder.query({
      query: () => "/reviews",
      transformResponse: (responseData) => {
        const loadedReview = responseData.map((review) => {
          review.id = review._id;
          return review;
        });
        return reviewAdapter.setAll(initialState, loadedReview);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Review", id: "LIST"},
            ...result.ids.map((id) => ({type: "Review", id})),
          ];
        } else return [{type: "Review", id: "LIST"}];
      },
    }),
    createReview: builder.mutation({
      query: (credentials) => ({
        url: `/review/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Review", id: "LIST"}],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useGetReviewsQuery,
  useGetAllReviewsQuery,
} = reviewApiSlice;
