import { React, useState } from "react"
import '../css/Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('', { username, email, password })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="main-content-container">
            <div className='signup-container'>
                <h2>Register</h2>

                <form className='signup-form' onSubmit={handleSubmit}>
                    <input id="name" type='text' placeholder='Username' autocomplete="off"
                        onChange={(e) => setUserName(e.target.value)}></input>
                    <br></br>

                    <input id="email" type='text' placeholder='Email' autocomplete="off"
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <br></br>

                    <input id="password" type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <br></br>

                    <button type='submit'><p>Register</p></button>
                </form>

                <Link to="/login" className="login-btn">
                    <button><p>Login</p></button>
                </Link>
            </div>
        </div>
    )
}

export default Signup;
