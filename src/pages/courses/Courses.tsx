import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CrudTable from '../../components/CrudTable'
import { coursesColumns} from '../../constants/columns'

import { FolderViewOutlined, PlayCircleFilled } from '@ant-design/icons'
import { useDeleteCourseMutation, useGetCoursesQuery } from '../../features/courses/coursesApiSlice'
import { Course, selectCourses } from '../../features/courses/coursesSlice'
import { Button, Col, Row, message } from 'antd'
import { useSelector } from 'react-redux'
import { useUpdateProfileMutation } from '../../features/auth/authApiSlice'
import { convertToFormData, showErrors } from '../../functions/helpers'

const Courses = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [deleteCourse , {}] = useDeleteCourseMutation();
  const [updateProfile , {}] = useUpdateProfileMutation() ;
  let route = '/courses' ;
  let mutations = {
    delete:async (id:string)=>{
      try{
        let res = await deleteCourse(id).unwrap() ; 
      }
      catch(err){
        showErrors(err);
      }
      
    }
  }
  const pathname = location.pathname ;
  let {data , isLoading } = useGetCoursesQuery({}) ;
  let courses = data?.courses ;
  
  
  if(pathname.includes('dashboard')){
    route = '/dashboard/courses';
  }

  if(isLoading){
    return <>
      Loading ...
    </>
  }
  const actions = [
    {
      title:'start',
      icon:<PlayCircleFilled> </PlayCircleFilled>,
      async handler(record:any){
        // send request (update)
        let data = {course_id: record.id} ; 
        data = convertToFormData(data) ;
        let res = await updateProfile(data).unwrap() ;
        navigate(`${route}/${record.id}/days`)
      }
    },
    {
      title:'view',
      icon:<FolderViewOutlined></FolderViewOutlined>,
      handler(record:any){
        navigate(`${route}/${record.id}/days`)
      }
    }
  ];


  return (
    <div>
      
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
          >
            Add New Course
          </Button>
        </Col>
        
      </Row>
      <CrudTable
        columns={coursesColumns}
        dataSource={courses}
        endpoint={'/api/product'}
        route={route}
        actions={actions}
        defaultActions={['delete','update','view']}
        mutations={mutations}
      ></CrudTable>
    </div>
  )
}

export default Courses