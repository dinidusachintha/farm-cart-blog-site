import React, { useContext } from 'react';
import './BlogDisplay.css'; 
import { BlogContext } from '../../Context/BlogContext';
import BlogItem from '../BlogItem/BlogItem';

const BlogDisplay = ({ category }) => {
    const {blog_list} = useContext (BlogContext)
    return (
            <div className='blog-display' id='blog-display'>
                <h2>Trending Blogs Here!</h2>
                <div className="blog-display-list">
                 {blog_list.map((item,index)=> { 
                    if(category==="All" || category===item.category) {
                        return <BlogItem key={index} id={item._id} name={item.name} description={item.description} image={item.image}/>
                    }
                     
                 })}
        </div>
    </div>
    )
    }
    export default BlogDisplay