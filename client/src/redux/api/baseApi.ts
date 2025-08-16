import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue
} from "@reduxjs/toolkit/query/react";
import { removeUser } from "../features/authSlice";
import { API_CONFIG } from "@/lib/config";

const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.base_url,
    credentials: "include"
});

// Helper function to handle logout
const handleLogout = async (api: any) => {
    try {
        await fetch(API_CONFIG.logout_url, {
            method: "POST",
            credentials: "include",
        });
        console.log("Logout API called successfully");
    } catch (error) {
        console.error("Error calling logout API:", error);
    } finally {
        api.dispatch(removeUser());
        api.dispatch(baseApi.util.resetApiState());
        api.dispatch(baseApi.util.resetApiState());
        
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }
};

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
    try {
        let result = await baseQuery(args, api, extraOptions);
        
        if (result?.error?.status === 401) {
            console.log("Access token expired, attempting refresh...");
            
            const refreshTokenResult = await fetch(
                API_CONFIG.refresh_token_url,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            
            const data = await refreshTokenResult.json();
            console.log("Refresh token response:", { data });
            
            if (refreshTokenResult.ok && data?.success) {
                console.log("Token refreshed successfully, retrying original request");
                result = await baseQuery(args, api, extraOptions);
            } else {
                console.log("Refresh token failed or expired, logging out user");
                await handleLogout(api);
            }
        }
        
        return result;
    } catch (error) {
        console.error("Error in baseQueryWithRefreshToken:", error);
        throw error;
    }
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ["auth", "user"],
});