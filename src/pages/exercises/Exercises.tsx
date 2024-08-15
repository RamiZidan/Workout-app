import React, { useState } from 'react'
import CrudTable from '../../components/CrudTable'
import { DayExercises } from '../../constants/columns'
import { AllExercises, DayExercisesDataSource } from '../../constants/fake'
import { Button, Row, Select } from 'antd'

function Exercises() {
  
  const [exerciseId , setExerciseId] = useState() ;

  const addExercise = ()=>{
    // send request 
  } 

  return (
    <>
    <div>
      
        <Row justify={'end'} >
          <Select
            options={AllExercises }
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
          dataSource={DayExercisesDataSource}
          route={'/'}
          defaultActions={['delete']}
        />
      </div>
    

    </div>
     
    </>
  )
}

export default Exercises