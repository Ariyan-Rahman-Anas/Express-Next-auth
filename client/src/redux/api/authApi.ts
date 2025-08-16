import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        userLogin: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["auth"]
        }),

        userLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["auth"]
        }),
    })
})

export const {
    useUserLoginMutation,
    useUserLogoutMutation
} = authApi