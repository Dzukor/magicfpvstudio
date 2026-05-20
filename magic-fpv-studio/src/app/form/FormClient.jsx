"use client";

import { useState } from "react";
import { postOrder } from '../../lib/api';

export default function FormClient() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postOrder(formData)
      .then((data) => {
        if (data && data.id) {
          alert('Form submitted — thank you!');
          setFormData({ name: '', surname: '', company: '', phone: '', email: '', message: '' });
        } else if (data && data.error) {
          alert('Error: ' + data.error);
        } else {
          alert('Unexpected response from server');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to submit form');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="message"
          value={formData.message}
          onChange={handleChange}
          maxLength='500'
          required
        />
      </div>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
