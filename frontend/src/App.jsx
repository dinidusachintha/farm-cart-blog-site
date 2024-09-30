import React, { useState } from 'react'; // Import useState
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import BlogPost from './Pages/BlogPost/BlogPost';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Footer from './Components/Footer/Footer';
import AboutUs from './Pages/Aboutus/Aboutus';
;

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // State to control the login popup
  const apiUrl = 'http://localhost:4000'; // Corrected API URL

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />} {/* Show LoginPopup based on state */}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Blog post route */}
          <Route path="/blogpost/:id" element={<BlogPost />} />

          {/* About Us page route */}
          <Route path="/aboutus" element={<AboutUs />} />  {/* Corrected path to include / */}

          {/* Latest News page route */}
         
       </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
