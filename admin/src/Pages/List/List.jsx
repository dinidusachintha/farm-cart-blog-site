import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/blog/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching blog list");
    }
  };

  const removeBlog = async (blogId) => {
    const response = await axios.post(`${url}/api/blog/remove`, { id: blogId });
    if (response.data.success) {
      await fetchList(); // Refresh the list after deleting
      toast.success(response.data.message);
    } else {
      toast.error("Error removing blog");
    }
  };

  const updateBlog = (blogId) => {
    navigate(`/edit-post/${blogId}`);
  };

  useEffect(() => {
    fetchList(); // Fetch blog list on component mount
  }, []);

  // Filtered list based on search term
  const filteredList = list.filter(blog =>
    blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='list add flex-col'>
      <p>All Blogs</p>
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="search-input"
      />
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Posting Date</b> {/* New column for posting date */}
          <b>Action</b>
        </div>
        {filteredList.length > 0 ? (
          filteredList.map((blog, index) => (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + blog.image} alt="" />
              <p>{blog.name}</p>
              <p>{blog.category}</p>
              <p>{new Date(blog.date).toLocaleString()}</p> {/* Format and display posting date */}
              <div className="action-buttons">
                <p onClick={() => removeBlog(blog._id)} className="cursor delete-button">
                  Delete
                </p>
                <p onClick={() => updateBlog(blog._id)} className="cursor update-button">
                  Edit
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default List;
