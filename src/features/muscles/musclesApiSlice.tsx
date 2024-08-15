import { apiSlice } from "../../app/api/apiSlice";
import { Course } from "./musclesSlice";


// logic on auth route (register,login,logout)

export const musclesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createMuscle: builder.mutation({
            query: (data:Course)=>({
                url:`/dashboard/muscles`,
                method:'POST',
                body: data
            }),
            // providesTags:['muscles']
        }),
        getMuscles : builder.query({
            query: () => ({
                url: '/dashboard/muscles',
                method: 'GET',
            }),
            providesTags:['muscles']
        }),
        getMuscleById: builder.query({
            query: ({id})=>({
                url:`/dashboard/muscles/${id}`,
                method:'GET',
            }),
            // providesTags:['courses']
        }),
        editMuscle: builder.mutation({
            query: (data:Course)=>({
                url:`/dashboard/muscles/${data.id}`,
                method:'PUT',
                body: data
            }),
            invalidatesTags:['muscles']
        }),
        deleteMuscle: builder.mutation({
            query: ({id})=>({
                url:`/dashboard/muscles/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['muscles']
        }),

    })
})


export const {
    useCreateMuscleMutation,
    useDeleteMuscleMutation,
    useEditMuscleMutation,
    useGetMuscleByIdQuery,
    useGetMusclesQuery

} = musclesApiSlice