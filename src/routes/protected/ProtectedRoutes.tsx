import UserHome from "../../pages/home/UserHome";
import type { RouteObject } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import CourseDays from "../../pages/CourseDays/CourseDays";
import Exercises from "../../pages/exercises/Exercises";
import Exercise from "../../pages/exercises/Exercise";
import Courses from "../../pages/courses/Courses";
import Muscles from "../../pages/dashboard/muscles/Muscles";
import DashboardExercises from "../../pages/dashboard/exercises/Exercises";
import Dashboard from "../../pages/dashboard/Dashboard";


export const userRoutes:RouteObject[] = [
    {
        path: '/',
        element: <UserHome/> // muscles of the user
    },
    {
        path: '/courses',
        element: <Courses/>
    },
    {
        path: '/courses/:id/days',
        element: <CourseDays></CourseDays>
    },
    {
        path: '/courses/:courseId/days/:dayId',
        element: <Exercises></Exercises>
    },
    {
        path: '/courses/:courseId/days/:dayId/exercises/:exerciseId',
        element: <Exercise></Exercise>
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
        element: <Dashboard></Dashboard>
    },
    {
        path:'/dashboard/muscles',
        element:<Muscles></Muscles>
    },
    {
        path:'/dashboard/exercises',
        element:<DashboardExercises></DashboardExercises>
    },
    {
        path:'/dashboard/courses',
        element:<Courses></Courses>,
    },
    {
        path:'/dashboard/courses/:id/days',
        element:<CourseDays></CourseDays>
    },
    {
        path:'/dashboard/courses/:courseId/days/:dayId',
        element:<Exercises></Exercises>
    },
    // {
    //     path:'/dashboard/users/:id',
    //     element:<></>
    // },
    // {
    //     path:'/dashboard/users/:id/muscles', 
    //     element:<></>
    // },
        
];