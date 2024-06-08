import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useRegisterMutation } from '../../redux/slices/userApiSlice'
import { setCredentials } from '../../redux/slices/authSlices'
import { useNavigate } from 'react-router-dom'
import './Register.css'



const Register = () => {

    const initialState = {
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    }

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation();
    const {userInfo} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate('/login')
        }
    },[navigate,userInfo])

    const [form,setForm]= useState(initialState)

    const onChageHandler = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        console.log({...form,[e.target.name]:e.target.value})
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(form.password !== form.confirmPassword){
            console.log("Password and comfirm Password is not Match")
        }else{
            try {
                const res = await register(form).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
                // const res = await axios.post('/api/users/auth',form)
                console.log(res)
                console.log(form)
                setForm(initialState)
            } catch (error) {
                console.log(error?.data?.message||error.error);
            }
        }
        
    }
  return (
    <div className='register'>
        <form action="" onSubmit={submitHandler}>
            <div className="name">
                <label htmlFor=""> Name:</label>
                <input type="text" name="name" id="name" value={form.name} onChange={onChageHandler} placeholder='Put Your Name Here.....' />
            </div>
            <div className="email">
                <label htmlFor=""> Email:</label>
                <input type="email" name="email" id="email" value={form.email} onChange={onChageHandler} placeholder='Put Your Email Here.....'/>
            </div>
            <div className="password">
                <label htmlFor=""> Password:</label>
                <input type="password" name="password" id="password" value={form.password} onChange={onChageHandler} placeholder='Put Your Password Here.....'/>
            </div>
            <div className="confirmPassword">
                <label htmlFor=""> Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={onChageHandler} placeholder='Put Your Confirm Password Here.....'/>
            </div>
            <div className="button">
                <button className='btn' type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register