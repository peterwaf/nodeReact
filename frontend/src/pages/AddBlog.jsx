import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import { useState } from "react"
import axios from 'axios'
// import ReactQuill from 'react-quill for text editor
import ReactQuill from 'react-quill'
// Import Quill styles
import 'react-quill/dist/quill.snow.css'
import userContext from "../Contexts/userContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
function AddBlog() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        content: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({
                ...formData,
                image: e.target.files[0], // Handle file input separately
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title === "" || formData.image === "" || formData.content === "") {
            setError("All fields are required");
        } else {
            setError("");

            // Create a FormData object to send the form data and file
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("image", formData.image); // The file
            const accessToken = await user.getIdToken();
            try {
                const res = await axios.post("http://localhost:3000/add", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (res.status === 200) {
                    setSuccess(res.data.message);
                    setFormData({
                        title: "",
                        image: "",
                        content: "",
                    });
                    setTimeout(() => {
                        setSuccess("");
                        navigate("/manage");
                    }, 2000);

                }
            } catch (error) {
                setError(error.response.data.message);
            }
        }
    };


    // Separate handler for ReactQuill content
    const handleContentChange = (value) => {
        setFormData({
            ...formData,
            content: value,
        });
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <h1>Add Blog </h1>
                <form onSubmit={handleSubmit} id="blogForm">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={handleChange} value={formData.title} name="title" />
                    <br />
                    <label htmlFor="image">Featured Image </label>
                    <input type="file" id="image" onChange={handleChange} accept="image/*" name="image" />
                    <br />
                    <label htmlFor="content"> Content </label>
                    <ReactQuill theme="snow" id="content" name="content" onChange={handleContentChange} value={formData.content} />
                    {/* <textarea name="content" onChange={handleChange} value={formData.content} className="content" id="content" /> */}
                    <div className="error">
                        <p>{error ? error : ""}</p>
                    </div>
                    <div className="success">
                        <p>{success ? success : ""}</p>
                    </div>
                    <button className="add-blog">Add</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default AddBlog