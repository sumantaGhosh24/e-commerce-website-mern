import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const categoryAdapter = createEntityAdapter();

const initialState = categoryAdapter.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/category`,
      transformResponse: (responseData) => {
        const loadedCategory = responseData.map((category) => {
          category.id = category._id;
          return category;
        });
        return categoryAdapter.setAll(initialState, loadedCategory);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Category", id: "LIST"},
            ...result.ids.map((id) => ({type: "Category", id})),
          ];
        } else return [{type: "Category", id: "LIST"}];
      },
    }),
    createCategory: builder.mutation({
      query: (credentials) => ({
        url: "/category",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Category", id: "LIST"}],
    }),
    updateCategory: builder.mutation({
      query: (initialCategory) => ({
        url: "/category",
        method: "PUT",
        body: {
          ...initialCategory,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Category", id: arg.id}],
    }),
    deleteCategory: builder.mutation({
      query: ({id}) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "Category", id: arg.id}],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;

// export const selectCategoryResult =
//   categoryApiSlice.endpoints.getCategories.select();

// const selectCategoryData = createSelector(
//   selectCategoryResult,
//   (categoryResult) => categoryResult.data
// );

// export const {
//   selectAll: selectAllCategory,
//   selectById: selectCategoryById,
//   selectIds: selectCategoryIds,
// } = categoryAdapter.getSelectors(
//   (state) => selectCategoryData(state) ?? initialState
// );
