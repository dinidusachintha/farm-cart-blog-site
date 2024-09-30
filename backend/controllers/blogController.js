import blogModel from "../model/blogModel.js";
import fs from 'fs';

// Add blog item
const addBlog = async (req, res) => {
    const image_filename = req.file ? `${req.file.filename}` : null;

    const blog = new blogModel({
        name: req.body.name,
        description: req.body.description,
        date: new Date(),
        category: req.body.category,
        image: image_filename,
    });

    try {
        await blog.save();
        res.json({ success: true, message: "Blog Added" });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ success: false, message: "Failed to add blog" });
    }
};

// List all blogs
const listBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        res.status(500).json({ success: false, message: "Error retrieving blogs" });
    }
};

// Remove blog item
const removeBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.body.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        
        // Remove the image from the server
        if (blog.image) {
            fs.unlink(`uploads/${blog.image}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }
        
        await blogModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Blog Removed" });
    } catch (error) {
        console.error("Error removing blog:", error);
        res.status(500).json({ success: false, message: "Error removing blog" });
    }
};

// Update blog item
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { name, description, category } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                date: new Date(),
                category,
                ...(image && { image }), // Only update the image if it's provided
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog updated successfully", data: updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ success: false, message: "Error updating blog" });
    }
};

// Get blog by ID
const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ success: false, message: "Error retrieving blog" });
    }
};

export { addBlog, listBlog, removeBlog, updateBlog, getBlogById };
