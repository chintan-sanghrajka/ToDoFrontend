import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Profile from './userComponents/Profile.jsx'
import axios from 'axios'
import { BASE_URL } from './helper.js';

const NavbarComp = (props) => {
  const [profile, setProfile] = useState(100)
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('userName'));
  const userId = JSON.parse(localStorage.getItem('_id'))
  const profileHandler = (pos) => {
    setProfile(pos)
  }

  const deleteUserHandler = async () => {
    console.log(userId)
    await axios.post(`${BASE_URL}delete-user`, { userId: userId }).then((res) => {
      console.log("User Deleted Successfully")
      localStorage.removeItem('token')
      localStorage.removeItem('_id')
      localStorage.removeItem('userName')
      navigate('/login')
    }).catch(error => console.log(error))
  }
  return (
    <div className='nav_outer_div'>
      <Navbar expand="lg" className="navbar_style">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className="nav-link" to={`/add-task`}>Add Task</NavLink>
              <NavLink className="nav-link" to={`/view-task`}>Tasks</NavLink>
              <NavLink className="nav-link" to={`/completed-task`}>Completed Tasks</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <button className='nav_profile_button' onClick={() => profileHandler(0)}>
        <i className="bi bi-person-fill"></i>
      </button>

      <div className='profile_outer_div' style={{ transform: `translateX(${profile}%)` }}>
        <div className='profile_inner_div'>
          <div className='profile_title_div d-flex no-wrap'>
            <div>
              <h2 className='p-2 mb-0 ps-4'>{userName}</h2>
            </div>
            <button className='profile_cancel_button d-block ms-auto' onClick={() => profileHandler(100)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <Profile />
          <div className='profile_logout_div'>
            <Button className='btn btn-primary d-block mx-auto mb-4' onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userName');
              localStorage.removeItem('_id');
              navigate('/login')
            }}><i className="bi bi-box-arrow-left me-2"></i>Logout</Button>
            <Button className='btn btn-danger d-block mx-auto' onClick={deleteUserHandler}><i className="bi bi-trash3 me-2"></i>Delete User</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarComp