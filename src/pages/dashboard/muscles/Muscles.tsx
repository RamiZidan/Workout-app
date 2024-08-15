import React from 'react'
import CrudTable from '../../../components/CrudTable'
import { MusclesDataSource } from '../../../constants/fake'
import { Button, Col, Image, Row } from 'antd';
import { useDeleteMuscleMutation, useGetMusclesQuery } from '../../../features/muscles/musclesApiSlice';
import { showErrors } from '../../../functions/helpers';
function Muscles() {
  const {data , isLoading} = useGetMusclesQuery({});
  const muscles = data?.muscles;
  const [deleteMuscle , {}] = useDeleteMuscleMutation();
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
  let mutations  = {
    delete: async (id:string)=>{
      try{
        let res = await deleteMuscle({id}).unwrap();
      }catch(err){
        showErrors(err);
      }

    }
  }
  
  return (
    <>
    
      <Row justify={'end'} >
        
        <Col>
          <Button
            style={{backgroundColor:'#5099ff'}}
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
      />
    </>
  )
}

export default Muscles