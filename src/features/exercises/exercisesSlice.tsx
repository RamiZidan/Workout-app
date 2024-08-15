import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'



// type of user state information
export type Course = {
    id?: any ;
    name: string ; 
    duration: number ;
    left_days : number ;
    created_by? : number ;
    is_public? : boolean ;
    created_at? : Date;
}
// intial State when the app starts
const intiState: Course[] = []



const exercisesApiSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCourses: (state, action )=> {
            const courses = action.payload ; 
            state.courses = courses ;
        },
        
    }
})


export const { setCourses } = exercisesApiSlice.actions
export default exercisesApiSlice.reducer


export const selectCourses = (state:RootState)=> state.getCourses

//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.name
export const selectCurrentPermission = (state: RootState) => state.auth.is_admin
export const selectCurrentToken = (state: RootState) => state.auth.access_token

