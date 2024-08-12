import type { TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Flex, Tabs, Card } from 'antd'
import './style.scss'

import RegisterationForm from './RegisterationForm'

const Register = () => {
    const navigate = useNavigate()

    return (
        <div className='register-page'>
            <Flex justify='center' align='center' style={{ height: '100vh', width: '100vw' }}>
                <Card className='register-card' >
                    <h1 className='register-title'>Register Page</h1>
                    <RegisterationForm/>
                    <h3 className='hover-text-navigator' onClick={() => { navigate('/login') }}>Already have an account Sign in now !</h3>
                </Card>
            </Flex>
        </div>
    )
}

export default Register