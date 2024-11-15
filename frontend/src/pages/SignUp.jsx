import React, { useEffect } from 'react';
import "../formstyles/signup.css";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import { useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../cred";
function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordRepeat: ""
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [showHideSuccess, setShowHideSuccess] = useState(true);

    const handleChange = (e) => {
        setFormData(prevFornData => ({
            ...prevFornData,
            [e.target.name]: e.target.value
        }));
    }

    const validateForm = () => {
        const { firstName, lastName, email, password, passwordRepeat } = formData;
        const formErrors = [];
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (firstName === "") {
            formErrors.push("First Name is required");
        }
        if (lastName === "") {
            formErrors.push("Last Name is required");
        }
        if (email === "") {
            formErrors.push("Email is required");
        } else if (!email.match(emailFormat)) {
            formErrors.push("Email is not valid, use the format: abc@example.com");
        }
        if (password === "") {
            formErrors.push("Password is required");
        } else if (password.length < 6) {
            formErrors.push("Password must be at least 6 characters");
        }
        if (password !== passwordRepeat) {
            formErrors.push("Passwords do not match");
        }
        setErrors(formErrors);
        return formErrors; // Return the errors for use in handleSubmit
    };

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (formErrors.length === 0) {
            const { firstName, lastName, email, password } = formData;
            
            try {
                const userFormData = new FormData();
                userFormData.append("firstName", firstName);
                userFormData.append("lastName", lastName);
                userFormData.append("email", email);
                userFormData.append("password", password);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const accessToken = await user.getIdToken();
                const userId = user.uid;
                userFormData.append("userId", userId);
                const res = await axios.post("https://dailychronicles.vercel.app/signup", userFormData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        enctype:"multipart/form-data",
                    }
                });
    
                if (res.status === 200) {
                setSuccess("Signed up successfully");
                setTimeout(() => {
                    setShowHideSuccess(false);
                }, 2000);
                navigate("/login");
                }
            } catch (error) {
                if(error){
                    showHideSuccess(false);
                }
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    setErrors((prevErrors) => [...prevErrors, "Email already in use"]);
                }
                if (error.message === "Firebase: Error (auth/invalid-email).") {
                    setErrors((prevErrors) => [...prevErrors, "Invalid email"]);
                }
                if (error.message === "Firebase: Error (auth/weak-password).") {
                    setErrors((prevErrors) => [...prevErrors, "Password must be at least 6 characters"]);
                }
            }
        }
    };


    return (
        <div className="container">
            <Header />
            <div className="content">
                <form onSubmit={handleSubmit} id="signup">
                    <div className="container-inputs">
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />

                        <label htmlFor="firstName"><b>First Name</b></label>
                        <input type="text" onChange={handleChange} placeholder="First Name" name="firstName" />

                        <label htmlFor="lastName"><b>Last Name</b></label>
                        <input type="text" onChange={handleChange} placeholder="Last Name" name="lastName" />

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" onChange={handleChange} placeholder="Enter Email" name="email" />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" onChange={handleChange} placeholder="Enter Password" name="password" />
                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input type="password" onChange={handleChange} placeholder="Repeat Password" name="passwordRepeat" />
                        <div className="errorsHolder">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                        <span className="success">{showHideSuccess && success}</span>
                        <p>By creating an account you agree to our <a href="/terms-and-conditions" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

                        <div className="clearfix">
                            <button type="button" className="cancelbtn">Cancel</button>
                            <button type="submit" className="signupbtn">Sign Up</button>
                        </div>
                        <br />
                    </div>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default SignUp