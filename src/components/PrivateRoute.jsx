import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import SpinnerComp from './SpinnerComp';


export default function PrivateRoute() {

    const { loggedIn, checkingStatus } = useAuthStatus();
    if (checkingStatus) {
        return <SpinnerComp />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/login' />


}