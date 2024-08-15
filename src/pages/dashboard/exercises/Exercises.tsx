import React from 'react'
import CrudTable from '../../../components/CrudTable'
import { Image } from 'antd'
import { ExercisesDataSource } from '../../../constants/fake'

function Exercises() {

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
        src={item.image}
      >
        
      </Image>
    }
  }
]
  return (
    <CrudTable
      columns={dashboardExercises}
      dataSource={ExercisesDataSource}
      route='/dashboard/exercises'
      endpoint='/'
      defaultActions={['view','delete','update']}
    />
  )
}

export default Exercises