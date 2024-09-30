import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Edit.css'; // Import your CSS for styling

const EditPost = ({ url }) => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({
    name: '',
    description: '',
    category: '',
    image: null,
    existingImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing blog data
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${url}/api/blog/list`);
        const blog = response.data.data.find(blog => blog._id === blogId);
        if (blog) {
          setBlogData({
            name: blog.name,
            description: blog.description,
            category: blog.category,
            image: null,
            existingImage: blog.image,
          });
        }
      } catch (error) {
        toast.error("Error fetching blog details");
      }
    };

    fetchBlog();
  }, [blogId, url]);

  const handleInputChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', blogData.name);
    formData.append('description', blogData.description);
    formData.append('category', blogData.category);
    if (blogData.image) {
      formData.append('image', blogData.image);
    }

    try {
      const response = await axios.put(`${url}/api/blog/update/${blogId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        toast.success("Blog updated successfully");
        navigate("/"); // Redirect to the blog list
      } else {
        toast.error("Error updating blog");
      }
    } catch (error) {
      toast.error("Failed to update blog");
      console.error(error);
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-post-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={blogData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={blogData.category}
            onChange={handleInputChange}
            required
          >
            <option value="Environment">Environment</option>
            <option value="Trends">Trends</option>
            <option value="Technology">Technology</option>
            <option value="Crop">Crop</option>
            <option value="Living">Living</option>
            <option value="Tours">Tours</option>
            <option value="Livestock">Livestock</option>
            <option value="Stories">Stories</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          {blogData.existingImage && (
            <div className="image-preview">
              <p>Existing Image:</p>
              <img src={`${url}/images/${blogData.existingImage}`} alt="Current blog" />
            </div>
          )}
          <input type="file" name="image" onChange={handleFileChange} />
          {blogData.image && (
            <div className="image-preview">
              <p>New Image Preview:</p>
              <img src={URL.createObjectURL(blogData.image)} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditPost;
