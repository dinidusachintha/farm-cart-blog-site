import express from 'express';
import { addBlog, listBlog, removeBlog, updateBlog, getBlogById } from '../controllers/blogController.js';
import multer from 'multer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const blogRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route to add a blog
blogRouter.post("/add", upload.single("image"), async (req, res) => {
    try {
        await addBlog(req, res); // Call the controller function
    } catch (error) {
        res.status(500).json({ message: "Failed to add blog", error });
    }
});

// Route to list all blogs
blogRouter.get("/list", async (req, res) => {
    try {
        await listBlog(req, res); // Call the controller function
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve blogs", error });
    }
});

// Route to remove a blog
blogRouter.post("/remove",removeBlog);

// Route to update a blog
blogRouter.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        await updateBlog(req, res); // Call the controller function
    } catch (error) {
        res.status(500).json({ message: "Failed to update blog", error });
    }
});

// Route to download a blog as PDF
blogRouter.get("/download/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await getBlogById(blogId); // Implement this function to fetch the blog details from DB

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Create a PDF document
        const doc = new PDFDocument();
        const fileName = `blog-${blogId}.pdf`;
        const filePath = path.join(__dirname, `../downloads/${fileName}`);

        // Create a write stream to save the PDF
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Add blog details to the PDF
        doc.fontSize(25).text(blog.name, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Category: ${blog.category}`);
        doc.moveDown();
        doc.fontSize(12).text(blog.content);

        // Optionally add the image if it exists
        if (blog.image) {
            doc.addPage().image(path.join(__dirname, `../uploads/${blog.image}`), {
                fit: [500, 400],
                align: 'center',
                valign: 'center'
            });
        }

        // Finalize the PDF and close the stream
        doc.end();

        // When the PDF is fully written, send it to the client
        writeStream.on('finish', () => {
            res.download(filePath, (err) => {
                if (err) {
                    console.error("Error downloading file:", err);
                }
                fs.unlinkSync(filePath); // Remove the file after download
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to generate PDF", error });
    }
});

// Export router
export default blogRouter;
