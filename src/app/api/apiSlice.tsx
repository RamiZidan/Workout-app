import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {  logOut } from '../../features/auth/authSlice'
const SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY 


type RefreshResponse = {
    data: any,
    user: {
        id?: number,
        username?: string,
    } | any
} | any

// configure for cookies and tokens
const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_SIDE,
    // credentials: 'include',
    // credentials: "same-origin", 
    prepareHeaders: (headers, { getState}: any) => {
        const token = getState().auth.access_token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
            headers.set('Content-Type','application/x-www-form-urlencoded');
        }
        return headers
    }  
})

// custom query function to (access-refresh) logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // try first request
    const result = await baseQuery(args, api, extraOptions)
    // your token maybe expired 
    if (result?.error?.status === 401) {
        api.dispatch(logOut())
    }
    return result
}

// Api Slice 
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['auth'],
    endpoints: () => ({}),
})


