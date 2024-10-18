import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

function Home() {
    const [blogItems, setBlogItems] = useState([]);
    const [blogToEdit, setBlogToEdit] = useState({ id: "", title: "", image: "", content: "" });
    const [previewImage, setPreviewImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/");
                setBlogItems(res.data.blogs);
            } catch (error) {
                console.log(error.message);

            }
        }
        getData();
    }, []);
    const deleteBlog = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this blog?");
        if (confirm) {
            try {
                const res = await axios.delete(`http://localhost:3000/delete?id=${id}`);
                if (res.status === 200) {
                    setBlogItems(blogItems.filter((blogItem) => blogItem.id !== id));
                }
            } catch (error) {
                alert(error.message);
            }
        }
        else {
            return;
        }
    }

    const loadBlog = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/loadblog?id=${id}`);
            if (res.status === 200) {
                setBlogToEdit(prevBlog => ({ ...prevBlog, ...res.data.blog, id: res.data.id }));
                setPreviewImage(res.data.blog.image);

            }
        } catch (error) {
            console.log(error.message);

        }
    }

    const handleBlogChange = (e) => {

        if (e.target.name === "image") {
            setBlogToEdit({
                ...blogToEdit,
                image: e.target.files[0], // Handle file input separately
            });
            // Preview image
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setPreviewImage(reader.result);
            }
        } else {
            setBlogToEdit({
                ...blogToEdit,
                [e.target.name]: e.target.value,
            });
        }
    }

    const editBlogSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", blogToEdit.title);
        formDataToSend.append("image", blogToEdit.image);
        formDataToSend.append("content", blogToEdit.content);
        formDataToSend.append("id", blogToEdit.id);
        try {
            const res = await axios.patch(`http://localhost:3000/edit?id=${blogToEdit.id}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                },
            });
            if (res.status === 200) {
                setBlogItems(blogItems.map((blogItem) => blogItem.id === blogToEdit.id ? res.data.blog : blogItem));
                setBlogToEdit({ title: "", image: "", content: "" });
                setSuccess(res.data.message);
                setPreviewImage("");
                navigate("/manage");
                setSuccess("");
                setEditButtonClicked(false);
                navigate("/manage");

            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="content">
                <h1>Manage</h1>
                <div id="edit-form-container" className={`${editButtonClicked ? "edit-form-container-active" : "edit-form-container-inactive"}`}>
                    <form onSubmit={editBlogSubmit} id="editBlogForm">
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={handleBlogChange} value={blogToEdit.title ? blogToEdit.title : ""} name="title" id="title" />
                        <label htmlFor="image">Image</label>
                        <div className="editImage">
                            {previewImage && <img src={previewImage} />}
                        </div>
                        <input type="file" onChange={handleBlogChange} name="image" id="image" />
                        <label htmlFor="content">Content</label>
                        <textarea name="content" onChange={handleBlogChange} value={blogToEdit.content ? blogToEdit.content : ""} id="content" cols="30" rows="10"></textarea>
                        <div className="error">
                            <p>{error ? error : ""}</p>
                        </div>
                        <div className="success">
                            <p>{success ? success : ""}</p>
                        </div>
                        <button className="update">Update</button>
                        <button className="cancel" onClick={() => setEditButtonClicked(false)}>Cancel</button>
                    </form>
                </div>
                <table id="manageTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogItems.map((blogItem) => {
                            return <tr key={blogItem.id}>
                                <td>{blogItem.id}</td>
                                <td>{blogItem.title}</td>
                                <td><img src={blogItem.image || blogItem.featuredImage} alt="" /></td>
                                <td>
                                    <button onClick={() => {
                                        loadBlog(blogItem.id);
                                        setEditButtonClicked(true);
                                    }}>Edit</button>
                                    <button onClick={() => deleteBlog(blogItem.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default Home