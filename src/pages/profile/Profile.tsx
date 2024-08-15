import React, { useEffect } from 'react'
import ProfileForm from './ProfileForm';
import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    
  }, [])

  return (
    <>    
      <ProfileForm></ProfileForm>
    </>
  )
}

export default Profile;