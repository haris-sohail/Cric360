import { React, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import "../css/Login.css";

function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // fetch from database
        try {
            const res = await axios.post('http://localhost:3001/login', { username, password });

            if (res.data !== null) {
                // login successful
                toast.success("Login successful")
            }

            else {
                toast.error("Invalid credentials")
            }
        }

        catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="main-content-container">
            <div className='login-container'>
                <h2>Login</h2>

                <form className='login-form' onSubmit={handleSubmit}>
                    <input id="name" type='text' placeholder='Username' autoComplete="off"
                        onChange={(e) => setUserName(e.target.value)}></input>
                    <br></br>

                    <input id="password" type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <br></br>

                    <button type='submit'><p>Login</p></button>
                </form>

                <Link to="/register" className="register-btn">
                    <button><p>Register</p></button>
                </Link>
            </div>
        </div>
    );
}

export default Login;