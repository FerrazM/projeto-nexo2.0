import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationPage from './pages/UserRegistrationPage';
import CreateFinancePage from './pages/CreateFinancePage';
import UserLoginPage from './pages/LoginPage';
import axios from 'axios';

// Função para configurar o cabeçalho de autorização
const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Antes de fazer qualquer solicitação autenticada, chame a função setAuthHeader()
setAuthHeader();

// Agora, ao fazer solicitações usando o Axios, o token será automaticamente enviado no cabeçalho de autorização
axios.get('/financas')
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  });


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/register" Component={UserRegistrationPage} />
        <Route path="/financas" Component={CreateFinancePage} />
        <Route path="/auth/login" Component={UserLoginPage} />
      </Routes>
    </Router>
  );
}

export default App;
