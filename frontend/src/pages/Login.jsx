import React from 'react';
import "../formstyles/signup.css";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import "../formstyles/login.css";
function Login() {
    return (
        <div className="container">
            <Header />
            <div className="content">
                <form id="login">
                    <div className="container-inputs">
                        <h1>Login</h1>
                        <p>Please fill in this form to log in.</p>
                        <hr />
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" required />
                        <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

                        <div className="clearfix">
                          
                            <button type="submit" className="signupbtn">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>

    )
}

export default Login