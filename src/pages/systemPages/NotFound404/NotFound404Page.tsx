import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
import { Button, Empty, Row } from 'antd';
const NotFound404Page = () => {
    const navigate=useNavigate();
    return (
        <div className='not-found-page '>
            <div className="wrapper">
                <Row >

                <Empty
                    style={{width:800 , height:600}}
                    description={
                        <Button>
                          Page not found
                        </Button>
                      }
                >
                <Button 
                    style={{width:200,height:100}}
                    onClick={()=>{navigate('/')}}>Go Home</Button>
                </Empty>
                </Row>
            </div>
        </div>


    )
}

export default NotFound404Page
