import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../CSS/All.css";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container-fluid footer-bg py-5">
        <div className="row g-4 text-white">
          {/* About Section */}
          <div className="col-md-3">
            <h5 className="fw-bold footer-title">About</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/company-info"
                  className="text-decoration-none footer-link"
                >
                  Company Information
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-decoration-none footer-link"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press-releases"
                  className="text-decoration-none footer-link"
                >
                  Press Releases
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-decoration-none footer-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-md-3">
            <h5 className="fw-bold footer-title">Help</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/payments"
                  className="text-decoration-none footer-link"
                >
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-decoration-none footer-link"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-decoration-none footer-link"
                >
                  Cancellation
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-decoration-none footer-link">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Section */}
          <div className="col-md-3">
            <h5 className="fw-bold footer-title">Policy</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/return-policy"
                  className="text-decoration-none footer-link"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-decoration-none footer-link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/inotebook/terms-and-conditions" className="text-decoration-none footer-link">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="text-decoration-none footer-link"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3">
            <h5 className="fw-bold footer-title">Follow Us</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                >
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                >
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                >
                  <i className="fa-brands fa-twitter fa-2x"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                >
                  <i className="fa-brands fa-linkedin fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="text-white" />

        {/* Footer Bottom */}
        <div className="text-center small text-white">
          &copy; {new Date().getFullYear()} iNotebook | All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
