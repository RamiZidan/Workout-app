import React, { useState } from 'react'
import CrudTable from '../../../components/CrudTable'
import { Button, Col, Form, Image, Input, Row, Select } from 'antd'
import { ExercisesDataSource } from '../../../constants/fake'
import { useDeleteExerciseMutation, useEditExerciseMutation, useGetExercisesQuery } from '../../../features/exercises/exercisesApiSlice';
import { getBackURL, showErrors } from '../../../functions/helpers';
import { useDispatch } from 'react-redux';
import CustomModal from '../../../components/CustomModal';
import CustomUpload from '../../../components/CustomUpload';
import { apiSlice } from '../../../app/api/apiSlice';
import { EditOutlined } from '@ant-design/icons';
import { useGetMusclesQuery } from '../../../features/muscles/musclesApiSlice';

function Exercises() {
  const {data , isLoading} = useGetExercisesQuery({});
  const exercises = data?.exercises ;
  const [deleteExercise , {}] = useDeleteExerciseMutation();
  const [editExercise  , {} ] = useEditExerciseMutation() ;
  let {data:muscles } = useGetMusclesQuery({});
  
  muscles = muscles?.muscles?.map((muscle:any)=>{return {label: muscle.name , value: muscle.id}})

  const dispatch = useDispatch() ;

const dashboardExercises :any[] =[
  {
    title:'Name',
    dataIndex:'name',
    key:'name',
  },
  {
    title:'Count',
    dataIndex:'set_count',
    key:'set_count'
  },
  {
    title:'Times',
    dataIndex:'times',
    key:'times'
  },
  {
    title:'Level',
    dataIndex:'level',
    key:'level'
  },
  {
    title:'Image',
    render : item =>{
      return <Image
        width={100}
        src={ `${import.meta.env.VITE_REACT_API_KEY.split('/api')[0]}/storage/${item.image}` }
      >
        
      </Image>
    }
  }
]
  
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
          let res = await deleteExercise({id}).unwrap();
  
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
          let res = await fetch(getBackURL()+'/dashboard/exercises/'+newModalData.id, {
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
        let res = await fetch(getBackURL()+ '/dashboard/exercises', {
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
    let actions = [
      {
        title:'update',
        icon:<EditOutlined></EditOutlined>,
        handler(record:any){
          setOpenModal(1);
          setModalAction('edit')
          form.setFieldsValue(record)
          setNewModalData(record);
        }
      },
    ]
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
            <Form.Item name="set_count" label="Count"
                  rules={[{ required: true, message: 'Please Enter the count' }]}
                >
                  <Input type='text' />
            </Form.Item>
            <Form.Item name="times" label="Times"
                  rules={[{ required: true, message: 'Please Enter the Times' }]}
                >
                  <Input type='text' />
            </Form.Item>
            <Form.Item name="level" label="Level"
                  rules={[{ required: true, message: 'Please Enter the Level ' }]}
                >
                  <Input type='text' />
            </Form.Item>
            <Row justify={'center'}>
              <Form.Item name='muscle_id' label='Target muscle' >
                <Select 
                    options={muscles}
                    style={{ width:100 }}
                  >
                  </Select>
              </Form.Item>
            </Row>
            <CustomUpload
            />
  
          </Form>
        </>
    
  



  return (
    <>
    
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
            onClick={()=>{
              setOpenModal(1)
              setModalAction('add')
              form.setFieldsValue(null)
            }}
          >
            Add New Exercise
          </Button>
        </Col>
        
      </Row>
      <CrudTable
        columns={dashboardExercises}
        dataSource={exercises}
        route='/dashboard/exercises'
        endpoint='/'
        defaultActions={['delete','update']}
        mutations={mutations}
        actions={actions}
      />
    
       <CustomModal 
          entity='exercise'
          ModalForm={modalForm}
          
          form={form}
          action={modalAction}
          open={openModal}
          setOpen={setOpenModal}

      ></CustomModal>
    </>
  )
}

export default Exercises