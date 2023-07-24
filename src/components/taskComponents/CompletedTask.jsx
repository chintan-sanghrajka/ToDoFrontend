import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskComp from './TaskComp.jsx'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../helper.js';
import Spinner from './../Spinner.jsx'

const CompletedTask = () => {
    const [tasks, setTasks] = useState([])
    const _id = JSON.parse(localStorage.getItem('_id'))
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [pages, setPages] = useState(1)
    const [taskCount, setTaskCount] = useState(0)
    const [loading, setLoading] = useState(true)


    const getTasks = () => {
        setLoading(true)
        axios.get(`${BASE_URL}task-list?statusId=${5}&userId=${_id}&page=${page}&limit=${limit}`).then((res) => {
            setTasks([...tasks, ...res.data.data])
            setTaskCount(res.data.taskLength)
            setPages(taskCount / limit === 0 ? taskCount / limit : Math.floor((taskCount / limit) + 1));
            setLoading(false)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getTasks();
    }, [])

    const loadHandler = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        getTasks();
    }, [page]);

    return (
        <>
            <Container>
                <h3 className='my-4'>Completed Task's</h3>
                {
                    tasks.map((element, index) => {
                        return <TaskComp key={index + 1} ele={element} no={index + 1} btnReq={false} />
                    })
                }
                {loading && <Spinner className='d-block mx-auto'></Spinner>}
                {
                    !loading && <Button className="btn btn-primary d-block mx-auto mb-5" onClick={loadHandler} disabled={pages === page || taskCount < limit}>{pages === page || taskCount < limit ? 'No more taks' : 'Load More'}</Button>
                }
            </Container>
        </>
    );
}

export default CompletedTask