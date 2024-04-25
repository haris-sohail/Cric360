import { React, useState } from "react"
import '../css/Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'

function Signup() {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const isFieldsNotEmpty = () => {
        // email, password or username can not be empty
        if (!email || !password || !username) {
            toast.error("Please fill all the fields")
            return false;
        }

        // if email is invalid
        if (!email.includes('@')) {
            toast.error("Invalid Email")
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return false;
        }

        return true;
    }

    const userNameExists = async () => {
        try {
            const res = await axios.get('http://localhost:3001/getUser', { username });

            if (res.data.length > 0)
                toast.error("Username exists already")

            return res.data.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const emailExists = async () => {
        try {
            const res = await axios.get('http://localhost:3001/getEmail', { email });

            if (res.data.length > 0)
                toast.error("Email exists already")

            return res.data.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFieldsNotEmpty()) {
            const userNameCheck = await userNameExists();
            const emailCheck = await emailExists();

            if (!userNameCheck && !emailCheck) {
                try {
                    const res = await axios.post('http://localhost:3001/register', { username, email, password });
                    console.log(res)
                    toast.success("Registered Successfully");
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    return (
        <div className="main-content-container">
            <div className='signup-container'>
                <h2>Register</h2>

                <form className='signup-form' onSubmit={handleSubmit}>
                    <input id="name" type='text' placeholder='Username' autoComplete="off"
                        onChange={(e) => setUserName(e.target.value)}></input>
                    <br></br>

                    <input id="email" type='text' placeholder='Email' autoComplete="off"
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