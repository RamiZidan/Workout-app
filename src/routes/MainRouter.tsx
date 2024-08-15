import React from 'react'
import { useRoutes, Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import LayoutContainer from '../Layout/Layout'
import { adminRoutes, governmentOfficerRoutes,userRoutes} from './protected/ProtectedRoutes'
import { selectCurrentPermission } from '../features/auth/authSlice'
import { publicPages, appPages } from './public/PublicRoutes'
import { useSelector } from "react-redux"
import RequireAuth from '../features/auth/RequireAuth'
import { Permissions } from '../features/auth/authSlice'

const MainRouter = () => {
    const permission: Permissions | null = useSelector(selectCurrentPermission)
    console.log('per' ,permission);
    const protectedPages = permission == 1  ? adminRoutes : userRoutes;
    console.log(permission);
 
    // }
    return (
        <Router>
            <Routes>
                {
                    appPages.map(({ path, element }, index) => (
                        <Route path={path} element={element} key={index} />
                    ))
                }
                <Route element={<RequireAuth isRequired={false} />}>
                    {
                        publicPages.map(({ path, element }, index) => (
                            <Route path={path} element={element} key={index} />
                        ))
                    }
                </Route>
                <Route element={<RequireAuth isRequired={true} />}>
                    <Route element={<LayoutContainer />}>
                        {
                            protectedPages.map(({ path, element }, index) => (
                                <Route path={path} element={element} key={index} />
                            ))
                        }
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default MainRouter