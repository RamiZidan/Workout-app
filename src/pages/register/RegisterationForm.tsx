import React from 'react'
import type { FormProps, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Select, TimePicker } from 'antd'
import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { message } from 'antd'
import moment from 'moment'
import { showErrors } from '../../functions/functions'

type RegisterFieldType = {
    name:string;
    email: string;
    tall: number;
    weight: number ;
    blank_duration: any ;
    age: number;
    gender: any ;
    password: string ;

}
const RegisterationForm = () => {
    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish: FormProps<RegisterFieldType>['onFinish'] = async (values) => {
        try {
            values = {
                ...values , 
                gender : (values.gender == 'male' ? 1 : 0 ) , 
                blank_duration: values.blank_duration.toISOString().split('T')[1].split('.')[0]
            } ;
            console.log(values);
            const userData = await register({ ...values }).unwrap()
            form.resetFields()
            message.success('Registration Successful')
            navigate('/login')
        } catch (error: any) {
            showErrors(error);
        }
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 80 }}
            wrapperCol={{ span: 80 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
        >
            <Form.Item<RegisterFieldType> name="name" label="Name"
                rules={[{ required: true, message: 'Please Enter your name' }]}
            >
                <Input type='text' />
            </Form.Item>
       
            <Form.Item<RegisterFieldType> name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your email' }]}
            >
                <Input type='email'/>
            </Form.Item>
            <Form.Item<RegisterFieldType> name="password" label="Password"

                rules={[{ required: true, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
            >
                <Input.Password />
            </Form.Item>

            
            <Form.Item<RegisterFieldType> name="tall" label="Tall"

                rules={[{ required: true, message: 'Please Enter your tall'}]}
            >
                <Input type='number'/>
            </Form.Item>

            
            <Form.Item<RegisterFieldType> name="weight" label="weight"

                rules={[{ required: true, message: 'Please Enter your weight' }]}
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item name="blank_duration" label="Blank Duration"

                rules={[{ required: true, message: 'Please Enter your blank duration' }]}
            >
                <TimePicker
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                ></TimePicker>
            </Form.Item>
                        
            
            <Form.Item<RegisterFieldType> name="age" label="Age"

                rules={[{ required: true, message: 'Your age must be betweewn 0-130'  , min:0 , max:130}]}
            >
                <Input type='number'   />
            </Form.Item>


            <Form.Item<RegisterFieldType> name="gender" label="Gender"

                rules={[{ required: true, message: 'Please Enter your gender' }]}
            >
                <Select options={[{ value: 'male', label: <span>Male</span> },{ value: 'female', label: <span>Female</span> }]} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterationForm