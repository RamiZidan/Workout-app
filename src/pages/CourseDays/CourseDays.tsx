import React, { useEffect, useState } from 'react'
// import { courseDays } from '../../constants/fake'
import { Button, Card, Col, Form, Input, Popconfirm, Row } from 'antd';
import {  DeleteOutlined, EditOutlined, FolderViewOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreateCourseDayMutation, useDeleteCourseDayMutation, useEditCourseDayMutation, useGetCourseDaysQuery } from '../../features/courseDays/courseDaysApiSlice';
import { getBackURL, showErrors } from '../../functions/helpers';
import CustomModal from '../../components/CustomModal';
import { apiSlice } from '../../app/api/apiSlice';
import { useDispatch } from 'react-redux';


function CourseDays() {

  const [record ,setRecord ] = useState({}) ;
  const [action , setAction] = useState('') ; 
  const params = useParams() ;
  const {courseId} = params ;
  const {data , isLoading} = useGetCourseDaysQuery({courseId});
  const [deleteCourseDay , {} ] = useDeleteCourseDayMutation();
  const [editCourseDay , {}] = useEditCourseDayMutation();
  const [createCourseDay , {}] = useCreateCourseDayMutation() ;
  const dispatch = useDispatch();
  const courseDays = data?.course_days ;
  console.table(courseDays);
  const navigate = useNavigate() ;
  const location = useLocation();
  let route = '/courses' ;
  
  const pathname = location.pathname ;
  if(pathname.includes('dashboard')){
    // mutations =  ;
    route = '/dashboard/courses';
  }

  const actions: React.ReactNode[] = [
    {
      title: 'start',
      icon: <PlayCircleOutlined key='start' onClick={(e:any)=>{
        setAction('start');
      }} />
    },
    {
      title:'view',
      icon: <FolderViewOutlined key="view" onClick={(e:any)=>{ 
        setAction('view');   
      }} />
    },
    {title: 'edit' , icon: <EditOutlined key="edit" onClick={()=>setAction('edit')} />},
    {title: 'delete', icon:<>
            <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async ()=>{
                          try{
                            let res = await deleteCourseDay({courseId, dayId:record.id}).unwrap();
                          }
                          catch(err){
                            showErrors(err);
                          }
                        }}
                    >
                        <a>
                            <DeleteOutlined></DeleteOutlined>
                        </a>
                    </Popconfirm>
    </> 
    }
  ].filter((action:any)=>{
    if(action.title == 'start' && pathname.includes('dashboard'))return false ;
    return true; 
  });  
  useEffect(()=>{
    console.log(action ,record );
    if(action == 'view'){
      navigate(`${route}/${params.courseId}/days/${record?.id}`);
    }
    else if(action == 'start'){
      navigate(`${route}/${params.courseId}/days/${record?.id}/exercises/${record.first_exercise}`)
    }
  },[action , record])

      // modal states 
      const [openModal, setOpenModal ] = useState(0) ;
      const [modalAction , setModalAction ] = useState('add') ;
      const [newModalData, setNewModalData ] =useState({}) ;
      const [form] = Form.useForm();
      
      // end modal states 
      // (modal + crudTable )mutations 
      
      let mutations  = {
        delete:async (id:any)=>{
          try{
            // let res = await deleteExercise({id}).unwrap();
    
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
            let res = await fetch(getBackURL()+'/website/exercises/'+newModalData.id, {
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
          let res = await fetch(getBackURL()+ '/website/courses/' + courseId + '/course_day', {
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
      // let actions = [
      //   {
      //     title:'update',
      //     icon:<EditOutlined></EditOutlined>,
      //     handler(record:any){
      //       setOpenModal(1);
      //       setModalAction('edit')
      //       form.setFieldsValue(record)
      //       setNewModalData(record);
      //     }
      //   },
      // ]
      // modal Form
      const modalForm =<>
            <Form
              onFinish={(values:any)=>{
                const data : any = new FormData();
                for (const name in values) {
                  if(name == 'file')continue ;
                  data.append(name, values[name]); // there should be values.avatar which is a File object
                }
                data.append('image', values?.file?.file?.originFileObj);
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

 
            </Form>
          </>
      
    

  return (
    <>
    
    {/* <Row gutter={18}> */}
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
            onClick={()=>{
              setOpenModal(1)
              setModalAction('add')
            }}
          >
            Add New Course Day
          </Button>
        </Col>
        
      </Row>
      <Row>
        {
          courseDays?.map((courseDay:any)=>{
            return <> 
            <Col span={3}>
              <Card style={{ margin:5}}
                actions={actions.map((action:any)=>{return action?.icon})}
                // id={courseDay.id}
                className={`${courseDay.id}-${3}`}
                onClick={()=>setRecord(courseDay)}
              >
                <div  >
                  {courseDay?.name}
                </div>

              </Card>
            </Col>
            </>;
          })
        }
      </Row>
      <CustomModal
          entity='course day'
          ModalForm={modalForm}
          
          form={form}
          action={modalAction}
          open={openModal}
          setOpen={setOpenModal}

      ></CustomModal>
     
      {/* </Row> */}
      
    </>
  )
}

export default CourseDays