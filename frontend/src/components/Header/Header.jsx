import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../redux/slices/userApiSlice'
import { logout } from '../../redux/slices/authSlices'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='header'>
      <div className="logo">
        <Link to='/'>MERN Project</Link>
      </div>

      {userInfo
        ? (<>
          <div className="nav">
            <span>{userInfo.name}</span> 
            <Link to='/profile'>Profile</Link>
            <Link to='/logout' onClick={logoutHandler}>Logout</Link>
          </div></>)
        : (<>
          <div className="nav">
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </div>
        </>)}

    </div>
  )
}

export default Header