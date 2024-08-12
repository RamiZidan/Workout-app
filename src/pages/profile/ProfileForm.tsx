import React, { useEffect, useRef, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Dropdown, Select } from 'antd';
import './styles.css';
import { useLocation } from 'react-router-dom';
import { TimePicker } from 'antd';
import moment from 'moment';
import { useMeMutation } from '../../features/auth/authApiSlice';
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
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ProfileForm = () => {
  const location = useLocation();
  const [me , {isLoading} ] = useMeMutation();

  const disabled = !location?.pathname?.includes('edit')  ;
  // const defaultValue : FieldType = {firstName:'rami@email.com' }
  const [form] = Form.useForm();
  const getUser = async ()=>{
    const userData = await me({}).unwrap();
    const data = {...userData?.data } ;
    data.blank_duration = new Date(`1970-01-01 ${data?.blank_duration}`) ;
    form.setFieldsValue(data);
  }
  useEffect(() => {
    getUser() ;
  }, [])
  // const ref : FormData = useRef() ;

  return (
    <>
    <div >
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
            <Form.Item<FieldType> name="password" label="Password"

                rules={[{ required: false, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
            >
                <Input.Password />
            </Form.Item>

            
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

            {/* <Form.Item name="blank_duration" label="Blank Duration"

                rules={[{ required: false, message: 'Please Enter your blank duration' }]}
            >
                <TimePicker
                    // defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                ></TimePicker>
            </Form.Item> */}
                        
            
            <Form.Item<FieldType> name="age" label="Age"

                rules={[{ required: false, message: 'Your age must be betweewn 0-130'  , min:0 , max:130}]}
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