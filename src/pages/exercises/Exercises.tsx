import React, { useState } from 'react'
import CrudTable from '../../components/CrudTable'
import { DayExercises } from '../../constants/columns'
import { AllExercises, DayExercisesDataSource } from '../../constants/fake'
import { Button, Row, Select } from 'antd'
import { useGetExercisesByCourseIdAndDayIdQuery, useGetExercisesQuery } from '../../features/exercises/exercisesApiSlice'
import { useParams } from 'react-router-dom'

function Exercises() {
  
  const [exerciseId , setExerciseId] = useState() ;
  const {data , isLoading} = useGetExercisesQuery({});
  const {courseId , dayId } =useParams();
  let {data: day_exercises } = useGetExercisesByCourseIdAndDayIdQuery({courseId , dayId});
  day_exercises = day_exercises?.day_exercises?.map((exercise:any)=> exercise?.exercise) ;
  
  const exercises = data?.exercises.map((exercise:any)=>{
    return {
      label:exercise.name ,
      value:exercise.id
    }
  }) ;
  const addExercise = ()=>{
    // send request 
  } 

  return (
    <>
    <div>
      
        <Row justify={'end'} >
          <Select
            options={exercises }
            onChange={(e)=>setExerciseId(e)}
            style={{ width: 120 }}
          >

          </Select>
          <Button onClick={addExercise}
            style={{backgroundColor:'#5099ff'}}
          >
            Add 
          </Button>
        </Row>

      <div>
        <CrudTable
          columns={DayExercises}
          dataSource={day_exercises}
          route={'/'}
          defaultActions={['delete']}
        />
      </div>
    

    </div>
     
    </>
  )
}

export default Exercises