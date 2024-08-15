import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'



// type of user state information
export type User = {
    id: number | null,
    name: string | null,
    is_admin : number | null,
    access_token : string | null | any,
    image : any ,
    level: any ,

}
// intial State when the app starts
let intiState: User = {
    id: null,
    name: null,
    is_admin : 0 ,
    access_token:null,
    image  : null ,
    level: null 
}
// get localstoragestate
if (localStorage.getItem('auth') !== null) {
    intiState = { ...JSON.parse(localStorage.getItem('auth') || '{}') as User }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (state, action) => {
            const { access_token, is_admin  } = action.payload
            const auth = { access_token , is_admin  }
            localStorage.setItem('auth', JSON.stringify(auth))
            state.access_token = access_token ; 
            state.is_admin = is_admin; 
        },
        setUserData: (state , action ) =>{
            const { id, name , is_admin , level ,image    } = action.payload
            const user = { id, name , is_admin , level , image   }
            localStorage.setItem('user', JSON.stringify(user))
            state = {...state , ...user} ; 
        },
        logOut: (state) => {
            localStorage.removeItem('auth') ;
            localStorage.removeItem('user') ;
            state.id = null
            state.name = null
            state.is_admin = null ; 
            state.level = null ; 
            state.image = null ; 
            state.access_token = null ;
        },
    }
})


export const { setCredentials, logOut  , setUserData} = authSlice.actions
export default authSlice.reducer


//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.name
export const selectCurrentPermission = (state: RootState) => state.auth.is_admin
export const selectCurrentToken = (state: RootState) => state.auth.access_token