import { Link } from 'react-router-dom';

import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

import './footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-content">
          <div>
            <span className="footer-eyebrow">STAY IN THE LOOP</span>

            <h2>
              Discover something
              <br />
              worth buying.
            </h2>

            <p>
              Get updates about new products, special offers, and the latest
              collections.
            </p>
          </div>

          <div className="footer-newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
            />

            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark">S</span>

              <span>SHOPLY</span>
            </Link>

            <p>
              Thoughtfully selected products, designed to make everyday life a
              little better.
            </p>

            <div className="footer-socials">
              <a href="#instagram" aria-label="Instagram">
                <InstagramOutlined />
              </a>

              <a href="#facebook" aria-label="Facebook">
                <FacebookOutlined />
              </a>

              <a href="#twitter" aria-label="Twitter">
                <TwitterOutlined />
              </a>

              <a href="#github" aria-label="GitHub">
                <GithubOutlined />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-column">
            <h3>Shop</h3>

            <Link to="/shop">All Products</Link>

            <Link to="/shop">New Arrivals</Link>

            <Link to="/shop">Best Sellers</Link>

            <Link to="/shop">Collections</Link>
          </div>

          {/* Account */}
          <div className="footer-column">
            <h3>Account</h3>

            <Link to="/login">Sign In</Link>

            <Link to="/register">Create Account</Link>

            <Link to="/cart">Shopping Cart</Link>

            <Link to="/user/history">Order History</Link>
          </div>

          {/* Help */}
          <div className="footer-column">
            <h3>Help</h3>

            <a href="#shipping">Shipping & Delivery</a>

            <a href="#returns">Returns</a>

            <a href="#contact">Contact Us</a>

            <a href="#faq">FAQ</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} SHOPLY. All rights reserved.</p>

          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>

            <a href="#terms">Terms & Conditions</a>
          </div>

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUpOutlined />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
