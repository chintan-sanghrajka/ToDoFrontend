import React, { useState, useReducer, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import InputTags from '../InputTags.jsx'
import { Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from './../helper.js'
import ProgressBar from '../ProgressBar.jsx'

const SignupPage = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const initialValue = {
        noFirstName: false,
        noLastName: false,
        noUserName: false,
        existingUserName: false,
        noEmailId: false,
        invalidEmailId: false,
        noPassword: false,
        invalidPassword: false,
        noRePassword: false,
        noSamePassword: false,
    }
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(true)

    const reducer = (state, action) => {
        switch (action.type) {
            case "noFirstName":
                return {
                    ...state,
                    noFirstName: action.payload,
                }
            case "noLastName":
                return {
                    ...state,
                    noLastName: action.payload,
                }
            case "noUserName":
                return {
                    ...state,
                    noUserName: action.payload,
                }
            case "existingUserName":
                return {
                    ...state,
                    existingUserName: action.payload,
                }
            case "noEmailId":
                return {
                    ...state,
                    noEmailId: action.payload,
                }
            case "noPassword":
                return {
                    ...state,
                    noPassword: true,
                }
            case "invalidEmailId":
                return {
                    ...state,
                    invalidEmailId: true,
                }
            case "invalidPassword":
                return {
                    ...state,
                    invalidPassword: true,
                }
            case "noRePassword":
                return {
                    ...state,
                    noRePassword: true,
                }
            case "noSamePassword":
                return {
                    ...state,
                    noSamePassword: true,
                }
            case "reset":
                return {
                    state: initialValue
                }
            default:
                return state;
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const [state, dispatch] = useReducer(reducer, initialValue);

    const submitHandler = async () => {
        dispatch({ type: "reset" })
        if (data.firstname === undefined || data.firstname === "") {
            dispatch({ type: "noFirstName", payload: true })
        }
        else if (data.lastname === undefined || data.lastname === "") {
            dispatch({ type: "noLastName", payload: true })
        }
        else if (data.username === undefined || data.username === "") {
            dispatch({ type: "noUserName", payload: true })
        }
        else if (data.emailid === undefined || data.emailid === "") {
            dispatch({ type: "noEmailId", payload: true })
        }
        else if (data.password === undefined || data.password === "") {
            dispatch({ type: "noPassword", payload: true })
        }
        else if (data.confirmPassword === undefined || data.confirmPassword === "") {
            dispatch({ type: "noRePassword", payload: true })
        }
        else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.emailid)) {
                dispatch({ type: "invalidEmailId", payload: true })
            }
            else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(data.password)) {
                dispatch({ type: "invalidPassword", payload: true })
            }
            else if (data.password !== data.confirmPassword) {
                dispatch({ type: "noSamePassword", payload: true })
            }
            else {
                setLoadingWidth("70%")
                await axios.post(`${BASE_URL}add-user`, {
                    firstName: data.firstname,
                    lastName: data.lastname,
                    userName: data.username,
                    emailId: data.emailid,
                    password: data.password,
                }).then((res) => { getUser() }).catch(err => console.log(err))
            }
        }
    }
    const getUser = async () => {
        await axios.get(`${BASE_URL}get-user/${data.username}`).then((res) => {
            setUser(res.data.data[0])
        }).catch(error => console.log(error.message))
    }
    useEffect(() => {
        if (user.length !== 0) {
            addProfile();
        }
    }, [user])

    const addProfile = async () => {
        console.log(user._id)
        await axios.post(`${BASE_URL}add-profile`, { avatar: "", status: 1, userId: user._id }).then((res) => {
            console.log("Profile created")
            navigate('/login');
        }).catch(error => console.log(error.message))
    }

    return (
        <>
            {progress && <ProgressBar loadingWidth={loadingWidth} />}
            <Container className='pb-5'>
                <h2 className='my-4 ms-5'>Welcome to ToDo</h2>
                <div className='add_task_div mt-5'>
                    <Row>
                        <Col className='col-md-6 col-12'>
                            <InputTags props={{ type: "text", name: "firstname", placeholder: "Chintan", heading: "First Name", changeHandler: onChangeHandler }} />
                            {state.noFirstName && <p className='error_msg'>Please enter first name</p>}
                        </Col>
                        <Col className='col-md-6 col-12'>
                            <InputTags props={{ type: "text", name: "lastname", placeholder: "Sanghrajka", heading: "Last Name", changeHandler: onChangeHandler }} />
                            {state.noLastName && <p className='error_msg'>Please enter last name</p>}
                        </Col>
                    </Row>
                    <InputTags props={{ type: "text", name: "username", placeholder: "ChintanKS", heading: "Username", changeHandler: onChangeHandler }} />
                    {state.noUserName && <p className='error_msg'>Please enter username</p>}
                    {state.existingUserName && <p className='error_msg'>Username already exists</p>}
                    <InputTags props={{ type: "text", name: "emailid", placeholder: "abc@gmail.com", heading: "Email ID", changeHandler: onChangeHandler }} />
                    {state.noEmailId && <p className='error_msg'>Please enter email id</p>}
                    {state.invalidEmailId && <p className='error_msg'>Please enter a valid email id</p>}
                    <InputTags props={{ type: "password", name: "password", placeholder: "password", heading: "Password", changeHandler: onChangeHandler }} />
                    {state.noPassword && <p className='error_msg'>Please enter password</p>}
                    {state.invalidPassword && <p className='error_msg'>Password should be more than 6 char and should contain 1 letter, number and special char</p>}
                    <InputTags props={{ type: "password", name: "confirmPassword", placeholder: "confirm password", heading: "Confirm Password", changeHandler: onChangeHandler }} />
                    {state.noRePassword && <p className='error_msg'>Please re-enter password</p>}
                    {state.noSamePassword && <p className='error_msg'>Please enter same password</p>}
                    <div className='d-flex justify-content-between mt-4'>
                        <Button className='btn-danger d-block' onClick={() => { navigate("/login") }}><i className="bi bi-x-lg me-2"></i>Cancel</Button>
                        <Button className="btn-primary d-block ms-auto" onClick={submitHandler}><i className="bi bi-plus-square me-2"></i>Sign Up</Button>
                    </div>

                </div>
            </Container>
        </>
    )
}

export default SignupPage