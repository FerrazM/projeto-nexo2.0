import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import FinanceDashboard from './FinanceDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/register" Component={RegisterForm} />
          <Route exact path="/login" Component={LoginForm} />
          <Route exact path="/auth/financas" Component={FinanceDashboard} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
