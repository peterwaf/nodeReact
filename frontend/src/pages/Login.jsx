import React from 'react';
import "../formstyles/signup.css";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import "../formstyles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../Contexts/userContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../cred";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { setUpUser } = useContext(userContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }
    const validateForm = () => {
        const formErrors = [];
        if (formData.email === "") {
            formErrors.push("Email is required");
        }
        if (formData.password === "") {
            formErrors.push("Password is required");
        }
        setErrors(formErrors);
        return formErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm().length === 0) {
            try {
                const { email, password } = formData;
                await signInWithEmailAndPassword(auth, email, password);
                setUpUser();
                navigate("/");

            } catch (error) {
                if (error.code === "auth/wrong-password") {
                    setErrors(prevErrors => [...prevErrors, "Wrong Password"]);
                }
                if(error === "auth/network-request-failed"){
                    setErrors(prevErrors => [...prevErrors, "No network, check your connection"]);
                }
                if (error.code === "auth/user-not-found") {
                    setErrors(prevErrors => [...prevErrors, "User not found"]);
                }
                if (error.code === "auth/invalid-email") {
                    setErrors(prevErrors => [...prevErrors, "Invalid Email"]);
                }
                if (error.code === "auth/invalid-credential") {
                    setErrors(prevErrors => [...prevErrors, "Invalid Credential"]);
                }
                else {
                    setErrors(prevErrors => [...prevErrors, "Something went wrong,try again later"]);
                }

            }
        }

    }
    return (
        <div className="container">
            <Header />
            <div className="content">
                <form onSubmit={handleSubmit} id="login">
                    <div className="container-inputs">
                        <h1>Login</h1>
                        <p>Please fill in this form to log in.</p>
                        <hr />
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" onChange={handleChange} placeholder="Enter Email" name="email" />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" onChange={handleChange} placeholder="Enter Password" name="password" />
                        <p>By creating an account you agree to our <a href="/terms-and-conditions" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

                        <div className="errorsHolder">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>

                        <div className="clearfix">
                            <button className="signupbtn">Login</button>
                        </div>
                        <div className="clearfix">
                            <p>Don't have an account? <a href="/signup">Sign up</a></p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>

    )
}

export default Login