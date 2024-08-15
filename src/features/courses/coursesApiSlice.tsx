import { apiSlice } from "../../app/api/apiSlice";
import { Course } from "./coursesSlice";


// logic on auth route (register,login,logout)

export const coursesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createCourse: builder.mutation({
            query: (data:Course)=>({
                url:`/website/courses`,
                method:'POST',
                body: data
            }),
            providesTags:['courses']
        }),
        getCourses : builder.query({
            query: () => ({
                url: '/website/courses',
                method: 'GET',
            }),
            providesTags:['courses']
        }),
        getCourseById : builder.query({
            query: (id:any) => ({
                url: `/website/courses/${id}`,
                method:'GET', 
            })
        }),
        deleteCourse : builder.mutation({
            query: (id:any)=>({
                url:`/website/courses/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['courses']
        }),
        updateCourse: builder.mutation({
            query: (data:Course)=>({
                url: `/website/courses/${data.id}`,
                method:'PUT',
                body: data
            }),
            invalidatesTags:['courses']
            
        }),
        
    })
})


export const {
    useCreateCourseMutation,
    useGetCoursesQuery,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
    useGetCourseByIdQuery,    
} = coursesApiSlice