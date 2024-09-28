import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Billing from './Billing';
import SMS from './SMS';
import CARD from './Card';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/sms" element={<SMS />} />
        <Route path="/Card" element={<CARD />} />
      </Routes>
    </Router>
  );
}

export default App;
