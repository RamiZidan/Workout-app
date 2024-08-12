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
    const protectedPages = permission == 1  ? adminRoutes : userRoutes;
    console.log(permission);
    // const protectedPages = userRoutes
    // const navigate = useNavigate()
    // const dispatch = useDispatch();
    // // const permission: Permissions | null = useSelector(selectCurrentPermission)
    // // const navigateTo = permission === 'admin' ? adminRoutes[0]?.path  : userRoutes[0]?.path
    // const [permission , setPermission ] = useState() ;
  
    // const [me , {isLoading}] = useMeMutation();
    // const getUser = async ()=>{
    //   const userData:any = await me({}).unwrap() ;
    //   dispatch(setUserData(userData?.data));
    //   setPermission(userData?.data?.is_admin)
    //   const navigateTo = permission == 1 ? adminRoutes[0]?.path : userRoutes[0]?.path ;
  
    //   // navigate(String(navigateTo));
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