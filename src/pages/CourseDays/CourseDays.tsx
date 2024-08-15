import React, { useEffect, useState } from 'react'
// import { courseDays } from '../../constants/fake'
import { Button, Card, Col, Popconfirm, Row } from 'antd';
import {  DeleteOutlined, EditOutlined, FolderViewOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreateCourseDayMutation, useDeleteCourseDayMutation, useEditCourseDayMutation, useGetCourseDaysQuery } from '../../features/courseDays/courseDaysApiSlice';
import { showErrors } from '../../functions/helpers';


function CourseDays() {

  const [record ,setRecord ] = useState({}) ;
  const [action , setAction] = useState('') ; 
  const params = useParams() ;
  const {courseId} = params ;
  const {data , isLoading} = useGetCourseDaysQuery({courseId});
  const [deleteCourseDay , {} ] = useDeleteCourseDayMutation();
  const [editCourseDay , {}] = useEditCourseDayMutation();
  const [createCourseDay , {}] = useCreateCourseDayMutation() ;

  const courseDays = data?.course_days ;
  console.table(courseDays);
  const navigate = useNavigate() ;
  const location = useLocation();
  let route = '/courses' ;
  let mutations =['user mutations'] ; 
  const pathname = location.pathname ;
  if(pathname.includes('dashboard')){
    // mutations =  ;
    route = '/dashboard/courses';
  }

  const actions: React.ReactNode[] = [
    {
      title:'view',
      icon: <FolderViewOutlined key="view" onClick={(e:any)=>{ 
        setAction('view');   
      }} />
    },
    {
      title: 'start',
      icon: <PlayCircleOutlined key='start' onClick={(e:any)=>{
        setAction('start');
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

  return (
    <>
    
    {/* <Row gutter={18}> */}
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
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
     
      {/* </Row> */}
      
    </>
  )
}

export default CourseDays