import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskComp from './TaskComp.jsx'
import { Container, Button } from 'react-bootstrap'
import { BASE_URL } from '../helper.js'
import Spinner from './../Spinner.jsx'


const ViewTasks = () => {
    const [user, setUser] = useState([])
    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const username = JSON.parse(localStorage.getItem('userName'))
    const _id = JSON.parse(localStorage.getItem('_id'))

    const [limit, setLimit] = useState(4)
    const [pages, setPages] = useState(1)
    const [taskCount, setTaskCount] = useState(0)

    const getUser = async () => {
        await axios.get(`${BASE_URL}get-user/` + username).then((res) => {
            setUser(res.data.data)
        }).catch(err => console.log(err))
    }

    const getTasks = async (load) => {
        if (user.length !== 0) {
            setLoading(true)
            await axios.get(`${BASE_URL}task-list?statusId=${1}&userId=${user[0]._id}&page=${page}&limit=${limit}`).then((res) => {
                load && setTasks([...tasks, ...res.data.data])
                load && setTaskCount(res.data.taskLength)
                load && setPages(taskCount / limit === 0 ? taskCount / limit : Math.floor((taskCount / limit) + 1));
                setLoading(false)
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getUser(true)
    }, [])

    useEffect(() => {
        getTasks(true);
    }, [user])

    const loadHandler = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        if (user.length !== 0) {
            getTasks(true);
        }
    }, [page]);

    const completeHandler = (ele) => {
        axios.put(`${BASE_URL}complete-task/` + ele._id).then((res) => {
            console.log("Marked as Completed")
            setTasks(tasks.filter((elem) => {
                return elem._id !== ele._id;
            }));
        }).catch(err => console.log(err))
    }

    const deleteHandler = (ele) => {
        axios.delete(`${BASE_URL}delete-task/` + ele._id).then((res) => {
            console.log("Deleted Successfully")
            setTasks(tasks.filter((elem) => {
                return elem._id !== ele._id;
            }));
        }).catch(err => console.log(err))
    }

    return (
        <>
            <Container >
                <h2 className='mt-4'>Welcome, {username}</h2>
                <h3 className='my-4'>Your Task's</h3>
                {
                    tasks.map((element, index) => {
                        return <TaskComp key={index + 1} ele={element} no={index + 1} completeHandler={completeHandler} deleteHandler={deleteHandler} btnReq={true} username={username} _id={_id} />
                    })
                }
                {loading && <Spinner className='d-block mx-auto'></Spinner>}
                {
                    // !loading && <Button className="btn btn-primary d-block mx-auto mb-5" onClick={loadHandler} disabled={pages === page || taskCount < limit}>{pages === page || taskCount < limit ? 'No more taks' : 'Load More'}</Button>
                    !loading && <Button className="btn btn-primary mx-auto mb-5" onClick={loadHandler} disabled={pages === page || taskCount < limit} style={{ display: pages === page || taskCount < limit ? 'none' : 'block' }}>Load More</Button>
                }
                {
                    pages === page || taskCount < limit ? <h4 className='text-center mb-4'>No More Task</h4> : ''
                }
            </Container>
        </>
    );
}

export default ViewTasks