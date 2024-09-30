import { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Import axios

export const BlogContext = createContext(null);

const BlogContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [blog_list, setBlogList] = useState([]);

  const fetchBlogList = async () => {
    try {
      const response = await axios.get(url + "/api/blog/list");
      setBlogList(response.data.data); // Set blog list from response
    } catch (error) {
      console.error("Failed to fetch blog list", error); // Log error if request fails
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchBlogList(); // Fetch blog list
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); // Set token from localStorage
      }
    }
    loadData(); // Load data on mount
  }, []); // Empty dependency array to run once on mount

  const contextValue = {
    blog_list,
    url,
    token,
    setToken
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children} {/* Render children */}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
