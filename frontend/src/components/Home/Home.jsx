import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <h1>This is my MERN Project with Authentication</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad perferendis commodi amet, debitis necessitatibus distinctio maiores adipisci! Delectus molestias est provident quibusdam sunt debitis, exercitationem neque odit aperiam blanditiis fugit?</p>
            <Link to ="/register"><span>Sign Up</span></Link>
           <Link to="/login"> <span>Sign In</span></Link>
        </div>
    </div>
  )
}

export default Home