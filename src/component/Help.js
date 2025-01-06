import React from "react";
import Footer from "./Footer";
import { useTheme } from "../othersRoutes/AllContext";

export default function Help() {
  const { theme } = useTheme(); // Destructure theme from useTheme
  const isDarkTheme = theme === "dark";

  return (
    <div>
      <div className="container mt-5 mb-5">
        {/* Page Title */}
        <div className="text-center mb-4">
          <h1
            className={`display-4 fw-bold ${
              isDarkTheme ? "text-light" : "text-primary"
            }`}
          >
            <i className="fa-solid fa-circle-info me-2"></i> Help Center
          </h1>
          <p className={`lead ${isDarkTheme ? "text-light" : "text-muted"}`}>
            Explore our help topics, FAQs, and contact our support team.
          </p>
        </div>

        {/* Help Sections */}
        <div className="row g-4">
          {/* FAQs Section */}
          <div className="col-md-6">
            <div
              className={`card shadow-lg border-0 ${
                isDarkTheme ? "bg-secondary text-light" : ""
              }`}
            >
              <div className="card-body">
                <h3 className="fw-bold text-success mb-3">
                  <i className="fa-solid fa-question-circle me-2"></i>{" "}
                  Frequently Asked Questions
                </h3>
                <ul className="list-group list-group-flush">
                  {[
                    {
                      question: "How do I reset my password?",
                      answer:
                        "Go to your settings and click on 'Change Password.' Follow the instructions provided.",
                    },
                    {
                      question: "How do I Update my Profile?",
                      answer:
                        "Go to your settings and click on ' Update Profile' . Follow the instructions provided.",
                    },
                    {
                      question: "Can I edit my Profile Iamge",
                      answer:
                        "Yes. You can Edit your Profile Image . Go to the Profile sections  and Chose the Profile Image and click the Edit Iamge button.",
                    },
                    {
                      question: "Can I Delete my Profile Iamge",
                      answer:
                        "Yes. You can Delete your Profile Image . Go to the Profile sectionsand click to the delet Image button.",
                    },
                    {
                      question: "What should I do if I face login issues?",
                      answer:
                        "Check your internet connection and verify your credentials. If the issue persists, contact support.",
                    },
                    {
                      question: "How can I recover deleted notes?",
                      answer:
                        "Deleted notes are stored in the 'Trash' section for 30 days before being permanently deleted.",
                    },
                    {
                      question: "Is my data secured with encryption?",
                      answer:
                        "Yes, your data is protected with end-to-end encryption to ensure privacy and security.",
                    },
                    {
                      question: "How can I contact customer support?",
                      answer:
                        "You can reach us 24/7 via the 'Contact Support' form or by calling our toll-free number.",
                    },
                    {
                      question: "This is a paid website?",
                      answer: "No, This not a paid website. ",
                    },
                    {
                      question: "Can I change my email address?",
                      answer:
                        "Yes, you can update your email in the profile settings.and change your Email ",
                    },
                  ].map((faq, index) => (
                    <li
                      key={index}
                      className={`list-group-item ${
                        isDarkTheme ? "bg-secondary text-light" : ""
                      }`}
                    >
                      <strong>
                        Question {index + 1}: {faq.question}
                      </strong>
                      <p className="ms-3">
                        <strong>Ans :- </strong>
                        {faq.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-md-6">
            <div
              className={`card shadow-lg border-0 ${
                isDarkTheme ? "bg-secondary text-light" : ""
              }`}
            >
              <div className="card-body">
                <h3 className="fw-bold text-warning mb-3">
                  <i className="fa-solid fa-envelope me-2"></i> Contact Support
                </h3>
                <form>
                  {[
                    {
                      label: "Name",
                      type: "text",
                      placeholder: "Enter your name",
                    },
                    {
                      label: "Email",
                      type: "email",
                      placeholder: "Enter your email",
                    },
                  ].map((input, index) => (
                    <div key={index} className="mb-3">
                      <label className="form-label">{input.label}</label>
                      <input
                        type={input.type}
                        className={`form-control ${
                          isDarkTheme ? "bg-dark text-light" : ""
                        }`}
                        placeholder={input.placeholder}
                        required
                      />
                    </div>
                  ))}
                  <div className="mb-3">
                    <label className="form-label">Your Issue</label>
                    <textarea
                      className={`form-control ${
                        isDarkTheme ? "bg-dark text-light" : ""
                      }`}
                      rows="5"
                      placeholder="Describe your issue..."
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-primary w-100">
                    <i className="fa-solid fa-paper-plane me-2"></i> Submit
                    Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div
          className={`card shadow-lg mt-5 border-0 ${
            isDarkTheme ? "bg-secondary text-light" : ""
          }`}
        >
          <div className="card-body">
            <h3 className="fw-bold text-danger mb-4">
              <i className="fa-solid fa-tools me-2"></i> Advanced
              Troubleshooting Steps
            </h3>
            <ol>
              {[
                "Ensure your browser is updated to the latest version.",
                "Clear your browser cache and cookies.",
                "Disable browser extensions that may cause conflicts.",
                "Restart your device and check again.",
                "If the issue persists, contact technical support for assistance.",
              ].map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-5">
          <p className={`${isDarkTheme ? "text-light" : "text-muted"}`}>
            <i className="fa-solid fa-headset me-2"></i> We are here for you
            24/7. Your satisfaction is our priority.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
