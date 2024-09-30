import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import BlogDisplay from '../../Components/BlogDisplay/BlogDisplay';


const Home = () => {

    const[category,setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <BlogDisplay category={category}/>
      
    </div>

  )
}

export default Home
