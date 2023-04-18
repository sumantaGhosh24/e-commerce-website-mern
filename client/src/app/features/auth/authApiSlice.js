import {apiSlice} from "../../api/apiSlice";
import {setCredentials, logout} from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: {...credentials},
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: {...credentials},
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data);
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh_token",
        method: "GET",
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data);
          const {accessToken} = data;
          dispatch(setCredentials({accessToken}));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRefreshMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRegisterMutation,
} = authApiSlice;
