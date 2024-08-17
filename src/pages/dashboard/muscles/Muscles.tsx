import React, { useState } from 'react'
import CrudTable from '../../../components/CrudTable'
// import { MusclesDataSource } from '../../../constants/fake'
import { useCreateMuscleMutation, useDeleteMuscleMutation, useEditMuscleMutation, useGetMusclesQuery } from '../../../features/muscles/musclesApiSlice';
import { Button, Col, Image, Row , Form, Input} from 'antd';
import { getBackURL, showErrors } from '../../../functions/helpers';
import { useDispatch } from 'react-redux';
import CustomModal from '../../../components/CustomModal';
import CustomUpload from '../../../components/CustomUpload';
import { apiSlice } from '../../../app/api/apiSlice';

// import MusclesModal from './MuscleModal';
import { EditOutlined } from '@ant-design/icons';

function Muscles() {
  const {data , isLoading} = useGetMusclesQuery({});
  const muscles = data?.muscles;
  const [deleteMuscle , {}] = useDeleteMuscleMutation();
  const [editMuscle , {}] = useEditMuscleMutation() ;
  const [createMuscle , {}  ] =  useCreateMuscleMutation() ;

  const dispatch = useDispatch() ;
  const MusclesColumn : any[] = [
    {
      title:'Name',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'Image',
      render: item => {
        return <>
          <Image width={100}  src={ `${import.meta.env.VITE_REACT_API_KEY.split('/api')[0]}/storage/${item.image}` }
          />
        </>;
      }
    }
  ];

  // modal states 
  const [openModal, setOpenModal ] = useState(0) ;
  const [modalAction , setModalAction ] = useState('add') ;
  const [newModalData, setNewModalData ] =useState() ;
  const [form] = Form.useForm();
  // end modal states 
  // (modal + crudTable )mutations 
  let mutations  = {
    delete: async (id:string)=>{
      try{
        await deleteMuscle({id}).unwrap();
      }catch(err){
        showErrors(err);
      }
    },
    update: async (data:any)=>{
      try{
        let auth = JSON.parse(localStorage.getItem('auth'));
        auth = auth?.access_token ;
        let res = await fetch(getBackURL()+'/dashboard/muscles/'+newModalData.id, {
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
      let res = await fetch(getBackURL()+ '/dashboard/muscles', {
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
      }
    },
  ]
  // modal Form
  const modalForm =<>
        <Form
          onFinish={(values:any)=>{
            const data : any = new FormData();
            data.append('name', values.name) ;
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
                rules={[{ required: true, message: 'Please Enter the name of the muscle' }]}
              >
                <Input type='text' />
          </Form.Item>
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
              setOpenModal(1); 
              setModalAction('add')
            }}
          >
            Add New Muscle
          </Button>
        </Col>
      </Row>

      <CrudTable
          columns={MusclesColumn}
          dataSource={muscles}
          route={'/dashboard/muscles'}
          endpoint='/'
          defaultActions={['delete','update']}
          mutations={mutations }
          actions={actions}

      />
    

      <CustomModal 
          entity='muscle'
          ModalForm={modalForm}
          
          form={form}
          action={modalAction}
          open={openModal}
          setOpen={setOpenModal}

      ></CustomModal>
    </>
  )
}

export default Muscles