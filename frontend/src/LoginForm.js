import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        senha,
      });

      console.log(response.data.msg); // Mensagem de sucesso da API

      const token = response.data.token;

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página de finanças
      navigate('/auth/financas');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Lógica para lidar com erros
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
