import React from "react";
import "../css/Login.css";

function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>

            <form className="login-form">
                <input id="email" type="text" placeholder="Email" autocomplete="off"></input>
                <br></br>

                <input id="password" type="password" placeholder="Password"></input>
                <br></br>

                <button type="submit">
                    <p>Login</p>
                </button>
            </form>
        </div>
    );
}

export default Login;