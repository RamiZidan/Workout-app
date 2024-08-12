import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminRoutes,userRoutes } from '../../routes/protected/ProtectedRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPermission, setUserData } from '../../features/auth/authSlice'
import { Permissions } from '../../features/auth/authSlice'
import CrudTable from '../../components/CrudTable'
import { testColumns } from '../../constants/columns'
import { fakeTableDataSource } from '../../constants/fake'
import { useMeMutation } from '../../features/auth/authApiSlice'
import { PlayCircleFilled } from '@ant-design/icons'

const Home = () => {
  const navigate = useNavigate()
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

  // useEffect(() => {
    
  // }, [])
  const actions = [
    {
      title:<PlayCircleFilled> Start </PlayCircleFilled>,
      handler(record:any){
        navigate(`/courses/${record.id}/days`)
      }
    }
  ]

  return (
    <div>
      {/* <h1>redirecting...</h1> */}
      <CrudTable
        columns={testColumns}
        dataSource={fakeTableDataSource}
        endpoint={'/api/product'}
        route={'/product'}
      ></CrudTable>
    </div>
  )
}

export default Home