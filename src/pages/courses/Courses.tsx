import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CrudTable from '../../components/CrudTable'
import { coursesColumns} from '../../constants/columns'

import { EditOutlined, FolderViewOutlined, PlayCircleFilled } from '@ant-design/icons'
import { useDeleteCourseMutation, useGetCoursesQuery } from '../../features/courses/coursesApiSlice'
import { Course, selectCourses } from '../../features/courses/coursesSlice'
import { Button, Col, Form, Input, Row, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateProfileMutation } from '../../features/auth/authApiSlice'
import { convertToFormData, getBackURL, showErrors } from '../../functions/helpers'
import { apiSlice } from '../../app/api/apiSlice'
import CustomModal from '../../components/CustomModal'

const Courses = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [deleteCourse , {}] = useDeleteCourseMutation();
  const [updateProfile , {}] = useUpdateProfileMutation() ;
  const dispatch = useDispatch();

  let route = '/courses' ;
  
  // modal states 
  const [openModal, setOpenModal ] = useState(0) ;
  const [modalAction , setModalAction ] = useState('add') ;
  const [newModalData, setNewModalData ] =useState({}) ;
  const [form] = Form.useForm();
  // end modal states 
  // (modal + crudTable )mutations 
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
    },
    {
      title:'update',
      icon:<EditOutlined></EditOutlined>,
      handler(record:any){
        setOpenModal(1);
        setModalAction('edit')
        form.setFieldsValue(record)
        setNewModalData(record);
      }
    }
  ];

    
    let mutations  = {
      delete:async (id:string)=>{
        try{
          let res = await deleteCourse(id).unwrap() ; 
        }
        catch(err){
          showErrors(err);
        }
        
      },
      update: async (data:any)=>{
        try{
          let auth = JSON.parse(localStorage.getItem('auth'));
          console.log(newModalData);
          auth = `Bearer ` + auth?.access_token ;
          let res = await fetch(getBackURL()+'/website/courses/'+newModalData.id, {
            method:'PUT',
            body:data ,
            headers:{
              'Authorization':auth 
            }
          })
          dispatch(apiSlice.util.resetApiState());
        }
        catch(err){
          showErrors(err);
        }
      },
      create: async (data:any)=>{
        let auth = JSON.parse(localStorage.getItem('auth'));
        auth =`Bearer `+ auth?.access_token ;
        let res = await fetch(getBackURL()+ '/website/courses', {
          method:'POST',
          body:data ,
          headers:{
            'Authorization':auth 
          }
        })
        dispatch(apiSlice.util.resetApiState());
      }
    }
    // crudTable mutations integrated with modal
    // modal Form
    const modalForm =<>
          <Form
            onFinish={(values:any)=>{
              const data : any = new FormData();
              for (const name in values) {
                if(name == 'file')continue ;
                data.append(name, values[name]); // there should be values.avatar which is a File object
              }
              // data.append('image', values?.file?.file?.originFileObj);
              if(modalAction == 'edit'){
                mutations.update(data);
              }
              else{
                mutations.create(data);
              }
            }}
            form={form}
            defaultValue={newModalData}
          >
            <Form.Item name="name" label="name"
                  rules={[{ required: true, message: 'Please Enter the name ' }]}
                >
                  <Input type='text' />
            </Form.Item>
            <Form.Item name="duration" label="Duration"
                  rules={[{ required: true, message: 'Please Enter the duration' }]}
                >
                  <Input type='text' />
            </Form.Item>
          </Form>
        </>
    
  





  return (
    <div>
      
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
            onClick={()=>{
              setOpenModal(1)
              setModalAction('add')
            }}
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
      <CustomModal
          entity='course'
          ModalForm={modalForm}
          
          form={form}
          action={modalAction}
          open={openModal}
          setOpen={setOpenModal}

      ></CustomModal>
    </div>
  )
}

export default Courses