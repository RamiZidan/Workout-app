import React from 'react'
import CrudTable from '../../../components/CrudTable'
import { Image } from 'antd'
import { ExercisesDataSource } from '../../../constants/fake'
import { useDeleteExerciseMutation, useGetExercisesQuery } from '../../../features/exercises/exercisesApiSlice';
import { showErrors } from '../../../functions/helpers';

function Exercises() {
  const {data , isLoading} = useGetExercisesQuery({});
  const exercises = data?.exercises ;
  const [deleteExercise , {}] = useDeleteExerciseMutation();

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
  let mutations = {
    delete:async (id:any)=>{
      try{
        let res = await deleteExercise({id}).unwrap();

      }
      catch(err){
        showErrors(err);
      }
    }
  }
  return (
    <CrudTable
      columns={dashboardExercises}
      dataSource={exercises}
      route='/dashboard/exercises'
      endpoint='/'
      defaultActions={['delete','update']}
      mutations={mutations}
    />
  )
}

export default Exercises