import React from 'react'
import './css/Signup.css';

function Signup() {
    return (
        <div className='signup-container'>
            <form className='signup-form'>
                <label for="name">
                    Username
                </label>
                <input id="name" type='text'></input>
                <br></br>

                <label for="email">
                    Email
                </label>
                <input id="email" type='text'></input>
                <br></br>

                <label for="password">
                    Password
                </label>

                <input id="password" type='password'></input>
            </form>
        </div>
    )
}

export default Signup;
