import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router';

const Logout = () => {
    const {logout} = useAuth();
    const navigate = useNavigate()
    useEffect(()=> {
        logout();
        navigate("")
    })
  return (
    <div>Logging out...</div>
  )
}

export default Logout