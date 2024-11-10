import React from 'react';
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import { useContext } from "react";
import userContext from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../formstyles/user-roles.css";
function UpdateUser() {
    const updateUserContext = useContext(userContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        isAdmin: ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("userId", formData.userId);
            formDataToSend.append("isAdmin", formData.isAdmin);
            const accessToken = await updateUserContext.user.getIdToken();
            const response = await axios.patch("http://localhost:3000/update-user-role", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                    Authorization: `Bearer ${accessToken}`,
                },
            });
           setSuccess(response.data.message);
            setTimeout(() => {
                setSuccess("");
            }, 2000);
            setFormData({
                userId: "",
                isAdmin: ""
            })
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 2000);
        }

    }
    return (
        <div className="container">
            <Header />
            <div className="content">
                <h1>Update  User Role</h1>
                <form id="update-user-form" onSubmit={handleSubmit}>
                    <div className="container-inputs">
                        <label htmlFor="userId">User Id</label>
                        <input type="text" id="userId" name="userId" required value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
                        <label htmlFor="isAdmin">Is Admin</label>
                        <br />
                        <select name="isAdmin" id="isAdmin" onChange={(e) => setFormData({ ...formData, isAdmin: e.target.value })}>
                            <option value="">Choose</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <div className="error">
                        <p>{error ? error : ""}</p>
                    </div>
                        <div className="success">
                            <p>{success ? success : ""}</p>
                        </div>

                        <div className="clearfix">
                            <br />
                            <button type="submit">Update User</button>
                        </div>

                    </div>


                </form>

            </div>
            <Footer />
        </div>
    )
}

export default UpdateUser