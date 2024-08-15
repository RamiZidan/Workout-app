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
import Courses from '../courses/Courses'

const Home = () => {
  

  return (
    <Courses/>
  )
}

export default Home