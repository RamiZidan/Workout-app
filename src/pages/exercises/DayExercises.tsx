import React, { useState } from 'react'
import CrudTable from '../../components/CrudTable'
import { dayExercisesColumns } from '../../constants/columns'
import { AllExercises, DayExercisesDataSource } from '../../constants/fake'
import { Button, Row, Select } from 'antd'
import { useAddDayExerciseMutation, useGetExercisesByCourseIdAndDayIdQuery, useGetExercisesQuery } from '../../features/exercises/exercisesApiSlice'
import { useParams } from 'react-router-dom'
import { convertToFormData, getBackURL, showErrors } from '../../functions/helpers'
import { apiSlice } from '../../app/api/apiSlice'
import { useDispatch } from 'react-redux'

function DayExercises() {
  
  const [exerciseId , setExerciseId] = useState() ;
  const {data , isLoading} = useGetExercisesQuery({});
  const {courseId , dayId } =useParams();
  let {data: day_exercises } = useGetExercisesByCourseIdAndDayIdQuery({courseId , dayId});
  const [addDayExercise, {} ] = useAddDayExerciseMutation() ;
  const dispatch = useDispatch();

  day_exercises = day_exercises?.day_exercises?.map((exercise:any)=>  {
    let newExercise = {...exercise?.exercise} ;
    newExercise = {...newExercise , id : exercise?.id} ;
    return newExercise; 
  });
  console.log(day_exercises);
  const exercises = data?.exercises.map((exercise:any)=>{
    return {
      label:exercise.name ,
      value:exercise.id
    }
  }) ;
  const addExercise = async ()=>{
    
    let data = JSON.stringify({exercise_id: exerciseId}) ;
    console.log(data);
    try{
      let token =  JSON.parse( localStorage.getItem('auth') ).access_token ;
      let res = await fetch( `${getBackURL()}/website/courses/${courseId}/course_day/${dayId}/day_exercise` ,  {
        method:'POST',
        body:data ,
        headers:{
          'Authorization':'Bearer ' +  token ,
          'Content-Type':'application/json'
        }
      }
      );
      dispatch( apiSlice.util.resetApiState() ) ;
      console.log(res);
    }
    catch(err){
      showErrors(err) ;
    }
  } 
  let mutations = {
    delete: async (id:any)=>{
      console.log('in');
      try{
        let token =  JSON.parse( localStorage.getItem('auth') ).access_token ;
        let res = await fetch( `${getBackURL()}/website/courses/${courseId}/course_day/${dayId}/day_exercise/${id}` ,  {
          method:'DELETE',
          headers:{
            'Authorization':'Bearer ' +  token ,
            'Content-Type':'application/json'
          }
        }
        );
        dispatch( apiSlice.util.resetApiState() ) ;
        console.log(res);
      }
      catch(err){
        showErrors(err) ;
      }
    }
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
          <Button onClick={()=>{
            addExercise() 
            console.log('done')
          }}
            style={{backgroundColor:'#5099ff'}}
          >
            Add New Exercise
          </Button>
        </Row>

      <div>
        <CrudTable
          columns={dayExercisesColumns}
          dataSource={day_exercises}
          route={'/'}
          defaultActions={['delete']}
          mutations={mutations}
        />
      </div>
    

    </div>
     
    </>
  )
}

export default DayExercises