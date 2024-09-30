import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Environment",
        date: "" // Add date field to state
    });
    const [dateError, setDateError] = useState(''); // State for date validation error

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        if (name === 'date') {
            setDateError(''); // Clear error on date change
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Validate the selected date
        const selectedDate = new Date(data.date);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
            setDateError('The date cannot be in the past.'); // Set error message
            return; // Stop submission
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("date", data.date); // Append date to form data
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/blog/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    category: "Environment",
                    date: "" // Reset date field
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while adding the blog.');
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-blog-name flex-col">
                    <p>Blog Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder="Type here..." required />
                </div>
                <div className="add-blog-description flex-col">
                    <p>Blog Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content Here..' required></textarea>
                </div>
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category" value={data.category}>
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
                <div className="add-date flex-col">
                    <p>Blog Date</p>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={onChangeHandler}
                        required
                    />
                    {dateError && <p className="error-message">{dateError}</p>} {/* Show error message */}
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;
