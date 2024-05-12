import { React, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import "../css/Login.css";

function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // fetch from database
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, { username, password });

            if (res.data !== null) {
                // login successful
                toast.success("Login successful")

                navigate('/home', { state: { username } })
            }

            else {
                toast.error("Invalid credentials")
            }
        }

        catch (err) {
            console.log(err);
            toast.error("Couldn't reach the server")
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