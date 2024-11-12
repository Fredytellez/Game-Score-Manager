import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "admin/users/"
    }),
    loginUser: builder.mutation({
      query: (body) => ({
          url: "auth/login",
          method: "POST",
          body,
      }
      )
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
          url: "auth/register",
          method: "POST",
          body: userData,
      }
      )
    })
  })
});

export const {useGetUsersQuery, useRegisterUserMutation, useLoginUserMutation} = userApi;