import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState();

// /api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
      transformResponse: (responseData) => {
        const loadedProduct = responseData.map((product) => {
          product.id = product._id;
          return product;
        });
        return productAdapter.setAll(initialState, loadedProduct);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Product", id: "LIST"},
            ...result.ids.map((id) => ({type: "Product", id})),
          ];
        } else return [{type: "Product", id: "LIST"}];
      },
    }),
    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Product", id: "LIST"}],
    }),
    updateProduct: builder.mutation({
      query: (initialProduct) => ({
        url: "/product",
        method: "PUT",
        body: {
          ...initialProduct,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Product", id: arg.id}],
    }),
    deleteProduct: builder.mutation({
      query: ({id}) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "Product", id: arg.id}],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productApiSlice;
