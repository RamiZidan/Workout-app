import React, { useEffect, useRef, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Dropdown, Select, message } from 'antd';
import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { TimePicker } from 'antd';
import moment from 'moment';
import { useMeMutation, useUpdateProfileMutation } from '../../features/auth/authApiSlice';
import { convertToFormData } from '../../functions/helpers';
type FieldType = {
   name: string ;
   email : string ;
   password: string ;
   blank_duration:any  ;
   tall: number ;
   weight: number ;
   age: number ;
   gender: number ;


};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ProfileForm = () => {
  const location = useLocation();
  const [me , {isLoading} ] = useMeMutation();
  const [updateProfile , {}] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const disabled = !location?.pathname?.includes('edit')  ;
  // const defaultValue : FieldType = {firstName:'rami@email.com' }
  const [form] = Form.useForm();
  const getUser = async ()=>{
    const userData = await me({}).unwrap();
    const data = {...userData?.date } ;
    console.log(data);
    data.blank_duration = moment(data?.blank_duration,'HH:mm:ss')
    console.log(data);
    form.setFieldsValue(data);
  }
  const onFinish = async (data:any)=>{
    data = {
      ...data,
      blank_duration: data.blank_duration.toISOString().split('T')[1].split('.')[0]
    }
    data = convertToFormData(data);
    const res = await updateProfile(data).unwrap() ;
    message.success('profile updated successfully') ;
    navigate('/profile');
  }
  useEffect(() => {
    getUser() ;
  }, [])
  // const ref : FormData = useRef() ;

  return (
    <>
    <div >
      {
        disabled?
        <Row justify={'end'} >
          <Button 
            style={{backgroundColor:'#5099ff'}}
            onClick={()=>{
              navigate('/profile/edit')
            }}
          >
            Edit 
          </Button>
        </Row>
        :<></>  
      }
      <Row>
        
        <Col span={12} offset={9}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
          disabled={disabled}
          form={form}

          
        >
            <Form.Item<FieldType> name="name" label="Name"
                rules={[{ required: false, message: 'Please Enter your name' }]}
            >
                <Input type='text' />
            </Form.Item>
       
            <Form.Item<FieldType> name="email" label="Email"
                rules={[{ required: false, message: 'Please Enter your email' }]}
            >
                <Input type='email'/>
            </Form.Item>
            {/* <Form.Item<FieldType> name="password" label="Password"

                rules={[{ required: false, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
            >
                <Input.Password />
            </Form.Item> */}

            
            <Form.Item<FieldType> name="tall" label="Tall"

                rules={[{ required: false, message: 'Please Enter your tall'}]}
            >
                <Input type='number'/>
            </Form.Item>

            
            <Form.Item<FieldType> name="weight" label="weight"

                rules={[{ required: false, message: 'Please Enter your weight' }]}
            >
                <Input type='number' />
            </Form.Item>

             <Form.Item name="blank_duration" label="Blank Duration"

                rules={[{ required: false, message: 'Please Enter your blank duration' }]}
            >
                <TimePicker
                    // defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                ></TimePicker>
            </Form.Item> 
                        
            
            <Form.Item<FieldType> name="age" label="Age"

                rules={[{ required: false, message: 'age must be a number'  }]}
            >
                <Input type='number'   />
            </Form.Item>


            <Form.Item<FieldType> name="gender" label="Gender"

                rules={[{ required: false, message: 'Please Enter your gender' }]}
            >
                <Select options={[{ value: 'male', label: <span>Male</span> },{ value: 'female', label: <span>Female</span> }]} />
            </Form.Item>
        {
          !disabled ? 
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          </Form.Item>:
          <></>
        }
   
      </Form>
      </Col>
      
    </Row>
  </div>
    </>
  )
}

export default ProfileForm;