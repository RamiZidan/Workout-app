import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
const NotFound404Page = () => {
    const navigate=useNavigate();
    return (
        <div className='not-found-page '>
            <div className="wrapper">
                <button className="button-89" role="button" onClick={()=>{navigate('/')}}>Go Home</button>
            </div>
        </div>


    )
}

export default NotFound404Page
