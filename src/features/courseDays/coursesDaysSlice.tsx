import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'



// type of user state information
export type CourseDay = {
    id?: any ;
    name: string ; 
    duration: number ;
    left_days : number ;
    created_by? : number ;
    is_public? : boolean ;
    created_at? : Date;
}
// intial State when the app starts
const intiState: CourseDay[] = []



const courseDaysSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCourses: (state, action )=> {
            const courseDays = action.payload ; 
            state.coursesDays = coursesDays;
        },
        
    }
})


export const { setCourses } = courseDaysSlice.actions
export default courseDaysSlice.reducer


// export const selectCourses = (state:RootState)=> state.courses

//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.name
export const selectCurrentPermission = (state: RootState) => state.auth.is_admin
export const selectCurrentToken = (state: RootState) => state.auth.access_token

