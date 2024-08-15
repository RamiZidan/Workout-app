import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Grid, Image, Rate, Row, Tag, message } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { convertToFormData, getTimeString, showErrors } from '../../functions/helpers';
import { useCreateFeedbackMutation, useGetExercisesByCourseIdAndDayIdQuery } from '../../features/exercises/exercisesApiSlice';
import { useDispatch } from 'react-redux';

function Exercises() {
  const navigate = useNavigate();
  const [exerciseStatus , setExerciseStatus] = useState(1) ; // 1 , 2 , 3 , 4 (not stated , playing , done , rated  )
  const [duration, setDuration] = useState() ;
  const [startTime, setStartTime] = useState(null);
  const [doneExercises , setDoneExercises] = useState([]);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);
  const timeString = getTimeString(now, startTime);
  const [createFeedback , {}] = useCreateFeedbackMutation() ;
  // const exercises = [ {id:1 } , {id:2 } , {id:12} , {id:20} , {id:0 }] ;
  let {courseId , dayId , exerciseId } = useParams() ;

  let {data: exercises , isLoading} = useGetExercisesByCourseIdAndDayIdQuery({courseId , dayId});
  exercises = exercises?.day_exercises?.map((exercise:any)=> {
    let newExercise = {...exercise?.exercise} ;
    newExercise = {...newExercise , id : exercise?.id} ;
    return newExercise; 
  }) ;

  if(isLoading){
    return <>
      Loading ...
    </>
  }
  
  if(exercises?.length == 0 ){
    message.error('No exercises in this course day, please add some and try again') ;
    
    return <>
      
    </>
  }
  // console.table(exercises);
  const currentExercise = exercises?.filter((exercise:any)=> exercise.id == exerciseId)?.[0] ;
  const nav = (toId:any)=>{
    navigate(`/courses/${courseId}/days/${dayId}/exercises/${Number(toId)}`);

  }
  const getIdIndex = (id:string)=>{
    let matchIndex= -1;
    exercises?.map((exercise:any,index:number)=>{
      if(exercise.id == id ){
        matchIndex = index; 
      }
    });
    return matchIndex;
  }
  const prev = ()=>{
    const prevIndex = getIdIndex((exerciseId))-1;
    if(prevIndex >= 0 )
      nav(exercises[prevIndex].id );
  }
  const next = ()=>{
    if(exerciseStatus != 4 && !doneExercises.includes(exerciseId) ){
      message.error('Please finish your exersise and rate the exersise to continue');
      return ;
    }
    setDoneExercises([...doneExercises , exerciseId]);
    const nextIndex = getIdIndex((exerciseId))+1 ;
    setExerciseStatus(1);

    if(nextIndex== exercises.length-1){
      message.success('congrats you finished your exerecises for today');
      navigate('/courses');
      return ;
    }
    nav(exercises[nextIndex].id );
  }
  const feedback =async  (feed_back:any)=>{
      let data = {feed_back ,duration: timeString.split('.')[0] , day_exercise_id: exerciseId  };
      data = convertToFormData(data);
      try{
        let res= await createFeedback(data).unwrap();
        setExerciseStatus(4);
      }
      catch(err){
        showErrors(err);
      }

  }

  const handleStart = () => {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };
  

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  
  return (
    <>
    

      {/* <Image width={400} src="" /> */}
      {/* <Row > */}
        <Row style={{ margin:'1rem' }} justify={'center'} >
          <Tag>
            Counts: {currentExercise?.set_count}
          </Tag>
          <Tag>
            Times : {currentExercise?.times}
          </Tag>
          <Tag>
            Level : {currentExercise?.level}
          </Tag>
        </Row>
        <Row justify="center" align="middle">
          <Col >
              <Button onClick={prev}>
                <LeftOutlined></LeftOutlined>
              </Button>
          </Col>
          <Col>
              <Image width={400} src={ `${import.meta.env.VITE_REACT_API_KEY.split('/api')[0]}/storage/${currentExercise?.image}`} />
          </Col>
          <Col>
              <Button onClick={next}>
                  <RightOutlined></RightOutlined>
              </Button>     
          </Col>

        </Row>
        <Row justify={'center'} style={{ margin:'1rem' }} >
          <Col >
          {
            exerciseStatus == 3 ? <div>
              <Rate
              defaultValue={3}
              onChange={feedback} ></Rate>
            </div>
            :
            <> </>
          }
          {
            exerciseStatus == 1 ? <div>
              <Button
                onClick={()=>{
                  setExerciseStatus(2)
                  handleStart()
                }}
              > Start </Button>
            </div>
            :
            <> </>
          }
          {
            exerciseStatus == 2 ? <div>
              Time: {timeString.split('.')[0]}
            </div>:<></>
          }
          {
            exerciseStatus == 2 ? <div>
              <Button
                onClick={()=>{
                  setExerciseStatus(3)
                  handleStop()
                }}
              > 
                Stop
              </Button>
            </div>:<></>
          }
          </Col>
        </Row>
    </>
  )
}

export default Exercises