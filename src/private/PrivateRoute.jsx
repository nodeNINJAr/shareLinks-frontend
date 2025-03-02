import React from 'react'
import useAuth from '../hooks/useAuth'
import { Spin } from 'antd';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading) return <Spin size='large'/>
    if(user)return children;

    // 
  return <Navigate to={'/auth/login'}/>
}

export default PrivateRoute;