import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const PublicRoute = () => {
    // const [auth, setAuth] = useState(localStorage.getItem('token') || '')
    const auth = localStorage.getItem('token') || '';

    return (
        <>
            {
                !auth ?
                    <>
                        <Outlet />
                    </>
                    : <Navigate to='/' />
            }
        </>
    )
}

export default PublicRoute
