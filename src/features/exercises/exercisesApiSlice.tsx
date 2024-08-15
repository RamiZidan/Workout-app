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
        getExercisesByCourseDayId: builder.mutation({
            query: ({courseId , dayId }) => ({
                url:`/website/courses/${courseId}/course_day/${dayId}/day_exercise`,
                method:'GET',
            })
        })
    })
})


export const {
    useCreateExerciseMutation,
    useDeleteExerciseMutation,
    useEditExerciseMutation,
    useGetExercisesByCourseDayIdMutation,
    useGetExercisesByIdQuery,
    useGetExercisesQuery,

} = exercisesApiSlice