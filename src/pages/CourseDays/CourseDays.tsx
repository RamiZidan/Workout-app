import React, { useEffect, useState } from 'react'
import { courseDays } from '../../constants/fake'
import { Button, Card, Col, Row } from 'antd';
import {  DeleteOutlined, EditOutlined, FolderViewOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


function CourseDays() {
  // const getId = (e:any)=>{
  //   return e?.target?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.classList ;
  // }
  // const getKey = (e:any)=>{
  //   return e?.target?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.classList ;
  // }
  const [record ,setRecord ] = useState({}) ;
  const [action , setAction] = useState('') ; 

  const params = useParams() ;
  const navigate = useNavigate() ;
  const location = useLocation();
  let route = '/courses' ;
  let mutations =['user mutations'] ; 
  const pathname = location.pathname ;
  if(pathname.includes('dashboard')){
    mutations = ['admin mutations'] ;
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
    {title: 'delete', icon: <DeleteOutlined key="delete"  onClick={()=>setAction('delete')} />,}
  ].filter((action:any)=>{
    if(action.title == 'start' && pathname.includes('dashboard'))return false ;
    return true; 
  });  
  useEffect(()=>{
    console.log(action ,record );
    if(action == 'view'){
      navigate(`${route}/${params.id}/days/${record?.id}`);
    }
    else if(action == 'start'){
      navigate(`${route}/${params.id}/days/${record?.id}/exercises/1`)
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