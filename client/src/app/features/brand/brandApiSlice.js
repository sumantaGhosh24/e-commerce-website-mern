import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const brandAdapter = createEntityAdapter();

const initialState = brandAdapter.getInitialState();

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => `/brand`,
      transformResponse: (responseData) => {
        const loadedBrand = responseData.map((brand) => {
          brand.id = brand._id;
          return brand;
        });
        return brandAdapter.setAll(initialState, loadedBrand);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Brand", id: "LIST"},
            ...result.ids.map((id) => ({type: "Brand", id})),
          ];
        } else return [{type: "Brand", id: "LIST"}];
      },
    }),
    createBrand: builder.mutation({
      query: (credentials) => ({
        url: "/brand",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Brand", id: "LIST"}],
    }),
    updateBrand: builder.mutation({
      query: (initialBrand) => ({
        url: "/brand",
        method: "PUT",
        body: {
          ...initialBrand,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Brand", id: arg.id}],
    }),
    deleteBrand: builder.mutation({
      query: ({id}) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "Brand", id: arg.id}],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} = brandApiSlice;
