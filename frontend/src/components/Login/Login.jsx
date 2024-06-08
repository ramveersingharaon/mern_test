import React, { useState,useEffect } from 'react'
import '../Register/Register.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/slices/userApiSlice'
import { setCredentials } from '../../redux/slices/authSlices'
// import axios from 'axios'



const Login = () => {

    const initialState = {
        email: "",
        password: "",
    }

    const [form, setForm] = useState(initialState)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

        useEffect(()=>{
            if(userInfo){
                navigate('/login')
            }
        },[navigate,userInfo])

    const onChageHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log({ ...form, [e.target.name]: e.target.value })
    }

    const submitHandler =async (e) => {
        e.preventDefault()
        try {
            const res = await login(form).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
            // const res = await axios.post('/api/users/auth',form)
            console.log(res)
            console.log(form)
            setForm(initialState)
        } catch (error) {
            console.log(error)
            console.log(error?.data?.message||error.error);
            
        }
    }
    return (
        <div className='login'>
            <form action="" onSubmit={submitHandler}>

                <div className="email">
                    <label htmlFor=""> Email:</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={onChageHandler} placeholder='Put Your Email Here.....' />
                </div>
                <div className="password">
                    <label htmlFor=""> Password:</label>
                    <input type="password" name="password" id="password" value={form.password} onChange={onChageHandler} placeholder='Put Your Password Here.....' />
                </div>

                <div className="button">
                    <button className='btn' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login