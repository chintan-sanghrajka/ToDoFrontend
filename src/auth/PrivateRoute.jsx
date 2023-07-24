import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import NavbarComp from '../components/NavbarComp'

const PrivateRoute = () => {
    // const [auth, setAuth] = useState(localStorage.getItem('token') || '')
    const auth = localStorage.getItem('token') || '';


    return (
        <>
            {
                auth ?
                    <>
                        <NavbarComp />
                        <Outlet />
                    </>
                    : <Navigate to='/login' />
            }
        </>
    )
}

export default PrivateRoute
