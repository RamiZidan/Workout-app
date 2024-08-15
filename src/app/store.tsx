import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

// import other reducers
import authReducer from '../features/auth/authSlice'
import { coursesApiSlice } from '../features/courses/coursesApiSlice'
import { courseDaysApiSlice } from '../features/courseDays/courseDaysApiSlice'
import { exercisesApiSlice } from '../features/exercises/exercisesApiSlice'
import { musclesApiSlice } from '../features/muscles/musclesApiSlice'
// store (state,(reducers(actions to dispatch)))

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [coursesApiSlice.reducerPath]:coursesApiSlice.reducer,
        [courseDaysApiSlice.reducerPath]:courseDaysApiSlice.reducer,
        [exercisesApiSlice.reducerPath]: exercisesApiSlice.reducer ,
        [musclesApiSlice.reducerPath]:musclesApiSlice.reducer,
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false,}).concat(apiSlice.middleware)
    , devTools: true
})

export type RootState = ReturnType<typeof store.getState>
