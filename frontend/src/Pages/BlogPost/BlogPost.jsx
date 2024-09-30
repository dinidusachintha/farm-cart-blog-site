import React, { useContext, useState, useEffect } from 'react';
import './BlogPost.css';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../../Context/BlogContext';
import { jsPDF } from 'jspdf';
import logo from '../../assets/logo.png'; // Import your logo image

const BlogPost = () => {
  const { id } = useParams();
  const { blog_list, url } = useContext(BlogContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    // Fetch the blog post based on ID
    const foundPost = blog_list.find(post => post._id === id);
    setBlogPost(foundPost);
    setIsLoading(false);
  }, [id, blog_list]);

  if (isLoading) {
    return <p>Loading blog post...</p>;
  }

  if (!blogPost) {
    return <p>Blog post not found.</p>;
  }

  // Format the date
  const formattedDate = new Date(blogPost.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Function to generate PDF with minimized spaces between lines
  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add the logo
    pdf.addImage(logo, 'PNG', 10, 10, 40, 5); // Adjust the position and size of the logo

    // Add the title
    pdf.setFontSize(16);
    pdf.text(blogPost.name, 10, 40); // Title at the top, below the logo

    // Add the image
    const imageUrl = `${url}/images/${blogPost.image}`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const imgWidth = 180;
      const imgHeight = (img.height / img.width) * imgWidth; 
      pdf.addImage(img, 'PNG', 10, 50, imgWidth, imgHeight); 

      // Add the description
      const descriptionStartY = 50 + imgHeight + 10; 
      pdf.setFontSize(12);

      const description = blogPost.description.replace(/(<([^>]+)>)/gi, ''); 
      const textLines = pdf.splitTextToSize(description, 180); 
      let currentY = descriptionStartY;

      textLines.forEach((line, index) => {
        if (currentY > 280) {
          pdf.addPage();
          currentY = 10; 
        }
        pdf.text(line, 10, currentY);
        currentY += 6; 
      });

      // Save the PDF
      const formattedTitle = blogPost.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`${formattedTitle}.pdf`);
    };
  };

  return (
    <div className='blog-post'>
      <div className='blog-post-header'>
        <h1 className='blog-post-title'>{blogPost.name}</h1>
        <p className='blog-post-date'>Posted on: {formattedDate}</p> {/* Displaying the formatted date */}
        <img className='blog-post-image' src={`${url}/images/${blogPost.image}`} alt={blogPost.name} />
      </div>
      <div className='blog-post-content'>
        <div dangerouslySetInnerHTML={{ __html: blogPost.description }} />
      </div>

      <button className='download-btn' onClick={generatePDF}>
        Download Post as PDF
      </button>
    </div>
  );
};

export default BlogPost;
