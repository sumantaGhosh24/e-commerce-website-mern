import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

// query: (id) => ({ url: `post/${id}` }),
// transformResponse: (response, meta, arg) => response.data,
// transformErrorResponse: (response, meta, arg) => response.status,
// providesTags: (result, error, id) => [{ type: 'Post', id }],

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user`,
      transformResponse: (response) => response,
    }),
    getDashboard: builder.query({
      query: () => "/dashboard",
      transformResponse: (response) => response,
    }),
    getAllUser: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        const loadedUser = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedUser);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "User", id: "LIST"},
            ...result.ids.map((id) => ({type: "User", id})),
          ];
        } else return [{type: "User", id: "LIST"}];
      },
    }),
    deleteUser: builder.mutation({
      query: ({id}) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "User", id: arg.id}],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetUserQuery,
  useGetDashboardQuery,
} = userApiSlice;
