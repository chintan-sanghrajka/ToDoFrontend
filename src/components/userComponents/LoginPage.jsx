import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputTags from '../InputTags.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { BASE_URL } from '../helper.js'
import ProgressBar from './../ProgressBar.jsx'

const LoginPage = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [noUsername, setNoUsername] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [noPassword, setNoPassword] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(false)

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const submitHandler = () => {
        setProgress(true)
        setNoUsername(false)
        setNoPassword(false)
        setInvalidUsername(false)
        setInvalidPassword(false)
        if (data.username === undefined || data.username === "") {
            setNoUsername(true)
        }
        else if (data.password === undefined || data.password === "") {
            setNoPassword(true)
        }
        else if (data.username !== undefined && data.password !== undefined) {
            setLoadingWidth("70%")
            axios.get(`${BASE_URL}get-user/` + data.username
            ).then((res) => {
                if (data.password === res.data.data[0].password) {
                    localStorage.setItem('token', "thisIsATestingToken");
                    localStorage.setItem('userName', JSON.stringify(res.data.data[0].userName))
                    localStorage.setItem('_id', JSON.stringify(res.data.data[0]._id))
                    navigate('/')
                }
                else {
                    setInvalidPassword(true)
                    setProgress(false)
                }
            }).catch((err) => {
                console.log(err)
                setInvalidUsername(true)
                setProgress(false)
                console.log("User Not Found")
            })
        }
    }
    return (
        <>
            {progress && <ProgressBar loadingWidth={loadingWidth} />}
            <Container >
                <h2 className='my-4 ms-5'>Welcome to ToDo</h2>
                <div className='add_task_div mt-5'>
                    <InputTags props={{ type: "text", name: "username", placeholder: "ChintanKS", heading: "Username", changeHandler: onChangeHandler }} />
                    {noUsername && <p className='error_msg'>Please enter username</p>}
                    {invalidUsername && <p className='error_msg'>Invalid Username</p>}
                    <InputTags props={{ type: "password", name: "password", placeholder: "password", heading: "Password", changeHandler: onChangeHandler }} />
                    {noPassword && <p className='error_msg'>Please enter password</p>}
                    {invalidPassword && <p className='error_msg'>Invalid Password</p>}
                    <div className='d-flex justify-content-between mt-4'>
                        <Button className='btn-primary d-block' onClick={() => { navigate("/signup") }}><i className="bi bi-plus-square me-2"></i>Sign Up</Button>
                        <Button className="btn-success d-block ms-auto" onClick={submitHandler}><i className="bi bi-box-arrow-in-right me-2"></i>Login</Button>
                    </div>

                </div>
            </Container>
        </>

    )
}

export default LoginPage