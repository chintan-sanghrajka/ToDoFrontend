import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import InputTags from '../InputTags.jsx'
import { Container } from 'react-bootstrap'
import { BASE_URL } from '../helper.js'
import Spinner from '../Spinner.jsx'
import ProgressBar from '../ProgressBar.jsx'

const EditTask = () => {
    const [task, setTask] = useState([])
    const { userid } = useParams();
    const navigate = useNavigate();
    const [oldValues, setOldValues] = useState({})
    const [taskValue, settaskValue] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingWidth, setLoadingWidth] = useState("0")

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}get-task/` + userid).then((res) => {
            setTask(res.data.data)
            setOldValues(res.data.data[0])
            setLoading(false)
        }).catch(err => console.log(err))
    }, [userid])

    const cancelHandler = () => {
        navigate(`/view-task`)
    }

    const updateTaskHandler = () => {
        if (oldValues.task === "") {
            settaskValue(true);
        }
        else {
            setLoadingWidth("70%")
            settaskValue(false);
            axios.put(`${BASE_URL}update-task/` + task[0]._id, {
                task: oldValues.task,
                author: oldValues.author === "" ? "Chintan" : oldValues.author,
            }).then((res) => {
                setLoading(false)
                navigate(`/view-task`)
            }).catch(err => console.log(err))
        }
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setOldValues({ ...oldValues, [name]: value })
    }

    return (
        <>
            <ProgressBar loadingWidth={loadingWidth} />
            <Container className='pb-5'>
                <h2 className='my-4 ms-5'>Update Task</h2>
                {loading && <Spinner />}
                {!loading && <div className='add_task_div mt-5'>
                    <InputTags props={{ type: "text", name: "task", placeholder: "Update Task", heading: "Task", changeHandler: onChangeHandler, value: oldValues.task }} />
                    {taskValue && <p>Please enter the task.</p>}
                    <InputTags props={{ type: "text", name: "author", placeholder: "Author", heading: "Assigned By", changeHandler: onChangeHandler, value: oldValues.author }} />

                    <div className='d-flex justify-content-between mt-4'>
                        <Button className='btn-danger' onClick={cancelHandler}><i className="bi bi-x-lg me-2"></i>Cancel</Button>
                        <Button onClick={updateTaskHandler} className={`btn-primary d-block ms-auto`} ><i className="bi bi-pencil-square me-2"></i>Update Task</Button>
                    </div>
                </div>}
            </Container>
        </>
    )
}

export default EditTask