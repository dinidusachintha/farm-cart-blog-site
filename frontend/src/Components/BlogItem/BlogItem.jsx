import React, { useContext } from 'react';
import './BlogItem.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../Context/BlogContext';

const BlogItem = ({ id, name, description, image }) => {

  const { url } = useContext(BlogContext);

  // Limit description to 140 characters
  const ShortDescription = description.length > 130 ? description.substr(0, 130) + '...' : description;

  // Limit blog name to 30 characters
  const postname = name.length > 25 ? name.substr(0, 25) + '...' : name;

  return (
    <div className='blog-item'>
      <div className="blog-item-img-container">
        <img className='blog-item-image' src={`${url}/images/${image}`} alt={name} />
      </div>
      <div className="blog-item-info">
        <div className="blog-item-name-rating">
          <p>{postname}</p>
          <img src={assets.rating_starts} alt="Rating stars" /> {/* Fixed typo */}
        </div>
        <p className="blog-item-desc">{ShortDescription}</p>
      </div>
      <div className="button-container">
        <Link to={`/blogpost/${id}`} className="read-more-btn">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
