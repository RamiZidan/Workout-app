import UserHome from "../../pages/home/UserHome";
import type { RouteObject } from "react-router-dom";
import Profile from "../../pages/profile/Profile";



export const userRoutes:RouteObject[] = [
    {
        path: '/',
        element: <UserHome/>
    },
    {
        path: '/courses',
        element: <UserHome/>
    },
    {
        path: '/courses/:id/days',
        element: <></>
    },
    {
        path: '/courses/:courseId/days/:dayId',
        element:<></>
    },
    {
        path: '/courses/:courseId/days/:dayId/exercise/:exerciseId',
        element:<></>
    },
    {
        path:'/profile',
        element:<Profile  ></Profile>
    },
    {
        path:'/profile/edit',
        element:<Profile  ></Profile>
    }
];

export const adminRoutes:RouteObject[] = [

    {
        path: '/',
        element: <></>
    },
    {
        path:'/muscles',
        element:<></>
    },
    {
        path:'/muscles/:id',
        element:<></>
    }
        
];