import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { BASE_URL } from '../helper';
import Button from 'react-bootstrap/Button'
import defaultProfile from './../../defaultPic.jpg'


const Profile = () => {
    const [userName, setUserName] = useState('')
    const [user, setUser] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [createDate, setCreateDate] = useState('')
    const [profile, setProfile] = useState([])
    const [avatarUrl, setAvatarUrl] = useState('');
    const [deletePic, setDeletePic] = useState(1)
    const [editPic, setEditPic] = useState(false)
    const imageRef = useRef()
    const [newImgAvailable, setNewImageAvailable] = useState(false)

    useEffect(() => {
        setUserName(JSON.parse(localStorage.getItem('userName')))
    }, [])

    useEffect(() => {
        if (userName !== '') {
            axios.get(`${BASE_URL}get-user/` + userName).then((res) => {
                setUser(res.data.data[0])
                setFirstName(res.data.data[0].firstName)
                setLastName(res.data.data[0].lastName)
                setCreateDate(res.data.data[0].createdOn)
            })
        }
    }, [userName])

    const getProfile = async () => {
        await axios.get(`${BASE_URL}get-profile?userId=${user._id}`).then((res) => {
            setProfile(res.data.profile)
            if (res.data.profile[0].avatar !== '') {
                setAvatarUrl(`${BASE_URL}uploads/${res.data.profile[0].avatar}`);
            }
            else {
                setAvatarUrl(defaultProfile)
            }
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        if (user.length !== 0) {
            getProfile();
        }
    }, [user])

    const picDeleteHandler = async () => {
        await axios.post(`${BASE_URL}delete-profile-pic?userId=${user._id}`).then((res) => {
            console.log("Pic deleted successfully")
        }).catch(error => console.log(error))
        getProfile();
    }

    const editPicHandler = () => {
        setEditPic(true)
    }

    const uploadPicHandler = () => {
        const img = URL.createObjectURL(imageRef.current.files[0])
        setAvatarUrl(img)
        setNewImageAvailable(true)
    }

    const savePicHandler = () => {
        const formData = new FormData();
        formData.append('avatar', imageRef.current.files[0]);
        axios.post(`${BASE_URL}update-profile?userId=${user._id} `, formData).then((res) => {
            console.log("Successful")
            setEditPic(false)
            getProfile()
            setNewImageAvailable(false)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const cancelHandler = () => {
        setEditPic(false)
        getProfile();
    }

    return (
        <>
            <div className='profile_image_div'>
                <img src={avatarUrl} alt="" className='w-100 h-100' />
            </div>
            {editPic && <input type='file' className='d-block ms-auto mb-4' name='file' ref={imageRef} onChange={uploadPicHandler}></input>}
            <div className='d-flex justify-content-center gap-3 mb-5'>
                {!editPic && <Button className='btn-primary mb-3' onClick={editPicHandler}><i className="bi bi-pen me-2"></i>Edit</Button>}
                {editPic && <Button className='btn-success mb-3' onClick={savePicHandler} disabled={newImgAvailable === false}><i className="bi bi-sd-card me-2"></i>Save</Button>}
                {!editPic && <Button className="btn-danger mb-3 " onClick={picDeleteHandler}><i className="bi bi-trash3 me-2"></i>Delete</Button>}
                {editPic && <Button className='btn-danger mb-3' onClick={cancelHandler}><i className="bi bi-x-lg me-2"></i>Cancel</Button>}
            </div>
            <h3 className='profile_info'>Name: {firstName} {lastName}</h3>
            <h3 className='profile_info my-3'>Created On: {createDate}</h3>
        </>
    )
}

export default Profile