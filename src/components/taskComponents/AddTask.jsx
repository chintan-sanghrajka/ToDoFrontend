import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import InputTags from '../InputTags.jsx'
import NavbarComp from '../NavbarComp.jsx'
import { Container } from 'react-bootstrap'
import { BASE_URL } from '../helper.js'
import ProgressBar from '../ProgressBar.jsx'

const AddTask = () => {
    const [data, setData] = useState({})
    const [taskValue, settaskValue] = useState(false)
    const username = JSON.parse(localStorage.getItem('userName'))
    const _id = JSON.parse(localStorage.getItem('_id'))
    const navigate = useNavigate()
    const [loadingWidth, setLoadingWidth] = useState("0")

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const addTaskHandler = () => {
        if (data.task === undefined) {
            settaskValue(true);
        }
        else {
            settaskValue(false)
            const date = new Date();
            const createDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            setLoadingWidth("70%")
            axios.post(`${BASE_URL}add-task`, {
                task: data.task,
                // author: data.author,
                author: data.author === undefined ? "Chintan" : data.author,
                date: createDate,
                userId: _id,
            }).then((res) => { navigate(`/view-task`) }).catch(err => console.log(err))
        }
    }

    return (
        <>
            <ProgressBar loadingWidth={loadingWidth} />
            <Container className='pb-5'>
                <h2 className='my-4 ms-5'>Add New Task</h2>
                <div className='add_task_div mt-5'>
                    <InputTags props={{ type: "text", name: "task", placeholder: "Use ToDo List", heading: "Task", changeHandler: onChangeHandler }} />
                    {taskValue && <p className='error_msg'>Please enter the task.</p>}
                    <InputTags props={{ type: "text", name: "author", placeholder: "Chintan Sanghrajka", heading: "Assigned By", changeHandler: onChangeHandler }} />
                    <Button onClick={addTaskHandler} className="btn-primary d-block ms-auto mt-4" ><i className="bi bi-plus-square me-2"></i>Add Task</Button>
                </div>
            </Container>
        </>
    )
}

export default AddTask