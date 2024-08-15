import React from 'react'
import CrudTable from '../../../components/CrudTable'
import { MusclesDataSource } from '../../../constants/fake'
import { Image } from 'antd';
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