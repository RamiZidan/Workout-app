import { apiSlice } from "../../app/api/apiSlice";
import { CourseDay } from "./coursesDaysSlice";


// logic on auth route (register,login,logout)

export const courseDaysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getCourseDays: builder.query({
            query:({courseId})=>({
                url:`/website/courses/${courseId}/course_day`,
                method:'GET'
            }),
            providesTags:['courseDays']
        }),
        createCourseDay : builder.mutation({
            query:({courseId})=>({
                url:`/website/courses/${courseId}/course_day`,
                method:'POST'
            }),
            invalidatesTags:['courseDays']
        }),
        deleteCourseDay: builder.mutation({
            query:({courseId,dayId}) => ({
                url:`/website/courses/${courseId}/course_day/${dayId}`,
                method:'DELETE'
            }),
            invalidatesTags:['courseDays']
        }),
        editCourseDay: builder.mutation({
            query:({courseId,dayId , ...data})=>({
                url:`/website/courses/${courseId}/course_day/${dayId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['courseDays']
        }),
      
        
    })
})


export const {
    useCreateCourseDayMutation,
    useDeleteCourseDayMutation,
    useEditCourseDayMutation,
    useGetCourseDaysQuery,
} = courseDaysApiSlice