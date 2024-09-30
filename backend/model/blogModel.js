import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Blog name is required'],
    minlength: [5, 'Blog name must be at least 5 characters long'],
    maxlength: [100, 'Blog name cannot exceed 100 characters'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [50, 'Description must be at least 50 characters long'],
    maxlength: [5000, 'Description cannot exceed 5000 characters'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image filename is required'],
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Environment', 'Trends', 'Technology', 'Crop', 'Living', 'Tours', 'Livestock', 'Stories'],
      message: '{VALUE} is not a valid category'
    }
  }
}, { timestamps: true }); // Add timestamps

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;
