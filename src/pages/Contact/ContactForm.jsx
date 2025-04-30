import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ContactForm.css";

const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, reason, message } = contactDetails;

    if (!name || !email || !reason || !message) {
      toast.error("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        ...contactDetails,
        timestamp: serverTimestamp(),
      });

      toast.success("Your message has been sent!");
      setContactDetails({ name: "", email: "", reason: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={contactDetails.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={contactDetails.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason" className="form-label">Reason for Contact</label>
          <select
            id="reason"
            name="reason"
            value={contactDetails.reason}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select a reason</option>
            <option value="Order Inquiry">Order Inquiry</option>
            <option value="Return or Refund">Return or Refund</option>
            <option value="Product Issue">Product Issue</option>
            <option value="General Query">General Query</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={contactDetails.message}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
