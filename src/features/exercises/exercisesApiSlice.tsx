import { apiSlice } from "../../app/api/apiSlice";
import { Course } from "./exercisesSlice";


// logic on auth route (register,login,logout)

export const exercisesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createExercise: builder.mutation({
            query: (data:Course)=>({
                url:`/dashboard/courses`,
                method:'POST',
                body: data
            }),
            providesTags:['courses']
        }),
        getExercises : builder.query({
            query: () => ({
                url: '/website/exercises',
                method: 'GET',
            }),
            providesTags:['exercises']
        }),
        getExercisesById : builder.query({
            query: ({id}) => ({
                url: `/dashboard/exercises/${id}`,
                method: 'GET',
            }),
            // providesTags:['exercises']
        }),
        deleteExercise : builder.mutation({
            query: ({id}) => ({
                url: `/dashboard/exercises/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['exercises']
        }),
        editExercise : builder.mutation({
            query: (data) => ({
                url: `/dashboard/exercises/${data.id}`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags:['exercises']
        }),
        getExercisesByCourseIdAndDayId: builder.query({
            query: ({courseId , dayId }) => ({
                url:`/website/courses/${courseId}/course_day/${dayId}/day_exercise`,
                method:'GET',
            }),
            providesTags:['dayExercise']
        }),
        createFeedback: builder.mutation({
            query: (data)=>({
                url:`/website/practices`,
                method:'POST',
                body: data 
            })
        }),
        addDayExercise: builder.mutation({
            query: ({courseId , dayId , data })=>({
                url:`/website/courses/${courseId}/course_day/${dayId}/day_exercise`,
                method:'POST',
                body: data
            }),
            invalidatesTags:['dayExercise']
        })
    })
})


export const {
    useCreateExerciseMutation,
    useDeleteExerciseMutation,
    useEditExerciseMutation,
    useGetExercisesByCourseIdAndDayIdQuery,
    useGetExercisesByIdQuery,
    useGetExercisesQuery,
    useCreateFeedbackMutation,
    useAddDayExerciseMutation

} = exercisesApiSlice