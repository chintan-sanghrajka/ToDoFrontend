import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
const FormComponent = (props) => {

    const navigate = useNavigate()

    const cancelHandler = () => {
        navigate('/view-task')
    }

    return (
        <>
            <div className='add_task_div mt-5'>
                <p className='add_task_label'>Task</p>
                <input type='text' name="task" onChange={props.onChangeHandler} placeholder='Use ToDo List' className='add_task_input' />
                <p className='add_task_label'>Assigned By</p>
                <input type='text' name="author" onChange={props.onChangeHandler} placeholder='Chintan Sanghrajka' className='add_task_input' /><br />
                <div className='d-flex justify-content-between mt-4'>
                    {props.buttonName === "Update" && <Button className='btn-danger' onClick={cancelHandler}><i class="bi bi-x-lg me-2"></i>Cancel</Button>}
                    <Button onClick={props.addTaskHandler} className={`btn-primary d-block ms-auto`} ><i className={`bi ${props.iconClass} me-2`}></i>{props.buttonName} Task</Button>
                </div>
            </div>
        </>
    )
}

export default FormComponent