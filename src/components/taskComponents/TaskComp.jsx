import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const TaskComp = (props) => {
    return (
        <>
            <div className='task_div m-4'>
                <h4>{props.no}. {props.ele.task}</h4>
                <p className='mb-2 mt-3'>Assigned by: {props.ele.author}</p>
                {props.btnReq && <p className='mb-3'>Created On: {props.ele.createdOn}</p>}
                {!props.btnReq && <p className='mb-0'>Completed On: {props.ele.completedOn}</p>}
                <div className='d-md-flex gap-4'>
                    {props.btnReq && <Button className="btn-success mb-3 mb-md-0 d-block" onClick={() => props.completeHandler(props.ele)}><i className="bi bi-check-square me-2"></i>Completed</Button>}
                    {props.btnReq && <Button className='btn-primary mb-3 mb-md-0 d-block'><Link className='text-decoration-none' style={{ color: '#ffffff' }} to={'/edit-task/' + props.ele._id}><i className="bi bi-pen me-2"></i>Edit</Link></Button>}
                    {props.btnReq && <Button className="btn-danger d-block" onClick={() => props.deleteHandler(props.ele)}><i className="bi bi-trash3 me-2"></i>Delete</Button>}
                </div>
            </div>
        </>
    )
}

export default TaskComp