import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { BodyComponent } from 'reactjs-human-body';
import { useGetUserMusclesQuery } from '../../features/muscles/musclesApiSlice';
import { Loading3QuartersOutlined } from '@ant-design/icons';

function MusclesStructure() {
    let {data: muscles ,isLoading} = useGetUserMusclesQuery({});

    console.log('MMMMMMMMMMM',muscles?.user_muscles?.map);
    muscles = muscles?.user_muscles
    let musclesMap :any  = {
      'leftShoulder': 'Shoulder' ,
      'rightShoulder': 'Shoulder' ,
      'leftArm': 'Arms' ,
      'rightArm': 'Arms' ,
      'chest': 'Chest' ,
      'stomach': 'ABS' ,
      'leftLeg': 'Legs' ,
      'rightLeg': 'Legs' ,

      'head': 'head' ,
      'rightHand': 'rightHand' ,
      'leftHand': 'leftHand' ,
      'leftFoot': 'leftFoot' ,
      'rightFoot': 'rightFoot' 
    }
    const [bodyState, setBodyState] : [any,any] = useState({
        head: {
          show: false,
          selected: true
        },
        leftShoulder: {
          show: true,
          selected: true
        },
        rightShoulder: {
          show: true,
          selected: true
        },
        leftArm: {
          show: true,
          selected: true
        },
        rightArm: {
          show: true,
          selected: true
        },
        chest: {
          show: true,
          selected: true
        },
        stomach: {
          show: true,
          selected: true
        },
        leftLeg: {
          show: true,
          selected: true
        },
        rightLeg: {
          show: true,
          selected: true
        },
        leftHand: {
          show: false,
          selected: true
        },
        rightHand: {
          show: false,
          selected: true
        },
        leftFoot: {
          show: false,
          selected: true
        },
        rightFoot: {
          show: false,
          selected: true
        }
      });
    
      useEffect(() => {
        // window.alert(JSON.stringify(bodyState.head));
      }, []);
      if(isLoading){
        return <Loading3QuartersOutlined></Loading3QuartersOutlined>
      }
    
      return (
        <div className="App">
          <div  >
            <BodyComponent partsInput={bodyState}
                onClick={(e)=>{
                  let name = musclesMap[e]
                  muscles?.map((muscle:any)=>{
                    console.log(name , muscle.name);
                    if(name == muscle?.muscle?.name ){
                      message.success('Muscle Level is:' + muscle.level ) ;
                    }                    
                  })
                }}
                
            />
          </div>
        </div>
      );
  return (
    <div>MusclesStructure</div>
  )
}

export default MusclesStructure