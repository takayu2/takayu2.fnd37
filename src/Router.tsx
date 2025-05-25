import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
