import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'



// type of user state information
export type Muscle = {

}
// intial State when the app starts
const intiState: Muscle[] = []



const musclesApiSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCourses: (state, action )=> {
            const muscles = action.payload ; 
            state.muscles = muscles ;
        },
        
    }
})


export const { setCourses } = musclesApiSlice.actions
export default musclesApiSlice.reducer


export const selectCourses = (state:RootState)=> state.getCourses

//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.name
export const selectCurrentPermission = (state: RootState) => state.auth.is_admin
export const selectCurrentToken = (state: RootState) => state.auth.access_token

