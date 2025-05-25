import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import AccessPage from './pages/AccessPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';

import './App.css';
import { UserProvider } from './UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router basename="/takayu2.fnd37">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/book" element={<LoginPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
