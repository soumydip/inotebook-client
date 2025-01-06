/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../CSS/All.css";

export default function TermsAndConditions() {
  return (
    <div className="container mt-5 mb-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-danger">
          <i className="fa-solid fa-file-contract me-2"></i> Terms & Conditions
        </h1>
        <p className="lead text-muted">
          <i className="fa-solid fa-info-circle me-2"></i>
          Welcome to iNotebook! Please review the terms and conditions carefully before using our platform.
        </p>
      </div>

      {/* Terms Details */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {/* Section 1 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-handshake-angle me-2"></i> 1. Acceptance of Terms
          </h3>
          <p className="text-muted">
            By using iNotebook, you agree to abide by these terms. If you do not
            accept these terms, please refrain from using the platform. Any
            breach may result in account suspension or termination.
          </p>

          {/* Section 2 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-user-check me-2"></i> 2. User Responsibilities
          </h3>
          <p className="text-muted">
            As a user of iNotebook, you must:
          </p>
          <ul className="text-muted">
            <li>
              <i className="fa-solid fa-circle-check me-2"></i>
              Provide accurate and up-to-date information during registration.
            </li>
            <li>
              <i className="fa-solid fa-circle-check me-2"></i>
              Refrain from activities that could harm the platform, such as
              hacking or unauthorized data scraping.
            </li>
            <li>
              <i className="fa-solid fa-circle-check me-2"></i>
              Ensure that your account credentials remain confidential.
            </li>
            <li>
              <i className="fa-solid fa-circle-check me-2"></i>
              Avoid uploading offensive, harmful, or illegal content.
            </li>
          </ul>

          {/* Section 3 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-shield-halved me-2"></i> 3. Data Privacy
          </h3>
          <p className="text-muted">
            We prioritize the security of your personal data. Your information
            will not be shared with third parties without your consent unless
            required by law. For more details, refer to our{" "}
            <a href="/privacy-policy" className="text-danger">
              Privacy Policy
            </a>
            .
          </p>

          {/* Section 4 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-clock me-2"></i> 4. Service Availability
          </h3>
          <p className="text-muted">
            While we aim to provide a reliable service, iNotebook may
            occasionally experience downtime for maintenance or technical
            issues. Advance notice will be provided for scheduled maintenance
            whenever possible.
          </p>

          {/* Section 5 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-file-alt me-2"></i> 5. Content Ownership
          </h3>
          <p className="text-muted">
            Any notes or content you create using iNotebook remain your
            intellectual property. We do not claim ownership of your data.
            However, by using our platform, you grant us permission to store
            your data securely for operational purposes.
          </p>

          {/* Section 6 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-ban me-2"></i> 6. Prohibited Activities
          </h3>
          <p className="text-muted">
            To maintain a safe and ethical environment, the following activities
            are strictly prohibited:
          </p>
          <ul className="text-muted">
            <li>
              <i className="fa-solid fa-circle-xmark me-2"></i>
              Spamming, phishing, or using automated tools to overload our
              servers.
            </li>
            <li>
              <i className="fa-solid fa-circle-xmark me-2"></i>
              Uploading or sharing harmful, offensive, illegal, or copyrighted
              material without proper authorization.
            </li>
            <li>
              <i className="fa-solid fa-circle-xmark me-2"></i>
              Attempting to hack, exploit vulnerabilities, or reverse-engineer
              the platform.
            </li>
          </ul>

          {/* Section 7 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-user-slash me-2"></i> 7. Account Termination
          </h3>
          <p className="text-muted">
            We reserve the right to suspend or terminate accounts that violate
            these terms or engage in malicious activities. In such cases, we
            may also report the violation to relevant authorities.
          </p>

          {/* Section 8 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-sync me-2"></i> 8. Updates to Terms
          </h3>
          <p className="text-muted">
            These terms may be updated periodically to reflect changes in our
            policies or legal requirements. Users are encouraged to review this
            page regularly to stay informed.
          </p>

          {/* Section 9 */}
          <h3 className="mb-3 text-primary">
            <i className="fa-solid fa-envelope me-2"></i> 9. Contact Us
          </h3>
          <p className="text-muted">
            If you have any questions, concerns, or require assistance, please
            contact us at:
          </p>
          <ul className="text-muted">
            <li>
              <i className="fa-solid fa-envelope me-2"></i>
              Email:{" "}
              <a href="#" className="text-danger">
                terms@inotebook.com
              </a>
            </li>
            <li>
              <i className="fa-solid fa-phone me-2"></i>
              Phone: <span className="text-danger">+91 123456789</span>
            </li>
            <li>
              <i className="fa-solid fa-location-dot me-2"></i>
              Address: Kolkata, India, Asia, 700001
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="text-center mt-5">
        <p className="text-muted">
          <i className="fa-solid fa-shield-alt me-2"></i>
          We value your trust and strive to provide a safe and secure
          experience.
        </p>
      </div>
    </div>
  );
}
