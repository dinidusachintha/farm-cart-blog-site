import { FaFacebookSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import './Footer.css'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <hr className="footer-divider" />
      <div className="footer-grid md:grid-cols-4">
        <div>
          <h1 className="footer-title">FarmCart.</h1>
        </div>
        <div></div>
        <div className="flex flex-col gap-y-4">
          <p className="footer-link">Get Help</p>
          <p className="footer-link">Add your Shop</p>
          <p className="footer-link">Sign up to Deliver</p>
          <p className="footer-link">Create a Business Account</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="footer-link">Shops near me</p>
          <p className="footer-link">View all cities</p>
          <p className="footer-link">Pickup near me</p>
          <p className="footer-link">About Farm cart</p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <div className="footer-social">
          <FaFacebookSquare />
          <FaTiktok />
          <FaMedium />
        </div>
        <div className="flex items-center">
          <p className="footer-bottom-link">Privacy Policy</p>
          <p className="footer-bottom-link">Terms</p>
          <p className="footer-bottom-link">Pricing</p>
        </div>
        <div className="footer-copyright">
          <p>© 2024 Farmcart Technologies Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
